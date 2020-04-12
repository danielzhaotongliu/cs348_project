import React, { useState } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setLoggedInCustomer } from '../reducers/customer/actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          failed: null,
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
        const response = await axios.get('api/customer/', {
            params:{
                username: this.state.username,
                password: this.state.password,
            }
        });
        if (response.data.length != 1) {
            this.setState({ failed: true });
        } else {
            // update username in Redux state
            this.props.setLoggedInCustomer(response.data[0].username);
        }
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input name="username" type="text" value={this.state.username} onChange={this.handleChange} required/>
            </label>
            <label>
              Password:
              <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
          {this.state.failed ? <div>Username or Password is incorrect or does not exist</div> : <div />}
        </div>
      )
    }
};

const mapStateToProps = (state) => {
    return {
      username: state.customer.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        setLoggedInCustomer,
      },
      dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
