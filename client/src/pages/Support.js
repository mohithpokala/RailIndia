import React, { useState,useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker,Markers } from 'react-simple-maps';
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

const Example=()=> {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(false);
  const [data1, setData1] = useState(false);
  const [data2, setData2] = useState(false);
  const [x,setX] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [y,setY] = useState(0);
  const [A,setA] = useState(false);
  const [markers,setMarkers]=useState(false);
  const [token,setToken]=useState(localStorage.getItem("token"));
  const [type,setType]=useState("Number of stations");
  if((token==null)||(token=="")||(token=="No Token")){
    window.location= "/login";
}
  useEffect(() => {
    setTimeout(() => {
      const jsonData={"token":token};
        let data1 = [];
        fetch("http://localhost:"+port+"/big_cities",{
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
                          "city":json[i]["city"],
                          "state":json[i]["state"]
                        });
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
    }, 0);
  },[] );
  useEffect(() => {
    setTimeout(() => {
      const jsonData={"token":token};
        let data1 = [];
        fetch("http://localhost:"+port+"/train_state_stat",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(jsonData)
      })
            .then((res) => res.json())
            .then(
                (json) => {
                  if(!(json.hasOwnProperty('token') )){
                    setData(json);   setData1(json);  
                  }
                    else{
                      // setToken("");
                      localStorage.setItem("token","");
                      window.location="/login";
                  }
                  } 
            );
        
        

    }, 0);
  },[] );

  useEffect(() => {
    setTimeout(() => {
      const jsonData={"token":token};
        let data1 = [];
        fetch("http://localhost:"+port+"/train_state_stat2",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(jsonData)
      })
            .then((res) => res.json())
            .then(
                (json) => {
                  if(!(json.hasOwnProperty('token') )){
                    setData(json); setData2(json);  
                               }
                               else{
                                // setToken("");
                                localStorage.setItem("token","");
                                window.location="/login";
                            }
                                        } 
            );

    }, 0);
  },[] );
  const onMouseEnter = (geo, current) => {
    if(current) return () => {
      setTooltipContent(`${geo.properties.name}: ${current["count"]}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  if( !((token==null)||(token=="")||(token=="No Token")))

  return (<>
    {
    !(markers && data) 
        ? 
            (
                <></>
            ) 
        : 
        (
    <div className="full-width-height container" style ={{height:"70%",top:"0%",width:"50%",left:"25%",position:"absolute"}} >
      <button onClick={()=>{
          y?setData(data2):setData(data1);
          y?setType("Number of trains"):setType("Number of stations");
          setY(1-y);
        }}>Heat map on {type}</button>
        
      {x ? <p>Station Name = {x} Num trains = {A}</p>:<p>Hover on the stations to display station info</p>}
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                var current;
                // console.log(x);
                data.map((x) =>{
                  // console.log(x, geo, "trtr");
                  if(x["state"]===geo["id"] || geo["id"]==="Telangana" && x["state"]==="Andhra Pradesh")
                    current = x;
                });
                // console.log(current, "ewer");
                // console.log(geo);
                const colorScale =
                  scaleQuantile()
                  .domain(data.map(d => (d["count"])))
                  .range(COLOR_RANGE);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.count):DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies >
          {markers.map(({ name, coordinates, markerOffset,val,city,state }) => (
            <Marker key={name} coordinates={coordinates}>
              <g
                fill="black"
                stroke="#FF5533"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                onMouseEnter={()=>{setX(name);setA(val);setCity(city);setState(state);}}
                onMouseLeave={()=>{setX('');setA(false);setCity('');setState('');}}
              >
                
            <circle cx="0" cy="0" r="5" />
              </g>
          
        </Marker>
      ))}
        </ComposableMap>
    </div>
   )
  }
</>);
}

export default Example;