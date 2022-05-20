import React, { Component } from 'react';
import axios from 'axios';

export default class EditPlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planName: "",
      price: "",
      duration: ""
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/workoutplan/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          planName: res.data.workoutplan.planName,
          price: res.data.workoutplan.price,
          duration: res.data.workoutplan.duration
        });

        console.log(this.state.workoutplan);
      }
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  // Validation
  validate = () => {

    let planNameError = "";
    let priceError = "";
    let durationError = "";



    if (!this.state.planName) {
      planNameError = 'This field is required!';
    }
    if (!this.state.price) {
      priceError = 'This field is required!';
    }
    if (!this.state.duration) {
      durationError = 'This field is required!';
    }


    if (planNameError || priceError || durationError) {
      this.setState({ planNameError, priceError, durationError });
      return false;
    }
    return true;
  };

  //Edit
  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

    const { planName, price, duration } = this.state;

    const isValid = this.validate();
    if (isValid) {

      const data = {
        planName: planName,
        price: price,
        duration: duration
      }
      console.log(data)

      axios.put(`/workoutplan/update/${id}`, data).then((res) => {
        if (res.data.success) {
          alert("Updated Successfully");

          this.setState(
            {
              planName: "",
              price: "",
              duration: ""
            }
          );

          window.location.href = '/workoutplans';
        }
      });
    }
  }

  render() {
    return (
      <div className='container' style={{ marginBottom: '75px' }}>
        <div className='col-md-8 mt-4 mx-auto'>
          <center><h1 className='h3 mb-3 font-weight-normal'>Edit Plan Details</h1></center>

          <form className='needs-validation' noValidate>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Plan Name</label>
              <input type='text' className='form-control' name='planName' placeholder='Enter Plan Name' value={this.state.planName} onChange={this.handleInputChange}></input>
              <div style={{ fontSize: 12, color: 'red' }}>
                {this.state.planNameError}
              </div>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Price (Rs.)</label>
              <div class="input-group">
                <input type="text" className='form-control' name='price' placeholder='Enter Price' value={this.state.price} onChange={this.handleInputChange}></input>
                <div class="input-group-append">
                  <span class="input-group-text">.00</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'red' }}>
                {this.state.priceError}
              </div>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Duration (Months)</label>
              <input type="text" className='form-control' name='duration' placeholder='Enter Duration' value={this.state.duration} onChange={this.handleInputChange}></input>
              <div style={{ fontSize: 12, color: 'red' }}>
                {this.state.durationError}
              </div>
            </div>

            <button className='btn btn-warning' type='submit' style={{ marginTop: '15px' }} onClick={this.onSubmit}>
              <i className='far fa-check-square'></i>
              &nbsp; Edit
            </button>&nbsp;&nbsp;

            <a href='/workoutplans'><button type='button' class="btn btn-secondary" style={{ marginTop: '15px' }}><i class="fa-regular fa-circle-xmark"></i>&nbsp;Close</button></a>

          </form>
        </div>
      </div>
    )
  }
}