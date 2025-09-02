import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import Logo from "../../assets/images/Logo.png";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  SquarePlus,
  Search,
  User,
  Home,
  Settings,
  HelpCircle,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const [tagInput, setTagInput] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasUnseenMessages, setHasUnseenMessages] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/user/profile");
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error("Error fetching current user", err);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUnseen = async () => {
      try {
        const res = await axios.get("/messages/unseen-count");
        setHasUnseenMessages(res.data.unseenCount > 0);
      } catch (err) {
        console.error("Error fetching unseen messages", err);
      }
    };
    fetchUnseen();
  }, []);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const res = await axios.get("/user/notifications");
        const newNotis = res.data.notifications.filter((n) => !n.isGot);
        setUnreadCount(newNotis.length);
      } catch (err) {
        console.error("Error fetching notification count", err);
      }
    };
    fetchNotificationCount();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-menu-container")) {
        setMobileMenuOpen(false);
      }
      if (!event.target.closest(".user-dropdown-container")) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTagSearch = async (text) => {
    setTagInput(text);
    if (!text || !currentUser) return setUserSuggestions([]);

    try {
      const res = await axios.get(`/post/search-usernames?q=${text}`);
      const filtered = res.data.filter((user) => user._id !== currentUser._id);
      setUserSuggestions(filtered);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleTagSelect = (user) => {
    navigate(`/user/${user.username}`);
    setTagInput("");
    setUserSuggestions([]);
    setIsSearchFocused(false);
  };

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 shadow-2xl border-b-2 border-gray-700/50 sticky top-0 z-50 backdrop-blur-lg">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto">
        {/* Primary Navigation Row */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
          {/* Logo & Brand Section */}
          <div
            className="flex items-center gap-3 sm:gap-4 group cursor-pointer flex-shrink-0"
            onClick={() => navigate("/")}
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
                Connect • Share • Engage
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md xl:max-w-lg 2xl:max-w-xl mx-6 xl:mx-8 relative">
            <div
              className={`relative w-full transition-all duration-300 ${
                isSearchFocused ? "transform scale-105" : ""
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  className={`h-5 w-5 transition-colors duration-300 ${
                    isSearchFocused ? "text-cyan-400" : "text-gray-400"
                  }`}
                />
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => handleTagSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className={`w-full pl-12 pr-4 py-3 lg:py-3.5 bg-gray-800/80 border-2 rounded-2xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 hover:shadow-xl placeholder-gray-400 text-gray-100 text-sm lg:text-base backdrop-blur-sm ${
                  isSearchFocused
                    ? "border-cyan-500 shadow-2xl bg-gray-800 shadow-cyan-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                placeholder="Search for users, posts, or topics..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-400 border border-gray-600">
                  ⌘K
                </div>
              </div>
            </div>

            {/* Desktop Search Suggestions */}
            {userSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-20 bg-gray-800/95 backdrop-blur-lg border-2 border-gray-600 rounded-2xl shadow-2xl mt-3 max-h-72 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                <div className="p-2">
                  {userSuggestions.map((user, index) => (
                    <div
                      key={user._id}
                      onClick={() => handleTagSelect(user)}
                      className={`px-4 py-3 hover:bg-gray-700/60 cursor-pointer transition-all duration-200 flex items-center gap-3 rounded-xl hover:translate-x-1 group ${
                        index === 0 ? "mt-1" : ""
                      }`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                        {user.username[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-200 font-medium text-sm group-hover:text-white transition-colors">
                          @{user.username}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            {/* Create Post Button */}
            <Link to="/post" className="group relative">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 active:scale-95">
                <SquarePlus className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white hidden xl:block">
                  Create
                </span>
              </div>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-gray-200 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-gray-600 shadow-lg">
                Create New Post
              </div>
            </Link>

            {/* Messages Button */}
            <Link to="/chat" className="group relative">
              <div className="p-3 bg-gray-800/80 border-2 border-gray-600 rounded-xl shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105 active:scale-95 hover:bg-gray-700/80 backdrop-blur-sm">
                <MessageCircle className="w-5 h-5 text-cyan-400" />
                {hasUnseenMessages && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse shadow-lg">
                    <span className="absolute w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75"></span>
                  </span>
                )}
              </div>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-gray-200 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-gray-600 shadow-lg">
                Messages
              </div>
            </Link>

            {/* Notifications Button */}
            <Link to="/notifications" className="group relative">
              <div className="p-3 bg-gray-800/80 border-2 border-gray-600 rounded-xl shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105 active:scale-95 hover:bg-gray-700/80 backdrop-blur-sm">
                <Bell className="w-5 h-5 text-cyan-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce min-w-[1.25rem] h-5 flex items-center justify-center">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-gray-200 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-gray-600 shadow-lg">
                Notifications
              </div>
            </Link>

            {/* Vertical Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent mx-2"></div>

            {/* User Profile Dropdown */}
            <div className="user-dropdown-container relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2.5 bg-gray-800/80 border-2 border-gray-600 rounded-xl shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105 active:scale-95 hover:bg-gray-700/80 backdrop-blur-sm group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-all duration-300 ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-gray-800/95 backdrop-blur-lg border-2 border-gray-600 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-3">
                    <div className="px-4 py-3 border-b border-gray-600 mb-2">
                      <p className="text-sm font-semibold text-gray-100">
                        Account Menu
                      </p>
                      <p className="text-xs text-gray-400">
                        Manage your profile and settings
                      </p>
                    </div>

                    <div className="space-y-1">
                      <a
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700/60 transition-all duration-200 group"
                      >
                        <Home className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          Home
                        </span>
                      </a>
                      <a
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700/60 transition-all duration-200 group"
                      >
                        <User className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          Profile
                        </span>
                      </a>
                      <a
                        href="/account"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700/60 transition-all duration-200 group"
                      >
                        <Settings className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          Settings
                        </span>
                      </a>
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
                          Terms & Privacy
                        </span>
                      </a>
                    </div>

                    <div className="border-t border-gray-600 mt-3 pt-3">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all duration-200 group"
                      >
                        <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                        <span className="font-medium text-gray-200 group-hover:text-red-300 transition-colors">
                          Sign Out
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden mobile-menu-container relative">
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
                  {/* Mobile Search */}
                  <div className="mb-4 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => handleTagSearch(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/80 border-2 border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Search users..."
                    />
                    {/* Mobile Search Suggestions */}
                    {userSuggestions.length > 0 && (
                      <div className="absolute z-10 bg-gray-700/95 backdrop-blur-lg w-full border-2 border-gray-600 rounded-xl shadow-xl mt-2 max-h-48 overflow-y-auto">
                        {userSuggestions.map((user) => (
                          <div
                            key={user._id}
                            onClick={() => handleTagSelect(user)}
                            className="px-4 py-3 hover:bg-gray-600/60 cursor-pointer flex items-center gap-3 transition-all duration-200"
                          >
                            <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {user.username[0].toUpperCase()}
                            </div>
                            <span className="text-gray-200 text-sm">@{user.username}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="space-y-3 mb-4">
                    <Link
                      to="/post"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-500"
                    >
                      <SquarePlus className="w-5 h-5" />
                      <span>Create New Post</span>
                    </Link>

                    <Link
                      to="/chat"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700/80 border-2 border-gray-600 text-gray-100 rounded-xl hover:bg-gray-600/80 hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm"
                    >
                      <MessageCircle className="w-5 h-5 text-cyan-400" />
                      <span>Messages</span>
                      {hasUnseenMessages && (
                        <span className="ml-auto w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                    </Link>

                    <Link
                      to="/notifications"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700/80 border-2 border-gray-600 text-gray-100 rounded-xl hover:bg-gray-600/80 hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm"
                    >
                      <Bell className="w-5 h-5 text-cyan-400" />
                      <span>Notifications</span>
                      {unreadCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center">
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2 mb-4 border-t-2 border-gray-600 pt-4">
                    <a
                      href="/"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-600/60 rounded-xl transition-all duration-300"
                    >
                      <Home className="w-5 h-5 text-gray-400" />
                      <span>Home</span>
                    </a>
                    <a
                      href="/profile"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-600/60 rounded-xl transition-all duration-300"
                    >
                      <User className="w-5 h-5 text-gray-400" />
                      <span>Profile</span>
                    </a>
                    <a
                      href="/account"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-600/60 rounded-xl transition-all duration-300"
                    >
                      <Settings className="w-5 h-5 text-gray-400" />
                      <span>Settings</span>
                    </a>
                    <a
                      href="/help-support"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-600/60 rounded-xl transition-all duration-300"
                    >
                      <HelpCircle className="w-5 h-5 text-gray-400" />
                      <span>Help & Support</span>
                    </a>
                    <a
                      href="/terms-conditions"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-600/60 rounded-xl transition-all duration-300"
                    >
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span>Terms & Privacy</span>
                    </a>
                  </div>

                  {/* Mobile Logout */}
                  <div className="border-t-2 border-gray-600 pt-4">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
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

export default Header;
