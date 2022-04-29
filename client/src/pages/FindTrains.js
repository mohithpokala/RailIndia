
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import "../CSS/Card.css";
import { Card } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { port } from './port';

const FindTrains = (props) => {
    const [singleTrains,setSingleTrains]=useState([]);
    const [multiPathTrains,setMultiPathTrains]=useState([]);
    const [token,setToken]=useState(localStorage.getItem("token"));
    const start_id=useParams().station1;
    const dest_id=useParams().station2;

    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }
    
    useEffect(() => {
        const jsonData={"token":token};
        setTimeout(() => {
                fetch("http://localhost:"+port+"/train/find/"+start_id+"/"+dest_id,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body:JSON.stringify(jsonData)
                })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            setSingleTrains(json);
                        }
                        else{
                            // setToken("");
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                    } 
                );

        }, 0);
    },[token] );

    useEffect(() => {
        const jsonData={"token":token};
        setTimeout(() => {
            fetch("http://localhost:"+port+"/train/find_multipath/"+start_id+"/"+dest_id,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            setMultiPathTrains(json);
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
    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
        <>
        {
            !(singleTrains  && multiPathTrains && start_id!="0000" && dest_id!="0000" && !((token==null)||(token=="")||(token=="No Token"))) 
            ? 
                (
                    <></>
                ) 
            : 
            (
                <React.Fragment>
                    <div class="container">
                        <ul class="list-group">
                        {
                            singleTrains.map((row) => (
                            <li class="list-group-item">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title"><span class="text-primary">{row.train_no}</span> {row.train_name}</h5>
                                        <p class="card-text">
                                            <dl class="row">
                                                <dt class="col-sm-3">Departure Time</dt>
                                                <dd class="col-sm-9">{row.expected_departure_time} </dd>
                                                <dt class="col-sm-3">Arrival Time</dt>
                                                <dd class="col-sm-9">{row.expected_arrival_time} </dd>
                                                <dt class="col-sm-3">Distance</dt>
                                                <dd class="col-sm-9">{row.dist}</dd>
                                            </dl>
                                        </p>
                                        <a href={"/train_schedule/" + row.train_no} class="btn btn-primary">Book Train</a>
                                    </div>
                                </div>
                            </li>                    
                            ))
                        }
                        </ul>

                        {
                            multiPathTrains.map((row) => (
                                <li class="list-group-item">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title"> <span class="text-primary">{row.train1}</span> - {row.halt_station} - <span class="text-primary">{row.train2}</span></h5>
                                            <p class="card-text">
                                                <dl class="row">
                                                    <dt class="col-sm-3">Departure Time 1</dt>
                                                    <dd class="col-sm-9">{row.deptime1} </dd>
                                                    <dt class="col-sm-3">Arrival Time 1</dt>
                                                    <dd class="col-sm-9">{row.arrtime1} </dd>
                                                    <dt class="col-sm-3">Departure Time 2</dt>
                                                    <dd class="col-sm-9">{row.deptime2} </dd>
                                                    <dt class="col-sm-3">Arrival Time 3</dt>
                                                    <dd class="col-sm-9">{row.arrtime2} </dd>
                                                    <dt class="col-sm-3">Distance 1</dt>
                                                    <dd class="col-sm-9">{row.d1}</dd>
                                                    <dt class="col-sm-3">Distance 2</dt>
                                                    <dd class="col-sm-9">{row.d2}</dd>
                                                </dl>
                                            </p>
                                        </div>
                                    </div>
                                </li>                    
                            ))
                        }
                    </div>
                </React.Fragment>
    )}</>
  );
  
}
export default FindTrains;
