
const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-container">
                    <div>
                        <h3>About</h3>
                        <p>We build modern web apps and share development insights.</p>
                    </div>
                    <div>
                        <h3>Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Contact</h3>
                        <ul>
                            <li>Email: info@example.com</li>
                            <li>Phone: +123 456 789</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Follow</h3>
                        <ul>
                            <li><a href="#">🌐 Facebook</a></li>
                            <li><a href="#">🐦 Twitter</a></li>
                            <li><a href="#">📸 Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    © 2025 My Website | All Rights Reserved
                </div>
            </footer>
        </>
    );
};

export default Footer