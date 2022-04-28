
import React, {Fragment, useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';

import Select from 'react-select';
import { port } from './port';
const BookTicket = (props) => {
    const [scheduled,setScheduled]=useState(false);
    const [train_no,setTrain]=useState(props.train_no);
    const [token,setToken]=useState(localStorage.getItem("token"));
    
    console.log(train_no);
    useEffect(() => {
        setTimeout(() => {
            const jsonData={"token":token};
            fetch("http://localhost:"+port+"/train/schedule/"+train_no+"/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(jsonData)
            })
                .then((res) => res.json())
                .then(
                    (json) => {
                        if(!(json.hasOwnProperty('token') )){
                        setScheduled(json);
                        }
                        else{
                            setToken("");
                            // localStorage.setItem("token","");
                            window.location="/login";
                        }
                    } 
                );
        }, 100);
    },[] );
    console.log(props.train_no);
    console.log(scheduled);
    console.log("hi iuhuihgvf ");
    const [formValues, setFormValues] = useState([{ name: "", age : "", sex : ""}])
    
    const [date, setDate] = useState("");

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
                <h4 style={{width:"100%",textAlign:"center"}}>Hurrah IPL is coming to your city</h4><br></br><br></br>
                <Form  onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Train ID</Form.Label>
                        <Form.Control type="number" 
                                        placeholder="Enter train number" value={train_no}
                                        onChange={e => {
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
                {formValues.map((element, index) => (
                <div class="container">
                    <Form.Group className="form-inline" key={index}>
                    <Form.Label> Passenger {index} </Form.Label> <br></br>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" name="age" value={element.age || ""} onChange={e => handleChange(index, e)} />
                    <Form.Label>Sex</Form.Label>
                    <Form.Control type="text" name="sex" value={element.sex || ""} onChange={e => handleChange(index, e)} />
                    
                    {
                        index ? 
                        <button type="button"  className="error" onClick={() => removeFormFields(index)}>Remove</button> 
                        : null
                    }
                    </Form.Group>
                </div>
                ))}
                <div className="button-section">
                <Button variant="secondary" type="button" onClick={() => addFormFields()}>
                  Add Passenger
                 </Button>
                <Button variant="primary" type="submit">
                   Book Ticket
                </Button>
                </div>
            </Form>
        </div>
      </Fragment>
    )

}
export default BookTicket;
