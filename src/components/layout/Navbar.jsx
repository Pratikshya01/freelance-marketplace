import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";

const Logo = () => (
  <Link to="/" className="flex items-center">
    <div className="flex items-center">
      {/* Logo Container */}
      <div className="relative flex items-center">
        {/* Circle Background */}
        <div className="absolute -left-1 w-12 h-12 bg-primary-10 rounded-full"></div>
        {/* Main Logo Text */}
        <div className="relative flex items-center">
          <span className="text-xl sm:text-2xl font-extrabold text-gray-800">
            Freelance <span className="text-primary">Marketplace</span>
          </span>
        </div>
        {/* Decorative Element */}
        <div className="absolute -bottom-1 right-0 w-8 h-1 bg-primary rounded-full"></div>
      </div>
    </div>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const getNavigation = () => {
    // Not authenticated - show default links
    if (!isAuthenticated) {
      return [
        { name: "Home", href: "/" },
        { name: "Jobs", href: "/jobs" },
      ];
    }

    // Client navigation
    if (user?.role === "client") {
      return [
        { name: "Home", href: "/" },
        { name: "Post a Job", href: "/post-job" },
      ];
    }

    // Freelancer navigation
    return [
      { name: "Home", href: "/" },
      { name: "Find Work", href: "/jobs" },
    ];
  };

  const navigation = getNavigation();

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
              {getInitials(user?.name)}
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Link
                to={
                  user?.role === "client" ? "/client/dashboard" : "/dashboard"
                }
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-10 hover:text-primary transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to={
                  user?.role === "client"
                    ? "/client/dashboard/profile"
                    : "/dashboard/profile"
                }
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-10 hover:text-primary transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                Profile
              </Link>
              <div className="border-t border-gray-100">
                <LogoutButton className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-10 hover:text-primary transition-colors" />
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        <Link
          to="/login"
          className="px-6 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-200 hover:shadow-lg hover:shadow-primary-20"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 text-gray-600 border-2 border-gray-200 rounded-full hover:border-primary hover:text-primary transition-all duration-200 hover:shadow-lg"
        >
          Sign up
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              {renderAuthButtons()}
            </div>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden sm:flex lg:hidden items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(user?.name)}
                  </div>
                </button>
                {/* Tablet Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-4 top-16 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to={
                        user?.role === "client"
                          ? "/client/dashboard"
                          : "/dashboard"
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-10 hover:text-primary transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to={
                        user?.role === "client"
                          ? "/client/dashboard/profile"
                          : "/dashboard/profile"
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-10 hover:text-primary transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <div className="border-t border-gray-100">
                      <LogoutButton className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-10 hover:text-primary transition-colors" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-200 text-sm"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-gray-600 border-2 border-gray-200 rounded-full hover:border-primary hover:text-primary transition-all duration-200 text-sm"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            {isAuthenticated ? (
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 focus:outline-none mr-2"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {getInitials(user?.name)}
                </div>
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-200 text-sm mr-2"
              >
                Log in
              </Link>
            )}
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-primary-10 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isAuthenticated && (
        <div
          className={`sm:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-primary-10 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to={user?.role === "client" ? "/client/dashboard" : "/dashboard"}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-primary-10 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to={
                user?.role === "client"
                  ? "/client/dashboard/profile"
                  : "/dashboard/profile"
              }
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-primary-10 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <div className="pt-2 border-t border-gray-200">
              <LogoutButton className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-primary-10 rounded-md transition-colors" />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Dropdown */}
      {isAuthenticated && isProfileOpen && (
        <div className="sm:hidden absolute right-4 top-16 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <Link
            to={user?.role === "client" ? "/client/dashboard" : "/dashboard"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-10 hover:text-primary transition-colors"
            onClick={() => setIsProfileOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to={
              user?.role === "client"
                ? "/client/dashboard/profile"
                : "/dashboard/profile"
            }
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-10 hover:text-primary transition-colors"
            onClick={() => setIsProfileOpen(false)}
          >
            Profile
          </Link>
          <div className="border-t border-gray-100">
            <LogoutButton className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-10 hover:text-primary transition-colors" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
