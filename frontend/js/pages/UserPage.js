import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import { setLoggedInCustomer } from '../reducers/customer/actions';

import LoginPage from './LoginPage';

const styles = {
  rootContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
  },

  innerContainerStyle: {
    display: 'flex',
  },

  backButtonStyle: {
    margin: 25,
    height: 75,
    width: 110,
    display: 'flex',
    alignItems: 'center',
  },

  loginStatusStyle: {
    margin: 25,
    height: 75,
    width: 200,
    fontSize: 24,
  },

  tabStyle: {
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
  },
};

const { TabPane } = Tabs;

function tabCallBack(key) {
  console.log(`changed to tab: ${key}`);
}

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(event) {
    const { setLoggedInCustomer } = this.props;
    setLoggedInCustomer(null);
  }

  render() {
    // NOTE: this.props.username is used differently from this.state.username
    const { username } = this.props;
    return (
      <div style={styles.rootContainerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/store">
            <Button style={styles.backButtonStyle} size="large">
              <LeftOutlined />
              Store
            </Button>
          </Link>
          {username ? (
            <div style={styles.loginStatusStyle}>
              <div>Hello, {username}</div>
              <Button type="primary" onClick={this.handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div style={styles.loginStatusStyle}>Not logged in</div>
          )}
        </div>
        <div style={styles.innerContainerStyle}>
          {username ? (
            <div />
          ) : (
            <div style={styles.tabStyle}>
              <Tabs onChange={tabCallBack}>
                <TabPane tab="Sign In" key="1">
                  <LoginPage />
                </TabPane>
                <TabPane tab="Sign Up" key="2"></TabPane>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
