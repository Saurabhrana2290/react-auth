import React, { Component } from 'react';
import Header from './header';
var counter = 0;
export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    onClickMinusHandler() {
        if (counter === 0) {
            this.setState({ count: counter })
        }
        else {
            counter--;
            this.setState(
                { count: counter }
            )
        }
    }
    onClickPlusHandler() {
        counter++;
        this.setState({ count: counter })
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="minus"><button onClick={() => this.onClickMinusHandler()}>---------</button></div>
                    <div>{this.state.count}</div>
                    <div className="plus"><button onClick={() => this.onClickPlusHandler()}>+++++</button></div>
                </div>
            </div>
        )
    }
}
