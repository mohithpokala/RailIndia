
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import { useParams } from 'react-router';
import '../CSS/Match.css'
import '../CSS/rotateimage.css'
import {port} from './port';
    
const ViewPassenger = (props) => {
    const [passenger_data,setPassenger] = useState([]);
    const [token,setToken]=useState(localStorage.getItem("token"));
    
    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }
    console.log(useParams().booking_id);
    const booking_id = useParams().pnr;
    console.log(booking_id); 
    useEffect(() => {
        setTimeout(() => {              
            const jsonData={"token":token};
            console.log(jsonData);
            fetch("http://localhost:" + port + "/get_passenger/"+booking_id,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            console.log(json);
                            setPassenger(json)
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
    return (
        <>
            {
            
                (
                    <React.Fragment>
                        <div style={{position:"absolute",width:"100%",height:"90%"}}>
             

                        <table>
                    <tr>
                        <td><b>Pasenger Name</b></td>
                        <td><b>Seat No</b></td>
                        <td><b>Waiting List Pref No</b></td>
                        <td><b>Gender</b></td>
                        <td><b>Age</b></td>
                    </tr>
                    {
                        passenger_data.map((row) => (
                            <tr>
                                <td><b>{row.name}</b></td>
                                <td>{row.seat_no}</td>
                                <td>{row.waiting_pref_no}</td>
                                <td>{row.age}</td>
                                <td>{row.sex}</td>
                            </tr>
                        ))
                    }
                    
                </table>
                        </div>

                    </React.Fragment>
                )
            }
        </>);
}

export default ViewPassenger;
