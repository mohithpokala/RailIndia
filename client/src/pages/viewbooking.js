
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';

import '../CSS/Match.css'
import '../CSS/rotateimage.css'
import {port} from './port';
    
const ViewBooking = (props) => {
    const [booking_data,setBooking] = useState([]);
    const [token,setToken]=useState(localStorage.getItem("token"));
    
    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }
    useEffect(() => {
        setTimeout(() => {              
            const jsonData={"token":token,"user_id":localStorage.getItem("username")};
            fetch("http://localhost:" + port + "/view_booking",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            setBooking(json)
                        }
                        else{
                            // setToken("");
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                        
                    } 
                );
        }, );
    },[token] );
    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
  
        !(booking_data) 
? 
    (
        <></>
    ) 
: 
    (
                    <React.Fragment>
                        <div style={{position:"absolute",width:"100%",height:"90%"}}>

                        <table>
                    <tr>
                    
                        <td><b>Booking ID</b></td>
                        <td><b>Train No</b></td>
                        <td><b>Train Name</b></td>
                        <td><b>Start Station</b></td>
                        <td><b>End Station</b></td>
                        <td><b>Journey Date</b></td>
                    </tr>
                    {
                        booking_data.map((row) => (
                            <tr>
                                <td><b><a href={"/view_passenger/"+row.booking_id} >{row.booking_id}</a></b></td>
                                <td>{row.train_no}</td>
                                <td>{row.train_name}</td>
                                <td>{row.a}</td>
                                <td>{row.b}</td>
                                <td>{row.journey_date}</td>
                            </tr>
                        ))
                    }
                    
                </table>
                        </div>

                    </React.Fragment>
                    )
                    );
                };
export default ViewBooking;
