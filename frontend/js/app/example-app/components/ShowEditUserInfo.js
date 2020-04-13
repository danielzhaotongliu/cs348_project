import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, List, Divider } from 'antd';
import axios from 'axios';

import { setLoggedInCustomer } from '../../../reducers/customer/actions';

class ShowEditUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
    };
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    // get the Customer info when the component mounts which
    // only occurs after successful sign in
    const { uid } = this.props;
    this.getUserInfo(uid);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevPassword = prevState.password;
    const prevEmail = prevState.email;
    const { password, email } = this.state;
    const { uid } = this.props;
    if ((prevPassword && prevPassword !== password) || (prevEmail && prevEmail !== email)) {
      this.getUserInfo(uid);
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
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { username, uid } = this.props;
    const { password, email } = this.state;
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
            <b>Password:</b>
            <br />
            {password}
          </List.Item>
        </List>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setLoggedInCustomer,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowEditUserInfo);
