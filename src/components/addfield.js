import "../App.css"
import React, { Component } from 'react';
import Header from './header';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Input, Button } from "antd";
import axios from 'axios';
const url = "http://localhost:8000/user";
const userList = "http://localhost:8000/userList";
const deleteUsers = "http://localhost:8000/delete-user";
export default class Addfield extends Component {
    constructor() {
        super();
        this.state = {
            users: [""],
            userList: []

        }
    }
    componentDidMount() {
        this.userList();
    }
    addUser() {
        this.setState({ users: [...this.state.users, ""] })
    }
    onChangeHandler(e, index) {
        this.state.users[index] = e.target.value;
        this.setState({ users: this.state.users });
    }
    onDelete(index) {
        this.state.users.splice(index, 1);
        console.log(this.state.users);
        this.setState({ users: this.state.users });
    }
    onsubmit(e) {
        const arr = [...this.state.users]
        let data = axios.post(url, arr);
        data.then(response => {
            console.log(response.data.status);
            if (response.data.status) {
                this.userList();
            }
        });
        this.setState({ users: [""] })
    }
    userList() {
        axios.get(userList).then(response => {
            console.log(response.data.data);
            this.setState({ userList: response.data.data });
        });
    }
    onDeleteData = (id) => {
        axios.post(deleteUsers, { id: id }).then(response => {
            console.log(response);
            this.userList();
        });
    }

    list() {
        const arryList = [];
        for (let ele of this.state.userList) {
            let element = (
                <>
                    <tr key={ele.id}>
                        <td>{ele.id}</td>
                        <td>{ele.username}</td>
                        <td><button className="btn btn-danger" onClick={() => { this.onDeleteData(ele.id) }}>Delete</button></td>
                    </tr>
                </>
            )
            arryList.push(element)
        }

        return arryList;
    }

    render() {
        console.log(this.state.userList);
        const formItemLayout = {
            labelCol: {
                xs: { span: 18 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 15,
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
                <Form className=".container"
                    name="basic"
                    {...formItemLayout}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10 }}
                    autoComplete="off"
                    method="post"           >
                    <h1 className="main-heading">Form!</h1>
                    {
                        this.state.users.map(
                            (user, index) => {
                                if (index === 0) {
                                    return (
                                        <Form.Item className="margin-bottom" key={index}
                                            label="Enter your name"
                                        >
                                            <Input value={user} placeholder="Username" onChange={e => { this.onChangeHandler(e, index) }} />
                                            <Button type="button" onClick={e => { this.addUser(e) }}>Add</Button>
                                        </Form.Item>
                                    )
                                } else {
                                    return (
                                        <Form.Item className="margin-bottom" key={index}
                                            label="Enter your name"
                                        >
                                            <Input value={user} placeholder="Username" onChange={e => { this.onChangeHandler(e, index) }} />
                                            <Button type="button" onClick={() => { this.onDelete(index) }}>
                                                Remove
                                            </Button>
                                        </Form.Item>
                                    )
                                }
                            }
                        )
                    }
                    <Form.Item {...tailFormItemLayout} className="margin-bottom" wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="submit" onClick={e => { this.onsubmit(e) }}>Submit</Button>
                    </Form.Item>
                </Form>
                <div>
                    <table className='table table-bordered table-sm w-50 mt-5 ms-auto me-auto'>
                        <thead>
                            <tr>
                                <th>Userid</th>
                                <th>Usernames</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.list()
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}
