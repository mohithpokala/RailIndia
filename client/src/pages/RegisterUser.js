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
  const [booking_status, setBookingStatus] = useState("none");
  const [message, setMessage] = useState("");

  var token = "";
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
          if(user_name == "" || password == "" || email == "" || tel == "" || age == "" || sex == "")
          {
              setBookingStatus("error");
              setMessage("Please fill all the fields");
              return;
          }
        const encrypt_password = crypt.AES.encrypt(password,"10").toString();

        var jsonData = {
            "user_name":user_name,
            "age":age,
            "phone":tel,
            "email":email,
            "sex":sex,
            "password":encrypt_password
            }
        const response = await fetch(
            "http://localhost:"+port+"/add_user",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
            .then((res) => res.json())
            .then((json) => {
                if((json.check != "INVALID USERID")&&(json.check!="INVALID PASSWORD")){
                    token = json.token;
                    localStorage.setItem("token", token);
                    localStorage.setItem("username", user_name);
                    setAuth(true);
                    window.location="/";
                }
                else{
                    localStorage.setItem("token","");
                    setBookingStatus("error");
                    setMessage(json.check);
                }
            });
        
        
    } catch (err) {
      console.error(err);
    }
  };

return (
    <Fragment>
      <div class="container">
      <div className="row">
          <h3>Register a new user</h3>
      </div>
      <br></br>
      {
            (booking_status == "success") ?
            <div className = "row alert alert-success"> {message} </div>
            :
            <></>
        }
        {
            (booking_status == "error") ?
            <div className='row alert alert-danger'> {message} </div>
            :
            <></>
        }
      <div className="home_page">
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
      </div>
    </Fragment>
  );

};

export default RegisterUser;