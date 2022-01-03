import React, { Component } from 'react';
import Header from './header';
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";

export default class Localst extends Component {
    userData;
    constructor(props) {
        super(props);
        this.state= {
            username:'',
            password:''
        }
    }

    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('userInfo'));

        if (localStorage.getItem('userInfo')) {
            this.setState({
                username: this.userData.username,
                password: this.userData.password
            })
        } else {
            this.setState({
                username:'',
                password:''
            })
        }
    }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('userInfo', JSON.stringify(nextState));
    }

    onFinish = (values) => {
        this.setState({
            username: values.username,
            password: values.password
        });
        console.log(values);
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
        return (
            <div>
                <Header />
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
                    <Form.Item className="margin-bottom" label="Username" name="username"
                        rules={[
                            { required: true, message: "Please enter your username!" },
                            { pattern: /^\S*$/, message: "No spaces allowed" },
                            { pattern: /^[-.@_a-z0-9]+$/gi, message: "Only . - @ _ are allowed" }
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
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form >
            </div>
        )
    }
}
