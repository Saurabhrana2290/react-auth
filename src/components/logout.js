import React, { Component } from 'react';

export default class Logout extends Component {
    logout(){
        localStorage.clear();
        window.location.href = '/login';
    }
    render() {
        return (
            <div>
                <button className='btn btn-light btn-sm ml-auto' onClick={this.logout}>Logout</button>
            </div>
        )
    }
}
