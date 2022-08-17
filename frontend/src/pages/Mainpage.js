/** @format */
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
  faXmarkCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

import classes from "../css/navbar.module.css";
import { Link } from "react-router-dom";

function Mainpage(props) {
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
                코로나 19 재유행으로 인해 대면으로 수업하기 어려워진 지금, 다시
                비대면 플랫폼이 활성화되고 있습니다. 저희 EDDU SSAFY는 다양한
                교육 기관에서 교육할 때 도움을 줄 수 있는 기능을 포함한 웹
                서비스를 제공합니다.
              </p>
            </div>
            <div className="col-lg-4 me-auto">
              <p className="lead">
                비대면 교육 플랫폼 및 환경이 필요한 강사 와 비대면 환경에서
                집중을 하지 못하는 학생들을 위하여 Quiz와 점수 기능을 제공하여
                집중도를 높일 수 있습니다.
              </p>
            </div>
          </div>
          {/* <!-- About Section Button--> */}
          <div className="text-center mt-4">
            <Link to="/roomlist" className={classes.link}>
              <p className="btn btn-xl btn-outline-light">
                <FontAwesomeIcon icon={faPlayCircle} />
                <i className="fas fa-download me-2"></i>
                Let's Get Study!
              </p>
            </Link>
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
                      Online Lecture
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
                      코로나19 재유행으로 인해 대면으로 수업하기 어려워진 지금,
                      기존 화상 회의 서비스에 여러 기능들을 더해 선생님과 학생
                      모두 만족할 수 있는 교육용 플랫폼을 목표로 합니다.
                      선생님은 화면 공유를 통해 원할한 강의를 진행할 수
                      있습니다.
                    </p>
                    <button className="btn btn-primary" data-bs-dismiss="modal">
                      <FontAwesomeIcon icon={faXmarkCircle} />
                      <i className="fas fa-download me-2"></i>
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
                      Quiz
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
                      서비스를 사용하는 학생들에게 공부에 집중할 수 있는
                      요소들을 추가하여 공부에 흥미를 잃지 않게 만드는 서비스를
                      제공합니다. 선생님이 직접 출제하는 Quiz를 맞추며 학생들은
                      재미있게 학습할 수 있습니다.
                    </p>
                    <button className="btn btn-primary" data-bs-dismiss="modal">
                      <FontAwesomeIcon icon={faXmarkCircle} />
                      <i className="fas fa-download me-2"></i>
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
                      Score & Rank
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
                      비대면 환경에서 집중을 하지 못하는 학생들을 위하여 문제와
                      점수를 시각적으로 보여줍니다. 점수로 순위를 매겨
                      학생들에게 동기부여와 집중도를 높이는 효과를 제공하여
                      학생들의 흥미를 이끌어냅니다.
                    </p>
                    <button className="btn btn-primary" data-bs-dismiss="modal">
                      <FontAwesomeIcon icon={faXmarkCircle} />
                      <i className="fas fa-download me-2"></i>
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
