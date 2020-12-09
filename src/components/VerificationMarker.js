import React from 'react'
import '../stylesheets/verification-marker.css'
import semver from 'semver'
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

    const { verifiedArray, p } = props;
    
    //check if package is verified
    if (verifiedArray) {
        //Atleast one version of the package is verified
        const newestVerifiedVersion = verifiedArray.sort(semver.rcompare)[0]

        if (newestVerifiedVersion === p.version) {
            //If the newest version is verified, only show that version.
            return (
                <div>
                    <p className="version" style={versionStyle}><FontAwesomeIcon style={verifiedStyle} icon={faCircle} className="fa-xs" /> {newestVerifiedVersion}</p>
                </div>
            )
        } else if (newestVerifiedVersion < p.version) {
            //If the newest version is not verified, show the newest version on top, and the newest verified version below.
            return (
                <div>
                    <div>
                        <p className="version" style={versionStyle}><FontAwesomeIcon style={nonVerifiedStyle} icon={faCircle} className="fa-xs" /> {p.version}</p>
                    </div>
                    <div>
                        <p className="version" style={versionStyle}><FontAwesomeIcon style={verifiedStyle} icon={faCircle} className="fa-xs" /> {newestVerifiedVersion}</p>
                    </div>
                </div>
            )
        } else {
            //If the newest verified version is newer than the actual published version. Don't know if this can actually happen?
            return (
                <div>
                    <div>
                        <p className="version" style={versionStyle}><FontAwesomeIcon style={verifiedStyle} icon={faCircle} className="fa-xs" /> {newestVerifiedVersion}</p>
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
                <p className="version" style={versionStyle}><FontAwesomeIcon style={nonVerifiedStyle} icon={faCircle} className="fa-xs" /> {p.version}</p>
            </div>
        )
    }
}

export default VerificationMarker