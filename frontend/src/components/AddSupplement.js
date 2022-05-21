import React, { useState } from "react";
import axios from "axios";
import { renderMatches } from "react-router-dom";

export default function AddSupplement() {
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [category, setCategory] = useState("");    

    const sendData = () => {
      axios.post(`/supplement/add`,{
        name,
        price,
        weight,
        category
      })
      .then(() => {
        alert("Supplement Added")
      })
      .catch((err) => {
        alert(err)
      })
    }
  
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="name">Supplement Name</label>
            <input type="text" className="form-control" id="name" placeholder="Supplement Name"
              onChange={(e) => {

                  setName(e.target.value);

              }}  
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (Rs)</label>
            <input type="number" min="0" step="0.01" className="form-control" id="price" 
            placeholder="Supplement Price" 
              onChange={(e) => {

                  setPrice(e.target.value);

              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight</label> 
            <input type="number" className="form-control" id="weight" placeholder="Supplement Weight"
              onChange={(e) => {

                  setWeight(e.target.value);

              }}
            />
          </div>

          <div className="form-group">    
          <label htmlFor="weight">Category</label>
          <div className="input-group mb-3">
          
              <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="category">Category</label>
                  
          </div>
              <select className="custom-select" id="category"
              onChange={(e) => {

                  setCategory(e.target.value);

              }}>
                  <option value>Choose...</option>
                      <option value="Amino & Glutamine">Amino & Glutamine</option>
                      <option value="Creatine">Creatine</option>
                      <option value="Fat Burners">Fat Burners</option>
                      <option value="Pre-workout">Pre-workout</option>
                      <option value="Protein">Protein</option>
                      <option value="Vitamins">Vitamins</option>
                      <option value="Weight Gainers">Weight Gainers</option>
              </select>
          </div></div>

          <br/>

          <button onClick={sendData} type="submit" className="btn btn-primary">
            Add Supplement
          </button>
        </form>
      </div>
    );
}
