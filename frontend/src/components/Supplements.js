import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Supplements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      supplements: []
    };
  }

  componentDidMount() {
    this.retrieveSupplements();
  }

  retrieveSupplements() {
    axios.get("/supplements").then((res) => {
      if (res.data.success) {
        this.setState({
          supplements: res.data.existingSupplements,
        });

        console.log(this.state.supplements);
      }
    });
  }

  //Delete Button
  onDelete = (id) => {
    axios.delete(`/supplement/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveSupplements();
    });
  };

  //Search
  filterData(supplements, searchKey) {
    const result = supplements.filter(
      (supplement) =>
        supplement.name.toLowerCase().includes(searchKey) ||
        supplement.price.toLowerCase().includes(searchKey) ||
        supplement.weight.toLowerCase().includes(searchKey) ||
        supplement.category.toLowerCase().includes(searchKey)
    );

    this.setState({ supplements: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/supplements").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingSupplements, searchKey);
      }
    });
  };

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

    const { name, price, weight, category } = this.state;

    const isValid = this.validate();
    if (isValid) {
      const data = {
        name: name,
        price: price,
        weight: weight,
        category: category
      };
      console.log(data);

      axios.post("/supplement/add", data).then((res) => {
        if (res.data.success) {
          alert("Added Successfully");
          this.setState({
            name: "",
            price: "",
            weight: "",
            category: "",
          });

          window.location.href = "/supplements";
        }
      });
    }
  };

  // Validation
  validate = () => {
    let nameError = "";
    let priceError = "";
    let weightError = "";
    let categoryError = "";

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

    if (nameError || priceError || weightError || categoryError) {
      this.setState({ nameError, priceError, weightError, categoryError });
      return false;
    }
    return true;
  };

  //Report
  createPDF = (name, price, weight, category) => {
    console.log(name);
    console.log(price);
    console.log(weight);
    console.log(category);

    const unit = "pt";
    const size = "A4"; //page size
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size); //create document
    const title = `| POWERZONE | `;

    const names = `Supplement Name:  ${name} `;
    const prices = `Price:  Rs.${price}.00 `;
    const weights = `Weight:  ${weight} `;
    const categorys = `Category:  ${category} `;

    const image =
      "https://res.cloudinary.com/dnonvyjrq/image/upload/v1651654099/gym_logo_vndrpz.jpg";

    const left = 50;
    const top = 50;
    const imgWidth = 75;
    const imgHeight = 75;

    doc.setFontSize(15);

    doc.text(150, 93, title);

    doc.text(50, 200, names);
    doc.text(50, 240, prices);
    doc.text(50, 280, weights);
    doc.text(50, 320, categorys);

    doc.addImage(image, "PNG", left, top, imgWidth, imgHeight);

    doc.save(`Supplement-${name}.pdf`);
  };

  render() {
    return (
      <div
        className="container"
        style={{ marginBottom: "70px", marginTop: "20px" }}
      >
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>Supplements</h4>
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

        <table className="table table-hover" style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Supplement Name</th>
              <th scope="col">Price</th>
              <th scope="col">Weight</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.supplements.map((supplements, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{supplements.name}</td>
                <td>Rs.{supplements.price}.00</td>
                <td>{supplements.weight}</td>
                <td>{supplements.category}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={`/editsupplement/${supplements._id}`}                  >
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    &nbsp;Edit
                  </a>
                  &nbsp;&nbsp;
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => this.onDelete(supplements._id)}>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Delete
                  </button>
                  &nbsp;&nbsp;
                  <button
                    class="btn btn-outline-info"
                    onClick={() =>
                      this.createPDF(
                        supplements.name,
                        supplements.price,
                        supplements.weight,
                        supplements.category
                      )
                    }
                  >
                    <i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;Get Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Plan */}
        <button
          type="button"
          class="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#addplan"
        >
          <i className="far fa-check-square"></i>&nbsp;Add New Supplement
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
                  Add New Supplement
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
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Plan Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="planName"
                      placeholder="Enter Supplement Name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    ></input>

                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.nameError}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Price (Rs.)</label>
                    <div class="input-group">
                      <input
                        type="text"
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

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Weight</label>
                    <input
                      type="number"
                      className="form-control"
                      name="duration"
                      placeholder="Enter Duration"
                      value={this.state.weight}
                      onChange={this.handleInputChange}
                    ></input>

                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.weightError}
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Category</label>
                      <select
                        className="custom-select"
                        id="category"
                        value={this.state.category}
                        onChange={this.handleInputChange}
                      >
                        <option value>Choose...</option>
                        <option value="Amino & Glutamine">
                          Amino & Glutamine
                        </option>
                        <option value="Creatine">Creatine</option>
                        <option value="Fat Burners">Fat Burners</option>
                        <option value="Pre-workout">Pre-workout</option>
                        <option value="Protein">Protein</option>
                        <option value="Vitamins">Vitamins</option>
                        <option value="Weight Gainers">Weight Gainers</option>
                      </select>

                      <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.weightError}
                    </div>
                    </div>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={this.onSubmit}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
