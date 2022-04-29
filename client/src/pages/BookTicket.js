
import React, {Fragment, useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';
import { port } from './port'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Select from 'react-select';

const BookTicket = (props) => {
    const [train_no, setTrain]=useState(props.train_no);
    const [token, setToken]=useState(localStorage.getItem("token"));
    const [formValues, setFormValues] = useState([{ name: "", age : "", sex : ""}])
    const [date, setDate] = useState("");
    const [trains, setTrains] = useState(false);
    const [a,setA] =useState(false);
    const [available_seats,setAvailabileSeasts] = useState(false);
    const jsonData = {"token" : token};
    var x = "";
    if((token==null)||(token=="")||(token=="No Token")){
       window.location= "/login";
    }
    const [data,setData] =useState("http://localhost:" + port + "/get_num_seats/");

    useEffect(() => {
        setTimeout(() => {
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
                        for(var i = 0; i < json.length; i++){ 
                            data2.push({
                                "value":json[i]["train_no"] ,
                                "label":json[i]["train_no"]});
                        } 
                    }
                    else{
                        setToken("");
                        window.location="/login";
                    }
                    } 
                );
            setTrains(data2);
        }, 1000);
    },[token] );

    
    const [start_station, setStartStation] = useState("");
    const [end_station, setEndStation] = useState("");
    const sex_options = [{value:'M', label:'M'},  
                        {value:'F', label:'F'},
                        {value:'other', label:'other'}
                        ];
    const [stations, setStations] = useState([]);
    const [dates, setDates] = useState([]);
    const [stations1, setEndStations] = useState([]);
    const [bookingID, setID] = useState("");

    let get_end_stations = (j) => {
        let data1 = [];
        for(var i = j + 1; i <= stations.length; i++){ 
            data1.push({label: stations[i - 1].label, value: i});
        }
        setA(j);
        setEndStations(data1);
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { name: "", age: "", sex: ""}])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let addPassengers = async (bid, f) =>
    {
        // var json = {"bid": bid,
        // "name" : f['name'],
        // "age" : f['age'],
        // "sex" : f['sex']      
        // };
        var json = {"bid": bid, "vals" : f, "token": token};
        const response2 = await fetch("http://localhost:" + port + "/add_passenger", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json)
        }); 
    }

    let get_wl = async (sid,eid,train_no,date) =>
    {
        // var json = {"bid": bid,
        // "name" : f['name'],
        // "age" : f['age'],
        // "sex" : f['sex']      
        // };/get_num_seats/:train/:start_index/:end_index/:date
        var json = {"token": token};
        const response2 = await fetch("http://localhost:" + port + "/get_num_seats/"+train_no+"/"+sid+"/"+eid+"/"+date, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json)
        })
        .then((res) => res.json())
        .then((json) => 
        {
            if(!(json.hasOwnProperty('token') ))
            {
                setAvailabileSeasts(json[0]["x"]);
                console.log(available_seats);
            } 
            else
            {
                // setToken("");
                localStorage.setItem("token","");
            }
        });; 
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // console.log(train_no);
            var jsonData = {
            "train_no" : train_no,
            "journey_date" : date,
            "start_id" : start_station,
            "end_id" : end_station,
            "user_id" : localStorage.getItem("username"),
            "token" : token
            };
           
            const response = await fetch("http://localhost:" + port + "/book_ticket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData)
            })
            .then((res) => res.json())
            .then((json) => 
            {
                // console.log(json);
                if(!(json.hasOwnProperty('token') ))
                {
                    const res = json;
                    const booking_id = res['booking_id'];
                    console.log(booking_id);
                    const res1 = addPassengers(booking_id, formValues);
                    setID(booking_id);
                } 
                else
                {
                    // setToken("");
                    localStorage.setItem("token","");
                }
            });
    
        } catch (err) {
          console.error(err.message);
        }
    }

    const get_stations = async (train_no) => {
        let data1 = [];
        try{
            const response = await fetch("http://localhost:" + port + "/train/schedule/" + train_no, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData)
            })
            .then((res) => res.json())
            .then((json) => {
       
            if(!(json.hasOwnProperty('token') )){
                for(var i = 0; i < json.length; i++){ 
                    data1.push({label: json[i]["station_name"], value: i + 1});
                } 
                setStations(data1);
            }
            else{
                setToken("");
                localStorage.setItem("token","");
                window.location="/login";
            }
            });
            
        } catch (err) {
            console.error(err.message);
          }
    }
    
    const get_dates = async (train_no) => {
        let data1 = [];
        try{
            const response = await fetch("http://localhost:" + port + "/get_available_dates/" + train_no, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData)
            })
            .then((res) => res.json())
            .then((json) => {
       
            if(!(json.hasOwnProperty('token') )){
                for(var i = 0; i < json.length; i++){ 
                    // console.log(json[i]["d"], train_no);
                    data1.push({label: json[i]["d"].split("T")[0], value: json[i]["d"]});
                } 
                setDates(data1);
                // console.log(dates);
            }
            else{
                setToken("");
                localStorage.setItem("token","");
                window.location="/login";
            }
            });
            
        } catch (err) {
            console.error(err.message);
          }
    }
    if( !((token==null)||(token=="")||(token=="No Token")))
    return (

        
        <Fragment>
            <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"20%"}}>
                <h4 style={{width:"100%",textAlign:"center"}}>Book your ticket!</h4><br></br><br></br>
               
                <Form  onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Train ID</Form.Label>
                        <Select type="number" options={trains}
                                        placeholder="Enter train number" 
                                        onChange ={e => {
                                            setTrain(e.value);
                                            setDate("");
                                            setStartStation("");
                                            setEndStation("");
                                            get_dates(e.value);
                                            get_stations(e.value);
                                        }} 
                                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Select options={dates} type="date" 
                                        placeholder="Enter date of travel" 
                                        onChange={e => {
                                            setDate(e.value);
                                        }} 
                                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Station</Form.Label>
                        <Select options={stations} id="start station" onChange={s=>{
                                        get_end_stations(s.value);
                                        setStartStation(s.value);
                                    }}  placeholder="Select Source station" />
                    </Form.Group>
                    {console.log("mohith")}
                    {console.log(x)}
                    <Form.Group>
                        <Form.Label>End Station</Form.Label>
                        <Select options={stations1} onChange={s=>{
                                        setEndStation(s.value);
                                        get_wl(x,a,date,train_no);
                                    }}  placeholder="Select Destination station"/>
                    </Form.Group>
                    <br></br>
                {formValues.map((element, index) => (
                <div class="p-5 mb-4 bg-light rounded-3">
                    <Form.Group className="form-inline" key={index}>
                    <Form.Label> Passenger {index + 1} </Form.Label> <br></br>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" name="age" value={element.age || ""} onChange={e => {handleChange(index, e)}} />
                    <Form.Label>Sex</Form.Label>
                    <Select options={sex_options} onChange={e => {handleChange(index, {target:{name:"sex", value:e.value}})}} />
                    <br></br>
                    {
                        index ? 
                        <button type="button" class="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button> 
                        : null
                    }
                    </Form.Group>
                </div>
                ))}
                <div className="row button-section">
                <div class="col">
                    <Button variant="secondary" type="button" onClick={() => addFormFields()}>
                    Add Passenger
                    </Button>
                </div>
                <div class="col">
                    <Button variant="primary" type="submit">
                    Book Ticket
                    </Button>
                </div>
                </div>
            </Form>
        </div>
      </Fragment>
    )

}
export default BookTicket;
