// import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer w-full bg-[#00192D] text-white py-10 px-5 text-sm">
      <div className="footer-grid max-w-6xl mx-auto flex flex-wrap justify-between gap-8">

        {/* About Section */}
        <div className="footer-section flex-1 min-w-[200px]">
          <h2 className="text-[#FFC107] mb-4 text-2xl font-semibold">JobSphere</h2>

          <p>
            Jobsphere connects companies with the best tech talent. Post jobs, discover opportunities, and apply with ease — all in one platform
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-section flex-1 min-w-[200px]">
          
          <h2 className="text-[#FFC107] mb-4 text-2xl font-semibold">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#FFC107] hover:underline transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-[#FFC107] hover:underline transition-colors">Jobs</a></li>
            <li><a href="#" className="hover:text-[#FFC107] hover:underline transition-colors">Login</a></li>
            <li><a href="#" className="hover:text-[#FFC107] hover:underline transition-colors">Register</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section flex-1 min-w-[200px]">
          <h2 className="text-[#FFC107] mb-4 text-2xl font-semibold">Contact Us</h2>

          <p className="flex items-center gap-2">
            <i className="fas fa-phone-alt"></i> +254 712 345 678
          </p>
          <p className="flex items-center gap-2">
            <i className="fas fa-envelope"></i> support@JobSphere.co.ke
          </p>
          <p className="flex items-center gap-2">
            <i className="fas fa-map-marker-alt"></i> Nairobi, Kenya
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom mt-8 text-center border-t border-white/20 pt-4 text-gray-400">
        <p className="">
          &copy; {new Date().getFullYear()} JobSphere. All rights reserved.
        </p>
      </div>
    </footer>

  );
};

export default Footer;

