import './Navbar.css';
// import logo from './logo.png'; // You can replace this with your own logo

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src='/assets/viron-logo.svg' alt="Logo" className="logo" />
        <h2>Viron Network</h2>
      </div>
      <div className="navbar-right">
        <p style={{padding:"10px"}}>@profile_name</p>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Profile"
          className="profile-pic"
        />
      </div>
    </nav>
  );
}

export default Navbar;
