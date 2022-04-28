
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';
import { port } from './port';

import Select from 'react-select';

const Schedules2 = (props) => {
    const [top5inflow,setTop5inflow] = useState(false);
    const [top5outflow,setTop5outflow] = useState(false);
    const [zonestat1,setzonestat1] = useState(false);
    const [zonestat2,setzonestat2] = useState(false);
    const [LongestTrains,setLongestTrains] = useState(false);
    
    
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:" + port + "/inflow_top5/")
                .then((res) => res.json())
                .then(
                    (json) => {
                        setTop5inflow(json);
                    } 
                );
        }, 100);
    },[] );

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:" + port + "/outflow_top5/")
                .then((res) => res.json())
                .then(
                    (json) => {
                        setTop5outflow(json);
                    } 
                );
        }, 100);
    },[] );

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:" + port + "/trains_zone_stat1/")
                .then((res) => res.json())
                .then(
                    (json) => {
                        setzonestat1(json);
                    } 
                );
        }, 100);
    },[] );

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:" + port + "/LongestTrains/")
                .then((res) => res.json())
                .then(
                    (json) => {
                        setLongestTrains(json);
                    } 
                );
        }, 100);
    },[] );

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:" + port + "/trains_zone_stat2/")
                .then((res) => res.json())
                .then(
                    (json) => {
                        setzonestat2(json);
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
                    <div style={{position:"absolute",width:"100%",top:"25%",left:"0%",height:"100%",}}>
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
                        </table>
                        <br></br><br></br>

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
                        </table>

                        <br></br><br></br>

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
                        </table>

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
                        </table>

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
                                    <tr>stat1,stat2,dist,train_no,train_name
                                        <td><b>{row.stat1}</b></td>
                                        <td>{row.stat2}</td>
                                        <td><b>{row.dist}</b></td>
                                        <td>{row.train_no}</td>
                                        <td><b>{row.train_name}</b></td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </React.Fragment>
    )}</>
  );
  
}
export default Schedules2;
