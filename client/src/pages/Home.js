import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


import '../CSS/rotateimage.css'

import Slideshow from '../Components/Slideshow'
import { width } from '@mui/system';
import rail1 from '../Assets/rail7.png'
import rail2 from '../Assets/rail2.png'
import rail3 from '../Assets/rail3.png'
import rail4 from '../Assets/rail4.png'
import rail5 from '../Assets/rail5.png'
import rail6 from '../Assets/rail6.png'

export default function Home() {
  const [token,setToken]=useState(localStorage.getItem("token"));
  const hdim=[{im:rail1},{im:rail2},{im:rail3},{im:rail4},{im:rail5},{im:rail6}];

  if((token==null)||(token=="")||(token=="No Token")){
    window.location= "/login";
  }
  if( !((token==null)||(token=="")||(token=="No Token")))

  return (
    <div class="jumbotron">
      <h4>Welcome to RailIndia</h4>
      {/* <div class="container fluid">
        <img src={rail1} style={{width:"30%",position:"absolute",height:"50vh"}} />
      </div> */}
      Here is a website that is a collective effort of
      <ul>
        <li>Sudhansh</li>
        <li>Mohith</li>
        <li>Preetham</li>
        <li>Hitesh</li>
      </ul>
      We aim to provide a platform for the people to get the information about the trains and their status. 
      <br></br>
      The platform has been developed using ReactJS and NodeJS. It allows the user to 
      <ul>
        <li>book a train ticket</li>
        <li>cancel a train ticket</li>
        <li>view the train schedule</li>
        <li>view various statistics</li>
        <li>view trains at a station</li>
        <li>view user bookings and passengers in each booking</li>
      </ul>
      There is also a waitlist for the trains that are not available at the moment.

      An admin can add new stations and release tickets for a train. 
    </div>
  );
}