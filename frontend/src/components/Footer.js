import React from "react";

function Footer() {
    return (

        <footer class="text-center text-white" style={{ backgroundColor: '#f1f1f1' }}>
            <div>

                <section>

                    <a
                        class="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i class="fab fa-facebook-f"></i>
                    </a>

                    <a
                        class="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i class="fab fa-twitter"></i
                    ></a>

                    <a
                        class="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i class="fab fa-google"></i
                    ></a>

                    <a
                        class="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i class="fab fa-instagram"></i
                    ></a>

                    <a
                        class="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i class="fab fa-linkedin"></i
                    ></a>

                </section>
            </div>

            <div class="text-center text-dark p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', fontFamily: 'Sans-serif' }}>
                © 2022 Copyright - <b>POWERZONE</b>
            </div>


        </footer>

    )
}

export default Footer;