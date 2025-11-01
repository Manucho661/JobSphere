// import "./styles/headerStyles.css";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="logo-section flex items-center">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-yellow-500 font-semibold">
           <b>JS</b> 
          </div>
          <h2 className="brand-name ml-2" style={{ margin: 4, fontSize: '20px' }}><b>JobSphere</b></h2>
        </div>

        <h1 style={{ margin: 0, fontSize: '20px' }}>
          <i className="fas fa-users" style={{ color: "#00192D", textDecoration: "none" }}></i> <b><i>Where Opportunities Meet Talent</i></b>
        </h1>
      </div>

      <div className='Donation flex'>
        <div className='flex items-center'> Your yearly donations <span className='mx-4'><b>KSH 0</b></span></div>
        {""} {""}
        <button className='mx-4 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900'> Donate</button>
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
