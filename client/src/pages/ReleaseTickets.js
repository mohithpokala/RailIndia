import React, {Fragment, useState, useEffect} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {port} from './port';

import Select from 'react-select';

const ReleaseTicket =()=>{

    const [message,setMessage]=useState("");
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [date_val,setDate]=useState("");
    const [train_no,setTrain]=useState("");
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

                    setMessage("FAILURE: ONLY ADMINS CAN RELEASE TICKETS");

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
  
  var today = new Date().toISOString().split('T')[0];
  var next =  new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
return (
    <Fragment>
    <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"5%"}}>
      <Form onSubmit={onSubmitForm}>
        <div className="row">
            <h3>Release Tickets for a Train</h3>
        </div>
        <br></br><br></br>
        <Form.Group>
          <Form.Label>Train Number</Form.Label>

          <Select type="number" options={trains}
                                            placeholder="Enter train number" 
                                            onChange ={e => {
                                                setTrain(e.value);
                                            }} 
                                            />
          </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label>Date of Journey</Form.Label>

          <Form.Control type="date" 
                        placeholder="Enter Date of Journey" value={date_val}
                        min={today} max={next}
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