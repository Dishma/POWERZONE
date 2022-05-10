import React, { Component } from "react";
import axios from "axios";






export default class CreateDriver extends Component {

    constructor(props) {
        super(props);
        this.state = {

            fName: "",
            lName: "",
            age: "",
            address: "",

            fNameError: "",
            lNameError: "",
            ageError: "",
            addressError: ""
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    validate = () => {

        let fNameError = "";
        let lNameError = "";
        let ageError = "";
        let addressError = "";


        if (!this.state.fName) {
            fNameError = 'First Name cannot be Empty!';
        }
        if (!this.state.lName) {
            lNameError = 'Last Name cannot be Empty!';
        }
        if (!this.state.age) {
            ageError = 'Age cannot be Empty!';
        }
        if (!this.state.address) {
            addressError = 'Address cannot be Empty!';
        }

        if (fNameError || lNameError || ageError || addressError) {
            this.setState({ fNameError, lNameError, ageError, addressError });
            return false;
        }
        return true;
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { fName, lName, age, address } = this.state;

        const isValid = this.validate();
        if (isValid) {

            const data = {

                fName: fName,
                lName: lName,
                age: age,
                address: address
            }
            console.log(data)

            axios.post("/driver/save", data).then((res) => {
                if (res.data.success) {
                    alert("Employee Added!")
                    this.setState(
                        {

                            fName: "",
                            lName: "",
                            age: "",
                            address: ""
                        }
                    )
                }
            })
        }
    }

    render() {
        return (

            <div className="createdriver">



                <div>

                    <a className="nav-link" href="/adminhome">Admin Home Page</a>
                    <a className="nav-link" href="/homedriver">All Employees</a>

                </div>



                <div className="col-md-8 mt-4 mx-auto">



                    <div className="col-md-8 mt-4 mx-auto"><h1 className="text-danger">Create new Employees</h1></div>

                    <form className="needs-validation" noValidate>



                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>First Name</label>
                            <input type="text"
                                className="form-control"
                                name="fName"
                                value={this.state.fName}
                                onChange={this.handleInputChange} ></input>
                            <div style={{ fontSize: 20, color: "red" }}>{this.state.fNameError}</div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Last Name</label>
                            <input type="text"
                                className="form-control"
                                name="lName"
                                value={this.state.lName}
                                onChange={this.handleInputChange} ></input>
                            <div style={{ fontSize: 20, color: "red" }}>{this.state.lNameError}</div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Age</label>
                            <input type="number"
                                className="form-control"
                                name="age"
                                value={this.state.age}
                                onChange={this.handleInputChange} ></input>
                            <div style={{ fontSize: 20, color: "red" }}>{this.state.ageError}</div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Address</label>
                            <input type="text"
                                className="form-control"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleInputChange} ></input>
                            <div style={{ fontSize: 20, color: "red" }}>{this.state.addressError}</div>
                        </div>

                        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
                            <i className="far fa-save"></i>&nbsp; Save
                        </button>

                    </form>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>

        )
    }
}