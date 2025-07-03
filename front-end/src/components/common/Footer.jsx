 import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src="images/logo.png" alt="JobSphere Logo" className="footer-logo" />
          <span className="footer-brand">JobSphere</span>
        </div>

        <ul className="footer-links">
          <li><a href="#">About</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} JobSphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

  