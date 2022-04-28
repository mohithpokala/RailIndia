
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
    const [formValues, setFormValues] = useState([{ name: "", age : "", sex : ""}])
    const [train_no, setTrain] = useState("");
    const [date, setDate] = useState("");
    const [start_station, setStartStation] = useState("");
    const [end_station, setEndStation] = useState("");
    const sex_options = [{value:'M', label:'M'},  
                        {value:'F', label:'F'},
                        {value:'other', label:'other'}
                        ];
    const [stations, setStations] = useState([]);
    const [end_stations, setEndStations] = useState([]);


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
            console.error(err.message);
          }
    }

    let get_end_stations = (j) => {
        let data1 = [];
        for(var i = j + 1; i < stations.length; i++){ 
            data1.push({label: stations[i], value: i});
        }
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
    
    let handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            var form_data = JSON.stringify(formValues);
            var jsonData = {
            "train_no" : train_no,
            "date" : date,
            "passengers" : form_data
            };
            console.log(jsonData);
            const response = await fetch("http://localhost:" + port + "/book_ticket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData)
            });
    
        } catch (err) {
          console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"20%"}}>
                <h4 style={{width:"100%",textAlign:"center"}}>Book your ticket!</h4><br></br><br></br>
                <Form  onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Train ID</Form.Label>
                        <Form.Control type="number" 
                                        placeholder="Enter train number" value={train_no}
                                        onChange={e => {
                                            get_stations(e.target.value);
                                            setTrain(e.target.value);
                                        }} default="" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" 
                                        placeholder="Enter date of travel" value={date}
                                        onChange={e => {
                                            setDate(e.target.value);
                                        }} default="" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Station</Form.Label>
                        <Dropdown options={stations} onChange={stations=>{
                                        get_end_stations(stations.index);
                                        setStartStation(stations.value);
                                    }}  placeholder="Select Source station" value ={start_station} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Station</Form.Label>
                        <Dropdown options={end_stations} onChange={stations=>{
                                        setEndStation(stations.value);
                                    }}  placeholder="Select Destination station" value ={end_station} />
                    </Form.Group>
                    <br></br>
                {formValues.map((element, index) => (
                <div class="p-5 mb-4 bg-light rounded-3">
                    <Form.Group className="form-inline" key={index}>
                    <Form.Label> Passenger {index + 1} </Form.Label> <br></br>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" name="age" value={element.age || ""} onChange={e => handleChange(index, e)} />
                    <Form.Label>Sex</Form.Label>
                    <Select options={sex_options} search onChange={e => handleChange(index, e)}  value ={element.sex || ""} />
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
