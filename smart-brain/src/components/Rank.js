import React from 'react';
import classes from './Rank.module.css';

const Rank = ({ currentUser }) => {
  return (
    <div className={classes.Rank}>
    <p>Hello {currentUser.name}. You made <strong>{currentUser.entries}</strong> entries so far.</p>
    </div>
  )
}

export default Rank;
