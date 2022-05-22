import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function AllSupplements() {
  
  const [supplements, setSupplements] = useState([]);

  useEffect(() => {
    function getSupplements() {
      axios
        .get("http://localhost:8000/supplement")
        .then((res) => {
            setSupplements(res.data);
        })
        .catch((err) => 
        {alert(err.message);
        });
    }
    getSupplements();

  }, []);

  const setData = (data) => {
    let {id , name , price, weight, category} = data;
    localStorage.setItem('ID',id);
    localStorage.setItem('Name',name);
    localStorage.setItem('Price',price);
    localStorage.setItem('Weight',weight);
    localStorage.setItem('Category',category)
  }
  

  //DELETE OPERATION

  const getData = () => {
    axios.get(`/supplement/`)
    .then((res) => {
      setSupplements(res.data);
    })
  }

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/supplement/delete/${id}`)
    .then((res) => {
      alert("Deleted Successfully!")
      getData();
    })
    .catch((err) => 
        {
          alert(err.message);
        });
  }

  const renderTable = ()=> {
      return supplements.map(supplement => {
          return (
              <tr>
                <td>{supplement.name}</td>
                <td>{supplement.price}</td>
                <td>{supplement.weight}</td>
                <td>{supplement.category}</td>
                
                <td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to='/edit/:id'>
                <Button variant="outline-success" onClick={() => setData()} >
                Edit</Button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                
                <Button variant="outline-danger" onClick={() => onDelete(supplement._id)}>
                Delete</Button>&nbsp;&nbsp;&nbsp;&nbsp;

                <Button variant="outline-warning" href="#" onClick={() => 
                this.createPDF(supplement.Name, supplement.price, supplement.weight, supplement.category)}>
                Generate PDF</Button>&nbsp;

                </td></tr>
          )
      })
  }

  return (

    <div className="container">          

          <h1 className="text-center" id="title"> Supplement Table </h1><br/>
            <table className="table table-bordered" id="supplement">
              <thead className="table-dark">
                <tr>                  
                  <th scope="col">Name</th>
                    <th scope="col">Price (Rs)</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>                    
                </tr>
              </thead>
            <tbody>{renderTable()}</tbody>
          </table>
      </div>
  )
}