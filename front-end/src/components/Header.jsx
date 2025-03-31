  import "./styles/headerStyles.css";

  const Header = () => {
    return (
      <header>
        <div class="header-section d-flex justify-content-between" >
        
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
            <a class="navbar-brand logo" href="#">JobSphere</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="#">Jobs</a>
                </li>
              </ul>
             
            </div>
          </nav>

          <nav class="navbar navbar-expand-lg navbar-light bg-white">
            

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Login</a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="#">Register</a>
                </li>
              </ul>
             
            </div>
          </nav>
        </div>
       
      </header>
    );
  };
  
  export default Header;
  