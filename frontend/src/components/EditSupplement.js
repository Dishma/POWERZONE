import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class EditSupplements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      weight: "",
      category: "",
      availability: "",
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/supplement/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          name: res.data.supplement.name,
          price: res.data.supplement.price,
          weight: res.data.supplement.weight,
          category: res.data.supplement.category,
          availability: res.data.supplement.availability,
        });
        console.log(this.state.supplement);
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
    let nameError = "";
    let priceError = "";
    let weightError = "";
    let categoryError = "";
    let availabilityError = "";

    if (!this.state.name) {
      nameError = "This field is required!";
    }
    if (!this.state.price) {
      priceError = "This field is required!";
    }
    if (!this.state.weight) {
      weightError = "This field is required!";
    }
    if (!this.state.category) {
      categoryError = "This field is required!";
    }
    if (!this.state.availability) {
      availabilityError = "This field is required!";
    }

    if (nameError || priceError || weightError || categoryError || availabilityError) {
      this.setState({ nameError, priceError, weightError, categoryError, availabilityError });
      return false;
    }
    return true;
  };

  //Edit
  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

    const { name, price, weight, category, availability } = this.state;

    const isValid = this.validate();
    if (isValid) {
      const data = {
        name: name,
        price: price,
        weight: weight,
        category: category,
        availability: availability,
      };
      console.log(data);

      axios.put(`/supplement/edit/${id}`, data).then((res) => {
        if (res.data.success) {
          alert("Updated Successfully");

          this.setState({
            name: "",
            price: "",
            weight: "",
            category: "",
            availability: "",
          });

          window.location.href = "/supplements";
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
            {/* NAME */}

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Supplement Name"
                value={this.state.name}
                onChange={this.handleInputChange}
              ></input>

              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.nameError}
              </div>
            </div>

            {/* PRICE */}

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Price (Rs.)</label>
              <div class="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  placeholder="Enter Price"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                ></input>
                <div class="input-group-append">
                  <span class="input-group-text">.00</span>
                </div>
              </div>

              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.priceError}
              </div>
            </div>

            {/* WEIGHT */}

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Weight</label>
              <input
                type="number"
                className="form-control"
                name="weight"
                placeholder="Enter Duration"
                value={this.state.weight}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.weightError}
              </div>
              {/* CATEGORY */}
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Category</label>
                <select
                  className="form-select"
                  aria-label="category"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleInputChange}
                >
                  <option value>Choose...</option>
                  <option value="Amino & Glutamine">Amino & Glutamine</option>
                  <option value="Creatine">Creatine</option>
                  <option value="Fat Burners">Fat Burners</option>
                  <option value="Pre-workout">Pre-workout</option>
                  <option value="Protein">Protein</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Weight Gainers">Weight Gainers</option>
                </select>

                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.categoryError}
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Availability</label>
                <select
                  className="form-select"
                  aria-label="availability"
                  name="availability"
                  value={this.state.availability}
                  onChange={this.handleInputChange}
                >
                  <option value>Choose...</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>

                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.availabilityError}
                </div>
              </div>
              
              <button
                className="btn btn-warning"
                type="submit"
                style={{ marginTop: "15px" }}
                onClick={this.onSubmit}>
                <i className="far fa-check-square"></i>
                &nbsp; Edit
              </button>
              &nbsp;&nbsp;
              <a href="/supplements">
                <button
                  type="button"
                  class="btn btn-secondary"
                  style={{ marginTop: "15px" }}
                >
                  <i class="fa-regular fa-circle-xmark"></i>&nbsp;Close
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
