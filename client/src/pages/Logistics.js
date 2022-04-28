
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
                                <td><b>S.No</b></td>
                                <td><b>Station Name</b></td>
                                <td><b>Station Code</b></td>
                                <td><b></b></td>
                                <td><b>Distance from Source</b></td>
                            </tr>
                            {
                                scheduled.map((row) => (
                                    <tr>
                                        <td><b>{row.path_id}</b></td>
                                        <td><a href={"/station_schedule/"+row.station_id}>{row.station_name}</a></td>
                                        <td>{row.expected_arrival_time}</td>
                                        <td>{row.expected_departure_time}</td>
                                        <td>{row.distance_from_source}</td>
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
