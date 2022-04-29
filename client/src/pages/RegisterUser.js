import React, {Fragment,useState} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {port} from './port';

const bcrypt = require('bcryptjs');
const crypt = require("crypto-js");
const RegisterUser =()=>{
    
  const [user_name, setUsername] = useState("");
  const [text,setText] = useState("");
  const [age, setAge] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  
  var token = "";
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const encrypt_password = crypt.AES.encrypt(password,"10").toString();

        var jsonData = {
            "user_name":user_name,
            "age":age,
            "phone":tel,
            "email":email,
            "sex":sex,
            "password":encrypt_password
            }
        console.log(jsonData);
        const response = await fetch(
            "http://localhost:"+port+"/add_user",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if((json.check != "INVALID USERID")&&(json.check!="INVALID PASSWORD")){
                    token = json.token;
                    localStorage.setItem("token", token);
                    localStorage.setItem("username", user_name);
                    console.log("random");
                    setAuth(true);
                    window.location="/";
                }
                else{
                    localStorage.setItem("token","");
                    // setText(json.check);
                }
            });
        
        
    } catch (err) {
      console.error(err);
    }
  };
  //console.log(user_name,password);
return (
    <Fragment>
    <div className="home_page" style={{width:"60%",left:"20%",position:"absolute",top:"5%"}}>
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
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" 
                        placeholder="Enter Age" value={age}
                        onChange={e => {
                            setAge(e.target.value);
                          }} default="" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control type="tel" 
                        placeholder="Enter Phone Number" value={tel}
                        onChange={e => {
                            setTel(e.target.value);
                          }} default="" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" 
                        placeholder="Enter Email ID" value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                          }} default="" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Control type="gender" 
                        placeholder="Enter Gender" value={sex}
                        onChange={e => {
                            setSex(e.target.value);
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
           Submit
        </Button>
      </Form></div>
    </Fragment>
  );

};

export default RegisterUser;