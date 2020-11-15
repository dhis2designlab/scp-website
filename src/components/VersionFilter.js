import React, { useState } from 'react'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import FormCheck from 'react-bootstrap/FormCheck'
import semver from 'semver'
import '../stylesheets/version-filter.css'

const versionStyle = {
    position:"relative"
}

const componentNumberStyle = {
    position:"absolute",
    right:"15px",
    opacity: "0.5"
}

// from https://react-bootstrap.github.io/components/dropdowns/
const CustomMenu = React.forwardRef(
({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
    <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
    >
        <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
        />
        <ul className="list-unstyled menuScroll" >
        {React.Children.toArray(children).filter(
            (child) =>
            !value || child.props.version.toLowerCase().startsWith(value),
        )}
        </ul>
    </div>
    );
},
);

const CheckElement = React.forwardRef(
    ({ className, version, handleDhis2Version, dhis2Versions, compWithVersion }, ref) => {
        return (
            <FormCheck 
                ref={ref}
                id={`check-${version}`}
                inline={true} 
                className={className}
                type="checkbox"
                checked={dhis2Versions.indexOf(version) !== -1}
            >
                <FormCheck.Input
                    type="checkbox"
                    onChange={() => handleDhis2Version(version)}

                />
                <FormCheck.Label style={{width: '100%', cursor: 'pointer'}}>
                    <div style={versionStyle}>{version} <span style={componentNumberStyle}>({compWithVersion})</span></div>
                </FormCheck.Label>
            </FormCheck>
        );
    },
);

const VersionFilter = ({allDhis2Versions, dhis2Versions, handleDhis2Version, dhis2VersionsById}) => {
    return(
        <Dropdown className="mr-1 dropdown-button">
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                DHIS2 Version
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
                {allDhis2Versions.sort(semver.rcompare).map(item => (
                    <Dropdown.Item 
                        as={CheckElement} 
                        version={item} key={item} 
                        handleDhis2Version={handleDhis2Version} 
                        dhis2Versions={dhis2Versions}
                        compWithVersion={dhis2VersionsById[item]}
                    />
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default VersionFilter