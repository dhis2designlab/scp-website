import React from 'react';
import 'purecss/build/pure.css'
import '../stylesheets/packagepage.css';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

const titleStyle = {
    /* colors are for testing purpose */
    backgroundColor: "#FFF",
};

const leftColumnStyle = {
    /* colors are for testing purpose */
    backgroundColor: "#FFF",
};

const rightColumnStyle = {
    /* colors are for testing purpose */
    backgroundColor: "#F3E0EA",
};

class PackagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packageName: null,
            packageItem: null,
            error: null,
            isLoaded: false,
            package: [],
            readme: null,
            readmeLoaded: false,
            readmeError: null,
        };
    }

    async componentDidMount() {
        console.log(`CDMX: entry ...`);
        const name = "@material-ui/core";
        let result;
        try {
            const response = await fetch(`https://api.npms.io/v2/package/${encodeURIComponent(name)}`)
            result = await response.json();
            console.log(`result =`, result);
            this.setState({
                isLoaded: true,
                item: result,
                name: name,
            });
        } catch (error) {
            console.log(`error =`, error);
            this.setState({
                isLoaded: true,
                error
            });
        }
        try {
            const RMresponse = await fetch(`https://unpkg.com/${name}@${result.collected.metadata.version}/README.md`);
            const RMresult = await RMresponse.text();
            this.setState({
                readmeLoaded: true,
                readme: RMresult,
            })
        } catch (error) {
            console.log(`README error =`, error);
            this.setState({
                readmeLoaded: true,
                readme: null,
                readmeError: true,
            })
        }
    }

    componentDidMountX() {
        console.log(`CDMO: entry ...`);
        const name = "@material-ui/core";
        fetch(`https://api.npms.io/v2/package/${encodeURIComponent(name)}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        item: result,
                        name: name,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

    }

    render() {
        const { error, isLoaded, item } = this.state;
        const { readme, readmeError, readmeLoaded } = this.state;
        console.log(`this.state = `, this.state);
        let readmeEl;
        if (readmeLoaded) {
            if (readmeError) {
                readmeEl = <div>Error loading readme ...</div>;
            }
            else {
                //readmeEl = <div dangerouslySetInnerHTML={{__html: readme}}></div>;
                //readmeEl = <div><code>{readme}</code></div>;
                readmeEl = <div><ReactMarkdown escapeHtml={false} source={readme}></ReactMarkdown></div>;
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
            console.log("item", item);
            const months = Math.round(moment().diff(item.collected.metadata.date, 'months', true));
            return (
                <>
                    <div className="pure-g-r">
                        <div className="pure-u-1-1" style={titleStyle}>
                            <div className="l-box"><h1>{item.collected.metadata.name}</h1>
                                <span>{item.collected.metadata.version} &bull; Published {months} months ago</span>
                            </div>
                        </div>
                        <div className="pure-u-3-5" style={leftColumnStyle}>
                            <div className="l-box">
                                <p>{item.collected.metadata.description}</p>
                                {readmeEl}
                            </div>
                        </div>
                        <div className="pure-u-2-5" style={rightColumnStyle}>
                            <div className="l-box">
                                <div className="pure-g-r">
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
                                <a href={item.collected.metadata.links.npm}>{decodeURIComponent(item.collected.metadata.links.npm)}</a>
                                <hr />
                                <h4>Repository</h4>
                                <a href={item.collected.metadata.links.repository}>{decodeURIComponent(item.collected.metadata.links.repository)}</a>
                                <h4>Last publish</h4>
                                {months} {months > 1 ? "months" : "month"} ago
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default PackagePage;