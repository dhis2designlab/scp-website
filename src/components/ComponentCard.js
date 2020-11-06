import React from 'react'
import { Link } from 'react-router-dom'
import GithubCard from './GithubCard'
import '../stylesheets/component.css'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import { useSelector } from 'react-redux'

const ComponentCard = props=> {
    const { p, style } = props;
    const packages = useSelector(state => state.packages.currPackages);
    const verifiedPackages = useSelector(state => state.packages.verified);

    //change and move when new card design is implemented
    const liStyle = {
        margin: "10px 10px 0 0",
        padding: "5px",
        backgroundColor: "#f2f2f2",
        borderRadius: "4px",
        float: 'left',
    }
    
    const ulStyle = {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        overflow: 'hidden',
    }
    
    const publisherStyle = {
        margin: "1em 0 0.5em 0",
    }
    
    const versionStyle = {
        color: "#7f7f7f",
        fontWeight: 300,
        marginLeft: "10px",
    }
    
    const packageHeaderStyle = {
        margin: '0 10px 0 0px',
        links: {
            margin: '0 10px 0 0px',
            color: 'inherit',
        }
    }
    
    const headerBoxStyle = {
        margin: '15px 0 15px 0'
    }
    
    const packageBoxStyle = {
        //marginBottom: '15px',
        boxShadow: '8px 1px 4px -6px rgba(190,190,190,0.1)',
        backgroundColor: "#F0F8FF",
    }

    return (
        <div className="grid-item" id="grid-item" style={packageBoxStyle}>
            <div className="grid-item-header" style={headerBoxStyle}>
                <Link style={packageHeaderStyle} to={{
                    pathname: "/scp-website/packageinfo",
                    packageName: packages[p.item.packageIndex].package.name
                }}><h3 style={{ display: 'inline' }}>{p.item.name} - {packages[p.item.packageIndex].package.name}</h3></Link> <Link style={packageHeaderStyle.links} target="_blank" to={{ pathname: packages[p.item.packageIndex].package.links.npm }}><img alt="NPM" src={process.env.PUBLIC_URL + '/img/npm-logo-red-32px.png'} /></Link>
                <Link style={packageHeaderStyle.links} target="_blank" to={{ pathname: packages[p.item.packageIndex].package.links.repository }}><img alt="Repository" src={process.env.PUBLIC_URL + '/img/GitHub-Mark-32px.png'} /></Link>
                {verifiedPackages[packages[p.item.packageIndex].package.name] ? 'Verified' : ''}
            </div>
            <div className="grid-item-content">
                <p style={style.description}>{p.item.description}</p>
                {packages[p.item.packageIndex].package.keywords ? <>
                    <ul style={ulStyle}>
                        {packages[p.item.packageIndex].package.keywords.map((i) => <li style={liStyle} key={i}><a href={`https://www.npmjs.com/search?q=keywords:${i}`}>{i}</a></li>)}
                    </ul>
                </> : null}
                <div style={publisherStyle}><GithubCard username={packages[p.item.packageIndex].package.publisher.username} avatarSize={{ width: '22px' }} /><span data-tip={new Date(packages[p.item.packageIndex].package.date)} style={versionStyle}>published {packages[p.item.packageIndex].package.version} &bull; {moment(packages[p.item.packageIndex].package.date).startOf('day').fromNow()}</span></div>
                <ReactTooltip />
            </div>
        </div>
    )
}

export default ComponentCard