import React from 'react';
import SearchField from '../components/SearchField'
import 'purecss/build/pure.css'
import '../stylesheets/landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';


const landingStyle = {
    searchBox: {
        width: 'calc(100% - 40px)',
        maxWidth: '620px',
    },
    box: {
        width: '100%',
        height: 'calc(90vh - 80px)',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Rubik',
        letterSpacing: '-2px'
    },
    titleText: {
        margin: '0',
        marginBottom: '10px'
    },
    description: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.7)',
        marginBottom: '40px',
        fontWeight: '400',
        fontStyle: 'normal',
        fontFamily: 'Rubik',
    },
    content : {
        marginLeft: '0'
    }
}


const Landing = () => {
    const history = useHistory();
    useEffect(() => {
        document.body.className = 'landing';
        return () => {
            document.body.classList.remove('landing');
        }
    }, [])
    
    return (
        <div className="pure-g" style={landingStyle.content}>
            <div className="pure-u-1 center" style={landingStyle.box}>
                <div style={landingStyle.searchBox}>
                    <div className="landing-title" style={landingStyle.title}>
                        <h1 style={landingStyle.titleText}>Component Search</h1>
                    </div>
                    <div className="description" style={landingStyle.description}>
                        <p>Explore components created by the HISP community
                        </p>
                    </div>
                    <SearchField searchButtonText={<FontAwesomeIcon icon={faSearch} />} navigateTo={() => history.push("/scp-website/search")} />
                </div>
            </div>
        </div>
    );
}

export default Landing;