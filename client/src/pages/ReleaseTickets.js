<<<<<<< HEAD
<<<<<<< HEAD
import React, {Fragment, useState, useEffect} from 'react';
=======
import React, {Fragment,useState} from 'react';
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
=======
import React, {Fragment,useState} from 'react';
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {port} from './port';
<<<<<<< HEAD
<<<<<<< HEAD
import Select from 'react-select';
=======
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
=======
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921

const ReleaseTicket =()=>{

    const [message,setMessage]=useState("");
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [date_val,setDate]=useState("");
    const [train_no,setTrain]=useState("");
<<<<<<< HEAD
<<<<<<< HEAD
    const [trains, setTrains] = useState(false);
    const jsonData = {"token" : token};


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
      }, 0);
  },[token] );


=======
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
=======
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
  const onSubmitForm = async e => {
    e.preventDefault();
    try {

        var jsonData = {
            "token":token
        }
        console.log(jsonData);
        const response = await fetch(
            "http://localhost:"+port+"/release_tickets/"+date_val+"/"+train_no,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if((json.hasOwnProperty('check'))){
<<<<<<< HEAD
<<<<<<< HEAD
                    setMessage("FAILURE: ONLY ADMINS CAN RELEASE TICKETS");
=======
                    setMessage("FAILURE: ONLY ADMINS CAN ADD STATIONS");
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
=======
                    setMessage("FAILURE: ONLY ADMINS CAN ADD STATIONS");
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921

                }
                else if((json.hasOwnProperty('token')))
                {
                    console.log(json.token);
                        setMessage("INVALID TOKEN");
                        localStorage.setItem("token","");

                       // window.location="/login";

                }

                else{
                    setMessage("SUCCESSFULLY ADDED THE STATION");
                    setDate("");
                    setTrain("");
                
                }
            });
        
        
    } catch (err) {
      console.error(err);
    }
  };
  //console.log(user_name,password);
  console.log(token);
  if((token==null)||(token=="")||(token=="No Token")){
    window.location= "/login";
 }
  if( !((token==null)||(token=="")||(token=="No Token")))

return (
    <Fragment>
    <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"5%"}}>
      <Form onSubmit={onSubmitForm}>
        
        <br></br><br></br>
        <br></br><br></br>
        <Form.Group>
          <Form.Label>Train Number</Form.Label>
<<<<<<< HEAD
<<<<<<< HEAD

<Select type="number" options={trains}
                                            placeholder="Enter train number" 
                                            onChange ={e => {
                                                setTrain(e.value);
                                            }} 
                                            />
=======
=======
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
          <Form.Control type="number" 
                        placeholder="Enter Train Number" value={train_no}
                        onChange={e => {
                            setTrain(e.target.value);
                          }} default="" />
<<<<<<< HEAD
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
=======
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
        </Form.Group>
        <br></br><br></br>
        <Form.Group>
          <Form.Label>Date of Journey</Form.Label>
<<<<<<< HEAD
<<<<<<< HEAD
          <Form.Control type="date" 
=======
          <Form.Control type="text" 
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
=======
          <Form.Control type="text" 
>>>>>>> 8b9ee10787bc5011bb2c4af521b533dfa6c01921
                        placeholder="Enter Date of Journey" value={date_val}
                        onChange={e => {
                            setDate(e.target.value);
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
        <br></br><br></br>
        <Button variant="primary" type="submit">
           Submit
        </Button>
      </Form></div>
    </Fragment>
  );

};

export default ReleaseTicket;