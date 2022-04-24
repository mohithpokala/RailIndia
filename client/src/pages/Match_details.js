import React, { useState } from 'react';
import Scorecard from './Scorecard';
import Score_comp  from './Score_Comparision';
import { useParams } from 'react-router';
import Summary from './Summary'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../CSS/Navbar.css';
const Match=()=>{
    const match_id=useParams().match_id;
    const [x,setX]= useState(0);
    const f0=()=>{
        setX(0);
    }
    const f1=()=>{
        setX(1);
    }
    const f2=()=>{
        setX(2);
    }
    return (
    <div className="home_page">
      <div className='navbar' style={{width:"30%",position:"absolute",height:"20",top:"0",left:"70%",paddingLeft:"none"}}>
        <ul>
            <li onClick={f0} style={{width:"10%",float:"left",backgroundColor:x==0?"green":"#333",color:"white"}}><a >Scorecard</a></li>
            <li onClick={f1} style={{width:"10%",float:"left",backgroundColor:x==1?"green":"#333",color:"white"}}><a >Comparision</a></li>
            <li onClick={f2} style={{width:"10%",float:"left",backgroundColor:x==2?"green":"#333",color:"white"}}><a >Summary</a></li>
        </ul>
      </div>
        {
            (x==0)
            ?
            (<Scorecard match_id={match_id}/>)
            :
            (
                (x==1)
                ?
                (<Score_comp match_id={match_id}/>)
                :
                (<Summary match_id={match_id} />)
            )
        }
    </div>
    );
}
export default Match;