import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { setLoggedInCustomer } from '../../../reducers/customer/actions';

const styles = {
  loginStatusStyle: {
    margin: 25,
    height: 75,
    width: 200,
    fontSize: 24,
  },
};

class LoginStatusComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(event) {
    const { setLoggedInCustomer } = this.props;
    setLoggedInCustomer(null, null);
  }

  render() {
    const { username } = this.props;
    return (
      <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatusComponent);
