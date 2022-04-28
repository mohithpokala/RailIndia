import React, {Fragment,useState} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {port} from './port';

const bcrypt = require('bcryptjs');

const Login =()=>{
    
  const [user_name, setUsername] = useState("");
  const [text,setText] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const temp_err = "asdas";
  var token = "";
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const encrypt_password = await bcrypt.hash(password, 10);
        var jsonData = {
            
            "user_name":user_name,
            "password":encrypt_password
            }
        console.log(jsonData);
        const response = await fetch(
            "http://localhost:"+port+"/find_user",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if((json.check != "INVALID USERID")&&(json.check!="INVALID PASSWORD")){
                    token = json.token;
                    localStorage.setItem("token",token);
                    console.log("random");
                    setAuth(true);
                    window.location="/";
                }
                else{
                    localStorage.setItem("token","");
                    setText(json.check);
                }
            });
        
        
    } catch (err) {
      console.error(err);
    }
    console.log(token);
  };
  //console.log(user_name,password);
return (
    <Fragment>
    <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"20%"}}>
      <h4 style={{width:"100%",textAlign:"center"}}>Hurrah IPL is coming to your city</h4><br></br><br></br>
      <Form onSubmit={onSubmitForm}>
      <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter the user name" value={user_name}
                        onChange={e => {
                            setUsername(e.target.value);
                          }} default="" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
                        placeholder="Enter Password" value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                          }} default="" />
        </Form.Group>
        <br></br><br></br>
        <div>
        {
            (text!="")
            ?
            (<b>{text}</b>)
            :
            (<></>)
        }
        </div>
        <br></br><br></br>
        <Button variant="primary" type="submit">
           Login
        </Button>
      </Form></div>
    </Fragment>
  );
//   else return <Redirect to="/home"/>;

};

export default Login;