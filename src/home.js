import React, { Component } from 'react';
import "antd/dist/antd.css";
import Header from "./components/header";
import { newDataService } from './rx-sharing';
import axios from 'axios';
import * as apiUrls from './constants';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    componentDidMount() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('token');
        this.userDetails();
        this.getUser();
    }

    userDetails = () => {
        this.subscription = newDataService.status().subscribe(data => {
            // console.log(data);
            this.setState({ username: data });
        });
    }

    getUser() {
        axios.post(apiUrls.findUserUrl).then(
            response => {
                console.log(response.data.data.email);
                this.setState({ email: response.data.data.email });
            }
        );
    }

    render() {
        return (
            <div>
                <Header />
                <h1 className='main-heading'>Welcome!</h1>
                <h2 className='main-heading'>Login as {this.state.email}</h2>
            </div>
        )
    }
}
