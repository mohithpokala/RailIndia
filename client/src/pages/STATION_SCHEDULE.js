
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import "../CSS/Card.css";
import { Card } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { port } from './port';

const STATION_SCHEDULE = (props) => {
    const [scheduled,setScheduled] = useState(false);
    var station_name1 = useParams().booking_id;
    var station_name2 = props.station_name;
    const station_name = station_name1?station_name1:station_name2;
    console.log(station_name);
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [station_data,setStationData]=useState(false);
    
    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }
    useEffect(() => {
        setTimeout(() => {
            const jsonData={"token":token};
            fetch("http://localhost:" + port + "/station/schedule/"+station_name+"/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                        setScheduled(json);
                        }
                        else{
                            // setToken("");
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                    } 
                );
        }, 0);
    },[] );
    
    useEffect(() => {
        const jsonData={"token":token};
        const temp1=  fetch("http://localhost:" + port + "/get_station_info/"+station_name,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(jsonData)
        })
        .then((res) => res.json())
        .then((json) => {
            if(!(json.hasOwnProperty('token') )){
                setStationData(json);
            }
            else{
                //setToken("");
                localStorage.setItem("token","");
                window.location="/login";
            }
        });
    },[token] );

    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
        <>
        {
            !(station_data && scheduled && !((token==null)||(token=="")||(token=="No Token"))) 
            ? 
                (
                    <></>
                ) 
            : 
            (
                <React.Fragment>
                    <div class="container">
                        <div className="row">
                            <h3>Station Schedule</h3>
                        </div>
                        <br></br>
                        <div class="col-4 container justify-content-center text-center">
                            <h3 class="alert alert-info">{station_data[0]["station_name"]} ({station_data[0]["station_id"]})</h3>
                            <h5 class="alert alert-secondary">Number of Trains = {scheduled.length} </h5>
                            <h5>Location: [{station_data[0]["x"]} , {station_data[0]["y"]}]</h5>
                        </div>
                        <div class="col-8 container justify-content-center text-center">
                        <br></br>
                            <table class="table table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col">Train Number</th>
                                        <th scope="col">Train Name</th>
                                        <th scope="col">Expected Arrival Time</th>
                                        <th scope="col">Expected Departure Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    scheduled.map((row) => (
                                        <tr>
                                            <td><a href={"/train_schedule/"+row.train_no} class="primary-text"><b>{row.train_no}</b></a></td>
                                            <td>{row.train_name}</td>
                                            <td>{row.expected_arrival_time}</td>
                                            <td>{row.expected_departure_time}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </React.Fragment>
    )}</>
  );
  
}
export default STATION_SCHEDULE;
