import React from 'react'

const PackageList = ({packages}) => {
    if(packages === null) return (<p>Fetching packages...</p>)

    return(
        <ul>
            {packages.map(p => <li key={p.package.name}>{p.package.name}</li>)}
        </ul>
    )
}

export default PackageList