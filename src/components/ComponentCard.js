import React from 'react'
import { Link } from 'react-router-dom'
import GithubCard from './GithubCard'
import '../stylesheets/component.css'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNpm } from "@fortawesome/free-brands-svg-icons"
import ReactTooltip from 'react-tooltip'
import VerificationMarker from './VerificationMarker'

const publisherStyle = {
    margin: "1em 0 0.5em 0",
}

const versionStyle = {
    color: "#7f7f7f",
    fontWeight: 300,
    marginLeft: "10px",
}

const packageHeaderStyle = {
    margin: '0 10px 0 0',
    links: {
        margin: '0 10px 0 0px',
        color: 'inherit',
    }
}

const componentBoxStyle = {
    boxShadow: '-1px 0px 8px -4px rgba(46,46,46,0.67)',
    backgroundColor: "#FFF",
    position: 'relative',
    minHeight: '280px',
}

const componentStyle = {
    dataStyle: {
        margin: "15px",
    },
    componentTitleStyle: {
        padding: "5px",
        paddingTop: '15px'
    },
    versionStyle: {
        padding: "5px",
        paddingTop: '10px',
        textAlign: "right",
    },
    descriptionStyle: {
        padding: "5px",
        marginTop: "10px"
    },
    keywordsStyle: {
        padding: 0,
        marginTop: "10px"
    },
    npmStyle: {
        padding: "10px",
        paddingTop: "15px",
        textAlign: "right",
        opacity: "0.5"
    },
    packageInfoStyle: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#eee",
        width: "100%",
        margin: 0,
        padding: "5px",
        paddingLeft: "15px",
        fontWeight: "bold",
        color: "#a1a1a1"
    },
    verified: {
        color: "green"
    },
    nonverified: {
        color: "gray"
    },
    ulStyle: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        overflow: 'hidden',
    },
    liStyle: {
        margin: "10px 10px 0 0",
        padding: "5px",
        backgroundColor: "#f2f2f2",
        borderRadius: "4px",
        float: 'left',
    }
}

const ComponentCard = props => {
    const { p } = props;
    const packages = useSelector(state => state.packages.currPackages);
    const verifiedPackages = useSelector(state => state.packages.verified);

    return (
        <div className="grid-item" id="grid-item" style={componentBoxStyle}>
            <div className="pure-g" style={componentStyle.dataStyle}>
                <div className="pure-u-4-5" style={componentStyle.componentTitleStyle}><Link style={packageHeaderStyle} to={{ pathname: packages[p.item.packageIndex].package.links.npm }} target="_blank"><h4 style={{ display: 'inline' }}>{p.item.name}</h4></Link></div>
                <div className="pure-u-1-5" style={componentStyle.versionStyle}>
                    <VerificationMarker verifiedVersion={verifiedPackages[packages[p.item.packageIndex].package.name]} p={packages[p.item.packageIndex].package} />
                </div>

                <div className="pure-u-5-5 grid-item-content" style={componentStyle.descriptionStyle}>
                    <p>{p.item.description}</p>
                </div>

                <div className="pure-u-5-5" style={componentStyle.keywordsStyle}>
                    {packages[p.item.packageIndex].package.keywords ? <>
                        <ul style={componentStyle.ulStyle}>
                            {packages[p.item.packageIndex].package.keywords.map((i) => <li style={componentStyle.liStyle} key={i}><a href={`https://www.npmjs.com/search?q=keywords:${i}`}>{i}</a></li>)}
                        </ul>
                    </> : null}
                </div>
                <div className="pure-u-4-5 last-row" style={componentStyle.publishedStyle}>
                    <div style={publisherStyle}><GithubCard username={packages[p.item.packageIndex].package.publisher.username} avatarSize={{ width: '22px' }} /><span data-tip={new Date(packages[p.item.packageIndex].package.date)} style={versionStyle}>published {packages[p.item.packageIndex].package.version} &bull; {moment(packages[p.item.packageIndex].package.date).startOf('day').fromNow()}</span></div>
                    <ReactTooltip />
                </div>
                <div className="pure-u-1-5 last-row" style={componentStyle.npmStyle}><Link style={packageHeaderStyle.links} target="_blank" to={{ pathname: packages[p.item.packageIndex].package.links.npm }}><FontAwesomeIcon icon={faNpm} className="fa-lg" /></Link></div>
            </div>
            <div className="pure-g">
                <div className="pure-u-5-5" style={componentStyle.packageInfoStyle}>
                    {packages[p.item.packageIndex].package.name}/{p.item.export}
                </div>
            </div>
        </div>
    )
}

export default ComponentCard