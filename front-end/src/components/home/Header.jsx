import ResponsiveNav from '../ResponsiveNav';

const Header = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!storedUser;
  const userRole = storedUser?.role; // 'employer' or 'jobseeker'
  const userName = storedUser?.name;

  // ✅ Dynamically build nav items
  const navItems = [
    { id: 1, label: "Home", to: "/" },

    // Show Sign In or user name
    {
      id: 2,
      label: isLoggedIn ? userName : "Sign In",
      to: isLoggedIn ? "#" : "/login",
    },

    // Employer link logic
    ...(isLoggedIn
      ? userRole === "employer"
        ? [{ id: 3, label: "Dashboard", to: "/employer/dashboard" }]
        : [{ id: 3, label: "Profile", to: "#" }] // jobseekers: no employer link
      : [{ id: 3, label: "Employer", to: "/employer" }]),
  ];

  return (
    <div className="header">
      {/* Left Section: Logo + Title */}
      <div className="w-full px-4 md:px-8 py-2">
        <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-4 md:gap-6">

          {/* Logo Section */}
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-yellow-500 font-semibold shrink-0">
              <b>JS</b>
            </div>
            <span className="text-lg md:text-xl font-bold text-[#00192D] truncate">
              JobSphere
            </span>
          </div>

          {/* Welcome Message (Hidden on small screens) */}
          <div className="hidden md:flex md:col-span-2 items-center justify-center welcomeMessage">
            <h1 className="text-base md:text-xl font-semibold text-[#00192D] text-center">
              <i className="fas fa-users mr-2"></i>
              <i>Where Talent Meet Opportunities</i>
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex justify-end md:col-span-2">
            <ResponsiveNav items={navItems} />
          </div>
        </div>
      </div>

    </div>

  );
};

export default Header;
