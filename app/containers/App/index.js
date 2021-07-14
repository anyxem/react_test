/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import HomePage from 'containers/HomePage/Loadable';
import BookPage from 'containers/BookPage/Loadable';
import CandlesPage from 'containers/CandlesPage/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

const { Header, Footer, Content } = Layout;

export default function App() {
  return (
    <>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="Home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="candless">
              <Link to="/candles">Candles</Link>
            </Menu.Item>
            <Menu.Item key="book">
              <Link to="/book">Book</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/candles" component={CandlesPage} />
            <Route exact path="/book" component={BookPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Test task</Footer>
        <GlobalStyle />
      </Layout>
    </>
  );
}
