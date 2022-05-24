import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class EditOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cName: "",
      address: "",
      phone: "",
      date: "",
      sName: "",
      quantity: "",
      price:"",
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/order/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          cName: res.data.order.cName,
          address: res.data.order.address,
          phone: res.data.order.phone,
          date: res.data.order.date,
          sName: res.data.order.sName,
          quantity: res.data.order.quantity,
          price: res.data.order.price,
        });
        console.log(this.state.order);
      }
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
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

    if (cNameError || addressError || phoneError ||  dateError ||  sNameError || quantityError || priceError ) {
      this.setState({ cNameError, addressError, phoneError,  dateError, sNameError, quantityError, priceError });
      return false;
    }
    return true;
  };

  //Edit
  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

    const { cName, address, phone, date, sName, quantity, price } = this.state;

    const isValid = this.validate();
    if (isValid) {
      const data = {
        cName: cName,
        address: address,
        phone: phone,
        date: date,
        sName: sName,
        quantity: quantity,
        price: price,
      };
      console.log(data);

      axios.put(`/order/edit/${id}`, data).then((res) => {
        if (res.data.success) {
          alert("Updated Successfully");

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

  render() {
    return (
      <div className="container" style={{ marginBottom: "75px" }}>
        <div className="col-md-8 mt-4 mx-auto">
          <center>
            <h1 className="h3 mb-3 font-weight-normal">
              Edit Supplement Details
            </h1>
          </center>

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
    );
  }
}
