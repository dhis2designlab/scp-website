import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

const GithubCard = (props) => {
    const [state, setState] = useState({
        isLoaded: false,
        item: null,
        username: props.username,
        error: null,
        size: props.avatarSize,
    });

    useEffect(() => {
        (async () => {
            let result;
            try {
                const response = await fetch(`https://api.github.com/users/${state.username}`);
                result = await response.json();
                setState((oldState) => ({
                    ...oldState,
                    isLoaded: true,
                    item: result,
                }));
            } catch (error) {
                setState((oldState) => ({
                    ...oldState,
                    isLoaded: true,
                    error
                }));
            }
        })();
    }, [state.username]);

    const { error, isLoaded, item, size } = state;

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <a href={item.html_url} target="_blank" rel="noopener noreferrer"><img data-tip={item.login} alt="github avatar" style={size} src={item.avatar_url} /></a><ReactTooltip />
            </>
        )
    }
}

export default GithubCard;