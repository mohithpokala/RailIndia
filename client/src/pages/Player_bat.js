import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import { Chart } from 'react-chartjs-2';

import { chartColors } from "./colors";
import ReactLoading from "react-loading";
import '../CSS/Match.css'
const Player_bat = () => {

    const player_id=useParams().player_id;
    const [done,setDone]=useState(false);
  
    const [playerbat, setPlayerbat]=useState(false);
    const [match,setMatch]=useState(false);
    const [runs,setRuns]=useState(false);
    const [colors,setColors]=useState(false);
    const [player, setPlayer]=useState(false);
    const [wicket,setWickets]=useState(false);



        
    useEffect(()=>{
      setTimeout(() => {
        fetch(
          "http://localhost:5000/players/"+player_id+"/4")
                      .then((res) => res.json())
                      .then((json) => {
                         setPlayer(json);
                         console.log(json);
                      });
      }, 2000);
  },[]);

    useEffect(() => {
        setTimeout(() => {
            fetch(
                "http://localhost:5000/players/"+player_id+"/3")
                            .then((res) => res.json())
                            .then((json) => {
                               setPlayerbat(json);
                               console.log(json);
                            });
            let m = [];
            let r = [];
            let w = [];
            let c=[];
            fetch("http://localhost:5000/players/"+player_id+"/0")
                .then((res) => res.json())
                .then((json) => {
                    for(var i=0;i<json.length;i++){
                        
                        m.push(json[i]['match_id']);
                        r.push(json[i]['score_match'])
                        if(json[i]['out']==0){
                          w.push({x:json[i]['match_id'],y:parseInt(json[i]['score_match'])+2});
                          
                        }
                        if(parseInt(r[i],10)<30) c.push('rgba(255, 0, 0, 1)');
                        else if(parseInt(r[i],10)<50) c.push('rgba(0,0,255,1)');
                        else if(parseInt(r[i],10)>=50) c.push('rgba(0,255,0,1)');
                      }
                 setMatch(m);
                 setRuns(r);
                 setColors(c);
                setWickets(w);
                  setDone(true);
                });            
        }, 2000);
    }, []);

    return (
        <>
      {!(done && playerbat && match && runs && colors && player) ? (

        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
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
    
          <div style={{width:"30%",height:"90%",top:"25%",position:"absolute",textAlign:"center",left:"0"}}>
      

            <table style={{width:"100%",position:"absolute"}}>       
             <tr><td style={{width:"50%",textAlign:"left"}}><h5>{player[0].player_name}</h5></td><td style={{width:"50%",textAlign:"left"}}>&nbsp;</td>

              </tr>
              <tr><td style={{width:"50%",colspan:"1",textAlign:"left"}}><b>Innings Played</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].number_of_matches_played}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Runs</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].total_runs}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Runs scored in Fours</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].four}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Runs scored in Sixes</b> </td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].six}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Fifties</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].num_fifty}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Centuries</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].num_hundred}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Highest Score</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].hs}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Strike Rate</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].strike_rate}</td></tr>
              <tr><td style={{width:"50%",textAlign:"left"}}><b>Average</b></td><td style={{width:"50%",textAlign:"right"}}>{playerbat[0].average}</td></tr>
      
            </table>
            </div>
      
            <div style={{position:"absolute",width:"50%",height:"75%",textAlign:"center",top:"10%",backgroundColor:"white",float:"center",left:"45%"}}>
            <h3>Runs scored Vs  Match ID</h3>
            <div style={{width:"10%",left:"30%",border:"2px solid rgba(0, 255, 0, 1)",backgroundColor:"rgba(0, 255, 0, 0.3)",position:"absolute"}}>&gt;50</div>
            <div style={{width:"10%",left:"45%",border:"2px solid rgba(0, 0, 255, 1)",backgroundColor:"rgba(0, 0, 255, 0.3)",position:"absolute"}}>30-50</div> 
            <div style={{width:"10%",left:"60%",border:"2px solid rgba(255, 0, 0, 1)",backgroundColor:"rgba(255, 0, 0, 0.3)",position:"absolute"}}>&lt;30</div>
            <br></br><br></br>
            <Chart 
                data={{
                  labels : match,
                  datasets: [
                    {
                      type :"bar",
                      label: "runs scored",
                      data: runs,
                      borderWidth: 1,
                      // pointRadius:0.5,
                      borderColor:colors,
                      backgroundColor:colors,
                    },
                    {
                      type :"scatter",
                      data: wicket,
                      borderWidth: 2,
                      pointRadius:4,
                      backgroundColor: 'rgba(0, 0, 0, 1)',
                      fill:"true",
                      color:"blue",
                      pointStyle:"star",
                      borderColor:'rgba(0, 0, 0, 1)'
                    }
                  ],
                  options:{ maintainAspectRatio: false }
                }} height="10px" width="20px" position="relative" options={{plugins: {legend:false
                  
              } }}></Chart>

              
              </div>
      
      
      
          </React.Fragment>



        )
    
      }
    </>
    );
    
    

};

export default Player_bat;