
import React, {useState, useEffect} from 'react';
import 'chart.js/auto';

import '../CSS/Match.css'
import Select from 'react-select';
import Summary from './Summary';
import '../CSS/rotateimage.css'

const Scorecard = (props) => {
  const [trainName,setTrainName] = useState(false);
    const [train,setTrain]=useState("0000");
    
    useEffect(() => {
        setTimeout(() => {
            let data1 = [];
            fetch("http://localhost:5000/all_trains")
                .then((res) => res.json())
                .then(
                    (json) => {
                        for(var i=0;i<json.length;i++){ 
                            data1.push({
                                "label":json[i]["train_name"] ,
                                "value":json[i]["train_no"]});
                        } 
                    } 
                );
            setTrainName(data1);
        }, 0);
    },[] );


    return (
        <>
            {
            !(trainName) 
                ? 
                    (
                        <></>
                    ) 
                : 
                (
                    <React.Fragment>
                        <div style={{position:"absolute",width:"100%",height:"90%"}}>
                            
                            <Select
                                options={trainName}
                                search
                                onChange={train=>{
                                        setTrain(train.value);
                                        console.log(train);
                                    }}
                                
                                placeholder="Select train name or number"
                            />
                            <Summary train_no={train }/>
                                                    </div>
                    </React.Fragment>
                )
            }
        </>);
}

export default Scorecard;
