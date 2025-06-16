import './Navbar.css';
// import logo from './logo.png'; // You can replace this with your own logo

function Navbar() {
  let username = localStorage.getItem('username');
  let onpenEditPage =()=>{
    // http://localhost:3002/#/edit-account
    window.location.href = "http://148.113.201.173:4000/#/edit-account";

  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src='/assets/viron-logo.svg' alt="Logo" className="logo" />
        <h2>Viron Network</h2>
      </div>
      <div onClick={()=>onpenEditPage()}  className="navbar-right">
        <p style={{padding:"10px"}}>@{username}</p>
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
