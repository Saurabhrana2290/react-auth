import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, notification } from "antd";
import Header from "./components/header";
import axios from 'axios';
import * as apiUrls from './constants';
import { Redirect } from 'react-router-dom';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    render() {
        const onFinish = (values) => {
            console.log("values", values);
            axios.post(apiUrls.registerUserUrl,values).then(response=>{
                if(response.data.status){
                    this.setState({redirect: true})
                    notification.open({
                        message: 'Registered Successfully!',
                        onClick: () => {
                          console.log('Notification Clicked!');
                        },
                      });
                }else{
                    notification.open({
                        message: 'Email or phone number is already registered!',
                        onClick: () => {
                          console.log('Notification Clicked!');
                        },
                      });
                }
        });
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
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
        if(this.state.redirect){
            return <Redirect to='/login'/>
        }

        return (
            <div>
                <Header/>
                <Form name="basic"
                    {...formItemLayout}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10 }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    action='login.js'
                    method="post"
                >
                    <h1 className="main-heading">{this.props.heading}</h1>
                    {/* <Form.Item className="margin-bottom" label="Username" name="username"
                        rules={[
                            { required: true, message: "Please enter your username!" },
                            { pattern: /^\S*$/, message: "No spaces allowed" },
                            { pattern: /^[-.@_a-z0-9]+$/gi, message: "Only . - @ _ are allowed" }
                        ]}>
                        <Input />
                    </Form.Item> */}
                    <Form.Item label="Name" name="name"
                        rules={[
                            {
                              required: true,
                              message: 'Please input your Name',
                            },
                          ]}
                    >
                        <Input/>
                    </Form.Item>

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
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' },
                        {pattern:/^[a-zA-Z0-9!@#$%^&*]{6,16}$/ , message: "Password should contain one special character and one number!"},
                        {min:8, message: "Length must be 8!"} 
                    ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^[0-9]+$/, message: "Only 0-9 numbers are allowed" },
                            { len: 10, message: "Phone number should have 10 digits!" }
                        ]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout} className="margin-bottom" wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form >
            </div>
        )
    }
}

