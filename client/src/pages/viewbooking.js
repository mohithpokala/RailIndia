
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
            let data1 = [];
            console.log(jsonData);
            fetch("http://localhost:" + port + "/view_booking",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            console.log(json);
                            for(var i=0;i<json.length;i++){ 
                                 console.log(json[i]["booking_id"]);
                                data1.push({
                                    "booking_id":json[i]["booking_id"],
                                    "train_no":json[i]["train_no"],
                                    "start_station":json[i]["start_station"],
                                    "end_station":json[i]["end_station"],
                                    "journey_date":json[i]["journey_date"],
                                });
                                
                            } 
                        }
                        else{
                            // setToken("");
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                        
                    } 
                );
            setBooking(data1);
            console.log(data1);
        }, );
    },[token] );
    console.log(booking_data);
    const [map_booking, set_Booking] = React.useState(booking_data);
    console.log(map_booking);
    return (
        <>
            {
            
                (
                    <React.Fragment>
                        <div style={{position:"absolute",width:"100%",height:"90%"}}>
             

                        <table>
                    <tr>
                        <td><b>Booking ID</b></td>
                        {/* <td><b>Train No</b></td>
                        <td><b>Start Station</b></td>
                        <td><b>End Station</b></td>
                        <td><b>Journey Date</b></td> */}
                    </tr>
                    {booking_data.map((item) => (
                        <tr key={item.booking_id}>
                        {Object.values(item).map((val) => (
                                console.log(val),
                                <td>{val}</td>
                                ))}
                        </tr>
                        )
                    )
                    }
                </table>
                        </div>

                    </React.Fragment>
                )
            }
        </>);
}

export default ViewBooking;
