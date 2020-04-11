import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import ShoeListPage from './ShoeListPage';
import CartPage from './CartPage';
import ReviewPage from './ReviewPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ShoePage from './ShoePage';
import ShippingAddressPage from './ShippingAddressPage'
import PaymentMethodPage from './PaymentMethodPage'
import ReviewTransactionPage from './ReviewTransactionPage'

import { Layout, Menu } from 'antd';
const { Header, Content } = Layout;

/*
    TODO:
*/

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      {/* Leave the below commented out for now */}
      {/* <button type="button" onClick={() => setShowBugComponent(true)}>
        Click to test if Sentry is capturing frontend errors! (Should only work in Production)
      </button> */}
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
           <Menu.Item key="1">
            <Link className={"nav-link"} to={"/"}>Home</Link>
           </Menu.Item>
           <Menu.Item key="2">
            <Link className={"nav-link"} to={"/login/"}>Login</Link>
           </Menu.Item>
           <Menu.Item key="3">
            <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
           </Menu.Item>
         </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Switch>
            <Route exact path='/' component={ShoeListPage} />
            <Route path='/cart' component={CartPage} />
            <Route path='/store' component={ShoeListPage} />
            <Route path='/review' component={ReviewPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignupPage} />
          </Switch>
        </Content>
      </Layout>

      {showBugComponent && showBugComponent.field.notexist}
    </>
  );
};

export default Home;
