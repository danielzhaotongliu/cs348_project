import React, { useState } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      failed2fa: false,
      twofa: false,
      otp: '',
      user_otp: '',
      uid: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handle2fa = this.handle2fa.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClose() {
    this.setState({ twofa: false, failed2fa: true })
  }

  handle2fa(event) {
    event.preventDefault();
    if (this.state.user_otp === this.state.otp) {
      this.setState({ twofa: false })
      this.props.setLoggedInCustomer(this.state.username, this.state.uid);
    } else {
      this.setState({ twofa: false, failed2fa: true })
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.setState({ failed: false, failed2fa: false });
      const response = await axios.post('api/customer/', {
        username: this.state.username,
        password: this.state.password,
        phone: this.state.phone,
        email: this.state.email,
      });
      if (response.status === 200) {
        // update username in Redux state
        // NOTE: sign up automatically sign in the user
        if (response.data.otp != undefined) {
          this.setState({ otp: response.data.otp, twofa: true, uid: response.data.uid })
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
                    <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Phone:
                    <input name="phone" type="tel" value={this.state.phone} onChange={this.handleChange} />
          </label>
          <label>
            Password:
                    <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.failed ? <div style={{ color: 'red' }}>Username already exists, please choose another one.</div> : <div />}
        {this.state.failed2fa ? <div style={{ color: 'red' }}>Failed 2FA Verification</div> : <div />}
        <Modal show={this.state.twofa} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Phone Verification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handle2fa}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Please enter the 6-digit code sent to your phone.</Form.Label>
                <Form.Control name="user_otp" value={this.state.user_otp} onChange={this.handleChange} type="text" placeholder="123456" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
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
