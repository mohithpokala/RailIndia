
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';

import '../CSS/Match.css'
import Select from 'react-select';
import Schedules from './Schedules';
import '../CSS/rotateimage.css'
import {port} from './port';

const renderOption = (x)=>{
    return (<option style={{cursor:"pointer"}} value={x.f}>{x.f}</option>);
}
const SchedulePage = (props) => {
  const [trainName,setTrainName] = useState(false);
    
    const [token,setToken]=useState(localStorage.getItem("token"));
    
    const [train,setTrain]=useState("12797");
    const [train_num,setTrainNum]=useState(false);
    
    if((token==null)||(token=="")||(token=="No Token")){
        window.location= "/login";
    }
    useEffect(() => {
        setTimeout(() => {
            const jsonData={"token":token};
            let data1 = [];
            let data2 = [];
            fetch("http://localhost:" + port + "/all_trains",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                        for(var i=0;i<json.length;i++){ 
                            data1.push({
                                "label":json[i]["train_name"] ,
                                "value":json[i]["train_no"]});
                        } 
                        for(var i=0;i<json.length;i++){ 
                            data1.push({
                                "label":json[i]["train_no"] ,
                                "value":json[i]["train_no"]});
                        } 

            setTrainName(data1);
            setTrainNum(data2);
                    }
                    else{
                        //setToken("");
                        localStorage.setItem("token","");
                        window.location="/login";
                    }
                    } 
                );
        }, 0);
    },[token] );
    const trainNameChanged = (e)=>{
        setTrainName(e.target.value);
    }
    if( !((token==null)||(token=="")||(token=="No Token")))

    return (
        <>
            {
            !(trainName ) 
                ? 
                    (
                       <></>
                    ) 
                : 
                (
                    <div class="container">
                        <div className="row">
                            <h3>Train Schedule</h3>
                        </div>
                        <br></br>
                        <React.Fragment>
                            <div class="form-group">
                                
                                <Select
                                    options={trainName}
                                    search
                        
                                    onChange={trains=>{
                                            setTrain(trains.value);
                                        }}
                                    
                                    placeholder="Select train name or number"
                                />
                            </div>
                            <br></br>
                            <div class="container">
                                {train!="0000" && <Schedules train_no={train} key={train} train_name={trainName}/>}
                            </div>
                        </React.Fragment>
                    </div>
                )
            }
        </>);
}

export default SchedulePage;
