import React, {Fragment,useState} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {port} from './port';

const ReleaseTicket =()=>{

    const [message,setMessage]=useState("");
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [date_val,setDate]=useState("");
    const [train_no,setTrain]=useState("");
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
                    setMessage("FAILURE: ONLY ADMINS CAN ADD STATIONS");

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
          <Form.Control type="number" 
                        placeholder="Enter Train Number" value={train_no}
                        onChange={e => {
                            setTrain(e.target.value);
                          }} default="" />
        </Form.Group>
        <br></br><br></br>
        <Form.Group>
          <Form.Label>Date of Journey</Form.Label>
          <Form.Control type="text" 
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