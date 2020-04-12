import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import { setLoggedInCustomer } from '../reducers/customer/actions';
import LoginStatusComponent from '../app/example-app/components/LoginStatusComponent';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

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
  }

  render() {
    // NOTE: this.props.username is used differently from this.state.username
    // this.props.username effective emulates the logged in user using Redux state,
    // when this value is not null (set by Sign Up or Sign In),
    // the status displays "Hello, <username>" and shows a "Sign Out"
    // button, when on clicks that button, it sets the value of this.props.username to null
    // in the redux state.
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
          <LoginStatusComponent />
        </div>
        <div style={styles.innerContainerStyle}>
          {username ? (
            <div> <p> Hello </p> </div>
          ) : (
            <div style={styles.tabStyle}>
              <Tabs onChange={tabCallBack}>
                <TabPane tab="Sign In" key="1">
                  <LoginPage />
                </TabPane>
                <TabPane tab="Sign Up" key="2">
                  <SignUpPage />
                </TabPane>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
