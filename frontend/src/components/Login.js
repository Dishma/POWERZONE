import React, { Component } from 'react';
import '../styles/css/login.css';

export default class Login extends Component {



    render() {
        return (
            <div className='gymbody'>
                <div className="login-clean">

                    <form>

                        <h2>Admin Login</h2>

                        <hr></hr>
                        <br></br>

                        <div className="form-group">
                            <input className="form-control" type='text' placeholder="Enter Username" />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <input className="form-control" type='password' placeholder="Enter Password" />
                        </div>

                        <br></br>
                        <br></br>

                        <div className="form-group">
                            <a href='/adminhome'><button className="btn btn-dark btnn" type='submit'>Login</button></a>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}