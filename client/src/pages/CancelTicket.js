
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
    const [booking_status, setBookingStatus] = useState("none");
    const [message, setMessage] = useState("");

    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
      }

    var jsonData = {"token" : token};

    let loadBookings = async () => {
        let data2 = [];
        jsonData = {
            "token" : token,
            "user_id" : localStorage.getItem("user_id")
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
        }, 0);
    },[]);

    let handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            if(bookingID == "")
            {
                setBookingStatus("error");
                setMessage("Please fill all the fields");
                return;
            }
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
                    setBookingStatus("success");
                    setMessage("Successfully cancelled booking ID " + bookingID);
                  }
                  else{
                    // setToken("");
                    localStorage.setItem("token","");
                    window.location="/login";
                }
                } 
            );
    
        } catch (err) {
            setBookingStatus("error");
            setMessage("There was some error while processing the request");
          console.error(err.message);
        }
    }
    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
        <Fragment>
            <div class="container">
                <div className="row">
                    <h3>Cancel tickets</h3>
                </div>
                <br></br>
                {
                    (booking_status == "success") ?
                    <div className = "row alert alert-success"> {message} </div>
                    :
                    <></>
                }
                {
                    (booking_status == "error") ?
                    <div className='row alert alert-danger'> {message} </div>
                    :
                    <></>
                }
                <div className="home_page">
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
        </div>
      </Fragment>
    )

}
export default CancelTicket;
