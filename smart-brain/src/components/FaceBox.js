import React from 'react';
import classes from './FaceBox.module.css';

const FaceBox = (props) => {
  return (
    <div className={classes.FaceBox} style={{ width: props.width + 'px', height: props.height + 'px', top: props.top + 20 + 'px', left: props.left + 20 + 'px' }}>
    </div>
  )
}

export default FaceBox;
