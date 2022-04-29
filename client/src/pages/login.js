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
        const response = await fetch(
            "http://localhost:"+port+"/find_user",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
            .then((res) => res.json())
            .then((json) => {
                if((json.check != "Invalid username")&&(json.check!="Invalid Password")){
                    token = json.token;
                    localStorage.setItem("token", token);
                    localStorage.setItem("username", user_name);
                    localStorage.setItem("user_id", json.user_id);
                    console.log(json.user_id);

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
  };
return (
    <Fragment>
    <div className="home_page container">
      <h2>Login Page</h2>
      <br></br>
      <Form onSubmit={onSubmitForm}>
      <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter the user name" value={user_name}
                        onChange={e => {
                            setUsername(e.target.value);
                          }} default="" />
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
                        placeholder="Enter Password" value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                          }} default="" />
        </Form.Group>
        <br></br>
        <div>
        {
            (text!="")
            ?
            (<div class="alert alert-danger">{text}</div>)
            :
            (<></>)
        }
        </div>
        <br></br>
        <Button variant="primary" type="submit">
           Login
        </Button>
      </Form></div>
    </Fragment>
  );
//   else return <Redirect to="/home"/>;

};

export default Login;