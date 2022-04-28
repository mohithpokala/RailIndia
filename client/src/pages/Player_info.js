import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import afg from '../Assets/afg.png'
import ind from '../Assets/india.png'
import sa from '../Assets/sa.png'
import pak from '../Assets/pak.png'
import aus from '../Assets/aus.png'
import nz from '../Assets/nz.png'
import wi from '../Assets/wi.png'
import eng from '../Assets/eng.png'
import neth from '../Assets/neth.png'
import zim from '../Assets/zim.png'
import bangla from '../Assets/bangla.png'
import lanka from '../Assets/lanka.png'

const Player_info=()=>{

    const player_id=useParams().player_id;
    const [player, setPlayer]=useState([false]);
    const flags = 
        {"India":ind,"Afghanistan":afg,"Australia":aus,"New Zealand":nz,"South Africa":sa,"Netherlands":neth,"West Indies":wi,"Sri Lanka":lanka,"Bangladesh":bangla,"Zimbabwea":zim,"England":eng,"Pakistan":pak}
    
    
        useEffect(()=>{
            setTimeout(() => {
                fetch(
                    "http://localhost:5000/players/"+player_id+"/4")
                                .then((res) => res.json())
                                .then((json) => {
                                   setPlayer(json);
                                   console.log(json);
                                });
            }, 0);
        },[]);
        console.log(player,flags);
    return <React.Fragment>
        <div style={{width:"100%",top:"20%",position:"absolute",textAlign:"center"}}>
            <img src={flags[player[0].country_name]} style={{width:"30%",height:"20vh",left:"35%",position:"absolute",border:"2px solid black"}}></img>
            <br></br><br></br><br></br><br></br><br></br><br></br>
    <h1>{player[0]?player[0].player_name+","+player[0].country_name:""}</h1>
        <h2>{player[0]?player[0].batting_hand+"sman":""}</h2>
        <h2>{player[0]?(player[0].bowling_skill=="N/A")?(""):player[0].bowling_skill+" bowler":""}</h2>
        </div>
     
    </React.Fragment>
    ;

};

export default Player_info;