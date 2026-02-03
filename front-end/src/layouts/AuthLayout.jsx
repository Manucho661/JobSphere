import { Outlet } from "react-router-dom";

const AuthLayout = () => {

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="loginLeftSide hidden md:block"></div>
      {/* Right Side */}
      <div className="loginRightSide flex items-center justify-center bg-gray-900 p-6">
        <div className="mt-10 w-full max-w-md p-6 rounded-lg shadow-lg">

          {/* Logo */}

          {/* Welcome Title */}
          <h2 className="text-2xl font-bold italic text-white mb-6">
            Welcome back to Job
            <span className="text-yellow-400">Sphere</span>
          </h2>

          {/* Form */}
          <Outlet />

          {/* Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="px-3 text-gray-400">Or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Social Login */}
          {/* Social Login */}
          <div className="text-center space-y-3">
            <p className="text-white">Sign in with:</p>
            <div className="flex justify-center">
              <button className="flex items-center justify-center space-x-2 bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 w-full">
                <i className="fab fa-google"></i>
                <span>Google</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default AuthLayout;
