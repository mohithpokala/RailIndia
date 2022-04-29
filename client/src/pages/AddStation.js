import React, {Fragment,useState} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {port} from './port';

const bcrypt = require('bcryptjs');
const crypt = require("crypto-js");
const AddStation =()=>{

    const [sid,setSid] =useState("");
    const [sname,setSname] =useState("");
    const [lat,setLat] =useState("");
    const [long,setLong] =useState("");
    const [city,setCity] =useState("");
    const [state,setState] =useState("");
    const [zone,setZone] =useState("");
    const [message,setMessage]=useState("");
    const [token,setToken]=useState(localStorage.getItem("token"));
     
  const [auth, setAuth] = useState(false);
  const onSubmitForm = async e => {
    e.preventDefault();
    try {

        var jsonData = {
            "sid":sid,
            "sname":sname,
            "lat":lat,
            "long":long,
            "city":city,
            "state":state,
            "zone":zone,
            "token":token
            }
        const response = await fetch(
            "http://localhost:"+port+"/add_stations",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
            .then((res) => res.json())
            .then((json) => {
                if((json.hasOwnProperty('check'))){
                    setMessage("FAILURE: ONLY ADMINS CAN ADD STATIONS");

                    
                }
                else if((json.hasOwnProperty('token')))
                {
                        setMessage("INVALID TOKEN");
                        localStorage.setItem("token","");

                       // window.location="/login";

                }

                else{
                    setMessage("SUCCESSFULLY ADDED THE STATION");
                setSid("");
                setSname("");
                setLat("");
                setLong("");
                setCity("");
                setState("");
                setZone("");
                }
            });
        
        
    } catch (err) {
      console.error(err);
    }
  };
  if((token==null)||(token=="")||(token=="No Token")){
    window.location= "/login";
 }
  if( !((token==null)||(token=="")||(token=="No Token")))

return (
    <Fragment>
    <div>
      <div className="row">
          <h3>Add a Station</h3>
      </div>
      <div className="home_page row">
        <Form onSubmit={onSubmitForm}>
        <Form.Group>
            <Form.Label>Station ID</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter the station id" value={sid}
                          onChange={e => {
                              setSid(e.target.value);
                            }} default="" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Station Name</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter Sation Name" value={sname}
                          onChange={e => {
                              setSname(e.target.value);
                            }} default="" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Latitude</Form.Label>
            <Form.Control type="number" 
                          placeholder="Enter Latitude" value={lat}
                          onChange={e => {
                              setLat(e.target.value);
                            }} default="" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Longitude</Form.Label>
            <Form.Control type="number" 
                          placeholder="Enter Longitude" value={long}
                          onChange={e => {
                              setLong(e.target.value);
                            }} default="" />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter City" value={city}
                          onChange={e => {
                              setCity(e.target.value);
                            }} default="" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Zone</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter Zone" value={zone}
                          onChange={e => {
                              setZone(e.target.value);
                            }} default="" />
          </Form.Group>
          <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter State" value={state}
                          onChange={e => {
                              setState(e.target.value);
                            }} default="" />
          </Form.Group>
          <br></br>
          <div>
          {
              (message!="")
              ?
              (<b>{message}</b>)
              :
              (<></>)
          }
          </div>
          <br></br>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
    </Fragment>
  );

};

export default AddStation;