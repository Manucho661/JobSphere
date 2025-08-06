  // import "./styles/headerStyles.css";
  import { Link } from 'react-router-dom';


  const Header = () => {
    return (
      <div className="header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div className="logo-section">
                <img src="images/logo.png" alt="JobSphere Logo" className="logo-img" />
                <span className="brand-name">JobSphere</span>
              </div>
              <h1 style={{ margin: 0, fontSize: '20px' }}>
                <i className="fas fa-users"  style={{ color: "#00192D", textDecoration: "none" }}></i> Welcome Back
              </h1>
            </div>
            <div className="nav-links" style={{ display: "flex", gap: "20px" }}>
      
              <b>
                 <Link to="/login" style={{ color: "#00192D", textDecoration: "none" }}>
                  <i className="fas fa-sign-out-alt"></i> Login/Register
                </Link>
              </b>
              <b>
                <Link to="/employer" style={{ color: "#00192D", textDecoration: "none" }}>
                  <i className="fas fa-sign-out-alt"></i> Employer
                </Link>
              </b>
            </div>
          </div>
    );
  };
  
  export default Header;
  