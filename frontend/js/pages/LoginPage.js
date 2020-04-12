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

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          failed: false,
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
        if (response.data.length == 1 && response.status === 200) {
            // update username and uid in Redux state
            this.props.setLoggedInCustomer(response.data[0].username, response.data[0].uid);
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
