import Header from "../../components/common/Header";
import { useQuery } from "@tanstack/react-query";
import "../../styles/Home.css";

const HomePage = ()=>{
    return(
        <div className="main">
            {/* search bar */}
            <div className="container-fluid py-3">
                <div className="container">
                    <form className="d-flex justify-content-center" role="search" action="">
                        <input 
                            className="form-control me-2 w-50" 
                            type="search" placeholder="Search Jobs" 
                            aria-label="Search" 
                            style={{borderRadius: '8px'}}
                        />
                        <button class="btn" type="submit" style={{ backgroundColor: '#FFC107', color: '#00192D', fontWeight: 600 }}>Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomePage;