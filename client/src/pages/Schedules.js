
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import "../CSS/Card.css";
import { Card } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { port } from './port';
import Toggle from 'react-bootstrap-toggle';
import Schedule_on_map from './Schedule_on_map';
import Select from 'react-select';

const TRAIN_SCHEDULE = (props) => {
    const [scheduled,setScheduled] = useState(false);
    var train_no1 = useParams().train_no;
    var train_no2 = props.train_no;
    const train_no = train_no1?train_no1:train_no2;
    console.log(train_no);

    const [token,setToken]=useState(localStorage.getItem("token"));    
    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }

    const [trainname,setTrainName] = useState("");
    const [capacity,setCapacity]=useState("");
    const [numstations,setNum] = useState("");
    const [from,setFrom] = useState("");
    const [to,setTo] = useState("");
    const [x,setX] = useState(0);


    useEffect(() => {
        const jsonData={"token":token};
    const temp1=  fetch("http://localhost:" + port + "/get_train_info/"+train_no,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(jsonData)
        })
        .then((res) => res.json())
        .then((json) => {
            if(!(json.hasOwnProperty('token') )){
                setTrainName(json[0]["train_name"]);
                setCapacity(json[0]["capacity"]);
                setNum(json[0]["num_stations"]);
                setFrom(json[0]["source_id"]);
                setTo(json[0]["dest_id"]);
            }
            else{
                //setToken("");
                localStorage.setItem("token","");
                window.location="/login";
            }
        });
    },[token] );


    useEffect(() => {
        const jsonData={"token":token};
    const temp1=  fetch("http://localhost:" + port + "/train/schedule/"+train_no+"/",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(jsonData)
        })
        .then((res) => res.json())
        .then((json) => {
            if(!(json.hasOwnProperty('token') )){
                setScheduled(json);
                
            }
            else{
                //setToken("");
                localStorage.setItem("token","");
                window.location="/login";
            }
        });
    },[token] );
    if( !((token==null)||(token=="")||(token=="No Token")))
    return(
          
        !(scheduled && train_no!="abcd" && trainname) 
? 
    (
        <></>
    ) 
: 
    (
        <div class="container">
            <React.Fragment>
                <div class="col-4 container justify-content-center text-center">
            
                    <h3 class="alert alert-info">{trainname}({train_no})</h3>
                    <h5 class="alert alert-secondary">From {from} to {to} through {numstations} stations</h5>
                    <h5>Capacity :{capacity}</h5>
                    <br></br>
                    <div class="container">
                        <button class="btn btn-primary" onClick={()=>{setX(1-x)}}>Toggle Map/Schedule</button>
                    </div>
                    <br></br>
                    {x==0?(
                    <table>
                        <tr>
                            <td><b>S.No</b></td>
                            <td><b>Station Name</b></td>
                            <td><b>Expected Arrival Time</b></td>
                            <td><b>Expected Departure Time</b></td>
                            <td><b>Distance from Source</b></td>
                        </tr>
                        {
                            scheduled.map((row) => (
                                <tr>
                                    <td><b>{row.path_id}</b></td>
                                    <td><b><a href={"/station_schedule/"+row.station_id} style={{textDecoration:"none",color:"black"}}>{row.station_name}</a></b></td>
                                    <td>{row.expected_arrival_time}</td>
                                    <td>{row.expected_departure_time}</td>
                                    <td>{row.distance_from_source}</td>
                                </tr>
                            ))
                        }
                    </table>):<Schedule_on_map train_no={train_no}/>}
                </div>
            </React.Fragment>
        </div>
    )
    );
  
}
export default TRAIN_SCHEDULE;
