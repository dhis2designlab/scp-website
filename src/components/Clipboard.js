import React, { useState, useRef } from 'react';
import ReactTooltip from 'react-tooltip';


const clipboardStyle = {
    resize: "none",
    width: "70%",
    borderRadius: "5px",
    paddingTop: "15px",
    paddingLeft: "15px",
}

const Clipboard = (props) => {
    const [state, setState] = useState({
        copySuccess: false,
        value: '',
        hovered: false,
    });

    let textArea = useRef(null);

    const copyTextToClipboard = () => {
        textArea.select();
        document.execCommand("copy");
        setState((oldState) => ({ copySuccess: true }));
    }

    const changeBackground = (e) => {
        if (!state.hovered) {
            e.target.style.background = '#dbffdb';
            e.target.style.border = '1px solid #00c642'
            setState((oldState) => ({ hovered: true }));
        } else {
            e.target.style.background = '';
            e.target.style.border = '';
            setState((oldState) => ({ hovered: false }));
        }
    }

    return (
        <>
            <div>
                <textarea data-tip="Click to copy command to clipboard" style={clipboardStyle} readOnly value={props.value}
                    onMouseOver={(e) => changeBackground(e)}
                    onMouseLeave={(e) => changeBackground(e)}
                    onClick={() => copyTextToClipboard()}
                    ref={(textarea) => textArea = textarea}
                /> <ReactTooltip />
            </div>
        </>
    )
}

export default Clipboard;



