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
      <div class="container fluid">
        <img src={rail1} style={{width:"30%",position:"absolute",height:"50vh"}} />
      </div>
    </div>
  );
}