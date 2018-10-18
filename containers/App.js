import * as React from 'react';
import { Router } from '@reach/router';
import Login from '../components/Login';
import Home from '../components/Home';
import { navigate } from '@reach/router';

import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';

class App extends React.Component {
  state = {
    isLogin: false
  };

  handleLogin = login => {
    if (login) {
      this.setState({ isLogin: true });
      navigate('/management');
    } else {
      this.setState({ isLogin: false });
    }
  };

  render() {
    return (
      <Router basepath="/management">
        <Login onSubmit={this.handleLogin} path="login" />
        <Home isLogin={this.state.isLogin} path="/" />
      </Router>
    );
  }
}

export default App;
