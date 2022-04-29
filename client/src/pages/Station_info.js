
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
    console.log(scheduled);
    
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
                console.log(json);
            }
            else{
                //setToken("");
                localStorage.setItem("token","");
                window.location="/login";
            }
        });
    },[token] );

    return (
        <>
        {
            !(scheduled && station_data) 
            ? 
                (
                    <></>
                ) 
            : 
            (
                <React.Fragment>
                    <div style={{position:"absolute",width:"100%",top:"25%",left:"0%",height:"100%",}}>
                        <h4 style={{textAlign:"center"}}>
                            {station_data[0]["station_name"]} ({station_data[0]["station_id"]})
                        </h4>
                        <h5 style={{textAlign:"center"}}>
                            Number of Trains = {scheduled.length} 
                        </h5>
                        <h5 style={{textAlign:"center"}}>
                            Location= [{station_data[0]["x"]} , {station_data[0]["y"]}]
                        </h5>
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
                                        <td><a href={"/train_schedule/"+row.train_no} style={{textDecoration:"none",color:"black"}}><b>{row.train_no}</b></a></td>
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
