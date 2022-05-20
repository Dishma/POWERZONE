import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

export default class WorkoutPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workoutplans: []
    };
  }

  componentDidMount() {
    this.retrieveWorkoutPlans();
  }

  retrieveWorkoutPlans() {
    axios.get("/workoutplans").then(res => {
      if (res.data.success) {
        this.setState({
          workoutplans: res.data.existingWorkoutPlans
        });

        console.log(this.state.workoutplans)
      }
    });
  }

  //Delete Button
  onDelete = (id) => {
    axios.delete(`/workoutplan/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveWorkoutPlans();
    });
  }

  //Search
  filterData(workoutplans, searchKey) {
    const result = workoutplans.filter((workoutplan) =>
      workoutplan.planName.toLowerCase().includes(searchKey) ||
      workoutplan.price.toLowerCase().includes(searchKey) ||
      workoutplan.duration.toLowerCase().includes(searchKey)
    )

    this.setState({ workoutplans: result })
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/workoutplans").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingWorkoutPlans, searchKey)
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

  //Add Button
  onSubmit = (e) => {
    e.preventDefault();

    const { planName, price, duration } = this.state;

    const isValid = this.validate();
    if (isValid) {

      const data = {
        planName: planName,
        price: price,
        duration: duration
      }
      console.log(data)

      axios.post("/workoutplan/save", data).then((res) => {
        if (res.data.success) {
          alert("Added Successfully");
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

  //Report
  createPDF = (planName, price, duration) => {

    console.log(planName);
    console.log(price);
    console.log(duration);

    const unit = "pt";
    const size = "A4"; //page size
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size); //create document
    const title = `| POWERZONE | `;

    const planNames = `Plan Name:  ${planName} `;
    const prices = `Price:  Rs.${price}.00 `;
    const durations = `Duration:  ${duration} Months `;


    const image = "https://res.cloudinary.com/dnonvyjrq/image/upload/v1651654099/gym_logo_vndrpz.jpg";

    const left = 50;
    const top = 50;
    const imgWidth = 75;
    const imgHeight = 75;

    doc.setFontSize(15);

    doc.text(150, 93, title);

    doc.text(50, 200, planNames);
    doc.text(50, 240, prices);
    doc.text(50, 280, durations);

    doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);

    doc.save(`WorkoutPlan-${planName}.pdf`)
  }

  render() {
    return (
      <div className='container' style={{ marginBottom: '70px', marginTop: '20px' }}>

        <div className='row'>
          <div className='col-lg-9 mt-2 mb-2'>
            <h4>Workout Plans</h4>
          </div>

          <div className='col-lg-3 mt-2 mb-2'>
            <input className='form-control' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}></input>
          </div>
        </div>

        <table className='table table-hover' style={{ marginTop: '40px' }}>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Plan Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Duration</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.workoutplans.map((workoutplans, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{workoutplans.planName}</td>
                <td>Rs.{workoutplans.price}.00</td>
                <td>{workoutplans.duration} Months</td>
                <td>
                  <a className='btn btn-warning' href={`/editworkoutplan/${workoutplans._id}`}>
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </a>
                  &nbsp;&nbsp;

                  <button type="button" class="btn btn-danger" onClick={() => this.onDelete(workoutplans._id)}>
                    <i className='far fa-trash-alt'></i>&nbsp;Delete
                  </button>&nbsp;&nbsp;

                  <button class="btn btn-outline-info" onClick={() => this.createPDF(workoutplans.planName, workoutplans.price, workoutplans.duration)} >
                    <i class="fa-solid fa-file-pdf"></i>&nbsp;Get Report
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>


        {/* Add New Plan */}
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addplan"><i className='far fa-check-square'></i>&nbsp;Add New Plan</button>

        <div class="modal fade" id="addplan" tabindex="-1" aria-labelledby="addplanLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

              <div class="modal-header">
                <h5 class="modal-title" id="addplanLabel">Add New Plan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div class="modal-body">

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
                    <input type="number" className='form-control' name='duration' placeholder='Enter Duration' value={this.state.duration} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.durationError}
                    </div>
                  </div>
                </form>

              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <button className='btn btn-success' type='submit' onClick={this.onSubmit}>Add</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}