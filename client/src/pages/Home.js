import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


import '../CSS/rotateimage.css'
export default function Home() {
  const [token,setToken]=useState(localStorage.getItem("token"));
  console.log(token);
  if((token==null)||(token=="")||(token=="No Token")){
    window.location= "/login";
  }
  return (
    <div style={{backgroundColor:"grey",width:"100%",height:"100%",position:"absolute"}}>
    </div>
  );
}