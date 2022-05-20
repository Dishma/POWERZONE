import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

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

  // Validation
  validate = () => {

    let memberNameError = "";
    let addressError = "";
    let emailError = "";
    let phoneNumberError = "";
    let genderError = "";
    let weightError = "";
    let heightError = "";

    if (!this.state.memberName) {
      memberNameError = 'This field is required!';
    }
    if (!this.state.address) {
      addressError = 'This field is required!';
    }
    if (!this.state.email) {
      emailError = 'This field is required!';
    }
    if (!this.state.phoneNumber) {
      phoneNumberError = 'This field is required!';
    }
    if (!this.state.gender) {
      genderError = 'This field is required!';
    }
    if (!this.state.weight) {
      weightError = 'This field is required!';
    }
    if (!this.state.height) {
      heightError = 'This field is required!';
    }

    if (memberNameError || addressError || emailError || phoneNumberError || genderError || weightError || heightError) {
      this.setState({ memberNameError, addressError, emailError, phoneNumberError, genderError, weightError, heightError });
      return false;
    }

    return true;
  };

  //Add
  onSubmit = (e) => {
    e.preventDefault();

    const { memberName, address, email, phoneNumber, gender, weight, height, joiningDate, otherDetails } = this.state;

    const isValid = this.validate();
    if (isValid) {
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
          );

          window.location.href = '/memberlist';
        }
      });
    }
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
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size); //create document
    const title = `| POWERZONE | `;

    const memberNames = `Member Name:  ${memberName} `;
    const addresss = `Address:  ${address} `;
    const emails = `Email:  ${email} `;
    const phoneNumbers = `Phone Number: +94 ${phoneNumber} `;
    const genders = `Gender: ${gender} `;
    const weights = `Weight: ${weight}kg `;
    const heights = `Height: ${height}cm `;
    const joiningDates = `Joined Date: ${joiningDate} `;
    const otherDetailss = `Other Details: ${otherDetails} `;


    const image = "https://res.cloudinary.com/dnonvyjrq/image/upload/v1651654099/gym_logo_vndrpz.jpg";

    const left = 50;
    const top = 50;
    const imgWidth = 75;
    const imgHeight = 75;

    doc.setFontSize(15);

    doc.text(150, 93, title);

    doc.text(50, 200, memberNames);
    doc.text(50, 240, addresss);
    doc.text(50, 280, emails);
    doc.text(50, 320, phoneNumbers);
    doc.text(50, 360, genders);
    doc.text(50, 400, weights);
    doc.text(50, 440, heights);
    doc.text(50, 480, joiningDates);
    doc.text(50, 520, otherDetailss);

    doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);

    doc.save(`Member-${memberName}.pdf`)
  }



  render() {
    return (
      <div className='container' style={{ marginBottom: '50px' }}>

        <br></br>

        <div>
          <center><h4>Member List</h4></center>
        </div>

        <br></br>

        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ marginLeft: '250px' }}>
          Add New Member
        </button>

        <div style={{ margin: '30px 250px 0px 250px' }}>
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

                <form className='needs-validation' noValidate>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Name</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Name' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Address</label>
                    <input type='text' className='form-control' name='address' placeholder='Enter Address' value={this.state.address} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.addressError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Email</label>
                    <input type='email' className='form-control' name='email' placeholder='Enter Email' value={this.state.email} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.emailError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Phone Number</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">+94</span>
                      </div>
                      <input type='tel' className='form-control' name='phoneNumber' placeholder='Enter Phone Number' aria-describedby="inputGroupPrepend" value={this.state.phoneNumber} onChange={this.handleInputChange}></input>
                    </div>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.phoneNumberError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Gender</label>

                    <select name='gender' id="inputState" class="form-control" value={this.state.gender} onChange={this.handleInputChange}>
                      <option selected>Choose...</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.genderError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Weight (kg)</label>
                    <input type='number' className='form-control' name='weight' min="1" placeholder='Enter Weight' value={this.state.weight} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.weightError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Height (cm)</label>
                    <input type='number' className='form-control' name='height' min="1" placeholder='Enter Height' value={this.state.height} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.heightError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Joining Date</label>
                    <input type='date' className='form-control' name='joiningDate' placeholder='Enter Joining Date' value={this.state.joiningDate} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.phoneNumberError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Other Details</label>
                    <textarea type="text" className='form-control' name='otherDetails' value={this.state.otherDetails} onChange={this.handleInputChange}></textarea>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success" onClick={this.onSubmit}>Add</button>
              </div>

            </div>
          </div>
        </div>

        {this.state.members.map((members, index) => (
          <div class="card text-center" style={{ margin: '35px 250px 0px 250px' }}>
            <div class="card-header" key={index}>
              Member {index + 1}
            </div>
            <div class="card-body">

              <a href={`/postmember/${members._id}`} style={{ textDecoration: 'none' }}><h5 class="card-title">{members.memberName}</h5></a>

              <p class="card-text">
                {members.email}
                <br /><br />

                Weight:   {members.weight}kg
                <br />

                Height:   {members.height}cm
              </p>

              <a className='btn btn-warning' href={`/editmember/${members._id}`}>
                <i className='fas fa-edit'></i>&nbsp;Edit
              </a>
              &nbsp;&nbsp;

              <a className='btn btn-danger' onClick={() => this.onDelete(members._id)}>
                <i className='far fa-trash-alt'></i>&nbsp;Delete
              </a>
              &nbsp;&nbsp;

              <button className="btn btn-info" onClick={() => this.createPDF(members.memberName, members.address, members.email, members.phoneNumber, members.gender, members.weight, members.height, members.joiningDate, members.otherDetails)}>
                <i class="fa-solid fa-file-pdf"></i>&nbsp;Get Report
              </button>

            </div>
            <div class="card-footer text-muted">
              Joined Date:  {members.joiningDate}
            </div>
          </div>
        ))}
      </div>
    )
  }
}