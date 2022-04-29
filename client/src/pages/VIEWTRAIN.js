
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import "../CSS/Card.css";
import { Card } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { port } from './port';

const VIEWTRAIN = (props) => {
    const [token,setToken]=useState(localStorage.getItem("token"));
    const booking_id=useParams().booking_id;
    const [passenger_data,setPassenger] = useState([]);
    
    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }
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

    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
        <>
        {
            !(passenger_data && !((token==null)||(token=="")||(token=="No Token"))) 
            ? 
                (
                    <></>
                ) 
            : 
            (
                <React.Fragment>
                    <div style={{position:"absolute",width:"100%",top:"25%",left:"0%",height:"100%",}}>
                    <table>
                    <tr>
                        <td><b>Pasenger Name</b></td>
                        <td><b>Waiting List Pref No</b></td>
                        <td><b>Gender</b></td>
                        <td><b>Age</b></td>
                    </tr>
                    {
                        passenger_data.map((row) => (
                            <tr>
                                <td><b>{row.name}</b></td>
                                <td>{row.waiting_pref_no}</td>
                                <td>{row.age}</td>
                                <td>{row.sex}</td>
                            </tr>
                        ))
                    }
                    
                </table>

                    </div>
                </React.Fragment>
    )}</>
  );
  
}
export default VIEWTRAIN;
