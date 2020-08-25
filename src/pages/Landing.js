import React from 'react';
import SearchField from '../components/SearchField'
import 'purecss/build/pure.css'
import '../stylesheets/landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { getPackages } from '../actions/npms'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';


const landingStyle = {
    searchBox: {
        width: 'calc(100% - 40px)',
        maxWidth: '620px',
    },
    box: {
        width: '100%',
        height: 'calc(65vh - 80px)',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: '15px',
        textAlign: 'center',
        color: 'white'
    },
    description: {
        textAlign: 'justify',
        color: 'rgba(255,255,255,0.7)',
        marginBottom: '30px',
        fontWeight: '400',
        fontStyle: 'normal'
    }
}


const Landing = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        document.body.className = 'landing';
        return () => {
            document.body.classList.remove('landing');
        }
    }, [])

    const onSearch = (inputValue) => {
        console.log(inputValue)
        dispatch(getPackages(inputValue))
        history.push("/scp-website/search")
    }
    return (
        <div className="pure-g-r content">
            <div className="pure-u-1 center" style={landingStyle.box}>
                <div style={landingStyle.searchBox}>
                    <div className="title" style={landingStyle.title}>
                        <h1>scp-website</h1>
                    </div>
                    <div className="description" style={landingStyle.description}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida interdum arcu. Nullam congue turpis tristique, mollis augue vitae, aliquet velit. Aenean aliquam mattis dapibus. Vivamus vel tempus enim, eget ullamcorper enim. Fusce vulputate sapien quis sapien bibendum sagittis.
                        </p>
                    </div>
                    <SearchField searchButtonText={<FontAwesomeIcon icon={faSearch} />} onSearch={onSearch} />
                </div>
            </div>
        </div>
    );
}

export default Landing;