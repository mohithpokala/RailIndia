
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';

import '../CSS/Match.css'
import Select from 'react-select';
import '../CSS/rotateimage.css'
import {port} from './port';

const renderOption = (x)=>{
    return (<option style={{cursor:"pointer"}} value={x.f}>{x.f}</option>);
}

    
const StationSchedulePage = (props) => {
    const [stationName,setStationName] = useState(false);
    const [station,setStation]=useState("KCG");
    const [station_num,setStationNum]=useState(false);
    const [token,setToken]=useState(localStorage.getItem("token"));
    
    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }
    useEffect(() => {
        setTimeout(() => {
            const jsonData={"token":token};
            let data1 = [];
            let data2 = [];
            // console.log(jsonData);
            fetch("http://localhost:" + port + "/all_stations",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                            
                            for(var i=0;i<json.length;i++){ 
                                // console.log(json[i]["station_name"]);
                                data1.push({
                                    "label":json[i]["station_name"] ,
                                    "value":json[i]["station_id"]});
                                data1.push({
                                    "value":json[i]["station_id"] ,
                                    "label":json[i]["station_id"]});
                            } 
                        }
                        else{
                            // setToken("");
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                        console.log(data1);
                        
                    } 
                );
            setStationName(data1);
            console.log(data1);
        }, 1000);
    },[token] );
    const stationNameChanged = (e)=>{
        setStationName(e.target.value);
    }
    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
        <>
            {
            !(stationName ) 
                ? 
                    (
                        <></>
                    ) 
                : 
                (
                    <React.Fragment>
                        <div style={{position:"absolute",width:"100%",height:"90%"}}>
                            
                            <Select
                                options={stationName}
                                search
                      
                                onChange={stations=>{
                                        setStation(stations.value);
                                        console.log(stations);
                                    }}
                                
                                placeholder="Select station name"
                            />
                            
                            <a  href={"/station_schedule/"+station}><h1>Submit</h1></a>
                        </div>

                    </React.Fragment>
                )
            }
        </>);
}

export default StationSchedulePage;
