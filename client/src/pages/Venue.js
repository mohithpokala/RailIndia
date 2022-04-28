import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ReactLoading from "react-loading";
import Venue_info from './Venue_info';
import Venue_stat from './Venue_stat';

import Link from '@mui/material/Link';

const Venue =()=>{
    const venue_id=useParams().venue_id;

    const [x,setX]= useState(0);
    const f0=()=>{
        setX(0);
    }
    const f1=()=>{
        setX(1);
    }
    return (
    <div className="home_page">
      <div className='navbar' style={{width:"20%",height:"8%",top:"0%",left:"80%"}}>
        <ul>
            <li onClick={f0} style={{backgroundColor:x==0?"green":"#333",color:"white"}}><a >Information</a></li>
            <li onClick={f1} style={{backgroundColor:x==1?"green":"#333",color:"white"}}><a >Statistics</a></li>
        </ul>
      </div>
        {
            (x==0)
            ?
            (<Venue_info venue_id={venue_id}/>)
            :
            (
                (<Venue_stat venue_id={venue_id}/>)
            )
        }
    </div>
    );


};

export default Venue;