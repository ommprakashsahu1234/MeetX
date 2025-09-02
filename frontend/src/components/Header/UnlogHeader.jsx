import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/Logo.png";
import { Menu, HelpCircle, Rocket, X, FileText, ChevronDown } from "lucide-react";

function UnlogHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-menu-container")) {
        setMobileMenuOpen(false);
      }
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 shadow-2xl border-b-2 border-gray-700/50 sticky top-0 z-50 backdrop-blur-lg">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
          {/* Logo & Brand Section */}
          <div
            className="flex items-center gap-3 sm:gap-4 group cursor-pointer flex-shrink-0"
            onClick={() => (window.location.href = "/")}
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 shadow-xl overflow-hidden group-hover:border-cyan-400 transition-all duration-300">
                <img
                  src={Logo}
                  alt="MeetX"
                  className="w-full h-full object-contain p-1.5 sm:p-2 filter brightness-110 group-hover:brightness-125 transition-all duration-300"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full border-2 border-gray-900 shadow-lg"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-cyan-200 transition-all duration-300">
                MeetX
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Your Social Universe
              </p>
            </div>
          </div>

          {/* Desktop Navigation & Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {/* Features Highlight */}
            <div className="hidden lg:flex items-center gap-6 text-gray-400 text-sm">
              <span className="hover:text-cyan-300 transition-colors duration-300 cursor-default">
                Connect with Friends
              </span>
              <div className="w-px h-4 bg-gray-600"></div>
              <span className="hover:text-cyan-300 transition-colors duration-300 cursor-default">
                Share Your Story
              </span>
              <div className="w-px h-4 bg-gray-600"></div>
              <span className="hover:text-cyan-300 transition-colors duration-300 cursor-default">
                Build Communities
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent mx-2"></div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="px-5 py-2.5 lg:px-6 lg:py-3 bg-transparent border-2 border-cyan-400/80 text-cyan-400 rounded-xl font-semibold transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 hover:shadow-lg hover:shadow-cyan-400/25 hover:scale-105 active:scale-95 text-sm lg:text-base backdrop-blur-sm hover:border-cyan-300"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="px-5 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 text-sm lg:text-base shadow-lg"
              >
                Sign Up
              </a>
            </div>

            {/* Desktop More Menu */}
            <div className="dropdown-container relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-3 bg-gray-800/80 border-2 border-gray-600 rounded-xl shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105 active:scale-95 hover:bg-gray-700/80 backdrop-blur-sm group"
              >
                <Menu className="w-5 h-5 text-cyan-400" />
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-all duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-gray-800/95 backdrop-blur-lg border-2 border-gray-600 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-3">
                    <div className="px-4 py-3 border-b border-gray-600 mb-2">
                      <p className="text-sm font-semibold text-gray-100">
                        More Information
                      </p>
                      <p className="text-xs text-gray-400">
                        Learn about MeetX
                      </p>
                    </div>

                    <div className="space-y-1">
                      <a
                        href="/help-support"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700/60 transition-all duration-200 group"
                      >
                        <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          Help & Support
                        </span>
                      </a>
                      <a
                        href="/terms-conditions"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700/60 transition-all duration-200 group"
                      >
                        <FileText className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          Terms & Conditions
                        </span>
                      </a>
                      <a
                        href="/about"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700/60 transition-all duration-200 group"
                      >
                        <Rocket className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          About MeetX
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden mobile-menu-container relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 bg-gray-800/80 border-2 border-gray-600 rounded-xl shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105 active:scale-95 hover:bg-gray-700/80 backdrop-blur-sm"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6 text-cyan-400" />
              )}
            </button>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 bg-gray-800/95 backdrop-blur-lg border-2 border-gray-600 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="p-4">
                  {/* Mobile Brand Info */}
                  <div className="mb-6 text-center">
                    <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      Welcome to MeetX
                    </h2>
                    <p className="text-sm text-gray-400">
                      Connect, share, and discover amazing content
                    </p>
                  </div>

                  {/* Mobile Auth Buttons */}
                  <div className="space-y-3 mb-6">
                    <a
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-500"
                    >
                      <Rocket className="w-5 h-5" />
                      <span>Register</span>
                    </a>

                    <a
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-cyan-400/80 text-cyan-400 font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-400/10 backdrop-blur-sm"
                    >
                      <span>Login</span>
                    </a>
                  </div>

                  {/* Mobile Features List */}
                  <div className="space-y-3 mb-6 border-t-2 border-gray-600 pt-6">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-200 mb-3">
                        Why Choose MeetX?
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-700/50 rounded-lg">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span>Connect with friends worldwide</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-700/50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Share your stories and moments</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-700/50 rounded-lg">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span>Build amazing communities</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2 mb-4 border-t-2 border-gray-600 pt-4">
                    <a
                      href="/terms-conditions"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-600/60 rounded-xl transition-all duration-300"
                    >
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span>Terms & Conditions</span>
                    </a>
                    <a
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-600/60 rounded-xl transition-all duration-300"
                    >
                      <Rocket className="w-5 h-5 text-gray-400" />
                      <span>About MeetX</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default UnlogHeader;
