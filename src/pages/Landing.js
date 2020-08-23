import React from 'react';
import SearchField from '../components/SearchField'
import 'purecss/build/pure.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { getPackages } from '../actions/npms'
import { useHistory } from 'react-router-dom'


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
        alignItems: 'center'
    }
}


const Landing = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onSearch = (inputValue) => {
        console.log(inputValue)
        dispatch(getPackages(inputValue))
        history.push("/")
    }
    return (
        <div className="pure-g-r content">
            <div class="pure-u-1 center" style={landingStyle.box}>
                <div style={landingStyle.searchBox}>
                    <SearchField searchButtonText={<FontAwesomeIcon icon={faSearch} />} onSearch={onSearch} />
                </div>
            </div>
        </div>
    );
}

export default Landing;