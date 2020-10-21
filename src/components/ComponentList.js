import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setDisplayOffset } from '../actions/filters'
import GithubCard from './GithubCard'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import 'purecss/build/pure.css'
import '../stylesheets/paginate.css'
import '../stylesheets/package-list.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

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
    marginBottom: '15px',
    boxShadow: '8px 1px 4px -6px rgba(190,190,190,0.1)'
}


const ComponentList = (props) => {
    const { style } = props;
    const dispatch = useDispatch()
    const packages = useSelector(state => state.packages.currPackages);
    const allComponents = useSelector(state => state.components.all);
    const searchedComponents = useSelector(state => state.components.searched);
    const searchTerm = useSelector(state => state.filter.searchTerm)
    const displayOffset = useSelector(state => state.filter.displayOffset)
    const componentsPerPage = 5;

    if (searchedComponents.length === 0 && searchTerm.length !== 0) return (<p>No hits</p>)

    const displayedList = (searchedComponents.length !== 0 && searchTerm.length !== 0) ? searchedComponents : allComponents.map(comp => ({item: comp}))

    const paginatedPackages = displayedList.slice(displayOffset, displayOffset + componentsPerPage)

    const handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * componentsPerPage);
        dispatch(setDisplayOffset(offset))
    };

    return (
        <>
            <ul className="package-list" style={{ listStyleType: "none" }}>
                {paginatedPackages.map((p, i) => <li key={i} style={style.item}>
                    <div className="pure-g" style={packageBoxStyle}>
                        <div className="pure-u-1" style={headerBoxStyle}>
                            <Link style={packageHeaderStyle} to={{
                                pathname: "/scp-website/packageinfo",
                                packageName: packages[p.item.packageIndex].package.name
                            }}><h3 style={{ display: 'inline' }}>{p.item.name} - {packages[p.item.packageIndex].package.name}</h3></Link> <Link style={packageHeaderStyle.links} target="_blank" to={{ pathname: packages[p.item.packageIndex].package.links.npm }}><img alt="NPM" src={process.env.PUBLIC_URL + '/img/npm-logo-red-32px.png'} /></Link>
                            <Link style={packageHeaderStyle.links} target="_blank" to={{ pathname: packages[p.item.packageIndex].package.links.repository }}><img alt="Repository" src={process.env.PUBLIC_URL + '/img/GitHub-Mark-32px.png'} /></Link>
                        </div>
                        <div className="pure-u-1">
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

                </li>)}
            </ul>
            <div id="react-paginate" className="center"><ReactPaginate
                pageCount={Math.ceil(displayedList.length / componentsPerPage)}
                previousLabel={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
                nextLabel={<FontAwesomeIcon icon={faAngleDoubleRight} />}
                onPageChange={handlePageClick}
                breakClassName={'break-me'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'} /></div>
        </>
    )
}

export default ComponentList