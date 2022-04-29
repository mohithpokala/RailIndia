
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import { useParams } from 'react-router';
import '../CSS/Match.css'
import '../CSS/rotateimage.css'
import {port} from './port';
    
const ViewBooking = (props) => {
    const [booking_data,setBooking] = useState([]);
    const [token,setToken]=useState(localStorage.getItem("token"));
    console.log(useParams().rank);
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
                        <div class="col-8 container justify-content-center text-center">
                        <br></br>
                            <table class="table table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col">Booking ID</th>
                                        <th scope="col">Train No</th>
                                        <th scope="col">Train Name</th>
                                        <th scope="col">Start Station</th>
                                        <th scope="col">End Station</th>
                                        <th scope="col">Journey Date</th>


                                    </tr>
                                </thead>
                                <tbody>
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
                                </tbody>
                            </table>

                        </div>

                    </React.Fragment>
                    )
                    );
                };
export default ViewBooking;
