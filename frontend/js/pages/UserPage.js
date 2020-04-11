import React from 'react';
import axios from 'axios';
import { Button, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { LeftOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return (
      <div style={styles.rootContainerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/store">
            <Button style={styles.backButtonStyle} size="large">
              <LeftOutlined />
              Store
            </Button>
          </Link>
        </div>
        <div style={styles.innerContainerStyle}>
            {this.state.isLoggedIn ?
                <div />
            :
                <div />
            }
        </div>
      </div>
    );
  }
}

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
};
