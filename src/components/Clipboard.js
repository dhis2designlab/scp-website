import React from 'react';
import ReactTooltip from 'react-tooltip';


const clipboardStyle = {
    resize: "none",
    width: "70%",
    borderRadius: "5px",
    paddingTop: "15px",
    paddingLeft: "15px",
}


class Clipboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copySuccess: false,
            value: '',
            hovered: false,
        }
    }

    copyTextToClipboard = () => {
        const element = this.textArea;
        element.select();
        document.execCommand("copy");
        this.setState({ copySuccess: true });
    }

    changeBackground = (e) => {
        if (!this.state.hovered) {
            e.target.style.background = '#dbffdb';
            e.target.style.border = '1px solid #00c642'
            this.setState({ hovered: true });
        } else {
            e.target.style.background = '';
            e.target.style.border = '';
            this.setState({ hovered: false });
        }

    }

    render() {
        return (
            <>
                <div>
                    <textarea data-tip="Click to copy command to clipboard" style={clipboardStyle} readOnly value={this.props.value}
                        onMouseOver={(e) => this.changeBackground(e)}
                        onMouseLeave={(e) => this.changeBackground(e)}
                        onClick={() => this.copyTextToClipboard()}
                        ref={(textarea) => this.textArea = textarea}
                    /> <ReactTooltip />
                </div>
            </>
        )
    }

}

export default Clipboard;



