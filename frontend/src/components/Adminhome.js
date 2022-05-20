import React from "react";
import "../styles/css/styles.css";


function Adminhome() {
    return (


        <div className="adminhome">

            <div>
                <br />
                <br />


                <div className="container" style={{color:'white'}}><h1 className="text-start">Admin Home Page</h1></div>


                <br />
                <br />
                <br />
                <a role="button" className="button-87" href="/memberlist">User Management</a>
                <br />
                <a role="button" className="button-87" href="#">Equipment Management</a>
                <br />
                <a role="button" className="button-87" href="#">Supplement Management</a>
                <br />
                <a role="button" className="button-87" href="/homedriver">Employee Management</a>
                <br />
            </div>
        </div>



    )
}

export default Adminhome;