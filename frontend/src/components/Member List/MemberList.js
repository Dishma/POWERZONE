import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import '../../assets/css/navbar.css';

export default class MemberList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      memberName: "",
      address: "",
      email: "",
      phoneNumber: "",
      gender: "",
      weight: "",
      height: "",
      joiningDate: "",
      otherDetails: ""
    }

    this.state = {
      members: []
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  //Add New Member Button
  onSubmit = (e) => {
    e.preventDefault();

    const { memberName, address, email, phoneNumber, gender, weight, height, joiningDate, otherDetails } = this.state;

    const data = {
      memberName: memberName,
      address: address,
      email: email,
      phoneNumber: phoneNumber,
      gender: gender,
      weight: weight,
      height: height,
      joiningDate: joiningDate,
      otherDetails: otherDetails
    }

    console.log(data)

    axios.post("/member/save", data).then((res) => {
      if (res.data.success) {
        alert("Member Detailes Saved Successfully");
        this.setState(
          {
            memberName: "",
            address: "",
            email: "",
            phoneNumber: "",
            gender: "",
            weight: "",
            height: "",
            joiningDate: "",
            otherDetails: ""
          }
        )
      }
    });
  }

  componentDidMount() {
    this.retrieveMembers();
  }

  retrieveMembers() {
    axios.get("/members").then(res => {
      if (res.data.success) {
        this.setState({
          members: res.data.existingMembers
        });

        console.log(this.state.members)
      }
    });
  }

  //Search
  filterData(members, searchKey) {
    const result = members.filter((member) =>
      member.memberName.toLowerCase().includes(searchKey)
    )

    this.setState({ members: result })
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/members").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingMembers, searchKey)
      }
    });
  }

  //Delete Button
  onDelete = (id) => {
    axios.delete(`/member/delete/${id}`).then((res) => {
      alert("Deleted Successfully.")
      this.retrieveMembers();
    });
  }

  //Report
  createPDF = (memberName, address, email, phoneNumber, gender, weight, height, joiningDate, otherDetails) => {

    console.log(memberName);
    console.log(address);
    console.log(email);
    console.log(phoneNumber);
    console.log(gender);
    console.log(weight);
    console.log(height);
    console.log(joiningDate);
    console.log(otherDetails);

    const unit = "pt";
    const size = "A4"; //page size
    const orientation = "landscape";
    const doc = new jsPDF(orientation, unit, size); //create document
    const title = `| POWERZONE | `;

    const memberNames = `Member Name: ${memberName} `;
    const addresss = `Address: ${address} `;
    const emails = `Email: ${email} `;
    const phoneNumbers = `Phone Number: ${phoneNumber} `;
    const genders = `Gender: ${gender} `;
    const weights = `Weight: ${weight} `;
    const heights = `Height: ${height} `;
    const joiningDates = `Joined Date: ${joiningDate} `;
    const otherDetailss = `Other Details: ${otherDetails} `;


    const image = "https://res.cloudinary.com/dnonvyjrq/image/upload/v1651654099/gym_logo_vndrpz.jpg";

    const left = 30;
    const top = 8;
    const imgWidth = 100;
    const imgHeight = 100;

    doc.setFontSize(20);

    doc.text(150, 40, title);

    doc.text(60, 200, memberNames);
    doc.text(60, 240, addresss);
    doc.text(60, 280, emails);
    doc.text(60, 320, phoneNumbers);
    doc.text(60, 360, genders);
    doc.text(60, 400, weights);
    doc.text(60, 440, heights);
    doc.text(60, 480, joiningDates);
    doc.text(60, 520, otherDetailss);

    doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);

    doc.save(`WorkoutPlan ${memberName}.pdf`)
  }



  render() {
    return (
      <div className='container'>

        <br></br>

        <div>
          <center><h4>Member List</h4></center>
        </div>

        <br></br>

        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ margin: '0px 0px 0px 250px'}}>
          Add New Member
        </button>

        <div style={{ margin: '50px 250px -10px 250px'}}>
          <input className='form-control' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}></input>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New Member</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Name</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Name' value={this.state.memberName} onChange={this.handleInputChange}></input>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Address</label>
                    <input type='text' className='form-control' name='address' placeholder='Enter Address' value={this.state.address} onChange={this.handleInputChange}></input>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Email</label>
                    <input type='text' className='form-control' name='email' placeholder='Enter Email' value={this.state.email} onChange={this.handleInputChange}></input>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Phone Number</label>
                    <input type='text' className='form-control' name='phoneNumber' placeholder='Enter Phone Number' value={this.state.phoneNumber} onChange={this.handleInputChange}></input>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Gender</label>
                    <input type='text' className='form-control' name='gender' placeholder='Enter Gender' value={this.state.gender} onChange={this.handleInputChange}></input>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Weight</label>
                    <input type='text' className='form-control' name='weight' placeholder='Enter Weight' value={this.state.weight} onChange={this.handleInputChange}></input>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Height</label>
                    <input type='text' className='form-control' name='height' placeholder='Enter Height' value={this.state.height} onChange={this.handleInputChange}></input>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Joining Date</label>
                    <input type='text' className='form-control' name='joiningDate' placeholder='Enter Joining Date' value={this.state.joiningDate} onChange={this.handleInputChange}></input>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Other Details</label>
                    <textarea type="text" className='form-control' name='otherDetails' value={this.state.otherDetails} onChange={this.handleInputChange}></textarea>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success" onClick={this.onSubmit}>Add</button>
              </div>

            </div>
          </div>
        </div>

        {this.state.members.map((members, index) => (
          <div class="card text-center" style={{ margin: '50px 250px 75px 250px' }}>
            <div class="card-header" key={index}>
              Member {index + 1}
            </div>
            <div class="card-body">

              <a href={`/postmember/${members._id}`} style={{ textDecoration: 'none' }}><h5 class="card-title">{members.memberName}</h5></a>

              <p class="card-text">
                {members.email}
                <br /><br />

                Weight: {members.weight}
                <br />

                Height: {members.height}
              </p>

              <a className='btn btn-warning' href={`/editmember/${members._id}`}>
                <i className='fas fa-edit'></i>&nbsp;Edit
              </a>
              &nbsp;

              <a className='btn btn-danger' onClick={() => this.onDelete(members._id)}>
                <i className='far fa-trash-alt'></i>&nbsp;Delete
              </a>
              &nbsp;

              <button className="btn btn-info" onClick={() => this.createPDF(members.memberName, members.address, members.email, members.phoneNumber, members.gender, members.weight, members.height, members.joiningDate, members.otherDetails)}>
                <i class="fa-solid fa-file-lines"></i>&nbsp;Get Report
              </button>

            </div>
            <div class="card-footer text-muted">
              Joined Date: {members.joiningDate}
            </div>
          </div>
        ))}
      </div>
    )
  }
}