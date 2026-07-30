import "../styles/Navbar.css";

function Navbar() {

  const logout = () => {

    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (

    <nav className="navbar">

      <div className="logo">
        🚗 Smart Parking
      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;