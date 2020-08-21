import React, { useEffect } from 'react';
import SearchField from '../components/SearchField'
import 'purecss/build/pure.css'
import '../stylesheets/landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { getPackages } from '../actions/npms'
import { useHistory } from 'react-router-dom'


const landingStyle = {
    searchBox: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '20%',
        padding: '20px',
        textAlign: 'center',
    }
}

const searchFieldStyle = {
    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    button: {
        height: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
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
        history.push("/")
    }
    return (
        <div className="landing" style={landingStyle.page}>
            <div className="pure-g-r content">
                <div className="search-box l-box" style={landingStyle.searchBox}>
                    <SearchField style={searchFieldStyle} searchButtonText={<FontAwesomeIcon icon={faSearch}/>} onSearch={onSearch}/>
                </div>
            </div>
        </div>
    );
}

export default Landing;