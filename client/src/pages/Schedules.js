
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';
import { port } from './port';

import Select from 'react-select';

const Schedules = (props) => {
  const [scheduled,setScheduled] = useState(false);
    const [train_no,  setTrain] = useState(props.train_no);
    const [train_name,  setTrainName] = useState(props.train_name);

    console.log(train_no);
    console.log(train_name);
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:" + port + "/train/schedule/"+train_no+"/")
                .then((res) => res.json())
                .then(
                    (json) => {
                        setScheduled(json);
                    } 
                );
        }, 100);
    },[] );
    console.log(props.train_no);
    console.log(scheduled);
    
    return (
        <>
        {
            !(scheduled && train_no!="abcd" ) 
            ? 
                (
                    <></>
                ) 
            : 
            (
                <React.Fragment>
                    <div style={{position:"absolute",width:"100%",top:"25%",left:"0%",height:"100%",}}>
                        <h4>
                            Schedule for Train { train_no }
                        </h4>

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
                                        <td>{row.station_name}</td>
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
export default Schedules;
