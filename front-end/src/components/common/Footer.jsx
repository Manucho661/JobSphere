import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="bg-gray-100 text-[#00192D] px-6 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-2">
            <img
              src="images/logo.png"
              alt="JobSphere Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold">JobSphere</span>
          </div>

          {/* Right: Links */}
          <ul className="flex flex-wrap gap-6 text-sm font-medium">
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-center border-t border-gray-300 pt-4 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} JobSphere. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

