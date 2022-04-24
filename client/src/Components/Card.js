import React, {useState, useEffect} from 'react';

import Link from '@mui/material/Link';
import "../CSS/Card.css";
import { Card } from "react-bootstrap";
const Card_comp = (props) => {

    return(
    <Link href={"/matches/"+props.data.match_id} style={{textDecoration:"none"}}>
      <Card key={props.index} className="box" >
        <div style={{display:"block",opacity:0.9,width:"100%",height:"10vh",borderRadius:"4px",backgroundColor:props.color}}></div>
        <Card.Body className='boxheader'>
          <Card.Title classname="tit" ><b>{props.data.team1} vs {props.data.team2}</b></Card.Title>
          <Card.Text classname="venue" ><b>{props.data.venue_name},{props.data.city_name}</b></Card.Text>
          {props.data.winner+" won by "+props.data.win_margin+" "+props.data.win_type}
        </Card.Body>
     </Card>
     </Link>
    )
  };
  


  export default Card_comp;
  
  
  