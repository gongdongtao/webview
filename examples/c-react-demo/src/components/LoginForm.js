import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';


class LoginForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.history.push('/');
          }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Password"
                    />,
                )}
                </Form.Item>
                <div className="login-form-checks">
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('auto', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(<Checkbox>自动登录</Checkbox>)}
                    </Form.Item>
                </div>
                <Form.Item className="login-btn-item">
                    <Button shape="round" type="primary" htmlType="submit" className="login-form-button">立即登录</Button>
                </Form.Item>
                <Form.Item>
                    <Checkbox>同意《用户许可协议》《隐私政策》</Checkbox>
                </Form.Item>
                <div className="forget">
                    <span>忘记密码</span>
                    <span className="divi">/</span>
                    <span>注册账号</span>
                </div>
            </Form>
        )
    }
}

export default Form.create()(LoginForm);
