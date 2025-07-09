import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Your custom CSS file
import { API_BASE_URL } from './config';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ForgotPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Simple validation
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Password and confirm password must match.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/update-password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Login failed');
            } else {
                // Optionally store token or user info here
                if (response.ok) {
                    // localStorage.setItem('email', email);
                    // localStorage.setItem('token', data.token); // Assuming the API returns a token
                    // localStorage.setItem('userId', data.userId); // Assuming the API returns a user ID
                    // localStorage.setItem('isAdmin', data.isAdmin); // Assuming the API returns an isAdmin flag
                    console.log("data",data);
                    
                    if (data.message === "Password updated successfully") {
                        navigate('/loginPage');
                    } else {
                        // navigate('/dashboard');
                    }
                } else {
                    localStorage.removeItem('email');
                }

            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="login-page-container">
            {/* Header */}
            <header className="main-header">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <img src="https://viron.network/assets/img/viron-logo.svg" alt="Viron Network Advisor" />
                    </Link>
                    <nav className="main-nav">
                        <ul>
                            <li>
                                <a href="https://viron.network/index.html" className="nav-link">Home</a>
                            </li>
                            <li>
                                <a href="https://viron.network/works" className="nav-link">How It Works</a>
                            </li>
                            <li>
                                <a href="https://viron.network/about" className="nav-link">About Us</a>
                            </li>
                            <li>
                                <a href="https://viron.network/team" className="nav-link">Meet Our Team</a>
                            </li>
                            <li>
                                <a href="https://viron.network/mission" className="nav-link">Our Mission</a>
                            </li>
                            <li>
                                <a href="https://viron.network/testimonials" className="nav-link">Testimonial</a>
                            </li>
                            <li>
                                <a href="https://viron.network/contact" className="nav-link">Contact Us</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="auth-buttons">
                        <a href="https://viron.network/register" className="button registration-button">Registration</a>
                        {/* <a href="https://viron.network/member/loginPage" className="button login-button">Login</a> */}
                    </div>
                </div>
            </header>

            {/* Page Title Area */}
            <section className="page-title-area">
                <div className="container">
                    <div className="page-title-content">
                        <h2>Forgot Password</h2>
                    </div>
                </div>
            </section>

            {/* Forgot password Area */}
            <section className="user-area-style login-area">
                <div className="container">
                    <div className="login-form-action">
                        <div className="section-title">
                            <h2>Forgot password</h2>
                            <h2>VIRON.NETWORK</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="form-group" style={{ position: "relative" }}>
                                <input
                                    className="form-control"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <span onClick={() => setShowPassword(prev => !prev)} style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            
                            <div className="form-group" style={{ position: "relative" }}>
                                <input
                                    className="form-control"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Enter your confirm password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <span onClick={() => setShowConfirmPassword(prev => !prev)} style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
                                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                

                            {/* <div className="login-action">
                                <span className="remember-me">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={remember}
                                        onChange={e => setRemember(e.target.checked)}
                                    />
                                    <label htmlFor="remember">Remember me!</label>
                                </span>
                            </div> */}
                            {error && <div className="login-error">{error}</div>}
                            <button className="submit-button" type="submit" disabled={loading}>
                                {loading ? 'Please wait...' : 'SUBMIT NOW'}
                            </button>
                            <div className="col-12">
                                <div className="login-action text-center">
                                    <span className="forgot-login">
                                        <Link to="/loginPage">Login?</Link>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="main-footer">
                <div className="container footer-content">
                    <div className="footer-section logo-section">
                        <img src="https://viron.network/assets/img/viron-logo-footer.svg" alt="VIRON.NETWORK" />
                    </div>

                    <div className="footer-section navigation-section">
                        <h3 class="black-text">Navigation</h3>
                        <ul>
                            <li>
                                <a href="https://viron.network/index.html" className="nav-link">Home</a>
                            </li>
                            <li>
                                <a href="https://viron.network/works" className="nav-link">How It Works</a>
                            </li>
                            <li>
                                <a href="https://viron.network/about" className="nav-link">About Us</a>
                            </li>
                            <li>
                                <a href="https://viron.network/team" className="nav-link">Meet Our Team</a>
                            </li>
                            <li>
                                <a href="https://viron.network/mission" className="nav-link">Our Mission</a>
                            </li>
                            <li>
                                <a href="https://viron.network/testimonials" className="nav-link">Testimonial</a>
                            </li>
                            <li>
                                <a href="https://viron.network/contact" className="nav-link">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section access-section">
                        <h3 class="black-text">Access</h3>
                        <ul>
                            {/* <li><a href="https://viron.network/member/loginPage" className="footer-button login-footer-button">Login</a></li> */}
                            <li><a href="https://viron.network/register" className="footer-button register-footer-button">Register</a></li>
                        </ul>
                    </div>

                    <div className="footer-section social-media-section">
                        <h3 class="black-text">Social Media</h3>
                        <ul className="social-icons">
                            <li><a href="#"><i className="bx bxl-facebook"></i></a></li>
                            <li><a href="#"><i className="bx bxl-instagram"></i></a></li>
                            <li><a href="#"><i className="bx bxl-youtube"></i></a></li>
                            <li><a href="#"><i className="bx bxl-twitter"></i></a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom-area">
                    <div className="container copy-right">
                        <p class="pb-20">Copyright &copy; 2025 VIRON.NETWORK. All rights reserved.</p>
                        <p class="pb-20">
                            <Link to="/faq"><b>FAQ</b></Link> | <Link to="/privacy-policy"><b>Privacy Policy</b></Link> | <Link to="/disclaimer"><b>Disclaimer</b></Link> | <Link to="/terms-of-use"><b>Terms of Use</b></Link> | <Link to="/service-agreement"><b>Service Agreement</b></Link>
                        </p>
                    </div>
                </div>
            </footer>

            {/* Go Top Button */}
            <div className="go-top">
                <i className="bx bx-chevrons-up"></i>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;