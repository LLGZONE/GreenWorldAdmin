import * as React from 'react';
import { Layout } from 'antd';
import Menu from '../Menu';
import Recycle from '../../containers/Recycle';
import Users from '../../containers/Users';
import { Redirect } from '@reach/router';
import './index.css';

const { Header, Content, Footer, Sider } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false,
    activeId: 0
  };

  setActiveId = id => {
    this.setState({ activeId: id });
  };

  menuItems = [
    {
      key: 0,
      title: '回收登记',
      component: <Recycle />,
      type: 'user'
    },
    {
      key: 1,
      title: '人员信息',
      component: <Users />,
      type: 'team'
    }
  ];

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <React.Fragment>
        {!this.props.isLogin && <Redirect noThrow to="/management/login" />}
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu setActiveId={this.setActiveId} menuItems={this.menuItems} />
          </Sider>
          <Layout>{this.menuItems[this.state.activeId].component}</Layout>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Home;
