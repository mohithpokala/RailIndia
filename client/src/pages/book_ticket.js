
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
const BookingPage = (props) => {
    const [trainName, setTrainName] = useState(false);
    const [train, setTrain] = useState("0000");
    const [train_num,setTrainNum]=useState("0000");
    const [token,setToken]=useState(localStorage.getItem("token"));
    
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
                                data2.push({
                                    "value":json[i]["train_no"] ,
                                    "label":json[i]["train_no"]});
                            } 
                        }
                        else{
                            setToken("");
                            // localStorage.setItem("token","");
                            window.location="/login";
                        }
                       
                    } 
                );
            setTrainName(data1);
            setTrainNum(data2);
        }, 1000);
    },[] );
    const trainNameChanged = (e)=>{
        setTrainName(e.target.value);
    }
    console.log(train);

    return (
        <>
            {
            !(trainName) 
                ? 
                    (
                        <></>
                    ) 
                : 
                (
                    <React.Fragment>
                        <div style={{position:"absolute",width:"100%",height:"90%"}}>
                            
                            <Select
                                options={trainName}
                                search
                      
                                onChange={trains=>{
                                        setTrain(trains.value);
                                        console.log(train);
                                    }}
                                
                                placeholder="Select train name"
                            />
                             <Select
                                options={train_num}
                                search
                      
                                onChange={trains=>{
                                        setTrain(trains.value);
                                        console.log(train);
                                    }}
                                
                                placeholder="Select train number"
                            />
                        </div>
                        {train!="0000" && <Schedules train_no={train} key={train} train_name={trainName}/>}
                    </React.Fragment>
                )
            }
        </>);
}

export default BookingPage;
