import * as React from 'react';
import Login from 'ant-design-pro/lib/Login';
import { Alert, Row, Col } from 'antd';
import { loginUrl } from '../../constants/url';


const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginForm extends React.Component {
  state = {
    notice: '',
    type: 'tab1',
    isLogin: false
  };

  onSubmit = (err, values) => {
    if (this.state.type === 'tab1') {
      this.setState(
        {
          notice: ''
        },
        () => {
          if (!err) {
            fetch(loginUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: values.username,
                password: values.password
              })
            })
              .then(res => res.json())
              .then(res => {
                if (res.error) {
                  this.setState({
                    notice: 'username or password error',
                    isLogin: false
                  });
                  this.props.onSubmit(false);
                } else {
                  this.setState({
                    isLogin: true
                  });
                  this.props.onSubmit(true);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      );
    }
  };
  onTabChange = key => {
    this.setState({
      type: key
    });
  };
  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={20} sm={16} lg={10}>
          <Login
            defaultActiveKey={this.state.type}
            onTabChange={this.onTabChange}
            onSubmit={this.onSubmit}
          >
            <Tab key="tab1" tab="Account">
              {this.state.notice && (
                <Alert
                  style={{ marginBottom: 24 }}
                  message={this.state.notice}
                  type="error"
                  showIcon
                  closable
                />
              )}
              <UserName name="username" />
              <Password name="password" placeholder="password" />
            </Tab>
            <div>
              <a style={{ float: 'right' }} href="">
                Forgot password
              </a>
            </div>
            <Submit>Login</Submit>
          </Login>
        </Col>
      </Row>
    );
  }
}

export default LoginForm;
