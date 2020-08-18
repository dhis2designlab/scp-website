import React from 'react'
import { Link } from 'react-router-dom'
import GithubCard from './GithubCard'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'

const liStyle = {
    display: "inline",
    margin: "0 5px 0 0",
    padding: "5px",
    backgroundColor: "#f2f2f2",
    borderRadius: "4px"
}

const ulStyle = {
    margin: 0,
    padding: 0
}

const publisherStyle = {
    margin: "1em 0 0 0",
}

const versionStyle = {
    color: "#7f7f7f",
    fontWeight: 300,
    marginLeft:"10px",
}

const PackageList = (props) => {
    const { style, packages } = props;
    if (packages === null) return (<p>Search for packages for them to be displayed here</p>)
    return (
        <ul style={{ listStyleType: "none" }}>
            {packages.map(p => <li key={p.package.name} style={style.item}>
                <Link to={{
                    pathname: "/packageinfo",
                    packageName: p.package.name
                }}><h3>{p.package.name}</h3></Link>
                <p style={style.description}>{p.package.description}</p>
                {p.package.keywords ? <>
                    <ul style={ulStyle}>
                        {p.package.keywords.map((i) => <li style={liStyle} key={i}><a href={`https://www.npmjs.com/search?q=keywords:${i}`}>{i}</a></li>)}
                    </ul>
                </> : null}
                <div style={publisherStyle}><GithubCard username={p.package.publisher.username} avatarSize={{width:'22px'}} /><span data-tip={new Date(p.package.date)} style={versionStyle}>published {p.package.version} &bull; {moment(p.package.date).startOf('day').fromNow()}</span></div>
                <ReactTooltip />
            </li>)}
        </ul>
    )
}

export default PackageList