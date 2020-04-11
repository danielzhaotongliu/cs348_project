import React, { useState } from 'react';
import { axiosInstance } from "../axiosApi"; 

// TODO:
// - UI cleanup Login and Signup pages
// - redirect to login when refresh token:
//   1. expired(server returns 401 error):
//      This shouldn't be a problem because I set token expiration to 30 minutes
//   2. does not exist (important for presentation)
//
// - logging out (logout page, blacklisting tokens)
// - error handling for emails (server return err on duplicate username) 
// - redirect to home after login/signup/logout
// - allow home page to be viewable when not authenticated? 
// - consider adding default shipping address to signup form

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

    async handleSubmit(event) {
      event.preventDefault();

      try {
        axiosInstance.post('api/token/obtain/', {
          username: this.state.username,
          password: this.state.password
        }).then(response => {
          axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
        })
      } catch (err) {
        throw err;
      }
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
