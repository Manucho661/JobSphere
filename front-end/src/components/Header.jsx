  import "./styles/headerStyles.css";
  

  const Header = () => {
    return (
      <header className="main-header">
      <nav className="navbar">
        <div className="logo-section">
          <img src="images/logo.png" alt="JobSphere Logo" className="logo-img" />
          <span className="brand-name">JobSphere</span>
        </div>

        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">Employers</a></li>
        </ul>

        <div className="mobile-toggle">
          <span>&#9776;</span>
        </div>
      </nav>
    </header>
    );
  };
  
  export default Header;
  