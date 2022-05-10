import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className='container' style={{padding: '200px 300px 200px 300px'}}>

                <body class="text-center">
                    <main class="form-signin">
                        <form>
                            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                            <div class="form-floating">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <br />
                            <div class="form-floating">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <br />
                            <div class="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                </label>
                            </div>
                            <button class="btn btn-dark"><a href='/adminhome' style={{color: 'white'}}>Sign in</a></button>
                        </form>
                    </main>
                </body>
                <br/><br/><br/>

            </div>
        )
    }
}
