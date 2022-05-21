import React, { Component } from 'react';
import '../styles/css/login.css';

export default class Login extends Component {

    // Validation
    /* validate = () => {
 
         let usernameError = "";
         let passwordError = "";
     
 
         if (!this.state.username) {
             usernameError = 'This field is required!';
         }
         if (!this.state.password) {
             passwordError = 'This field is required!';
         }
 
 
         if (usernameError || passwordError) {
             this.setState({ usernameError, passwordError});
 
             return false;
         }
 
         return true;
     };*/


    //Login
    login = (e) => {
        e.preventDefault();

        /*const { username, password } = this.state;

        const isValid = this.validate();
        if (isValid) {

            const data = {
                username: username,
                password: password
            }

            console.log(data)

            if (username = username && password= password) {
                window.location.href = '/adminhome';
            }
            else {
                alert('Invalid username or password.');
            }*/

        window.location.href = '/adminhome';

    }

    render() {
        return (
            <div className='gymbody'>
                <div className="login-clean">

                    <form>

                        <h2>Admin Login</h2>

                        <hr></hr>
                        <br></br>

                        <div className="form-group">
                            <input className="form-control" type='text' placeholder="Username" />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <input className="form-control" type='password' placeholder="Password" />
                        </div>

                        <br></br>
                        <br></br>

                        <div className="form-group">
                            <button className="btn btn-dark btnn" type='submit' onClick={this.login}>Login</button>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}