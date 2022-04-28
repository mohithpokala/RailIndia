
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';
import '../CSS/Match.css';
import { useParams } from 'react-router';


import Select from 'react-select';

const BookTicket = (props) => {
    const [formValues, setFormValues] = useState([{ name: "", age : "", sex : ""}])
    const [train_no, setTrain] = useState("");
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
    
    let handleSubmit = (event) => {
        event.preventDefault();
        
        try {
            let form_data = JSON.stringify(formValues);
            var jsonData = {
            "train_no" : train_no,
            "date" : date,
            "passengers" : form_data
            }
            console.log(jsonData);
            const response = await fetch("http://localhost:5000/book_ticket", {
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
                                        placeholder="Enter train number" value={venue}
                                        onChange={e => {
                                            setTrain(e.target.value);
                                        }} default="" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" 
                                        placeholder="Enter date of travel" value={city}
                                        onChange={e => {
                                            setDate(e.target.value);
                                        }} default="" />
                    </Form.Group>
                {formValues.map((element, index) => (
                    <div className="form-inline" key={index}>
                    <label>Name</label>
                    <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                    <label>Age</label>
                    <input type="number" name="age" value={element.age || ""} onChange={e => handleChange(index, e)} />
                    <label>Age</label>
                    <input type="number" name="sex" value={element.sex || ""} onChange={e => handleChange(index, e)} />
                    
                    {
                        index ? 
                        <button type="button"  className="error" onClick={() => removeFormFields(index)}>Remove</button> 
                        : null
                    }
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
