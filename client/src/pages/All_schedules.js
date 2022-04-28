import React, { useState,useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker,Markers,Line } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { port } from './port';
/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
* Looking topojson for other countries/world? 
* Visit: https://github.com/markmarkoh/datamaps
*/
const INDIA_TOPO_JSON = require('./india.topo.json');

const PROJECTION_CONFIG = {
  scale: 1000,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  
  '#57bb8a',
  '#63b682',
  '#73b87e',
  '#84bb7b',
  '#94bd77',
  '#a4c073',
  '#b0be6e',
  '#c4c56d',
  '#d4c86a',
  '#e2c965',
  '#f5ce62',
  '#f3c563',
  '#e9b861',
  '#e6ad61',
  '#ecac67',
  '#e9a268',
  '#e79a69',
  '#e5926b',
  '#e2886c',
  '#CD5C5C',
  '#DC143C',
  '#B22222',
  '#A52A2A',
  '#FF0000',
  '#8B0000'

];
const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};
const DEFAULT_COLOR = '#EEE';

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

// will generate random heatmap data on every call

const All_schedules=()=> {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(false);
  const [data1, setData1] = useState(false);
  const [datax, setData2] = useState(false);
  const [x,setX] = useState('');
  const [y,setY] = useState(0);
  var prev_train=0;
  const [A,setA] = useState(false);
  const [markers,setMarkers]=useState(false);
  const [token,setToken]=useState(localStorage.getItem("token"));
  if((token==null)||(token=="")){
    window.location= "/login";
  }
  useEffect(() => {
    setTimeout(() => {
      const jsonData={"token":token};
        let data1 = [];
        let data2 = [];
        let data3 = [];
        fetch("http://localhost:"+port+"/all_schedule",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(jsonData)
      })
            .then((res) => res.json())
            .then(
                (json) => {
                  if(!(json.hasOwnProperty('token') )){
                    for(var i=0;i<json.length;i++){ 
                        data1.push({
                          "markerOffset": 0,
                          "name":json[i]["station_name"],
                          "coordinates": [json[i]["a"], json[i]["b"]],
                          "val":json[i]["x"],
                          
                        });
                        data2.push([
                          json[i]["lat"], json[i]["long"]
                        ]);
                        if(json[i]["train_no"]!==prev_train){
                            data3.push(data2);
                            data2=[];
                        }
                        prev_train=json[i]["train_no"];
                        
                    } 
                  }
                  else{
                    // setToken("");
                    localStorage.setItem("token","");
                    window.location="/login";
                }
                } 
            );
        setMarkers(data1);
        setData2(data3);
        console.log(datax);
        console.log("i am done");
    }, 0);
  },[] );
 

  
  console.log(datax);
  console.log([[1,3],[5,6],[8,9]]);
  console.log(markers);
  return (<>
    {
    !(markers && datax ) 
        ? 
            (
                <></>
            ) 
        : 
        (
    <div className="full-width-height container" >
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                //console.log(geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={DEFAULT_COLOR}
                    style={geographyStyle}
                  />
                );
              })
            }
          </Geographies >
          {console.log("hello mohith")}
          {console.log(Array.from(datax))}
          
      {datax.map((row)=>(
      console.log(row)
      ))}
        </ComposableMap>
        {A && <h1>Station Name = {x} Num trains = {A}</h1>}
    </div>
   )
  }
</>);
}

export default All_schedules;