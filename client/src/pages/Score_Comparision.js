
import React, {useState, useEffect} from 'react';
import ReactLoading from "react-loading";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Doughnut, Pie } from "react-chartjs-2";
import { chartColors } from "./colors";
import im3 from '../Assets/im3.jpg'






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

const pieOptions = {
  legend: {
    display: true,
    position: "right",
    legendCallback: function(chart) {
      // Return the HTML string here.
      console.log(chart);
      return [
        <ul>
          <li>z</li>
          <li>zzzz</li>
          <li>ppp</li>
          <li>adasda</li>
        </ul>
      ];
    }
  },
  elements: {
    arc: {
      borderWidth: 0
    }
  }
};






const Score_comp = (props) => {

    const [chartData, setChartData] = useState({});
    const [done, setdone] = useState(false);
    const [done2, setdone2] = useState(false);
    const [done3, setdone3] = useState(false);

    const match_id = props.match_id;

    const [matchdet, setMatchdet]=useState(false);
    
    const [y1,setY1] = useState([]);
    const [y2,setY2] = useState([]);
    const [y3,setY3] = useState([]);
    const [y4,setY4] = useState([]);

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
        const p=matchdet?matchdet[0].team1name:'dummy';
        const q=matchdet?matchdet[0].team2name:'dummy';
        let runs1 = [0];
        let runs2 = [0];
        let wkts1 = [];
        let wkts2 = [];
        let r1=0;let r2=0;
        fetch("http://localhost:5000/scorecomparision/"+match_id+"/2")
            .then((res) => res.json())
            .then((json) => {
                for(var i=0;i<json.length;i++){
                    r1=r1+parseInt(json[i]['r1']);
                    runs1.push(r1);
                    if(json[i]['w1']==1)
                      wkts1.push({x:i+1,y:r1});
                    else if(json[i]['w1']>1){
                      for(var j=0;j<json[i]['w1'];j++){
                        var k=Math.random();
                        wkts1.push({x:i+1,y:(r1+parseFloat((j-json[i]['w1']/2)*(json[i]['w1'])))});
                      }
                    }

                    r2=r2+parseInt(json[i]['r2']);
                    runs2.push(r2);
                    if(json[i]['w2']==1)
                      wkts2.push({x:i+1,y:r2});
                    else if(json[i]['w2']>1){
                      for(var j=0;j<json[i]['w2'];j++){
                        var k=Math.random();console.log(k,k*0.1,json[i]['r2'],"rnadf");
                        wkts2.push({x:i+1,y:(r2+parseFloat((j-json[i]['w2']/2)*(json[i]['w2'])))});
                      }
                    }
                  }

              setY1(runs1);
              setY2(runs2);
              setY3(wkts1);
              setY4(wkts2);
              setChartData({
                labels: range(1,20),
                datasets: [
                  {
                    type :"line",
                    label: p,
                    data: runs1,
                    borderWidth: 4,
                    pointRadius:0,
                    borderColor:'rgba(255, 0, 0, 1)'
                  },
                  {
                    type :"scatter",
                    label: "level of thiccness",
                    data: wkts1,
                    borderWidth: 4,
                    pointRadius:3,
                    backgroundColor: "fillPattern",
                    color:"red",
                    borderColor:'rgba(0, 0, 0, 1)'

                  },
                  {
                    type :"line",
                    label: q,
                    data: runs2,
                    borderWidth: 4,
                    pointRadius:0,
                    borderColor:'rgba(0, 0, 255, 1)'

                  },
                  {
                    type :"scatter",
                    label: "level of thiccness",
                    data: wkts2,
                    borderWidth: 3,
                    pointRadius:3,
                    borderColor:'rgba(255,0,255, 1)',
                    backgroundColor: "fillPattern"
                  }
                ],
                options:{ maintainAspectRatio: false }
              });
              setdone(true);
            });            
    }, 2000);
}, []);
console.log(y1,y3);
function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

let chartInstance = null;

  return (
    <div style={{width:"100%",top:"8%",position:"fixed",height:"92%",overflowY:"scroll"}}>
{/*       
      <img src={im3} style={{width:"100%",position:"absolute",height:"110%",top:"0%",left:"0%"}}/> */}
      {!(matchdet && done && done2 && done3)? (
        
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
          <br></br><br></br><br></br>

      <div style={{position:"absolute",width:"50%",height:"75%",textAlign:"center",top:"15%",backgroundColor:"white",float:"center",left:"25%"}}>
      <h4 style={{display:"block",top:"20%",textAlign:"center",width:"100%"}}>Score Comparision</h4>
      <div style={{left:"20%",border:"2px solid rgba(255, 0, 0, 1)",backgroundColor:"rgba(255, 0, 0, 0.5)",position:"absolute"}}> {matchdet[0].innings1_team}</div>
            <div style={{left:"60%",border:"2px solid rgba(0, 0, 255, 1)",backgroundColor:"rgba(0, 0, 255, 0.5)",position:"absolute"}}>{matchdet[0].innings2_team}</div>
<br></br><br></br>

          <Chart 
          data={{
            labels : range(0,20),
            datasets: [
              {
                type :"line",
                label: matchdet[0].innings1_team,
                data: y1,
                borderWidth: 2,
                pointRadius:0.5,
                borderColor:'rgba(255, 0, 0, 1)'
              },
              {
                type :"scatter",
                data: y3,
                borderWidth: 2,
                pointRadius:4,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                fill:"true",
                color:"red",
                borderColor:'rgba(255, 0, 0, 1)'

              },
              {
                type :"line",
                label: matchdet[0].innings2_team,
                data: y2,
                borderWidth: 2,
                pointRadius:0.5,
                borderColor:'rgba(0, 0, 255, 1)'

              },
              {
                type :"scatter",
                data: y4,
                borderWidth: 2,
                pointRadius:4,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                fill:"true",
                color:"blue",
                borderColor:'rgba(0, 0, 255, 1)'
              }
            ],
            options:{ maintainAspectRatio: false }
          }} height="10px" width="20px" position="relative" options={{plugins: {legend:false
            
        } }}></Chart>
        <p style={{textAlign:"center"}}><b>X-axis:</b>Overs <br></br> <b>Y-axis: </b>Runs Scored <br></br>The dots indicate fall of wickets       <br></br>  <b><font color='white'>{matchdet[0].match_winner==matchdet[0].innings1_team?matchdet[0].innings1_team:matchdet[0].innings2_team} won by {matchdet[0].win_margin} {matchdet[0].win_type}</font> </b>
</p>


</div>
        </React.Fragment>
      )}
    </div>
  );
      }
    
      


export default Score_comp;
