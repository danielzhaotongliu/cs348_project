import React, { useState } from 'react';
import axios from 'axios';

// TODO:
// - login form
// - passing token to global state
// - redirect to login when token expired (server returns 401 error). This shouldn't be a problem because I set token expiration to 30 minutes
// - logout page

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: ""
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
      event.preventDefault();
    }

    render() {
      return (
        <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
            </label>
            <label>
              Password:
              <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      )
    }
};
