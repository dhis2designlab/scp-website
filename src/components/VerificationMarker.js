import React from 'react'
import '../stylesheets/verification-marker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const versionStyle = {
    fontSize: '16px',
    paddingBottom: 0
}

const verifiedStyle = {
    color: 'green'
}

const nonVerifiedStyle = {
    color: 'gray'
}

const VerificationMarker = (props) => {

    const { verifiedVersion, p } = props;

    //TODO account for several verified packages
    //check if package is verified
    if (verifiedVersion) {
        //Atleast one version of the package is verified
        if (verifiedVersion === p.version) {
            //The current version is verified
            return (
                <div>
                    <p className="version" style={versionStyle}><FontAwesomeIcon style={verifiedStyle} icon={faCircle} className="fa-xs" /> {verifiedVersion}</p>
                </div>
            )
        } else if (verifiedVersion < p.version) {
            return (
                <div>
                    <div>
                        <p className="version" style={versionStyle}><FontAwesomeIcon style={nonVerifiedStyle} icon={faCircle} className="fa-xs" /> {p.version}</p>
                    </div>
                    <div>
                        <p className="version" style={versionStyle}><FontAwesomeIcon style={verifiedStyle} icon={faCircle} className="fa-xs" /> {verifiedVersion}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <p className="version" style={versionStyle}><FontAwesomeIcon style={verifiedStyle} icon={faCircle} className="fa-xs" /> {verifiedVersion}</p>
                    </div>
                    <div>
                        <p className="version" style={versionStyle}><FontAwesomeIcon style={nonVerifiedStyle} icon={faCircle} className="fa-xs" /> {p.version}</p>
                    </div>
                </div>
            )
        }
    } else {
        //Package is not verified
        return (
            <div>
                <p className="version" style={versionStyle}><span className="dot-grey"></span> {p.version}</p>
            </div>
        )
    }
}

export default VerificationMarker