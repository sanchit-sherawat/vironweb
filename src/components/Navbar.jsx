import './Navbar.css';
// import logo from './logo.png'; // You can replace this with your own logo

function Navbar() {
  let username = localStorage.getItem('username');
  let onpenEditPage =()=>{
    // https://localhost:3002/edit-account
    window.location.href = "https://viron.network/member/edit-account";

  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src='https://viron.network/assets/img/viron-logo.svg' alt="Logo" className="logo" />
        <h2>VIRON NETWORK</h2>
      </div>
      <div  className="navbar-right">
       {/* <p style={{padding:"10px"}}>@{username}</p>
      <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Profile"
          className="profile-pic"
        />*/}
      </div>
    </nav>
  );
}

export default Navbar;
