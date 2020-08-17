import React from 'react'
import { Link } from 'react-router-dom'

const PackageList = ({packages}) => {
    if(packages === null) return (<p>Search for packages for them to be displayed here</p>)

    return(
        <ul>
            {packages.map(p => <li key={p.package.name}>
                <Link to={{
                    pathname: "/packageinfo",
                    packageName: p.package.name
                }}>{p.package.name}</Link></li>)}
        </ul>
    )
}

export default PackageList