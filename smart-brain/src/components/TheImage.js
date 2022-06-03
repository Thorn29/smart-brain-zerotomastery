import React from 'react';
import classes from './TheImage.module.css';
import errorimg from './assets/err.png';

const TheImage = (props) => {

  const errorFun = () => {
    document.getElementById('mainImg').src = errorimg;
  }

  return (
    <div className={props.source === '' ? classes.None : classes.Image}>
    <img id='mainImg' src={props.source} alt='' onError={errorFun} />
    {props.children}
    </div>
  );
}

export default TheImage;
