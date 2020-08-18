import React from 'react';
import ReactTooltip from 'react-tooltip';

class GithubCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            item: null,
            username: this.props.username,
            error: null,
            size: props.avatarSize,
        }
    }

    async componentDidMount() {
        let result;
        try {
            const response = await fetch(`https://api.github.com/users/${this.state.username}`);
            result = await response.json();
            this.setState({
                isLoaded: true,
                item: result,
            });
        } catch (error) {
            this.setState({
                isLoaded: true,
                error
            });
        }
    }

    render() {
        const { error, isLoaded, item, size } = this.state;

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
}

export default GithubCard;