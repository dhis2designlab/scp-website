import React from 'react'
import '../stylesheets/component.css'

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
                    <p className="version"><span className="dot-green"></span> {verifiedVersion}</p>
                </div>
            )
        } else if (verifiedVersion < p.version) {
            return (
                <div>
                    <div>
                        <p className="version"><span className="dot-grey"></span> {p.version}</p>
                    </div>
                    <div>
                        <p className="version"><span className="dot-green"></span> {verifiedVersion}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <p className="version"><span className="dot-green"></span> {verifiedVersion}</p>
                    </div>
                    <div>
                        <p className="version"><span className="dot-grey"></span> {p.version}</p>
                    </div>
                </div>
            )
        }
    } else {
        //Package is not verified
        return (
            <div>
                <p className="version"><span className="dot-grey"></span> {p.version}</p>
            </div>
        )
    }
}

export default VerificationMarker