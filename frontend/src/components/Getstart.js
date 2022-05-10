import React from "react";


function Getstart() {
  return (

  

    <div id="carouselExampleCaptions" class="carousel slide carousel-fade" data-bs-ride="carousel">
      

      <div class="carousel-inner">

        <div class="carousel-item active">
          <img src="https://res.cloudinary.com/dnonvyjrq/image/upload/v1651902201/pexels-victor-freitas-841130_p1z6r3.jpg" class="d-block w-100" ></img>
          <div class="carousel-caption d-none d-md-block">
            <h5>“Your health account, your bank account, they’re the same thing. The more you put in, the more you can take out.”</h5>
            <p>-Jack LaLanne</p>
            <a role="button" className="getstartbutton adminbutton2" href="/login"><span>Get Started</span></a>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>

        <div class="carousel-item">
          <img src="https://res.cloudinary.com/dnonvyjrq/image/upload/v1651902199/pexels-karolina-grabowska-4498610_1_vlwz72.jpg" class="d-block w-100" ></img>
          <div class="carousel-caption d-none d-md-block">
            <h5>“Once you are exercising regularly, the hardest thing is to stop it.”</h5>
            <p>– Erin Gray</p>
            <a role="button" className="getstartbutton adminbutton2" href="/login"><span>Get Started</span></a>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>

        <div class="carousel-item">
          <img src="https://res.cloudinary.com/dnonvyjrq/image/upload/v1651902538/pexels-andrea-piacquadio-3757957_qjx7jd.jpg" class="d-block w-100" ></img>
          <div class="carousel-caption d-none d-md-block">
            <h5>“Take care of your body. It’s the only place you have to live.”</h5>
            <p>-Jim Rohn</p>
            <a role="button" className="getstartbutton adminbutton2" href="/login"><span>Get Started</span></a>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>


    </div>



  )
}

export default Getstart;