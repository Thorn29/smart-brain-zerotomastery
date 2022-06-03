import React, { Component } from 'react';
import classes from './SignUser.module.css';

class SignUp extends Component {
  state = {
    newName: '',
    newEmail: '',
    newPassword: '',
    error: ''
  }

  onNameChange = (event) => {
    this.setState({ newName: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({ newEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({ newPassword: event.target.value})
  }

  onSubmit = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.newName,
        email: this.state.newEmail,
        password: this.state.newPassword
      })
    }).then(response => response.json()).then(data => {
      if (data.id) {
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
        <legend className={classes.Title}>Create an account</legend>
          <label className={classes.Label} htmlFor="name">Name</label>
          <input className={classes.Input} type="text" name="name" onChange={this.onNameChange} autoComplete='off' />
          <label className={classes.Label} htmlFor="email-address">Email</label>
          <input className={classes.Input} type="email" name="email-address" onChange={this.onEmailChange} autoComplete='off' />
          <label className={classes.Label} htmlFor="password">Password</label>
          <input className={classes.Input} type="password" name="password" onChange={this.onPasswordChange} autoComplete='off' />
        <input className={classes.Submit} type="submit" value="Register" onClick={this.onSubmit} />
        <p className={classes.Switch} onClick={() => onRouteChange('signin')} >Already got an account?</p>
        <p className={classes.Error}>{this.state.error}</p>
    </div>
    </div>
  );
  }
}

export default SignUp;
