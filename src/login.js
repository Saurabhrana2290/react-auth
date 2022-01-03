import React, { Component } from 'react';
import Header from './components/header';
import "antd/dist/antd.css";
import { Form, Input, Button, notification } from "antd";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as apiUrls from './constants';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            logged: false
        }
    }

    onFinish = (values) => {
        axios.post(apiUrls.loginUserUrl, values).then(response => {
            if (response.data.status) {
                console.log(response.data.message);
                let token = response.data.token;
                localStorage.setItem('token', token)
                this.setState({ redirect: true, logged: true });
                console.log(`logged state>>>>>>>>>${this.state.logged}`);
                notification.open({
                    message: 'Login successfully!',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            } else if (response.data.message == 'no user') {
                notification.open({
                    message: 'No user exist with this email!',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            } else if (response.data.message == 'incorrect password') {
                notification.open({
                    message: 'Incorrect password!',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
        });
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <div>

                <Header logged={this.state.logged} />
                <Form name="basic"
                    {...formItemLayout}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10 }}
                    autoComplete="off"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    method="post"
                >
                    <h1 className="main-heading">{this.props.heading}</h1>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' },
                        { pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, message: "Password should contain one special character and one number!" },
                        { min: 8, message: "Length must be 8!" }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout} className="margin-bottom" wrapperCol={{ span: 12, offset: 6 }}>
                        <Button className='btn-center' type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form >
            </div>
        )
    }
}
