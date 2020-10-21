import React, { useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

const loaderStyle = {
    box: {
        width: '100%',
        height: 'calc(90vh - 80px)',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
}

const Loader = () => {
    useEffect(() => {
        if(window.location.pathname === '/scp-website') document.body.className = 'landing';
        return () => {
            document.body.classList.remove('landing');
        }
    }, [])

    return (
        <div style={ loaderStyle.box }>
            <Spinner animation="border" role="status" >
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader