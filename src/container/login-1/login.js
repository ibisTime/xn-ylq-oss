import React from 'react';
import { Form, Input, Button } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '@redux/user';
import { getKindByUrl } from 'common/js/util';
import './login.css';

const FormItem = Form.Item;

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.kind = getKindByUrl();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-body">
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <div className="login-wrap">
          <div className="login-img"></div>
          <div className="login-form">
            <div className="login-logo"></div>
            <Form onSubmit={this.handleSubmit} className="login-form-wrapper">
              <FormItem className="form-item">
                {getFieldDecorator('loginName', {
                  rules: [{
                    required: true,
                    message: '请输入用户名!'
                  }]
                })(
                  <Input placeholder="用户名"/>
                )}
              </FormItem>
              <FormItem className="form-item">
                {getFieldDecorator('loginPwd', {
                  rules: [{
                    required: true,
                    message: '请输入密码!'
                  }]
                })(<Input type="password" placeholder="密码"/>)}
              </FormItem>
              <FormItem className="button-wrap">
                <Button type="primary" htmlType="submit" loading={this.props.fetching}
                        className="login-form-button">登录</Button>
              </FormItem>
            </Form>
            {
              this.kind === 'P' ? null : (
                <div className="bottom-tip">
                  <div className="tip-border"></div>
                  <div className="tip-text">没有帐号？<Link to='/register'>去注册</Link></div>
                  <div className="tip-border"></div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
