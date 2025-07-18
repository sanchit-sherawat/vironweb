import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { API_BASE_URL } from './config'; // Adjust the import path as necessary

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
    //CSS
    const cssFiles = [
      'https://viron.network/assets/css/bootstrap.min.css',
      'https://viron.network/assets/css/owl.theme.default.min.css',
      'https://viron.network/assets/css/owl.carousel.min.css',
      'https://viron.network/assets/css/animate.css',
      'https://viron.network/assets/css/boxicons.min.css',
      'https://viron.network/assets/css/flaticon.css',
      'https://viron.network/assets/css/meanmenu.css',
      'https://viron.network/assets/css/nice-select.css',
      'https://viron.network/assets/css/odometer.css',
      'https://viron.network/assets/css/aos.css',
      'https://viron.network/assets/css/style.css',
      'https://viron.network/assets/css/responsive.css'
    ];
    //JS
    const jsFiles = [
      'https://viron.network/assets/js/jquery.slim.min.js',
      'https://viron.network/assets/js/popper.min.js',
      'https://viron.network/assets/js/bootstrap.min.js',
      'https://viron.network/assets/js/jquery.meanmenu.js',
      'https://viron.network/assets/js/wow.min.js',
      'https://viron.network/assets/js/owl.carousel.js',
      'https://viron.network/assets/js/jquery.nice-select.min.js',
      'https://viron.network/assets/js/jquery.appear.js',
      'https://viron.network/assets/js/odometer.min.js',
      'https://viron.network/assets/js/aos.js',
      'https://viron.network/assets/js/custom.js'
    ];

    const links = cssFiles.map(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

    const scripts = jsFiles.map(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return script;
    });

    return () => {
      links.forEach(link => document.head.removeChild(link));
      scripts.forEach(script => document.body.removeChild(script));
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        // Optionally store token or user info here
        if (response.ok) {
          localStorage.setItem('username', username);
          localStorage.setItem('token', data.token); // Assuming the API returns a token
          localStorage.setItem('userId', data.userId); // Assuming the API returns a user ID
          localStorage.setItem('isAdmin', data.isAdmin); // Assuming the API returns an isAdmin flag
          if (data.isAdmin === 1) {
            navigate('/admin/userlist');
          } else {
            navigate('/dashboard');
          }
        } else {
          localStorage.removeItem('username');
        }
        
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Loader */}
      

      {/* START NAV AREA */}
      <div className="nav-area">
        <div className="navbar-area">
          <div className=" ">
            <nav className="navbar navbar-expand-md">
              <div className="container">
                <a className="navbar-brand" href="https://viron.network/index.html">
                  <img src="https://viron.network/assets/img/viron-logo.svg" alt="Logo" />
                </a>

                <div className="collapse navbar-collapse mean-menu">
                  <ul className="navbar-nav m-auto">
                    <li className="nav-item">
                      <a href="https://viron.network/index.html" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                      <a href="https://viron.network/works" className="nav-link">How It Works</a>
                    </li>
                    <li className="nav-item">
                      <a href="https://viron.network/about" className="nav-link">About Us</a>
                    </li>
                    <li className="nav-item">
                      <a href="https://viron.network/team" className="nav-link">Meet Our Team</a>
                    </li>
                    <li className="nav-item">
                      <a href="https://viron.network/mission" className="nav-link">Our Mission</a>
                    </li>
                    <li className="nav-item">
                      <a href="https://viron.network/testimonials" className="nav-link">Testimonial</a>
                    </li>
                    <li className="nav-item">
                      <a href="https://viron.network/contact" className="nav-link">Contact Us</a>
                    </li>
                  </ul>

                  {/* Start Others Option */}
                  <div className="nav-others-option desktop d-flex align-items-center">
                    <a href="https://viron.network/register" className="default-btn icon menu-btn-style">
                      Registration
                    </a>&nbsp;
                    <a href="https://viron.network/login" className="default-btn blue-btn icon menu-btn-style">
                      Login
                    </a>
                  </div>
                  {/* End Others Option */}
                </div>
              </div>
            </nav>
          </div>

          {/* Menu For Mobile Device */}
          <div className="mobile-nav">
            <a href="index.html" className="logo">
              <img src="https://viron.network/assets/img/viron-logo.svg" alt="Viron" />
            </a>
            {/* Start Others Option */}
            <div className="container">
              <div className="dot-menu">
                <div className="inner">
                  <div className="circle circle-one"></div>
                  <div className="circle circle-two"></div>
                  <div className="circle circle-three"></div>
                </div>
              </div>
              <div className="container">
                <div className="option-inner">
                  <div className="nav-others-option d-flex align-items-center">
                    <a href="https://viron.network/register" className="default-btn icon menu-btn-style">Registration</a>
                  </div>
                  <div className="nav-others-option d-flex align-items-center">
                    <a href="https://viron.network/login" className="default-btn blue-btn icon menu-btn-style">Login</a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Others Option */}
          </div>
        </div>
      </div>
      {/* END NAV AREA */}

      {/* START PAGE TITLE AREA */}
      <div className="page-title-area bg-1">
        <div className="container">
          <div className="page-title-content">
            <h2>Forgot Password</h2>
            
          </div>
        </div>
      </div>
      {/* END PAGE TITLE AREA */}

      {/* START LOGIN AREA */}
      <section className="user-area-style log-in-area pb-100 pt-50">
        <div className="container">
          <div className="contact-form-action">
            <div data-aos="fade-up" data-aos-duration="1200" className="section-title">
              <h2>Forgot Password</h2>
              <h2>VIRON.NETWORK</h2>
            </div>
            <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-duration="1600">
              <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                  <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your Email"
                />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group">
                  <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                  <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your confirm password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="confirm-password"
                />
                                </div>
                            </div>

                            
              {error && <div className="login-error">{error}</div>}
                            <div className="col-12">
                                <button className="default-btn btn-two" type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'SUBMIT NOW'}
                                </button>
                            </div>
              <div className="col-12">
                                <div className="login-action text-center">
                                    <span className="forgot-login">
                                        <Link to="/login">Login?</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
            </form>
          </div>
        </div>
      </section>
      {/* END LOGIN AREA */}

      {/* START FOOTER TOP AREA */}
      <footer className="footer-top-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-widget text-center">
                <a href="#">
                  <img src="https://viron.network/assets/img/viron-logo-footer.svg" style={{ marginTop: "50%", marginBottom: "50%" }} alt="VIRON.NETWORK" />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget pl-40">
                <h3>Navigation</h3>
                <ul>
                  <li><a href="https://viron.network/index.html"><i className="right-icon bx bx-right-arrow-alt"></i>Home</a></li>
                  <li><a href="https://viron.network/works"><i className="right-icon bx bx-right-arrow-alt"></i>How It Works</a></li>
                  <li><a href="https://viron.network/about"><i className="right-icon bx bx-right-arrow-alt"></i>About Us</a></li>
                  <li><a href="https://viron.network/team"><i className="right-icon bx bx-right-arrow-alt"></i>Meet Our Team</a></li>
                  <li><a href="https://viron.network/mission"><i className="right-icon bx bx-right-arrow-alt"></i>Our Mission</a></li>
                  <li><a href="https://viron.network/testimonials"><i className="right-icon bx bx-right-arrow-alt"></i>Testimonials</a></li>
                  <li><a href="https://viron.network/contact"><i className="right-icon bx bx-right-arrow-alt"></i>Contact Us</a></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3>Access</h3>
                <ul>
                  <li><a href="https://viron.network/login" className="default-btn blue-btn">Login</a></li>
                  <li><a href="https://viron.network/register" className="default-btn">Register</a></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3>Social Media</h3>
                <ul className="social-icon">
                  <li><a href="#"><i className="bx bxl-facebook"></i></a></li>
                  <li><a href="#"><i className="bx bxl-instagram"></i></a></li>
                  <li><a href="#"><i className="bx bxl-youtube"></i></a></li>
                  <li><a href="#"><i className="bx bxl-twitter"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* END FOOTER TOP AREA */}

      {/* START FOOTER BOTTOM AREA */}
      <footer className="footer-bottom-area">
        <div className="container">
          <div className="copy-right">
            <p class=" ">Copyright <i className="bx bx-copyright"></i> 2025 VIRON.NETWORK. All rights reserved.</p>
            <p class=" ">
              <a href="https://viron.network/faq.html"><b>FAQ</b></a> | <a href="https://viron.network/privacy-policy.html"><b>Privacy Policy</b></a> | <a href="https://viron.network/disclaimer.html"><b>Disclaimer</b></a> | <a href="https://viron.network/terms-of-use.html"><b>Terms of Use</b></a> | <a href="https://viron.network/service-agreement.html"><b>Service Agreement</b></a>
            </p>
          </div>
        </div>
      </footer>
      {/* END FOOTER BOTTOM AREA */}

      {/* START GO TOP AREA */}
      <div className="go-top">
        <i className="bx bx-chevrons-up"></i>
      </div>
    </div>
  );
}

export default Login;