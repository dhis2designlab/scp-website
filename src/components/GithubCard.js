import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import 'purecss/build/pure.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'

const githubCardStyle = {
    link: {
        color: 'inherit',
    }
}

const GithubCard = (props) => {
    const [state, setState] = useState({
        isLoaded: false,
        item: null,
        username: props.username,
        error: null,
        size: props.avatarSize,
        status: null,
    });

    useEffect(() => {
        let isCancelled = false;
        (async () => {
            let result;
            try {
                const response = await fetch(`https://api.github.com/users/${state.username}`);

                result = await response.json();
                !isCancelled && setState((oldState) => ({
                    ...oldState,
                    isLoaded: true,
                    status: response.status,
                    item: result,
                }));
            } catch (error) {
                !isCancelled && setState((oldState) => ({
                    ...oldState,
                    isLoaded: true,
                    error
                }));
            }
        })();
        return () => {
            isCancelled = true;
        };
    }, [state.username]);

    const { error, isLoaded, item, size, status } = state;

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <a href={item.html_url} target="_blank" rel="noopener noreferrer" style={githubCardStyle.link}>
                    {status === 404 || 403 ? <FontAwesomeIcon icon={faUserAlt} />
                        : <img data-tip={item.login} alt="github avatar" style={size} src={item.avatar_url} />}
                </a>
                <ReactTooltip />
            </>
        )
    }
}

export default GithubCard;