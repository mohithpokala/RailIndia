
import React, {Fragment, useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';
import { port } from './port'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Select from 'react-select';

const CancelTicket = (props) => {
    const [bookingID, setBookingID] = useState(false);
    let handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            var jsonData = {
            "bid" : bookingID
            };
            console.log(jsonData);
            const response = await fetch("http://localhost:" + port + "/cancel_tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData)
            });
            const res = response.json();
    
        } catch (err) {
          console.error(err.message);
        }
    }
    return (
        <Fragment>
            <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"20%"}}>
                <h4 style={{width:"100%",textAlign:"center"}}>Cancel your ticket :(</h4><br></br><br></br>
                <Form  onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Booking ID</Form.Label>
                        <Form.Control type="number" 
                                        placeholder="Enter booking ID/PNR" value={bookingID}
                                        onChange={e => {
                                            setBookingID(e.target.value);
                                        }} 
                                        default="" />
                    </Form.Group>
                    
                <div className="row button-section">
                    <br></br>
                <div class="col">
                    <Button variant="primary" type="submit">
                        Cancel Ticket
                    </Button>
                </div>
                </div>
            </Form>
        </div>
      </Fragment>
    )

}
export default CancelTicket;
