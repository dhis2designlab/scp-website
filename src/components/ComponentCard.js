import React from 'react'
import { Link } from 'react-router-dom'
import GithubCard from './GithubCard'
import VerificationMarker from './VerificationMarker'
import '../stylesheets/component.css'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Badge from 'react-bootstrap/Badge'


const ComponentCard = props => {
    const { p } = props;
    const packages = useSelector(state => state.packages.currPackages);
    const verifiedPackages = useSelector(state => state.packages.verified);

    return (
        <div className="component-wrapper pure-g">
            <div className="component-header name pure-u-7-8">
                <Link 
                    className="component-name" 
                    to={{
                        pathname: "/scp-website/packageinfo",
                        packageName: packages[p.item.packageIndex].package.name
                    }}>
                    <h3>{p.item.name}</h3>
                </Link>
            </div>
            <div className="component-header version pure-u-1-8">
                <VerificationMarker verifiedVersion={verifiedPackages[packages[p.item.packageIndex].package.name]} p={packages[p.item.packageIndex].package}/>
            </div>
            <div className="component-content description pure-u-1">
                <p>{p.item.description}</p>
            </div>
            <div className="component-footer keywords pure-u-1">
                {packages[p.item.packageIndex].package.keywords.map((i) => 
                    <Badge className="keyword-badge" variant="primary">
                        <a className="keyword-link" href={`https://www.npmjs.com/search?q=keywords:${i}`}>{i}</a>
                    </Badge>
                )}
            </div>
            <div className="component-footer publisher pure-u-7-8">
                <div className="package-publisher">{packages[p.item.packageIndex].package.name} <GithubCard username={packages[p.item.packageIndex].package.publisher.username} avatarSize={{ width: '22px' }} /><span data-tip={new Date(packages[p.item.packageIndex].package.date)}>published {packages[p.item.packageIndex].package.version} &bull; {moment(packages[p.item.packageIndex].package.date).startOf('day').fromNow()}</span></div>
            </div>
            <div className="component-footer npm-link pure-u-1-8">
                <Link className="npm-link-icon" target="_blank" to={{ pathname: packages[p.item.packageIndex].package.links.npm }}><img alt="NPM" src={process.env.PUBLIC_URL + '/img/npm-logo-red-32px.png'} /></Link>
            </div>
        </div>
    )
}

export default ComponentCard