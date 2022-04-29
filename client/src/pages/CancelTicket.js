
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
    const [token, setToken]=useState(localStorage.getItem("token"));
    const [userBookings, setUserBookings] = useState([]);
    let selected = null;

    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
      }

    var jsonData = {"token" : token};

    let loadBookings = async () => {
        let data2 = [];
        jsonData = {
            "token" : token,
            "user_id" : localStorage.getItem("username")
        }
        fetch("http://localhost:" + port + "/bookings/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
        })
            .then((res) => res.json())
            .then(
                (json) => {
                    if(!(json.hasOwnProperty('token') )){
                    for(var i = 0; i < json.length; i++){ 
                        data2.push({
                            "value":json[i]["booking_id"] ,
                            "label":json[i]["booking_id"]});
                    } 
                }
                else{
                    setToken("");
                    window.location="/login";
                }
                } 
            );
        setUserBookings(data2);
    }
   
    useEffect(() => {
        setTimeout(() => {
            loadBookings();
        }, 1000);
    },[]);

    let handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            var jsonData = {
            "bid" : bookingID,
            "token":token
            };
            const response = await fetch("http://localhost:" + port + "/cancel_tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData)
            }).then((res) => res.json())
            .then(
                (json) => {
                  if(!(json.hasOwnProperty('token') )){
                    const res = json;
                    setBookingID("");
                    selected = null;
                    setUserBookings([]);
                    loadBookings();
                  }
                  else{
                    // setToken("");
                    localStorage.setItem("token","");
                    window.location="/login";
                }
                } 
            );
    
        } catch (err) {
          console.error(err.message);
        }
    }
    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
        <Fragment>
            <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"20%"}}>
                <h4 style={{width:"100%",textAlign:"center"}}>Cancel your ticket :(</h4><br></br><br></br>
                <Form  onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Booking ID</Form.Label>
                        <Select type="number" 
                                        placeholder="Enter booking ID/PNR"
                                        options={ userBookings }
                                        onChange={e => {
                                           setBookingID(e.value);
                                            selected = e.value;
                                    
                                        }}
                        >{ selected || "" }</Select>
                    </Form.Group>
                    <br></br>
                <div className="row button-section">
                  
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
