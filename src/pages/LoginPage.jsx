
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Your custom CSS file
import { API_BASE_URL } from './config';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

const toggleNav = () => {
    document.body.classList.toggle('nav-open');
    setIsNavOpen(prev => !prev);
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

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
                localStorage.setItem('username', username);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('isAdmin', data.isAdmin);
                localStorage.setItem('isCallCenter', data.iscallcenter || '0');
                if (data.isAdmin === 1) {
                    navigate('/admin/userlist');
                } else if (data.iscallcenter === 1) {
                    navigate('/userlist');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="login-page-container">
            <header className="main-header">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <img src="https://viron.network/assets/img/viron-logo.svg" alt="Viron Network Advisor" />
                    </Link>

<div className="hamburger" onClick={toggleNav}>
    {isNavOpen ? '✖' : '☰'}
</div>

                    <nav className="main-nav">  
                        <ul>
                            <li><a href="https://viron.network/index.html">Home</a></li>
                            <li><a href="https://viron.network/works">How It Works</a></li>
                            <li><a href="https://viron.network/about">About Us</a></li>
                            <li><a href="https://viron.network/team">Meet Our Team</a></li>
                            <li><a href="https://viron.network/mission">Our Mission</a></li>
                            <li><a href="https://viron.network/testimonials">Testimonial</a></li>
                            <li><a href="https://viron.network/contact">Contact Us</a></li>
                        </ul>
                    </nav>

                    <div className="auth-buttons">
                        <a href="https://viron.network/register" className="button registration-button">Registration</a>
                        {/* <a href="https://viron.network/member/loginPage" className="button login-button">Login</a> */}
                    </div>
                </div>
            </header>

            <section className="page-title-area">
                <div className="container">
                    <div className="page-title-content">
                        <h2>Login</h2>
                    </div>
                </div>
            </section>

            <section className="user-area-style login-area">
                <div className="container">
                    <div className="login-form-action">
                        <div className="section-title">
                            <h2>Login</h2>
                            <h2>VIRON.NETWORK</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />
                            </div>

                            <div className="form-group" style={{ position: "relative" }}>
                                <input className="form-control" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                                <span onClick={() => setShowPassword(prev => !prev)} style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>

                            <div className="login-action">
                                <span className="remember-me">
                                    <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} />
                                    <label htmlFor="remember">Remember me!</label>
                                </span>
                            </div>
                            {error && <div className="login-error">{error}</div>}
                            <button className="submit-button" type="submit" disabled={loading}>
                                {loading ? 'Logging in...' : 'LOG IN NOW'}
                            </button>
                            <div className="col-12 text-center">
                                <div className="login-action text-center">
                                    <span className="forgot-login">
                                        <Link to="/forgotPassword">Forgot password?</Link>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <footer className="main-footer">
                <div className="container footer-content">
                    <div className="footer-section logo-section">
                        <img src="https://viron.network/assets/img/viron-logo-footer.svg" alt="VIRON.NETWORK" />
                    </div>
                    <br></br>
                     <div className="footer-columns">
                    <div className="footer-section navigation-section">
                        <h3 className="black-text">Navigation</h3>
                        <ul>
                            <li><a href="https://viron.network/home" className="nav-link">Home</a></li>
                            <li><a href="https://viron.network/works" className="nav-link">How It Works</a></li>
                            <li><a href="https://viron.network/about" className="nav-link">About Us</a></li>
                            <li><a href="https://viron.network/team" className="nav-link">Meet Our Team</a></li>
                            <li><a href="https://viron.network/mission" className="nav-link">Our Mission</a></li>
                            <li><a href="https://viron.network/testimonials" className="nav-link">Testimonial</a></li>
                            <li><a href="https://viron.network/contact" className="nav-link">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-section access-section">
                        <h3 className="black-text">Access</h3>
                        <ul>
                            {/* <li><a href="https://viron.network/member/loginPage" className="footer-button login-footer-button">Login</a></li> */}
                            <li><a href="https://viron.network/register" className="footer-button register-footer-button">Register</a></li>
                        </ul>
                    </div>
                    <div className="footer-section social-media-section">
                        <h3 className="black-text">Social Media</h3>
                        <ul className="social-icons">
                            <li><a href="#"><i className="bx bxl-facebook"></i></a></li>
                            <li><a href="#"><i className="bx bxl-instagram"></i></a></li>
                            <li><a href="#"><i className="bx bxl-youtube"></i></a></li>
                            <li><a href="#"><i className="bx bxl-twitter"></i></a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="footer-bottom-area">
                    <div className="container copy-right">
                        <p className="black-text">Copyright &copy; 2025 VIRON.NETWORK. All rights reserved.</p>
                        <p class=" ">
                            <a href="https://viron.network/faq.html"><b>FAQ</b></a> | <a href="https://viron.network/privacy-policy.html"><b>Privacy Policy</b></a> | <a href="https://viron.network/disclaimer.html"><b>Disclaimer</b></a> | <a href="https://viron.network/terms-of-use.html"><b>Terms of Use</b></a> | <a href="https://viron.network/service-agreement.html"><b>Service Agreement</b></a>
                        </p>
                    </div>
                </div>
            </footer>

            <div className="go-top">
                <i className="bx bx-chevrons-up"></i>
            </div>
        </div>
    );
}

export default LoginPage;
