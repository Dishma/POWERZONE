import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/css/supplements.css';
import Footer from "../Footer";

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.retrieveOrders();
  }

  retrieveOrders() {
    axios.get("/orders").then((res) => {
      if (res.data.success) {
        this.setState({
          orders: res.data.existingOrders,
        });

        console.log(this.state.orders);
      }
    });
  }

  //Delete Button
  onDelete = (id) => {
    axios.delete(`/order/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveOrders();
    });
  };

  //Search
  /* filterData(orders, searchKey) {
    const result = orders.filter(
      (orders) =>
        orders.name.toUperCase().includes(searchKey) ||
        orders.price.toUperCase().includes(searchKey) ||
        orders.weight.toUperCase().includes(searchKey) ||
        orders.category.toUperCase().includes(searchKey)
    );

    this.setState({ orders: result });
  } */

 /*  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/orders").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingOrders, searchKey);
      }
    });
  }; */

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  //Add Button
  onSubmit = (e) => {
    e.preventDefault();

    const { cName, address, phone, date , sName, quantity, price } = this.state;

    const isValid = this.validate();
    if (isValid) {
      const data = {
        cName: cName,
        address: address,
        phone: phone,
        date: date,
        sName: sName,
        quantity: quantity,
        price: price
      };
      console.log(data);

      axios.post("/order/add", data).then((res) => {
        if (res.data.success) {
          alert("Added Successfully");
          this.setState({
            cName: "",
            address: "",
            phone: "",
            date: "",
            sName: "",
            quantity: "",
            price: "",
          });

          window.location.href = "/orders";
        }
      });
    }
  };

  // Validation
  validate = () => {
    let cNameError = "";
    let addressError = "";
    let phoneError = "";
    let dateError = "";
    let sNameError= "";
    let quantityError= "";
    let priceError="";

    if (!this.state.cName) {
      cNameError = "This field is required!";
    }
    if (!this.state.address) {
      addressError = "This field is required!";
    }
    if (!this.state.phone) {
      phoneError = "This field is required!";
    }
    if (!this.state.date) {
      dateError = "This field is required!";
    }
    if (!this.state.sName) {
      sNameError = "This field is required!";
    }
    if (!this.state.quantity) {
      quantityError = "This field is required!";
    }  
    if (!this.state.price) {
      priceError = "This field is required!";
    }

    if (cNameError || addressError || phoneError || dateError ||  sNameError || quantityError || priceError ) {
      this.setState({ cNameError, addressError, phoneError, dateError, sNameError, quantityError, priceError });
      return false;
    }
    return true;
  };

  //Report
  createPDF = (cName, address, phone, date, sName, quantity, price) => {
    console.log(cName);
    console.log(address);
    console.log(phone);
    console.log(date);
    console.log(sName);
    console.log(quantity);
    console.log(price);


    const unit = "pt";
    const size = "A4"; //page size
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size); //create document
    const title = `| POWERZONE | `;

    const cNames = `Customer Name:  ${cName} `;
    const addresses = `Address:  ${address} `;
    const phones = `Phone No.:  ${phone} `;
    const dates = `Date of Purchase:  ${date} `;
    const sNames = `Supplement Name: ${sName} `;
    const quantities = `Quantity: ${quantity} `;
    const prices = `Price: ${price}.00 `;

    const image =
      "https://res.cloudinary.com/dnonvyjrq/image/upload/v1651654099/gym_logo_vndrpz.jpg";

    const left = 50;
    const top = 50;
    const imgWidth = 75;
    const imgHeight = 75;

    doc.setFontSize(15);

    doc.text(150, 93, title);

    doc.text(50, 200, cNames);
    doc.text(50, 240, addresses);
    doc.text(50, 280, phones);
    doc.text(50, 320, dates);
    doc.text(50, 360, sNames);
    doc.text(50, 400, quantities);
    doc.text(50, 440, prices);

    doc.addImage(image, "PNG", left, top, imgWidth, imgHeight);

    doc.save(`Order-${cName}.pdf`);
  };

  render() {
    return (
      <div className="main">
        <div
            className="ord-container"
            style={{ marginBottom: "70px", marginTop: "20px" }}
          >
            <div className="row">
              <div className="col-lg-9 mt-2 mb-2">
                <h4>Orders</h4>
              </div>
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  name="searchQuery"
                  onChange={this.handleSearchArea}
                ></input>
              </div>
            </div>
            <table className="table table-bordered" style={{ marginTop: "40px"}}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Date of Purchase</th>
                  <th scope="col">Supplement Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orders.map((orders, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{orders.cName}</td>
                    <td>{orders.address}</td>
                    <td>{orders.phone}</td>
                    <td>{orders.date}</td>
                    <td>{orders.sName}</td>
                    <td>{orders.quantity}</td>
                    <td>Rs.{orders.price}.00</td>
                    <td>
                      <a
                        className="btn btn-warning"
                        href={`/editorder/${orders._id}`}                  >
                        <i class="fa-solid fa-pen-to-square"></i>
                        &nbsp;Edit
                      </a>
                      &nbsp;&nbsp;
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => this.onDelete(orders._id)}>
                        <i class="fa-solid fa-trash-can"></i>&nbsp;Delete
                      </button>
                      &nbsp;&nbsp;
                      <button
                        class="btn btn-info"
                        onClick={() =>
                          this.createPDF(
                            orders.cName,
                            orders.address,
                            orders.phone,
                            orders.date,
                            orders.sName,
                            orders.quantity,
                            orders.price,
                          )
                        }
                      >
                        <i class="fa-solid fa-file-pdf"></i>&nbsp;Get Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Add New Order */}
            <button
              type="button"
              class="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#addplan"
            >
               <i class="fa-solid fa-plus"></i>&nbsp;Add New Order
            </button>
            <div
              class="modal fade"
              id="addplan"
              tabIndex="-1"
              aria-labelledby="addplanLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="addplanLabel">
                      Add New Order
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form className="needs-validation" noValidate>
        
                      {/* Customer Name */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cName"
                    placeholder="Enter Customer Name"
                    value={this.state.cName}
                    onChange={this.handleInputChange}></input>
                  <div style={{ fontSize: 12, color: "red" }}>
                {this.state.cNameError}
              </div>
            </div>
            {/* Customer Address */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Address</label>
                <div class="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Enter Address"
                    value={this.state.address}
                    onChange={this.handleInputChange}></input>
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                {this.state.addressError}
              </div>
            </div>
            {/* Customer phone number */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Phone</label>
                <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Enter Phone"
                    value={this.state.phone}
                    onChange={this.handleInputChange}></input>
                  <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.phoneError}
                </div>
              </div>
            {/* Date of Purchase */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Date</label>
                <input
                    type="date"
                    className="form-control"
                    name="date"
                    placeholder=""
                    value={this.state.date}
                    onChange={this.handleInputChange}></input>
                  <div style={{ fontSize: 12, color: "red" }}>
                {this.state.dateError}
              </div>
            </div>
            {/* Supplement Name */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Supplement Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="sName"
                  placeholder="Enter Supplement Name"
                  value={this.state.sName}
                  onChange={this.handleInputChange}></input>
                <div style={{ fontSize: 12, color: "red" }}>
                {this.state.sNameError}
              </div>
            </div>
            {/* Quantity */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Quantity</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      placeholder="Enter Quantity"
                      value={this.state.quantity}
                      onChange={this.handleInputChange}></input>
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.quantityError}
                  </div>
                </div>
            {/* Supplement Price */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Price (Rs.)</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="Enter Price"
                    value={this.state.price}
                    onChange={this.handleInputChange}></input>
                    <div class="input-group-append">
                    <span class="input-group-text">.00</span>
                    </div>
                    </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                {this.state.priceError}
              </div>
            </div>
            {/* Buttons */}
            <button
              className="btn btn-warning"
                type="submit"
                  style={{ marginTop: "15px" }}
                  onClick={this.onSubmit}>
              <i class="fa-regular fa-floppy-disk"></i>&nbsp;Save
            </button>
            &nbsp;&nbsp;
            <a href="/orders">
              <button
                type="button"
                  class="btn btn-secondary"
                  style={{ marginTop: "15px" }}>
                  <i class="bi bi-x-square"></i>&nbsp;Close
                </button>
              </a>
        
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer"><Footer/></div>
      </div>                
        
    );
  }
}

