import React, { Component } from 'react';
import classes from './SignUser.module.css';

class SignIn extends Component {
  state = {
    signEmail: '',
    signPassword: '',
    error: ''
  }

  onEmailChange = (event) => {
    this.setState({ signEmail: event.target.value, error: '' });
  }

  onPasswordChange = (event) => {
    this.setState({ signPassword: event.target.value, error: '' });
  }

  onSubmit = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signEmail,
        password: this.state.signPassword
      })
    }).then(response => response.json()).then(data => {
        if(data.id){
          this.props.loadUser(data);
          this.props.onRouteChange('home');
        }

        else this.setState({ error: data })
      }).catch(err => console.log(err));

  }

  render() {
    const { onRouteChange } = this.props;
    return(
      <div className={classes.Wrapper}>
      <div className={classes.Form}>
        <legend className={classes.Title}>Sign In</legend>
          <label className={classes.Label} htmlFor="email-address">Email</label>
          <input className={classes.Input} type="email" name="email-address" onChange={this.onEmailChange} autoComplete='off' />
          <label className={classes.Label} htmlFor="password">Password</label>
          <input className={classes.Input} type="password" name="password" onChange={this.onPasswordChange} autoComplete='off' />
        <label  className={classes.Label}><input type="checkbox" /> Remember me</label>
        <input className={classes.Submit} type="submit" value="Sign in" onClick={this.onSubmit} />
        <p className={classes.Switch} onClick={() => onRouteChange('signup')} >Not registered yet?</p>
      <p className={classes.Error}>{this.state.error}</p>
    </div>
    </div>
  );
  }
}

export default SignIn;
