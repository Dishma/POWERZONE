import React, { useState } from "react";
import "../styles/css/login.css";

function App() {
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>

        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>

        <div className="button-container">
         <a href="/adminhome"><button type="button" /></a>
        </div>

      </form>
    </div>
}