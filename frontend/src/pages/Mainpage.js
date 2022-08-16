/** @format */
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { roomActions } from "../redux/room";
import { room } from "../api/api";
import axios from "axios";
import RoomList from "./homepage/RoomList";
import UserList from "./homepage/UserList";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material"; //contain

import stylecss from "../css/styles.css";
import logo from "../assets/EDDUSSAFY_얼굴만_동그라미.png";
import image1 from "../assets/img1.png";
import image2 from "../assets/img2.png";
import image3 from "../assets/img3.png";
// import image1 from "../assets/cabin.png";
// import image2 from "../assets/cake.png";
// import image3 from "../assets/circus.png";
// import image1 from "../assets/EDDUSSAFY_slogan포함_동그라미.png";
// import image2 from "../assets/EDDUSSAFY_slogan포함_동그라미.png";
// import image3 from "../assets/EDDUSSAFY_slogan포함_동그라미.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faLightbulb,
  faQuestionCircle,
  faPlus,
  faPlusCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import scripts from "../components/scripts";

function Mainpage(props) {
  const [cropen, setCropen] = useState(false);
  const roomTitle = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => {
    return state.user.value.userId;
  });
  const position = useSelector((state) => {
    return state.user.value.position;
  });

  const Buttonsx = {
    "&.MuiButton-root": {
      marginTop: "10px",
      width: "10%",
      textDecoration: "none",
      borderRadius: "70px 70px",
      padding: "5px 0px",
      background: "#11b683",
    },
    "&.MuiButton-root:hover": {
      background: "#0bac7a",
      transform: "translateY(-2px)",
    },
  };

  const Gridsx = {
    "&.MuiGrid-root": {
      marginTop: "20px",
    },
    "&.MuiGrid-item": {
      padding: 0,
    },
  };
  useEffect(() => {
    axios({
      method: "get",
      url: room.getRoom(),
    }).then((res) => {
      dispatch(roomActions.getRooms(res.data));
    });
    navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  });

  return (
    <div className="header">
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          {/* <!-- Masthead Avatar Image--> */}
          <img className="masthead-avatar mb-5" src={logo} alt="..." />
          {/* <!-- Masthead Heading--> */}
          <h1 className="masthead-heading text-uppercase mb-0">EDDU SSAFY</h1>
          {/* <!-- Icon Divider--> */}
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <div className="divider-custom-line"></div>
          </div>
          {/* <!-- Masthead Subheading--> */}
          <p className="masthead-subheading font-weight-light mb-0">
            Student - Education - Professor
          </p>
        </div>
      </header>
      <section className="page-section portfolio" id="portfolio">
        <div className="container">
          {/* <!-- Portfolio Section Heading--> */}
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Contents
          </h2>
          {/* <!-- Icon Divider--> */}
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <div className="divider-custom-line"></div>
          </div>
          {/* <!-- Portfolio Grid Items--> */}
          <div className="row justify-content-center">
            {/* <!-- Portfolio Item 1--> */}
            <div className="col-md-6 col-lg-4 mb-5">
              <div
                className="portfolio-item mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#portfolioModal1"
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <FontAwesomeIcon icon={faPlus} size="3x" />
                  </div>
                </div>
                <img
                  className="img-fluid"
                  src={image1}
                  alt="..."
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
            {/* <!-- Portfolio Item 2--> */}
            <div className="col-md-6 col-lg-4 mb-5">
              <div
                className="portfolio-item mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#portfolioModal2"
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <FontAwesomeIcon icon={faPlus} size="3x" />
                  </div>
                </div>
                <img
                  className="img-fluid"
                  src={image2}
                  alt="..."
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
            {/* <!-- Portfolio Item 3--> */}
            <div className="col-md-6 col-lg-4 mb-5">
              <div
                className="portfolio-item mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#portfolioModal3"
              >
                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div className="portfolio-item-caption-content text-center text-white">
                    <FontAwesomeIcon icon={faPlus} size="3x" />
                  </div>
                </div>
                <img
                  className="img-fluid"
                  src={image3}
                  alt="..."
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- About Section--> */}
      <section className="page-section bg-primary text-white mb-0" id="about">
        <div className="container">
          {/* <!-- About Section Heading--> */}
          <h2 className="page-section-heading text-center text-uppercase text-white">
            About
          </h2>
          {/* <!-- Icon Divider--> */}
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </div>
            <div className="divider-custom-line"></div>
          </div>
          {/* <!-- About Section Content--> */}
          <div className="row">
            <div className="col-lg-4 ms-auto">
              <p className="lead">
                Freelancer is a free bootstrap theme created by Start Bootstrap.
                The download includes the complete source files including HTML,
                CSS, and JavaScript as well as optional SASS stylesheets for
                easy customization.
              </p>
            </div>
            <div className="col-lg-4 me-auto">
              <p className="lead">
                You can create your own custom avatar for the masthead, change
                the icon in the dividers, and add your email address to the
                contact form to make it fully functional!
              </p>
            </div>
          </div>
          {/* <!-- About Section Button--> */}
          <div className="text-center mt-4">
            <a
              className="btn btn-xl btn-outline-light"
              href="https://startbootstrap.com/theme/freelancer/"
            >
              <i className="fas fa-download me-2"></i>
              Free Download!
            </a>
          </div>
        </div>
      </section>
      {/* <!-- Copyright Section--> */}
      <div className="copyright py-4 text-center text-white">
        <div className="container">
          <small>Copyright &copy; EDDU SSAFY</small>
        </div>
      </div>
      {/* <!-- Portfolio Modals--> */}
      {/* <!-- Portfolio Modal 1--> */}
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal1"
        tabIndex="-1"
        aria-labelledby="portfolioModal1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center pb-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    {/* <!-- Portfolio Modal - Title--> */}
                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Log Cabin
                    </h2>
                    {/* <!-- Icon Divider--> */}
                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon">
                        <FontAwesomeIcon icon={faLightbulb} />
                      </div>
                      <div className="divider-custom-line"></div>
                    </div>
                    {/* <!-- Portfolio Modal - Image--> */}
                    <img
                      className="img-fluid rounded mb-5"
                      src="assets/img/portfolio/cabin.png"
                      alt="..."
                    />
                    {/* <!-- Portfolio Modal - Text--> */}
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Mollitia neque assumenda ipsam nihil, molestias magnam,
                      recusandae quos quis inventore quisquam velit asperiores,
                      vitae? Reprehenderit soluta, eos quod consequuntur itaque.
                      Nam.
                    </p>
                    <button className="btn btn-primary" data-bs-dismiss="modal">
                      <FontAwesomeIcon icon={faXmark} layers="fw" />
                      <i className="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Portfolio Modal 2--> */}
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal2"
        tabIndex="-1"
        aria-labelledby="portfolioModal2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center pb-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    {/* <!-- Portfolio Modal - Title--> */}
                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Tasty Cake
                    </h2>
                    {/* <!-- Icon Divider--> */}
                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon">
                        <FontAwesomeIcon icon={faLightbulb} />
                      </div>
                      <div className="divider-custom-line"></div>
                    </div>
                    {/* <!-- Portfolio Modal - Image--> */}
                    <img
                      className="img-fluid rounded mb-5"
                      src="assets/img/portfolio/cake.png"
                      alt="..."
                    />
                    {/* <!-- Portfolio Modal - Text--> */}
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Mollitia neque assumenda ipsam nihil, molestias magnam,
                      recusandae quos quis inventore quisquam velit asperiores,
                      vitae? Reprehenderit soluta, eos quod consequuntur itaque.
                      Nam.
                    </p>
                    <button className="btn btn-primary" data-bs-dismiss="modal">
                      <FontAwesomeIcon icon={faXmark} layers="fw" />
                      <i className="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Portfolio Modal 3--> */}
      <div
        className="portfolio-modal modal fade"
        id="portfolioModal3"
        tabIndex="-1"
        aria-labelledby="portfolioModal3"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center pb-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    {/* <!-- Portfolio Modal - Title--> */}
                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Circus Tent
                    </h2>
                    {/* <!-- Icon Divider--> */}
                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon">
                        <FontAwesomeIcon icon={faLightbulb} />
                      </div>
                      <div className="divider-custom-line"></div>
                    </div>
                    {/* <!-- Portfolio Modal - Image--> */}
                    <img
                      className="img-fluid rounded mb-5"
                      src="assets/img/portfolio/circus.png"
                      alt="..."
                    />
                    {/* <!-- Portfolio Modal - Text--> */}
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Mollitia neque assumenda ipsam nihil, molestias magnam,
                      recusandae quos quis inventore quisquam velit asperiores,
                      vitae? Reprehenderit soluta, eos quod consequuntur itaque.
                      Nam.
                    </p>
                    <button className="btn btn-primary" data-bs-dismiss="modal">
                      <FontAwesomeIcon icon={faXmark} layers="fw" />
                      <i className="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Bootstrap core JS--> */}
      {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script> */}
      {/* <!-- Core theme JS--> */}
      {/* <script src="js/scripts.js"></script> */}
      {/* <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
    <!-- * *                               SB Forms JS                               * *-->
    <!-- * * Activate your form at https://startbootstrap.com/solution/contact-forms * *-->
    <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *--> */}
      {/* <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script> */}
    </div>
  );
}
export default Mainpage;
