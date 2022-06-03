import React from 'react';
import classes from './Navigation.module.css';
import Logo from './Logo';
import Tilt from 'react-tilt'

const Navigation = (props) => {

  const signout = props.signedIn ? <p onClick={() => props.onRouteChange('signin')}>Sign Out</p> : null;

  return (
    <nav className={classes.Nav}>
    <Tilt options={{ max: 35 }}>
    <Logo />
    </Tilt>
    {signout}
    </nav>
  )
}

export default Navigation;
