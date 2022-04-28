
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






const Venue_stat = (props) => {

    const [season,setSeason]=useState(false);
    const [average,setAvg]=useState(false);
    const [pie, setPie] = useState(false);


    const [done, setdone] = useState(false);
    const [done2, setdone2] = useState(false);

    const venue_id = props.venue_id;


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
            fetch("http://localhost:5000/venue/b/"+venue_id)
                .then((res) => res.json())
                .then((json) => {
                    if(json.length==0)
                    {
                        setPie(false);
                    }
                    else  
                    {
                        setPie(
                  {
                    maintainAspectRatio: false,
                    responsive: false,
                    labels: ["Team batting 1st won", "Team batting 2nd won"],
                    datasets: [
                      {
                        data: [json[0].batwin,json[0].bowlwin],
                        backgroundColor: ["rgba(255,0,0,1)","rgba(0,255,0,1)"],
                        hoverBackgroundColor: ["rgba(255,0,0,0.7)","rgba(0,255,0,0.7)"],hoverOffset:8
                      }
                    ]
                  }
  
                  );}
                  setdone2(true);
                });
        }, 2000);
    }, []);


  useEffect(() => {
    setTimeout(() => {
        let s = [];
        let a = [];
        fetch("http://localhost:5000/venue/c/"+venue_id)
            .then((res) => res.json())
            .then((json) => {
                for(var i=0;i<json.length;i++){
                    s.push(json[i]['season_year']);
                    a.push(parseFloat(json[i]['avg']));
                    
                  }
                  console.log(a);

              setSeason(s);
              setAvg(a);
              setdone(true);
            });            
    }, 2000);
}, []);
function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

let chartInstance = null;

  return (
    <div style={{width:"100%",top:"8%",position:"fixed",height:"92%",overflowY:"scroll"}}>
{/*       
      <img src={im3} style={{width:"100%",position:"absolute",height:"110%",top:"0%",left:"0%"}}/> */}
      {!(season && average && done && done2 )? (
        
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

      <div style={{position:"absolute",width:"50%",height:"75%",textAlign:"center",top:"20%",backgroundColor:"white",float:"center",left:"25%"}}>
      <h4 style={{display:"block",top:"20%",textAlign:"center",width:"100%"}}>Venue Statistics</h4>

          <Chart 
          data={{
            labels : season,
            datasets: [
              {
                type :"line",
                label: "Average Total",
                data: average,
                borderWidth: 2,
                pointRadius:0.5,
                borderColor:'rgba(0, 0, 255, 1)'
              }
            ],
            options:{ maintainAspectRatio: false }
          }} height="10px" width="20px" position="relative" options={{plugins: {
            title: {
                display: true,
                text: 'Average total Vs Season year',
                color:'blue',
                font:'bold 15px'
            },
            scales: [
                {
                  title: { 
                    
                              display:true,
                              text: 'Runs Scored',
                              color:'red',
                              font:'bold 15px'
                            }
                }


            ]
          //    {y: 
          //       {
          //         title: { 
                    
          //           display:true,
          //           text: 'Runs Scored',
          //           color:'red',
          //           font:'bold 15px'
          //         },
          //         ticks: {
          //           callback: function (value, index, values) {return value;}}}
          // }
        } }}></Chart>
        <p>X-axis:Season Year  Y-axis:Average Total <br></br>
</p>

{pie?(
    <div style={styles.relative}>


<div style={styles.pieContainer}>
  <h2>{"Outline"}</h2>
  <Doughnut
    data={pie}
    options={{tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat((currentValue/total*100).toFixed(1));
          return currentValue + ' (' + percentage + '%)';
        },
        title: function(tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        }
      }
    
  }}}
    ref={input => {
      chartInstance = input;
    }}
  />
  
</div>


<div id="legend" />
</div>
    
):(<div>No Team has won a match winning the toss in this venue</div>)}
        
{/* <div style={styles.relative}>


<div style={styles.pieContainer}>
  <h2>{"Outline"}</h2>
  <Pie
    data={pie}
    options={options}
    ref={input => {
      chartInstance = input;
    }}
  />
  
</div>


<div id="legend" />
</div> */}


        </div>
        </React.Fragment>
      )}
    </div>
  );
      }
      const styles = {
        pieContainer: {
          width: "50%",
          height: "50%",
          top: "60%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)"
        },


        relative: {
          position: "relative"
        }
      };
      


export default Venue_stat;
