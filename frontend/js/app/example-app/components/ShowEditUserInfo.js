import React from 'react';
import { connect } from 'react-redux';
import { List, Divider } from 'antd';
import axios from 'axios';

import EditUserInfoComponent from './EditUserInfoComponent';

class ShowEditUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      phone: '',
      updated: false,
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.updateSuccess = this.updateSuccess.bind(this);
  }

  componentDidMount() {
    // get the Customer info when the component mounts which
    // only occurs after successful sign in
    const { uid } = this.props;
    this.getUserInfo(uid);
  }

  componentDidUpdate() {
    const { updated } = this.state;
    const { uid } = this.props;
    if (updated) {
      this.getUserInfo(uid);
      // we reset the updated status to false
      this.setState({ updated: false });
    }
  }

  getUserInfo(pk) {
    const url = `api/customer/${pk}/`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.length === 1 && response.status === 200) {
          this.setState({
            password: response.data[0].password,
            email: response.data[0].email,
            phone: response.data[0].phone
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // callback passed to Modal (child) component
  updateSuccess() {
    this.setState({ updated: true });
  }

  render() {
    const { username } = this.props;
    const { password, email, phone } = this.state;
    return (
      <div>
        <Divider>Your Account Information</Divider>
        <List bordered>
          <List.Item>
            <b>Username:</b>
            <br />
            {username}
          </List.Item>
          <List.Item>
            <b>Email:</b>
            <br />
            {email}
          </List.Item>
          <List.Item>
            <b>Phone:</b>
            <br />
            {phone}
          </List.Item>
          <List.Item>
            <b>Password:</b>
            <br />
            {password}
          </List.Item>
        </List>
        <EditUserInfoComponent updateSuccessCallback={this.updateSuccess} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.customer.username,
    uid: state.customer.uid,
  };
};

export default connect(mapStateToProps)(ShowEditUserInfo);
