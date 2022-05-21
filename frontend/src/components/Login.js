import React, { Component } from 'react';
import '../styles/css/login.css';

export default class
    extends Component {
    render() {
        return (
            <div className='loginbody'>
                <div className='container'>
                    <div className='login'>
                        <div class="q1">
                            <div class="bg-light text-dark border q2">
                                <h2>Admin Login</h2>

                                <hr></hr>
                                <br></br>

                                <form>
                                    <div className='form-group'>
                                        <label>Username</label>
                                        <input className='form-control' placeholder='Enter Username'></input>
                                    </div>

                                    <br></br>

                                    <div className='form-group'>
                                        <label>Password</label>
                                        <input className='form-control' placeholder='Enter Password'></input>
                                    </div>
                                </form>

                                <br></br>
                                <hr></hr>

                                <a href='/adminhome'><button type="submit" className='btn btn-primary'>Login</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}