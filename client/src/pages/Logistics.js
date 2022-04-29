
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';
import { port } from './port';

import Select from 'react-select';

const Logistics = (props) => {
    const [top5inflow,setTop5inflow] = useState(false);
    const [top5outflow,setTop5outflow] = useState(false);
    const [zonestat1,setzonestat1] = useState(false);
    const [zonestat2,setzonestat2] = useState(false);
    const [LongestTrains,setLongestTrains] = useState(false);
    const [options,setStat] =useState(1);
    const statoptions=[
        
        {"label":"Inflow stats" ,
        "value":1},
        {"label":"Outflow stats" ,
        "value":2},
        {"label":"Zone-station stats" ,
        "value":3},
        {"label":"Zone-train stats" ,
        "value":4},
        {"label":"Longest trains" ,
        "value":5}
        
    ]
    const [token,setToken]=useState(localStorage.getItem("token"));
    
    
    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }
    useEffect(() => {
        const jsonData={"token":token};
        setTimeout(() => {
            fetch("http://localhost:" + port + "/inflow_top5/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            setTop5inflow(json);                            
                        }
                        else{
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                    } 
                    
                );
        }, 100);
    },[] );
    useEffect(() => {
        const jsonData={"token":token};
        setTimeout(() => {
            fetch("http://localhost:" + port + "/outflow_top5/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            setTop5outflow(json);                            
                        }
                        else{
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                    } 
                    
                );
        }, 100);
    },[] );


    useEffect(() => {
        const jsonData={"token":token};
        setTimeout(() => {
            fetch("http://localhost:" + port + "/trains_zone_stat/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            setzonestat1(json);                            
                        }
                        else{
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                    } 
                    
                );
        }, 100);
    },[] );


    useEffect(() => {
        const jsonData={"token":token};
        setTimeout(() => {
            fetch("http://localhost:" + port + "/top5_trains/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            setLongestTrains(json);       
                        }
                        else{
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                    } 
                    
                );
        }, 100);
    },[] );

    
    useEffect(() => {
        const jsonData={"token":token};
        setTimeout(() => {
            fetch("http://localhost:" + port + "/trains_zone_stat2/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            setzonestat2(json);                            
                        }
                        else{
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                    } 
                    
                );
        }, 100);
    },[] );
    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
        <>
        {
            !(top5inflow && top5outflow && zonestat1 && zonestat2 && LongestTrains) 
            ? 
                (
                    <></>
                ) 
            : 
            (
                <div class="container">
                    <div className="row">
                        <h3>Statistics</h3>
                    </div>
                    <br></br>
                    <React.Fragment>
                        <div class="row">
                            <Select
                                        options={statoptions}                                
                                        onChange={optionsss=>{
                                                setStat(optionsss.value);
                                            }}
                                        value = {options}
                                        placeholder="Select Statistics type"
                                    />
                        </div>
                        
                        <div class="container">
                            <br></br>
                            {options==1?
                            <div>
                            <h6 style={{textAlign:"center"}}>
                                TOP 5 stations with highest inflow
                            </h6>
                            <div class="col-8 container justify-content-center text-center">
                            <br></br>
                            <table class="table table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col">Station Code</th>
                                        <th scope="col">Station Name</th>
                                        <th scope="col">Inflow</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    top5inflow.map((row) => (
                                        <tr>
                                            <td>{row.station_id}</td>
                                            <td><a href={"/station_schedule/"+row.station_id} class="primary-text">{row.station_name}</a></td>
                                            <td>{row.x}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            </div>
                            
                            </div>:<div/>}
                            {options==2?
                            <div>
                            <h6 style={{textAlign:"center"}}>
                                TOP 5 stations with highest outflow
                            </h6>
                            <div class="col-8 container justify-content-center text-center">
                            <br></br>
                            <table class="table table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col">Station Code</th>
                                        <th scope="col">Station Name</th>
                                        <th scope="col">Outflow</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    top5outflow.map((row) => (
                                        <tr>
                                            <td>{row.station_id}</td>
                                            <td><a href={"/station_schedule/"+row.station_id} style={{textDecoration:"none",color:"black"}}>{row.station_name}</a></td>
                                            <td>{row.x}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            </div>
                            </div>:<div/>}
                            {options==3?
                            <div>
                            <h6 style={{textAlign:"center"}}>
                                Zone wise train count
                            </h6>
                            <div class="col-8 container justify-content-center text-center">
                            <br></br>
                            <table class="table table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col">Zone</th>
                                        <th scope="col">Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    zonestat1.map((row) => (
                                        <tr>
                                            <td>{row.zone}</td>
                                            <td>{row.x}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            </div>
                            </div>:<div/>}
                            {options==4?
                            <div>
                            <h6 style={{textAlign:"center"}}>
                                Zone wise station count
                            </h6>
                            <div class="col-8 container justify-content-center text-center">
                            <br></br>
                            <table class="table table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col">Zone</th>
                                        <th scope="col">Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    zonestat2.map((row) => (
                                        <tr>
                                            <td>{row.zone}</td>
                                            <td>{row.x}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            </div>
                            </div>:<div/>}
                            {options==5?
                            <div>
                            <h6 style={{textAlign:"center"}}>
                                Longest trains
                            </h6>
                            <div class="col-8 container justify-content-center text-center">
                            <br></br>
                            <table class="table table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col">Source</th>
                                        <th scope="col">Destination</th>
                                        <th scope="col">Distance</th>
                                        <th scope="col">Train Number</th>
                                        <th scope="col">Train Name</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    LongestTrains.map((row) => (
                                        <tr>
                                            <td><a href={"/station_schedule/"+row.s1} style={{textDecoration:"none",color:"black"}}>{row.stat1}</a></td>
                                            <td><a href={"/station_schedule/"+row.s2} style={{textDecoration:"none",color:"black"}}>{row.stat2}</a></td>
                                            <td>{row.dist}</td>
                                            <td><a href={"/train_schedule/"+row.train_no} style={{textDecoration:"none",color:"black"}}>{row.train_no}</a></td>
                                            <td>{row.train_name}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            </div>
                            </div>:<div/>}
                            </div>
                        
                    </React.Fragment>
                </div>
    )}</>
  );
  
}
export default Logistics;
