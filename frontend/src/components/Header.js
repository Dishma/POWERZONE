import React from "react";
import "../styles/css/styles.css";

function Header() {
  return (

    <div >
      <nav class="navbar navbar-expand-md navbar-light bg-coral">
        <div style={{ marginLeft: '8px', marginRight: '10px' }}>
          <img src="https://res.cloudinary.com/dnonvyjrq/image/upload/v1651654099/gym_logo_vndrpz.jpg" class="me-1" height="50" alt="MDB Logo" loading="lazy" />
        </div>

        <small className="navbar-brand mb-0 h1">POWERZONE</small>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto">

            <li class="nav-item">
              <a class="button-85" href="#">About</a>
            </li>

            <li class="nav-item">
              <a class="button-85" href="#">Contact</a>
            </li>

          </ul>

        </div>

      </nav>
    </div>

  )
}

export default Header;