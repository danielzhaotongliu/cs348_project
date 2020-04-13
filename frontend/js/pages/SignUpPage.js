import React, { useState } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setLoggedInCustomer } from '../reducers/customer/actions';

const styles = {
  formStyle: {
    display: 'table-caption',
  }
}

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      phone: '',
      failed: false,
      twofa: false,
      otp: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('api/customer/', {
        username: this.state.username,
        password: this.state.password,
        phone: this.state.phone,
        email: this.state.email,
      });
      if (response.status === 200) {
        // update username in Redux state
        // NOTE: sign up automatically sign in the user
        if (response.data.otp.length != 0) {
          this.setState({ otp: response.data.otp, twofa: true })
        } else {
          this.props.setLoggedInCustomer(response.data.username, response.data.uid);
        }
      } else {
        this.setState({ failed: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ failed: true });
    }
  }

  render() {
    return (
      <div style={styles.formStyle}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
                    <input name="username" type="text" value={this.state.username} onChange={this.handleChange} required />
          </label>
          <label>
            Email:
                    <input name="email" type="email" value={this.state.email} onChange={this.handleChange} required />
          </label>
          <label>
            Phone:
                    <input name="phone" type="tel" value={this.state.phone} onChange={this.handleChange} required />
          </label>
          <label>
            Password:
                    <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.failed ? <div>Username already exists, please choose another one.</div> : <div />}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    username: state.customer.username,
    uid: state.customer.uid,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
