import React from 'react';
import classes from './Logo.module.css';
import brain from './assets/brain.png';

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
    <div className={classes.Img}><img src={brain} alt='Smart Brain' /></div>
    <h1>SmartBrain</h1>
    </div>
  )
}

export default Logo;
