import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import Player_info from './Player_info';
import Player_bat from './Player_bat';
import Player_bowl from './Player_bowl';



const Player = () => {

  
  const player_id=useParams().player_id;
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
    <div className='navbar' style={{width:"30%",height:"8%",top:"0%",left:"70%"}}>
      <ul>
          <li onClick={f0} style={{cursor:"pointer",backgroundColor:x==0?"green":"#333",color:"white"}}><a >Information</a></li>
          <li onClick={f1} style={{cursor:"pointer",backgroundColor:x==1?"green":"#333",color:"white"}}><a >Batting</a></li>
          <li onClick={f2} style={{cursor:"pointer",backgroundColor:x==2?"green":"#333",color:"white"}}><a >Bowling</a></li>
      </ul>
    </div>
      {
          (x==0)
          ?
          (<Player_info player_id={player_id}/>)
          :
          (
              (x==1)
              ?
              (<Player_bat player_id={player_id}/>)
              :
              (<Player_bowl player_id={player_id}/>)
          )
      }
  </div>
  );
  };
  
  export default Player;
