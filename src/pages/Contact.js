import React from 'react';
import 'purecss/build/pure.css'

const informationStyle = {
    padding: '15px 15px 15px 0',
    img: {
        width: '100px',
        marginLeft: '25px'
    },
    title: {
        margin: '15px 0 15px 0'
    }
}


const Contact = () => {
    return (
        <>
            <div className="pure-g content">
                <div className="pure-u-1-1 pure-u-md-4-5">
                    <div className="l-box">
                        <p>This project is part of the larger research project the DHIS2 Design Lab within HISP UiO.</p>
                        <div className="pure-g design-lab" style={informationStyle}>
                            <div className="pure-u-1" style={informationStyle.title}><h3>DHIS2 Design Lab</h3></div>
                            <div className="pure-u-3-5 pure-u-md-4-5 pure-u-lg-4-5">
                                <p>The DHIS2 Design Lab explores how we within the DHIS2 software ecosystem can
                                facilitate and promote the design and innovation of tools that are usable
                                and provide value to the work of end-users. The knowledge generated through
                                our work is also relevant to research on design and innovation within generic
                                       enterprise software ecosystems more generally.</p>
                                <p><a target="_blank" rel="noopener noreferrer" href="https://www.mn.uio.no/ifi/english/research/networks/hisp/dhis2-design-lab/">Read more..</a></p>
                            </div>
                            <div className="pure-u-2-5 pure-u-md-1-5 pure-u-lg-1-5">
                                <img alt="dhis2 design lab" style={informationStyle.img} src={process.env.PUBLIC_URL + '/img/dhis2-design-lab-logo.png'} />
                            </div>
                        </div>
                        <div className="pure-g hisp" style={informationStyle}>
                            <div className="pure-u-1" style={informationStyle.title}> <h3>Health Information Systems Programme (HISP)</h3></div>
                            <div className="pure-u-4-5">
                                <p>HISP is a global movement to strengthen Health Information Systems in Developing
                                countries that started in South Africa in the 1990s. HISP at UiO is one of the
                                leading organisations in this movement and our contribution includes in-country
                                capacity building and implementation support, research, a PhD program, and hosting
                                        the core DHIS2 software development team.</p>
                                <p><a target="_blank" rel="noopener noreferrer" href="https://www.mn.uio.no/ifi/english/research/networks/hisp/management-team.html">Read more..</a></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;