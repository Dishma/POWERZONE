import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EditSupplement(){
      
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [category, setCategory] = useState("");

    const [id , setID] = useState(null);
    
    useEffect(() => {
      setID(localStorage.getItem('ID'))
      setName(localStorage.getItem('Name'));
      setPrice(localStorage.getItem('Price'));
      setWeight(localStorage.getItem('Weight'));
      setCategory(localStorage.getItem('Category'));
    }, []);
    
    const editSupplementData = () => {
      axios.put(`/supplement/edit/${id}` , {
        name,
        price,
        weight,
        category
      })
    }

    

    return(
    <div className="container">
      <form onSubmit>
        <div className="form-group">
          
          <label htmlFor="name">Supplement Name</label>
          <input type="text"
          className="form-control"
          id="name" 
          placeholder="Supplement Name"
          defaultValue={name}          
          onChange={(e) => {setName(e.target.value);}}/>
        
        </div>

        <div className="form-group">
          
          <label htmlFor="price">Price (Rs)</label>
          <input type="number"
          min="0" step="0.01" 
          className="form-control" 
          id="price" 
          placeholder="Supplement Price"
          defaultValue={price} 
          onChange={(e) => {setPrice(e.target.value);}}/>
        
        </div>

        <div className="form-group">
          
          <label htmlFor="weight">Weight</label> 
          <input type="number"
          className="form-control"
          id="weight"
          placeholder="Supplement Weight"
          defaultValue={weight}
          onChange={(e) => {setWeight(e.target.value);}}/>
        
        </div>

        <div className="form-group">    
          
          <label htmlFor="weight">Category</label>
          <div className="input-group mb-3">
          <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="category">Category</label>
                
        </div>
            <select className="custom-select" id="category"
            defaultValue={category}
            onChange={(e) => {

                setCategory(e.target.value);

            }}>
                <option value>Choose...</option>
                    <option defaultValue="Amino & Glutamine">Amino & Glutamine</option>
                    <option defaultValue="Creatine">Creatine</option>
                    <option defaultValue="Fat Burners">Fat Burners</option>
                    <option defaultValue="Pre-workout">Pre-workout</option>
                    <option defaultValue="Protein">Protein</option>
                    <option defaultValue="Vitamins">Vitamins</option>
                    <option defaultValue="Weight Gainers">Weight Gainers</option>
            </select>
        </div></div>

        <br/>

        <button type="submit" onClick={editSupplementData} className="btn btn-primary">
          Update Supplement
        </button>
      </form>
    </div>
    );
}