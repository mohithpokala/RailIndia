
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
        
        {"label":"Inflow" ,
        "value":1},
        {"label":"outflow" ,
        "value":2},
        {"label":"zone data 1" ,
        "value":3},
        {"label":"zonestat2" ,
        "value":4},
        {"label":"longest trains" ,
        "value":5}
        
    ]
    const [token,setToken]=useState(localStorage.getItem("token"));
    
    
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
                <React.Fragment>
                    <Select
                                options={statoptions}
                                search
                      
                                onChange={optionsss=>{
                                        setStat(optionsss.value);
                                        console.log(optionsss);
                                        console.log(options);
                                    }}
                                value = {options}
                                placeholder="Select Statistics type"
                            />
                    <div style={{position:"absolute",width:"100%",top:"25%",left:"0%",height:"100%"}}>
                        {options==1?
                        <div>
                        <h4>
                            TOP 5 stations with highest inflow
                        </h4>

                        <table>
                            <tr>
                                <td><b>Station Code</b></td>
                                <td><b>Station Name</b></td>
                                <td><b>Inflow</b></td>
                            </tr>
                            {
                                top5inflow.map((row) => (
                                    <tr>
                                        <td><b>{row.station_id}</b></td>
                                        <td><a href={"/station_schedule/"+row.station_id}>{row.station_name}</a></td>
                                        <td>{row.x}</td>
                                    </tr>
                                ))
                            }
                        </table></div>:<div/>}
                        {options==2?
                        <div>
                        <h4>
                            TOP 5 stations with highest outflow
                        </h4>

                        <table>
                            <tr>
                                <td><b>Station Code</b></td>
                                <td><b>Station Name</b></td>
                                <td><b>Outflow</b></td>
                            </tr>
                            {
                                top5outflow.map((row) => (
                                    <tr>
                                        <td><b>{row.station_id}</b></td>
                                        <td><a href={"/station_schedule/"+row.station_id}>{row.station_name}</a></td>
                                        <td>{row.x}</td>
                                    </tr>
                                ))
                            }
                        </table></div>:<div/>}
                        {options==3?
                        <div>
                        <h4>
                            Zone wise train count
                        </h4>

                        <table>
                            <tr>
                                <td><b>Zone </b></td>
                                <td><b>Count</b></td>
                            </tr>
                            {
                                zonestat1.map((row) => (
                                    <tr>
                                        <td><b>{row.zone}</b></td>
                                        <td>{row.count}</td>
                                    </tr>
                                ))
                            }
                        </table></div>:<div/>}
                        {options==4?
                        <div>
                        <h4>
                            Zone wise station count
                        </h4>

                        <table>
                            <tr>
                                <td><b>Zone </b></td>
                                <td><b>Count</b></td>
                            </tr>
                            {
                                zonestat2.map((row) => (
                                    <tr>
                                        <td><b>{row.zone}</b></td>
                                        <td>{row.count}</td>
                                    </tr>
                                ))
                            }
                        </table></div>:<div/>}
                        {options==5?
                        <div>
                        <h4>
                            Longest trains
                        </h4>

                        <table>
                            <tr>
                                <td><b>Source</b></td>
                                <td><b>Destination</b></td>
                                <td><b>Distance</b></td>
                                <td><b>Train Number </b></td>
                                <td><b>Train Name</b></td>
                            </tr>
                            {
                                zonestat1.map((row) => (
                                    <tr>
                                        <td><b>{row.stat1}</b></td>
                                        <td>{row.stat2}</td>
                                        <td><b>{row.dist}</b></td>
                                        <td>{row.train_no}</td>
                                        <td><b>{row.train_name}</b></td>
                                    </tr>
                                ))
                            }
                        </table></div>:<div/>}
                        </div>
                    
                </React.Fragment>
    )}</>
  );
  
}
export default Logistics;
