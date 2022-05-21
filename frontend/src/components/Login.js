import React, { Component } from 'react';
import '../styles/css/login.css';

export default class
    extends Component {
    render() {
        return (
            <div className='gymbody'>
                <div className="login-clean">
                    <form>

                        <h2>Admin Login</h2>

                        <hr></hr>
                        <br></br>

                        <div className="illustration">
                            <i className="icon ion-ios-navigate"></i>
                        </div>

                        <div className="form-group">
                            <input className="form-control" placeholder="Username" />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <input className="form-control" placeholder="Password" />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <a href='/adminhome'><button className="btn btn-dark btnn" type="button">Login</button></a>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}