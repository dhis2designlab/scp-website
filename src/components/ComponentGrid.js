import React from 'react'
import 'purecss/build/pure.css';
import ComponentCard from './ComponentCard'
import '../stylesheets/component-grid.css'

const ComponentGrid = props => {
    const {packages} = props

    //TODO make sure that max 9 packages exist in the array. Do this in the pagination feature
    return (
        <div className="grid-wrapper pure-g">
            {packages.map((p, i) => 
                <div key={i} className="grid-item-wrapper pure-u-1 pure-u-lg-1-2 pure-u-xl-1-3">
                    <ComponentCard  className="grid-item l-box" p={p} key={i}/>
                </div>
            )}
        </div>
    )
}

export default ComponentGrid