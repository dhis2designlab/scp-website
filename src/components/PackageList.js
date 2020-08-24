import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GithubCard from './GithubCard'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import 'purecss/build/pure.css'
import '../stylesheets/paginate.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight, faLink, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

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
    margin: '0 8px 0 0px',
    color: 'inherit'
}


const PackageList = (props) => {
    const { style, packages, packageCount, packagesPerPage = 10 } = props;
    const [offset, setOffset] = useState(0);

    let handlePageChange = (data) => {
        let pageIndex = data.selected;
        let offset = Math.ceil(pageIndex * packagesPerPage);
        setOffset(offset);
    };


    if (packages === null) return (<p>Search for packages for them to be displayed here</p>)
    let usePackages = packages.slice(offset, offset + packagesPerPage);
    return (
        <>
            <ul style={{ listStyleType: "none" }}>
                {usePackages.map(p => <li key={p.package.name} style={style.item}>
                    <div className="pure-g">
                        <div className="pure-u-1" style={{ padding: '15px' }}>
                            <Link style={packageHeaderStyle} to={{
                                pathname: "/packageinfo",
                                packageName: p.package.name
                            }}><h2 style={{ display: 'inline' }}>{p.package.name}</h2></Link> <Link style={packageHeaderStyle} target="_blank" to={{ pathname: p.package.links.npm }}> <FontAwesomeIcon icon={faLink} /></Link>
                            <Link style={packageHeaderStyle} target="_blank" to={{ pathname: p.package.links.repository }}><FontAwesomeIcon icon={faCodeBranch} /></Link>

                            <p style={style.description}>{p.package.description}</p>
                            {p.package.keywords ? <>
                                <ul style={ulStyle}>
                                    {p.package.keywords.map((i) => <li style={liStyle} key={i}><a href={`https://www.npmjs.com/search?q=keywords:${i}`}>{i}</a></li>)}
                                </ul>
                            </> : null}
                            <div style={publisherStyle}><GithubCard username={p.package.publisher.username} avatarSize={{ width: '22px' }} /><span data-tip={new Date(p.package.date)} style={versionStyle}>published {p.package.version} &bull; {moment(p.package.date).startOf('day').fromNow()}</span></div>
                            <ReactTooltip />
                        </div>
                    </div>

                </li>)}
            </ul>
            <div id="react-paginate" className="center"><ReactPaginate
                pageCount={Math.ceil(packageCount / packagesPerPage)}
                previousLabel={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
                nextLabel={<FontAwesomeIcon icon={faAngleDoubleRight} />}
                onPageChange={handlePageChange}
                breakClassName={'break-me'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'} /></div>

        </>
    )
}

export default PackageList