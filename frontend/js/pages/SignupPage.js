import React, { useState } from 'react';
import axios from 'axios';

// TODO:
// consider setting up form for default address

export default class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          email: ""
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      alert('A username, password, and email was submitted: ' + this.state.username + " " + this.state.password + " " + this.state.email);
      event.preventDefault();
    }

    render() {
      return (
        <div>
          <h1>Signup</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
            </label>
            <label>
              Email:
              <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
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
