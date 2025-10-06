// import "./styles/headerStyles.css";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="logo-section flex items-center">
          <img
            src="images/logo.png"
            alt="JobSphere Logo"
            className="logo-img"
            style={{ width: "50px", height: "50px" }}
          />
          <h2 className="brand-name ml-2">JobSphere</h2>
        </div>

        <h1 style={{ margin: 0, fontSize: '20px' }}>
          <i className="fas fa-users" style={{ color: "#00192D", textDecoration: "none" }}></i> Welcome Back
        </h1>
      </div>
      <div className="nav-links" style={{ display: "flex", gap: "20px" }}>

        <b>
          <Link to="/" style={{ color: "#00192D", textDecoration: "none" }}>
            <i className="fas fa-sign-out-alt"></i> Home
          </Link>
        </b>
        <b>
          <Link to="/employer" style={{ color: "#00192D", textDecoration: "none" }}>
            <i className="fas fa-sign-out-alt"></i> Log Out
          </Link>
        </b>
      </div>
    </div>
  );
};

export default Header;
