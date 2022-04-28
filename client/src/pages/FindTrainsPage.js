
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';

import '../CSS/Match.css'
import '../CSS/rotateimage.css';
import FindTrains from './FindTrains';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const renderOption = (x)=>{
    return (<option style={{cursor:"pointer"}} value={x.f}>{x.f}</option>);
}
const FindTrainsPage = (props) => {
  const [stationName,setstationName] = useState(false);
    const [station1,setstation1]=useState("KACHEGUDA");
    const [station2,setstation2]=useState("TIRUPATI MAIN");

    useEffect(() => {
        setTimeout(() => {
            let data1 = [];
            fetch("http://localhost:5000/all_stations")
                .then((res) => res.json())
                .then(
                    (json) => {
                        for(var i=0;i<json.length;i++){ 
                            data1.push(json[i]["station_name"]);
                        } 
                    } 
                );
            setstationName(data1);
        }, 1000);
    },[] );
    console.log(station1);
    console.log(stationName);
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
                    <React.Fragment>
                        <div >
                            
                            <Dropdown options={stationName} onChange={stations=>{
                                    setstation1(stations.value);
                                    console.log(station1);
                                }}  placeholder="Select source station" value ={station1} />;
                            <Dropdown options={stationName} onChange={stations=>{
                                    setstation2(stations.value);
                                    console.log(station1);
                                }}  placeholder="Select destination" value={station2}/> 
                        </div>
                        <a  href={"/find_trains/"+station1+"/"+station2}>Submit</a>
                    </React.Fragment>
                )
            }
        </>);
}

export default FindTrainsPage;
