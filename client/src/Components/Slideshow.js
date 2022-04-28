import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

const Slideshow = (props) => {    
    const renderSlide = (card, index) => {
        return (
          <Carousel.Item interval={1000} style={{backgroundColor:"white"}}>
          <img src={card.im} style={{width:"100%",backgroundColor:"white",height:props.ht}} />
            </Carousel.Item>
        );
      };
      return (
        <div style={{ position:"absolute",width: props.width,top:props.mt,left:props.ml,height:props.ht,backgroundColor:"white"}}>
          <Carousel  indicators={false} fade={props.fade} arrows= {false} >
            {props.img.map(renderSlide)}  
          </Carousel>
        </div>
      );

  };

export default Slideshow;