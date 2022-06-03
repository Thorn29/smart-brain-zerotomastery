import React from 'react';
import classes from './LinkInput.module.css';

const LinkInput = (props) => {
  return (
    <div className={classes.InputLink}>
    <p>The SmartBrain App detects faces in your images!<br/>Paste the link to your image here:</p>
    <div className={classes.InputBox}>
    <input type='text' onChange={props.inputChange} />
    <button onClick={props.submit}>Go</button>
    </div>
    </div>
  )
}

export default LinkInput;
