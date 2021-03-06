
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';

import '../CSS/Match.css'
import '../CSS/rotateimage.css';
import FindTrains from './FindTrains';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { port } from './port';

const renderOption = (x)=>{
    return (<option style={{cursor:"pointer"}} value={x.f}>{x.f}</option>);
}
const FindTrainsPage = (props) => {
  const [stationName,setstationName] = useState(false);
    const [station1,setstation1]=useState("KACHEGUDA");
    const [station2,setstation2]=useState("TIRUPATI MAIN");
    const [token,setToken]=useState(localStorage.getItem("token"));
    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }
    useEffect(() => {
        setTimeout(() => {
            const jsonData={"token":token};
            let data1 = [];
            fetch("http://localhost:"+port+"/all_stations",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                        for(var i=0;i<json.length;i++){ 
                            data1.push(json[i]["station_name"]);
                        } 
                        }
                        else{
                            localStorage.setItem("token","");
                            window.location="/login";
                        }
                    } 
                );
            setstationName(data1);
        }, 1000);
    },[token] );
    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
        <>
            {
            !(stationName) 
                ? 
                    (
                        <></>
                    ) 
                : 
                (
                    <div className="container">
                        <div className="row">
                            <h3>Search Trains between Stations</h3>
                        </div>
                        <br></br>
                        <React.Fragment>
                            <div class="form-group"> 
                                <label> Source Station </label>
                                <Dropdown options={stationName} onChange={stations=>{
                                        setstation1(stations.value);
                                        console.log(station1);
                                    }}  placeholder="Select source station" value ={station1} />
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label> Destination Station</label>
                                <Dropdown options={stationName} onChange={stations=>{
                                        setstation2(stations.value);
                                        console.log(station1);
                                    }}  placeholder="Select destination" value={station2}/> 
                            </div>
                            <br></br>
                            <a class="btn btn-primary" href={"/find_trains/"+station1+"/"+station2}>Submit</a>
                        </React.Fragment>
                    </div>
                )
            }
        </>);
}

export default FindTrainsPage;
