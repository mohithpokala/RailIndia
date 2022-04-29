
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
    console.log(props);
    console.log(start_id);
    console.log(useParams().station1);
    console.log(useParams().station2);
    
    console.log(start_id,dest_id);

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
        setTimeout(() => {
            fetch("http://localhost:"+port+"/train/find_multipath/"+start_id+"/"+dest_id)
                .then((res) => res.json())
                .then(
                    (json) => {
                        setMultiPathTrains(json);
                    } 
                );

        }, 0);
    },[] );
    console.log(multiPathTrains);
    console.log(singleTrains);
    return (
        <>
        {
            !(singleTrains  && start_id!="0000" && dest_id!="0000" ) 
            ? 
                (
                    <></>
                ) 
            : 
            (
                <React.Fragment>
                    <div style={{position:"absolute",width:"100%",top:"25%",left:"0%",height:"100%",}}>
                        {
                            singleTrains.map((row) => (
                                <Link to={"/train_schedule/"+row.train_no} style={{textDecoration:"none"}}>
                                    <Card key={row.train_name} className="box" >
                                        <div style={{display:"block",opacity:0.9,width:"100%",height:"10vh",borderRadius:"4px",backgroundColor:props.color}}></div>
                                        <Card.Body className='boxheader'>
                                            <Card.Title classname="tit" >
                                                <b>
                                                    {row.train_no} : {row.train_name}
                                                </b>
                                            </Card.Title>
                                            Departure Time : {row.expected_departure_time}
                                            Arrival Time : {row.expected_arrival_time}
                                            Distance : {row.dist}
                                        </Card.Body>
                                    </Card>
                                </Link>

                                
                            ))
                        }
 {
                            multiPathTrains.map((row) => (
                                <Link to="/" href={""} style={{textDecoration:"none"}}>
                                    <Card key={row.train_name} className="box" >
                                        <div style={{display:"block",opacity:0.9,width:"100%",height:"10vh",borderRadius:"4px",backgroundColor:props.color}}></div>
                                        <Card.Body className='boxheader'>
                                            <Card.Title classname="tit" >
                                                <b>
                                                   {start_id} ----{row.train1} ----{row.halt_station}---- {row.train2}----{dest_id}
                                                </b>
                                            </Card.Title>
                                            Departure Time1 : {row.deptime1}
                                            Arrival Time1 : {row.arrtime1}
                                            Departure Time2 : {row.deptime2}
                                            Arrival Time2 : {row.arrtime2}
                                            Distance1 : {row.d1}
                                            Distance2 : {row.d2}
                                        </Card.Body>
                                    </Card>
                                </Link>

                                
                            ))
                        }

                    </div>
                </React.Fragment>
    )}</>
  );
  
}
export default FindTrains;
