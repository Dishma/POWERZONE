import React, { Component } from "react";
import axios from "axios";
import jsPDF from 'jspdf';
import "../styles/css/styles.css";



export default class homedriver extends Component {

  constructor(props) {
    super(props);

    this.state = {
      driver: []
    };
  }


  componentDidMount() {
    this.retrieveDrivers();
  }

  retrieveDrivers() {
    axios.get("driver").then(res => {
      if (res.data.success) {
        this.setState({
          driver: res.data.existingDrivers
        });
        console.log(this.state.driver)
      }
    });
  }



  onDelete = (id) => {
    axios.delete(`/driver/delete/${id}`).then((res) => {
      alert("Deleted Successfully!")
      this.retrieveDrivers();
    })
  }


  filterData(driver, searchKey) {
    const result = driver.filter((driver) =>
      driver.fName.includes(searchKey)
    )

    this.setState({ driver: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("driver").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingDrivers, searchKey)
      }
    })
  }



  createPDF = (fName, lName, age, address) => {

    console.log(fName);
    console.log(lName);
    console.log(age);
    console.log(address);

    const unit = "pt";
    const size = "A4"; //page size
    const orientation = "landscape";
    const marginLeft = 20;
    const doc = new jsPDF(orientation, unit, size); //create document
    const title = `| POWERZONE | `;
    const fNames = `Employee First Name: ${fName} `;
    const lNames = `Employee Last Name: ${lName} `;
    const ages = `Employee Age: ${age} `;
    const addresses = `Employee Address: ${address} `;

    const image = "https://res.cloudinary.com/dnonvyjrq/image/upload/v1651654099/gym_logo_vndrpz.jpg";

    const left = 30;
    const top = 8;
    const imgWidth = 100;
    const imgHeight = 100;

    doc.setFontSize(20);
    doc.text(150, 40, title);
    doc.text(60, 200, fNames);
    doc.text(60, 250, lNames);
    doc.text(60, 300, ages);
    doc.text(60, 350, addresses);

    doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);

    doc.save(`Employee ${fName}.pdf`)
  }





  render() {
    return (

      <div className="driverHome">




        <div>

          <a className="nav-link" href="/adminhome">Admin Home Page</a>
          <a className="nav-link" href="/homedriver">All Employees</a>
          <a className="nav-link" href="/adddriver">Add New Employees</a>

        </div>

        <div className="col-md-8 mt-4 mx-auto"><h1 className="text-danger">All Employees</h1></div>

        <div className="container-xl">

          <div className="col-lg-3 mt-2 mb-2">
            <input className="form-control" type="search" placeholder="Search by First Name" name="searchQuery" onChange={this.handleSearchArea}></input>
          </div>
          <br />
          <br />

          <table className="table" style={{ color: 'white' }}>
            <thead>
              <tr>
                <th scope="col">#</th>

                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Age</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.driver.map((driver, index) => (
                <tr text-align="center" height="50px" key={index}>
                  <th scope="row">{index + 1}</th>


                  <td>

                    {driver.fName}

                  </td>
                  <td>{driver.lName}</td>
                  <td>{driver.age}</td>
                  <td>{driver.address}</td>

                  <a className="btn btn-outline-success" href={`/editdriver/${driver._id}`} role="button">
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;

                  <a role="button" className="btn btn-outline-danger" href="#" onClick={() => this.onDelete(driver._id)}>
                    <i className="far fa-trash-alt">&nbsp;</i>Delete
                  </a>
                  &nbsp;

                  <a role="button" className="btn btn-outline-warning" href="#" onClick={() => this.createPDF(driver.fName, driver.lName, driver.age, driver.address)} >

                    <i className="fa-solid fa-file-pdf"></i>&nbsp;Generate PDF</a>
                </tr>
              ))}
            </tbody>
          </table>



        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />







      </div>
    )
  }
}

