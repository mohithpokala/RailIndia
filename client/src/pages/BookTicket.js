
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
import { port } from './port';
const BookTicket = (props) => {
    const [scheduled,setScheduled]=useState(false);
    const [train_no,setTrain]=useState(props.train_no);
    const [token,setToken]=useState(localStorage.getItem("token"));
    
    console.log(train_no);
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:"+port+"/train/schedule/"+train_no+"/")
                .then((res) => res.json())
                .then(
                    (json) => {
                        setScheduled(json);
                    } 
                );
        }, 100);
    },[] );
    console.log(props.train_no);
    console.log(scheduled);
    console.log("hi iuhuihgvf ");
    const [formValues, setFormValues] = useState([{ name: "", age : "", sex : ""}])
    
    const [date, setDate] = useState("");
    const [start_station, setStartStation] = useState("");
    const [end_station, setEndStation] = useState("");
    const sex_options = [{value:'M', label:'M'},  
                        {value:'F', label:'F'},
                        {value:'other', label:'other'}
                        ];
    const [stations, setStations] = useState([{label: "KCG", value: 0}, {label: "PAK", value: 1}]);
    let [end_stations, setEndStations] = useState([]);

    let get_end_stations = (j) => {
        let data1 = [];
        for(var i = j + 1; i < stations.length; i++){ 
            // console.log("hello", i);
            data1.push({label: stations[i].label, value: i});
            // console.log(data1);
        }
        end_stations = data1;
        // setEndStations(data1);
        console.log("here", data1, end_stations);
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
    
    let handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            var form_data = JSON.stringify(formValues);
            var jsonData = {
            "train_no" : train_no,
            "date" : date,
            "start_station" : start_station,
            "end_station" : end_station,
            };
            console.log(form_data);
            console.log(jsonData);
            const response = await fetch("http://localhost:" + port + "/book_ticket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData)
            });
            const res = response.json();
            const booking_id = res['booking_id'];
            console.log(booking_id);
    
        } catch (err) {
          console.error(err.message);
        }
    }

    const get_stations = async (train_no) => {
        let data1 = [];
        try{
            const response = await fetch("http://localhost:5000/train/schedule/" + train_no);
            const json = response.json;
            for(var i=0;i<json.length;i++){ 
                data1.push({label: json[i]["station_name"], value: i});
            } 
            setStations(data1);
        } catch (err) {
            // setStations([{label: "0000", value: 0}, {label: "0001", value: 1}]);
            console.error(err.message);
          }
    }

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         console.log(train_no);
    //         get_stations(train_no);
    //     }, 2000)
    
    //     return () => clearTimeout(delayDebounceFn)
    //   }, [train_no])
    
    return (
        <Fragment>
            <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"20%"}}>
                <h4 style={{width:"100%",textAlign:"center"}}>Book your ticket!</h4><br></br><br></br>
                <Form  onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Train ID</Form.Label>
                        <Form.Control id="train_no_input" type="number" 
                                        placeholder="Enter train number" value={train_no}
                                        onChange={e => {
                                            setTrain(e.target.value);
                                        }} 
                                        default="" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" 
                                        placeholder="Enter date of travel" value={date}
                                        onChange={e => {
                                            setDate(e.target.value);
                                        }} 
                                        default="" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Station</Form.Label>
                        <Select options={stations} onChange={s=>{
                                        // get_end_stations(s.value);
                                        // console.log(stations);
                                        // console.log("Empty?", end_stations);   
                                        setStartStation(s.label);
                                    }}  placeholder="Select Source station" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Station</Form.Label>
                        <Select options={stations} onChange={s=>{
                                        setEndStation(s.label);
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
