import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import API_BASE_URL from './config';

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
      'http://viron.network:3000/assets/css/bootstrap.min.css',
      'http://viron.network:3000/assets/css/owl.theme.default.min.css',
      'http://viron.network:3000/assets/css/owl.carousel.min.css',
      'http://viron.network:3000/assets/css/animate.css',
      'http://viron.network:3000/assets/css/boxicons.min.css',
      'http://viron.network:3000/assets/css/flaticon.css',
      'http://viron.network:3000/assets/css/meanmenu.css',
      'http://viron.network:3000/assets/css/nice-select.css',
      'http://viron.network:3000/assets/css/odometer.css',
      'http://viron.network:3000/assets/css/aos.css',
      'http://viron.network:3000/assets/css/style.css',
      'http://viron.network:3000/assets/css/responsive.css'
    ];
    //JS
    const jsFiles = [
      'http://viron.network:3000/assets/js/jquery.slim.min.js',
      'http://viron.network:3000/assets/js/popper.min.js',
      'http://viron.network:3000/assets/js/bootstrap.min.js',
      'http://viron.network:3000/assets/js/jquery.meanmenu.js',
      'http://viron.network:3000/assets/js/wow.min.js',
      'http://viron.network:3000/assets/js/owl.carousel.js',
      'http://viron.network:3000/assets/js/jquery.nice-select.min.js',
      'http://viron.network:3000/assets/js/jquery.appear.js',
      'http://viron.network:3000/assets/js/odometer.min.js',
      'http://viron.network:3000/assets/js/aos.js',
      'http://viron.network:3000/assets/js/custom.js'
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
          navigate('/dashboard');
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
      <div className="loader js-preloader">
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* START NAV AREA */}
      <div className="nav-area">
        <div className="navbar-area">
          <div className="main-nav">
            <nav className="navbar navbar-expand-md">
              <div className="container">
                <a className="navbar-brand" href="http://viron.network:3000/index.html">
                  <img src="http://viron.network:3000/assets/img/viron-logo.svg" alt="Logo" />
                </a>

                <div className="collapse navbar-collapse mean-menu">
                  <ul className="navbar-nav m-auto">
                    <li className="nav-item">
                      <a href="http://viron.network:3000/index.html" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                      <a href="http://viron.network:3000/works" className="nav-link">How It Works</a>
                    </li>
                    <li className="nav-item">
                      <a href="http://viron.network:3000/about" className="nav-link">About Us</a>
                    </li>
                    <li className="nav-item">
                      <a href="http://viron.network:3000/team" className="nav-link">Meet Our Team</a>
                    </li>
                    <li className="nav-item">
                      <a href="http://viron.network:3000/mission" className="nav-link">Our Mission</a>
                    </li>
                    <li className="nav-item">
                      <a href="http://viron.network:3000/testimonials" className="nav-link">Testimonial</a>
                    </li>
                    <li className="nav-item">
                      <a href="http://viron.network:3000/contact" className="nav-link">Contact Us</a>
                    </li>
                  </ul>

                  {/* Start Others Option */}
                  <div className="nav-others-option desktop d-flex align-items-center">
                    <a href="http://viron.network:3000/register" className="default-btn icon menu-btn-style">
                      Registration
                    </a>&nbsp;
                    <a href="http://viron.network:3000/login" className="default-btn blue-btn icon menu-btn-style">
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
              <img src="http://viron.network:3000/assets/img/viron-logo.svg" alt="Viron" />
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
                    <a href="http://viron.network:3000/register" className="default-btn icon menu-btn-style">Registration</a>
                  </div>
                  <div className="nav-others-option d-flex align-items-center">
                    <a href="http://viron.network:3000/login" className="default-btn blue-btn icon menu-btn-style">Login</a>
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
            <h2>Login</h2>
          </div>
        </div>
      </div>
      {/* END PAGE TITLE AREA */}

      {/* START LOGIN AREA */}
      <section className="user-area-style log-in-area pb-100 pt-50">
        <div className="container">
          <div className="contact-form-action">
            <div data-aos="fade-up" data-aos-duration="1200" className="section-title">
              <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <div className="login-options">
                <label>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                  /> Remember me!
                </label>
                <a href="#">Lost your password?</a>
              </div>

              {error && <div className="login-error">{error}</div>}

              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'LOG IN NOW'}
              </button>
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
                <a href="javascript:void(0)">
                  <img src="http://viron.network:3000/assets/img/viron-logo-footer.svg" style={{ marginTop: "50%", marginBottom: "50%" }} alt="VIRON.NETWORK" />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget pl-40">
                <h3>Navigation</h3>
                <ul>
                  <li><a href="http://viron.network:3000/index.html"><i className="right-icon bx bx-right-arrow-alt"></i>Home</a></li>
                  <li><a href="http://viron.network:3000/works"><i className="right-icon bx bx-right-arrow-alt"></i>How It Works</a></li>
                  <li><a href="http://viron.network:3000/about"><i className="right-icon bx bx-right-arrow-alt"></i>About Us</a></li>
                  <li><a href="http://viron.network:3000/team"><i className="right-icon bx bx-right-arrow-alt"></i>Meet Our Team</a></li>
                  <li><a href="http://viron.network:3000/mission"><i className="right-icon bx bx-right-arrow-alt"></i>Our Mission</a></li>
                  <li><a href="http://viron.network:3000/testimonials"><i className="right-icon bx bx-right-arrow-alt"></i>Testimonials</a></li>
                  <li><a href="http://viron.network:3000/contact"><i className="right-icon bx bx-right-arrow-alt"></i>Contact Us</a></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3>Access</h3>
                <ul>
                  <li><a href="http://viron.network:3000/login" className="default-btn blue-btn">Login</a></li>
                  <li><a href="http://viron.network:3000/register" className="default-btn">Register</a></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3>Social Media</h3>
                <ul className="social-icon">
                  <li><a href="javascript:void(0)"><i className="bx bxl-facebook"></i></a></li>
                  <li><a href="javascript:void(0)"><i className="bx bxl-instagram"></i></a></li>
                  <li><a href="javascript:void(0)"><i className="bx bxl-youtube"></i></a></li>
                  <li><a href="javascript:void(0)"><i className="bx bxl-twitter"></i></a></li>
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
            <p>Copyright <i className="bx bx-copyright"></i> 2025 VIRON.NETWORK. All rights reserved.</p>
            <p>
              <a href="http://viron.network:3000/faq.html"><b>FAQ</b></a> | <a href="http://viron.network:3000/privacy-policy.html"><b>Privacy Policy</b></a> | <a href="http://viron.network:3000/disclaimer.html"><b>Disclaimer</b></a> | <a href="http://viron.network:3000/terms-of-use.html"><b>Terms of Use</b></a> | <a href="http://viron.network:3000/service-agreement.html"><b>Service Agreement</b></a>
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