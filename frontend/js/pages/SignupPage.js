import React, { useState } from 'react';
import { axiosInstance } from '../axiosApi';

// TODO:
// consider setting up form for default shipping address

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

    async handleSubmit(event) {
      event.preventDefault();

      try {
        const response = await axiosInstance.post('api/customer/create/', {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        });
      } catch (error) {
        console.log(error.stack);
      }
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
