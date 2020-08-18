import React, { useState, useEffect } from 'react'
import 'purecss/build/pure.css'
import '../stylesheets/package-info.css'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import Clipboard from '../components/Clipboard'
import GithubCard from '../components/GithubCard'
import ReactTooltip from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

const PackageInfo = (props) => {
    const [state, setState] = useState({
        packageName: null,
        packageItem: null,
        error: null,
        isLoaded: false,
        package: [],
        readme: null,
        readmeLoaded: false,
        readmeError: null,
        name: null,
    });
    const { error, isLoaded, item, name } = state;
    const { readme, readmeError, readmeLoaded } = state;

    useEffect(() => {
        (async () => {
            const { packageName } = props.location
            const name = packageName !== undefined ? packageName : "@material-ui/core"
            let result;
            try {
                const response = await fetch(`https://api.npms.io/v2/package/${encodeURIComponent(name)}`)
                result = await response.json();
                setState((oldState) => ({
                    ...oldState,
                    isLoaded: true,
                    item: result,
                    name: name,
                }));
            } catch (error) {
                setState((oldState) => ({
                    ...oldState,
                    isLoaded: true,
                    error
                }));
            }
            try {
                const RMresponse = await fetch(`https://unpkg.com/${name}@${result.collected.metadata.version}/README.md`);
                const RMresult = await RMresponse.text();
                setState((oldState) => ({
                    ...oldState,
                    readmeLoaded: true,
                    readme: RMresult,
                }))
            } catch (error) {
                setState((oldState) => ({
                    ...oldState,
                    readmeLoaded: true,
                    readme: null,
                    readmeError: true,
                }))
            }
        })();
    }, [props.location]);

    useEffect(() => {
        Prism.highlightAll();
    })


    let readmeEl;
    if (readmeLoaded) {
        if (readmeError) {
            readmeEl = <div>Error loading readme ...</div>;
        }
        else {
            readmeEl = <div><ReactMarkdown className="markdown" escapeHtml={false} source={readme}></ReactMarkdown></div>;
        }
    }
    else {
        readmeEl = <div>README loading ...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const collaborators = item.collected.github.contributors.filter((collaborator, idx) => idx < 5);
        return (
            <>
                <div className="pure-g-r content">
                    <div className="pure-u-1-1">
                        <div className="l-box"><h1>{item.collected.metadata.name}</h1>
                            <span data-tip={new Date(item.collected.metadata.date)}>{item.collected.metadata.version} &bull; Published {moment(item.collected.metadata.date).startOf('day').fromNow()}</span><ReactTooltip />
                        </div>
                    </div>
                    <div className="pure-u-1-1 pure-u-md-3-5 pure-u-lg-3-5 left-column">
                        <div className="l-box">
                            <p>{item.collected.metadata.description}</p>
                            {readmeEl}
                        </div>
                    </div>
                    <div className="pure-u-1-1 pure-u-md-2-5 pure-u-lg-2-5 right-column">
                        <div className="l-box">
                            <div className="pure-g-r">
                                <div className="pure-u-1-1"><h4>Install</h4>
                                    <Clipboard value={`npm i ${name}`} />
                                </div>
                                <div className="pure-u-1-2"><h4>Version</h4>
                                    <p>{item.collected.metadata.version}</p></div>
                                <div className="pure-u-1-2"><h4>License</h4>
                                    <p>{item.collected.metadata.license}</p></div>
                                <div className="pure-u-1-2"><h4>Weekly downloads</h4>
                                    <p>{item.collected.npm.downloads[1].count.toLocaleString()}</p>
                                </div>
                                <div className="pure-u-1-2"><h4>Issues</h4>
                                    <p>{item.collected.github.issues.openCount}</p>
                                </div>
                            </div>


                            <h4>NPM</h4>
                            <FontAwesomeIcon icon={faLink} /> <a className="source-links" href={item.collected.metadata.links.npm}>{decodeURIComponent(item.collected.metadata.links.npm)}</a>
                            <h4>Repository</h4>
                            <FontAwesomeIcon icon={faCodeBranch} /> <a className="source-links" href={item.collected.metadata.links.repository}>{decodeURIComponent(item.collected.metadata.links.repository)}</a>
                            <h4>Last publish</h4>
                            <p data-tip={new Date(item.collected.metadata.date)}>{moment(item.collected.metadata.date).startOf('day').fromNow()}</p>
                            {collaborators.length ? <><h4>Collaborators</h4>
                                <ul id="collaborators">
                                    {collaborators.map((i) => <li key={i.username}><GithubCard username={i.username} avatarSize={{width:'40px'}} /></li>)}
                                </ul></> : null
                            }
                            {item.collected.metadata.keywords !== undefined && item.collected.metadata.keywords.length ? <>
                                <h4>Keywords</h4>
                                <ul id="keywords">
                                    {item.collected.metadata.keywords.map((i) => <li key={i}><a href={`https://www.npmjs.com/search?q=keywords:${i}`}>{i}</a></li>)}
                                </ul>
                            </> : null
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default PackageInfo;