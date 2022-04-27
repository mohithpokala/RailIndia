
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';


import Select from 'react-select';




const Summary = () => {
  const [scheduled,setScheduled]=useState(false);
    const train_no=useParams().train_no;
    console.log("http://localhost:5000/train/schedule/"+train_no+"/");
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/train/schedule/"+train_no+"/")
                .then((res) => res.json())
                .then(
                    (json) => {
                        setScheduled(json);
                    } 
                );
        }, 0);
    },[] );
    console.log(scheduled);
    console.log("hi iuhuihgvf ");
    console.log(train_no);
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
                    <div style={{position:"absolute",width:"100%",top:"5%",left:"0%",height:"100%",}}>
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
                                    <tr key={row.train_no}>
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
export default Summary;
