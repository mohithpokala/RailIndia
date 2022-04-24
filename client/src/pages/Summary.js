
import React, {useState, useEffect} from 'react';
import ReactLoading from "react-loading";
import 'chart.js/auto';
import bkg_summary from '../Assets/bkg_summ.jpg';
import '../CSS/Match.css';
import Link from '@mui/material/Link';
import srh from '../Assets/srh.png'
import csk from '../Assets/csk.png'
import kkr from '../Assets/kkr.png'
import kxip from '../Assets/kxip.png'
import pwi from '../Assets/pwi.png'
import mi from '../Assets/mi.png'
import gl from '../Assets/gl.png'
import rcb from '../Assets/rcb.png'
import ktk from '../Assets/ktk.png'
import dd from '../Assets/dd.png'
import dc from '../Assets/dc.png'
import rr from '../Assets/rr.png'
import rps from '../Assets/rpsg.png'
import {  Pie } from "react-chartjs-2";
import { chartColors } from "./colors";



const options = {
  legend: {
    display: false,
    position: "right"
  },
  elements: {
    arc: {
      borderWidth: 0
    }
  }
};




const Summary = (props) => {
  const L=[
    kkr,kkr,rcb,csk,kxip,rr,dd,mi,dc,ktk,pwi,srh,rps,gl
  ]

    const [matchdet, setMatchdet]=useState(false);
    const [misc, setMisc] =useState(false);
    const [tb1, settb1]=useState(false);
    const [tb2, settb2]=useState(false);
    const [ta1, setta1]=useState(false);
    const [ta2, setta2]=useState(false);
    const [done2, setdone2] = useState(false);
    const [done3, setdone3] = useState(false);
    
    const match_id = props.match_id;
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    const [pie1,setPie1]=useState([]);
    const [pie2,setPie2]=useState([]);

    const data = {
      maintainAspectRatio: false,
      responsive: false,
      labels: ["a", "b", "c", "d"],
      datasets: [
        {
          data: [300, 50, 100, 50],
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors
        }
      ]
    };
    
    

    useEffect(() => {
      setTimeout(() => {
          fetch("http://localhost:5000/piechart/"+match_id+"/1")
              .then((res) => res.json())
              .then((json) => {
              setPie1(
                {
                  maintainAspectRatio: false,
                  responsive: false,
                  labels: ["Extra Runs", "Sixes", "Fours", "Threes","Twos","Ones"],
                  datasets: [
                    {
                      data: [json[0].extra_runs,json[0].sixes,json[0].fours,json[0].threes,json[0].twos,json[0].ones],
                      backgroundColor: chartColors,
                      hoverBackgroundColor: chartColors
                    }
                  ]
                }

                );
                setdone2(true);
              });
      }, 2000);
  }, []);


  
  useEffect(() => {
    setTimeout(() => {
        fetch("http://localhost:5000/piechart/"+match_id+"/2")
            .then((res) => res.json())
            .then((json) => {
            setPie2(
              {
                maintainAspectRatio: false,
                responsive: false,
                labels: ["Extra Runs", "Sixes", "Fours", "Threes","Twos","Ones"],
                datasets: [
                  {
                    data: [json[0].extra_runs,json[0].sixes,json[0].fours,json[0].threes,json[0].twos,json[0].ones],
                    backgroundColor: chartColors,
                    hoverBackgroundColor: chartColors
                  }
                ]
              }

              );
              setdone3(true);
            });
    }, 2000);
}, []);


    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/scorecard/"+match_id+"/2/3")
                .then((res) => res.json())
                .then((json) => {
                    
                setMatchdet(json);
                });
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/scorecard/"+match_id+"/2/5")
                .then((res) => res.json())
                .then((json) => {
                    setMisc(json);
                }); 
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/top3batsman/"+match_id+"/1")
                .then((res) => res.json())
                .then((json) => {
                    
                    setta1(json);
                }); 
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/top3batsman/"+match_id+"/2")
                .then((res) => res.json())
                .then((json) => {
                    setta2(json);
                }); 
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/top3bowlers/"+match_id+"/1")
                .then((res) => res.json())
                .then((json) => {
                    settb1(json);
                }); 
        }, 2000);
    }, []);
    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/top3bowlers/"+match_id+"/2")
                .then((res) => res.json())
                .then((json) => {
                    settb2(json);
                }); 
        }, 2000);
    }, []);
    const [color,setColor]=useState(["purple","crimson","yellow","firebrick","indigo","blue","dodgerBlue","grey","lightSalmon","black","orange","violet","orangeRed"]);
    let chartInstance = null;

    if(matchdet)
    console.log(matchdet[0]);
  return (
    <div style={{width:"100%",top:"8%",position:"fixed",height:"92%",overflowY:"scroll"}}>
        {/* <img src={bkg_summary} style={{width:"100%",position:"absolute",height:"100%",top:"0%",left:"0%"}}/> */}
      {!(ta1 && ta2 && tb1 && tb2 && misc && matchdet ) ? (
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
          <div style={{display:"block",width:"40%",left:"30%",position:"absolute",top:"20vh",backgroundColor:"white",height:"50vh"}}>

          <img src={L[matchdet[0].team1]} style={{left:"38%",height:"20%",width:"9%",position:"fixed",top:"10%"}}/> <b style={{textAlign:"center",width:"100%",top:"17%",left:"0%",position:"fixed"}}> Vs </b>
      <img src={L[matchdet[0].team2]} style={{left:"52%",height:"20%",width:"9%",position:"fixed",top:"10%"}}/>
      <br></br>
            <table style={{display:"absolute",width:"100%",left:"0%",top:"20%"}}>
            <tr style={{color:"white",height:"2vh",width:"100%",textAlign:"left",top:"0"}}>
              <td style={{color:"white",height:"2vh",width:"100%",textAlign:"left"}}> <h5>MATCH SUMMARY</h5></td>
            </tr>
            <tr style={{color:"white",height:"2vh",width:"100%",textAlign:"left",backgroundColor:"#f2f2f2"}}>
              <td style={{color:"black",height:"1vh",textAlign:"left"}}> {match_id},IPL,{matchdet[0].season_year}</td>
            </tr>
            </table>
            <br></br>
            <table style={{display:"absolute",width:"50%",left:"0%",top:"22vh",borderRight:"none",borderTop:"none",textAlign:"left"}}> 
            <tr >
              <td > {matchdet[0].innings1_team}</td>
              <td > {matchdet[0].toss_name=='bat'?'TOSS':''}</td>
            </tr>
              {
                range(0,2).map( 
                  x => { return(
                    (ta1[x])?(
                    <tr>
                  <td style={{width:"60%",textAlign:"left"}}><Link href={"/players/"+ta1[x].player_id} style={{color:"black",textDecoration:"none" }}> {ta1[x].player_name}</Link></td>
                  <td style={{textAlign:"left"}}>{ta1[x].runs_scored} &nbsp; {"("+ta1[x].balls_faced+")"}</td>
                  </tr>):(<tr><td style={{width:"80%",textAlign:"left"}}>&nbsp;</td>
                    <td style={{textAlign:"left"}}> &nbsp; </td></tr>));
                }
                )
      }
      
      </table>
      <table style={{display:"absolute",width:"50%",left:"50%",top:"22vh",borderLeft:"none",borderTop:"none"}}> 
                <tr >
                <td style={{width:"10%"}}>{misc[0].overs1}</td>
              <td style={{color:"black",width:"40%",textAlign:"right"}}> {misc[0].total1}/{misc[0].wkts1}</td>
            </tr>
            
              {
                
                range(0,2).map( 
                    x => { return(
                      (tb1[x])?(
                      <tr>
                    <td style={{width:"60%",textAlign:"left"}}><Link href={"/players/"+tb1[x].player_id} style={{color:"black",textDecoration:"none"}}> {tb1[x].player_name}</Link></td>
                  <td style={{width:"15%",textAlign:"right"}}>{tb1[x].wkts_taken}-{tb1[x].runs_given} &nbsp; &nbsp; {tb1[x].balls_bowled}</td>
                    </tr>):(<tr><td style={{width:"60%",textAlign:"left"}}> &nbsp;</td>
                  <td style={{width:"15%",textAlign:"right"}}>&nbsp;</td></tr>));
                  }
                  )
        }
        
      
      </table>
      <table style={{display:"absolute",width:"50%",left:"0%",top:"39vh",borderRight:"none",textAlign:"left"}}> 
            <tr >
              <td style={{color:"black",textAlign:"left"}}> {matchdet[0].innings2_team} </td>
              <td style={{color:"black",textAlign:"left"}}> {matchdet[0].toss_name=='field'?'TOSS':''}</td>
            </tr>
              {
                range(0,2).map( 
                    x => { return(
                      (ta2[x])?(
                      <tr>
                    <td style={{width:"60%",textAlign:"left"}}><Link href={"/players/"+ta2[x].player_id} style={{color:"black",textDecoration:"none" }}> {ta2[x].player_name}</Link></td>
                    <td style={{textAlign:"left"}}>{ta2[x].runs_scored} &nbsp; {"("+ta2[x].balls_faced+")"}</td>
                    </tr>):(<tr>
                        <td style={{width:"60%",textAlign:"left"}}>&nbsp;</td>
                    <td style={{textAlign:"left"}}> &nbsp; </td>

                    </tr>));
                  }
                  )
      }
      
      </table>
      <table style={{display:"absolute",width:"50%",left:"50%",top:"39vh",borderLeft:"none"}}> 
                <tr >
                <td style={{width:"10%"}}>{misc[0].overs2}</td>
              <td style={{color:"black",width:"40%",textAlign:"right"}}> {misc[0].total2}/{misc[0].wkts2}</td>
            </tr>
              {
                range(0,2).map( 
                    x => { return(
                      (tb2[x])?(
                      <tr>
                    <td style={{width:"60%",textAlign:"left"}}><Link href={"/players/"+tb2[x].player_id} style={{color:"black",textDecoration:"none"}}> {tb2[x].player_name}</Link></td>
                  <td style={{width:"15%",textAlign:"right"}}>{tb2[x].wkts_taken}-{tb2[x].runs_given} &nbsp; &nbsp; {tb2[x].balls_bowled}</td>
                    </tr>):(<tr>   <td style={{width:"60%",textAlign:"left"}}> &nbsp;</td>
                  <td style={{textAlign:"left"}}>&nbsp;</td>
        </tr>));
                  }
                  )
                  
        
      }
      
      </table>
      <table style={{display:"absolute",width:"100%",left:"00%",top:"56vh"}}> 
      <tr><td>
      {matchdet[0].match_winner==matchdet[0].team1?matchdet[0].team1name:matchdet[0].team2name} won by {matchdet[0].win_margin} {matchdet[0].win_type}
      </td></tr></table>
      </div>
    <div style={styles.relative}>


<div style={styles.pieContainer}>
  <h4>{matchdet[0].innings1_team}</h4>
  <Pie
    data={pie1}
    options={options}
    ref={input => {
      chartInstance = input;
    }}
  />
  
</div>

<div style={styles.pieContainer2}>
  <h4>{matchdet[0].innings2_team}</h4>
  <Pie
    data={pie2}
    options={options}
    ref={input => {
      chartInstance = input;
    }}
  />
  
</div>

<div id="legend" />
</div>
</React.Fragment>
)}
</div>
);
}
const styles = {
pieContainer: {
  width: "20%",
  height: "50%",
  top: "30vh",
  left: "15%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  textAlign:"center"
},
pieContainer2: {
  width: "20%",
  height: "50%",
  top: "30vh",
  left: "85%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  textAlign:"center"
},


relative: {
  position: "relative"
}
};

export default Summary;
