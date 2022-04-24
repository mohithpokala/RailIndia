import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ReactLoading from "react-loading";
import '../CSS/Match.css'
const Venue_info=()=>{

    const venue_id=useParams().venue_id;
    const [venue, setVenue]=useState(false);
  
    useEffect(() => {
        setTimeout(() => {
    
        fetch(
            "http://localhost:5000/venue/"+venue_id)
                        .then((res) => res.json())
                        .then((json) => {
                           setVenue(json);
                           console.log(json);
                        });
        }, 2000);
      }, []);   
    


      return (<>
        {!(venue) ? (
             <div
             style={{
                 position: 'absolute', left: '50%', top: '60%',
                 transform: 'translate(-50%, -50%)'
             }}
             ><ReactLoading
               
               type={"bubbles"}
               color={"orange"}
               height={100}
               width={100}
             /></div>
           ) : (
            <React.Fragment>
            <div style={{width:"100%",height:"90%",top:"20%",position:"absolute",textAlign:"center"}}>
        <h4>{venue[0].venue_name}</h4>
        <br>
        </br>
        <table style={{fontWeight: "bold"}}>
          <tr  style={{backgroundColor:"white",color:"black"}}><td >Venue Name</td><td>{venue[0].venue_name}</td></tr>
          <tr><td>Location</td><td>{venue[0].city_name}</td></tr>
          <tr><td>Capacity</td> <td>{venue[0].capacity}</td></tr>
          <tr><td>Matches played</td> <td>{venue[0].matches_played}</td></tr>
          <tr><td>Maximum Score</td> <td>{venue[0].matches_played!=0?venue[0].max_scores:0}</td></tr>
          <tr><td>Maximum Score Chased</td> <td>{venue[0].matches_played!=0?((venue[0].chase==-1)?"No succesful chase":venue[0].chase):"No match played"}</td></tr>
          <tr><td>Minimum Score</td> <td>{venue[0].matches_played!=0?venue[0].min_scores:0}</td></tr>
        </table>
            </div>
         
        </React.Fragment>
         )}</>
       );



};

export default Venue_info;