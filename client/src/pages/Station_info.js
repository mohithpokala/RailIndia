
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';
import { port } from './port';


const Station_info = (props) => {
    const [scheduled,setScheduled] = useState(false);
    var station_name1 = useParams().station_name;
    var station_name2 = props.station_name;
    const station_name = station_name1?station_name1:station_name2;
    const [token,setToken]=useState(localStorage.getItem("token"));
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
        }, 100);
    },[] );
    console.log(scheduled);
    
    return (
        <>
        {
            !(scheduled ) 
            ? 
                (
                    <></>
                ) 
            : 
            (
                <React.Fragment>
                    <div style={{position:"absolute",width:"100%",top:"25%",left:"0%",height:"100%",}}>
                        <h4>
                            Schedule for Station { station_name }
                        </h4>

                        <table>
                            <tr>
                                <td><b>Train Number</b></td>
                                <td><b>Train Name</b></td>
                                <td><b>Expected Arrival Time</b></td>
                                <td><b>Expected Departure Time</b></td>
                            </tr>
                            {
                                scheduled.map((row) => (
                                    <tr>
                                        <td><a href={"/train_schedule/"+row.train_no}><b>{row.train_no}</b></a></td>
                                        <td>{row.train_name}</td>
                                        <td>{row.expected_arrival_time}</td>
                                        <td>{row.expected_departure_time}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </React.Fragment>
    )}</>
  );
  
}
export default Station_info;
