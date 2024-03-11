import { useLocation, useNavigate } from 'react-router-dom';
import {Accordion, AccordionSummary,AccordionDetails, IconButton} from '@mui/material';
import { ExpandMore, ArrowBack } from '@mui/icons-material';

import "./artDetail.css"

const ArtDetail = () => {
    const navigate = useNavigate();

    //retrive data which is passed while redirection
    const location = useLocation();
    const item: art = location.state;

    return <>
        <div className='detail-header'>
            <IconButton onClick={() => { navigate(-1); }} aria-label='go-back-button' size="large"><ArrowBack style={{ fontWeight: 'bold', color: "white" }} fontSize="inherit" color='primary' /></IconButton>
            <h2>{item.title}</h2>
        </div>
        <div className='detail-body'>
            <img className='detail-img' src={item.thubnail}></img>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Artist Display
                </AccordionSummary>
                <AccordionDetails>
                    {item.artist_display}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    Date Display
                </AccordionSummary>
                <AccordionDetails>
                    {item.date_display}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Reference Number
                </AccordionSummary>
                <AccordionDetails>
                    {item.main_reference_number}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel4-content"
                    id="panel4-header"
                >
                    Dimension Details
                </AccordionSummary>
                <AccordionDetails>
                    {item.dimensions}
                </AccordionDetails>
            </Accordion>
        </div>

    </>
}

export default ArtDetail;