import React, { Fragment, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const ADD_VENUE = () => {
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [capacity, setCapacity] = useState();

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        var jsonData = {
            
            "v1":venue,
            "v2":city,
            "v3":country,
            "v4":capacity
            }
        console.log(jsonData);
        const response = await fetch("http://localhost:5000/add_venue", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(jsonData)
        });
        window.location="/venues";

    } catch (err) {
      console.error(err.message);
    }
  };
  console.log(venue,city,country,capacity);
  return (
    <Fragment>
    <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"20%"}}>
      <h4 style={{width:"100%",textAlign:"center"}}>Hurrah IPL is coming to your city</h4><br></br><br></br>
      <Form onSubmit={onSubmitForm}>
      <Form.Group>
          <Form.Label>Venue name:</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter the name of Stadium" value={venue}
                        onChange={e => {
                            setVenue(e.target.value);
                          }} default="" />
        </Form.Group>
        <Form.Group>
          <Form.Label>City name</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter city name" value={city}
                        onChange={e => {
                            setCity(e.target.value);
                          }} default="" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country name</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter country name" value={country} default="" 
                        onChange={e => {
                            setCountry(e.target.value);
                          }} />
        </Form.Group>
        <Form.Group>
          <Form.Label>capacity</Form.Label>
          <Form.Control type="number" 
                        placeholder="Enter capacity" value={capacity} 
                        onChange={e => {
                            setCapacity(e.target.value);
                          }} />
        </Form.Group>
        <br></br><br></br>
        <Button variant="primary" type="submit">
           Click here to submit form
        </Button>
      </Form></div>
    </Fragment>
  );
};

export default ADD_VENUE;