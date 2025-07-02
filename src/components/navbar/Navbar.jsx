import { Fragment, useContext, useState, useEffect, useRef } from "react";
import myContext from "../../context/data/myContext";
import { User, LogOut, Settings, Package, Heart, ShoppingBag, Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import SearchBar from '../search/SearchBar';

function Navbar() {
  const context = useContext(myContext);
  const { mode } = context;

  const [open, setOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // Admin emails list
  const adminEmails = [
    "sarthakchoukse2109@gmail.com",
    "admin@viberaze.com",
    // Add more admin emails here
  ];

  // Check if current user is admin
  const isAdmin = user && adminEmails.includes(user?.user?.email || user?.email);

  // Handlers
  const logout = () => {
    localStorage.clear("user");
    window.location.href = "/login";
  };

  const toggleMobileMenu = () => setOpen(!open);
  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Style configurations
  const getThemeStyles = (baseClass) => ({
    className: baseClass,
    style: { 
      backgroundColor: mode === "dark" ? "rgb(18, 18, 18)" : "",
      color: mode === "dark" ? "white" : "" 
    }
  });

  const getLinkStyles = (baseClass) => ({
    className: baseClass,
    style: { color: mode === "dark" ? "white" : "" }
  });

  const getButtonStyles = (baseClass) => ({
    className: baseClass,
    style: {
      backgroundColor: mode === "dark" ? "rgb(40, 40, 40)" : "",
      color: mode === "dark" ? "white" : ""
    }
  });

  return (
    <div className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-md" style={{ backgroundColor: mode === "dark" ? "rgb(18, 18, 18)" : "white" }}>
      {/* Mobile Menu Dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                {...getThemeStyles("relative flex w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl")}
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between px-4 py-6 border-b">
                  <h2 className="text-lg font-bold" style={{ color: mode === "dark" ? "white" : "black" }}>
                    Viberaze
                  </h2>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="px-4 py-4 border-b">
                  <SearchBar />
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 px-4 py-6 space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Categories
                    </h3>
                  <Link
                      to="/men"
                      {...getLinkStyles("block py-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors")}
                      onClick={() => setOpen(false)}
                  >
                    Men
                  </Link>
                  <Link
                      to="/women"
                      {...getLinkStyles("block py-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors")}
                      onClick={() => setOpen(false)}
                  >
                    Women
                  </Link>
                  <Link
                      to="/kids"
                      {...getLinkStyles("block py-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors")}
                      onClick={() => setOpen(false)}
                    >
                      Kids
                    </Link>
                    <Link
                      to="/accessories"
                      {...getLinkStyles("block py-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors")}
                      onClick={() => setOpen(false)}
                  >
                      Accessories
                  </Link>
                  </div>
                  
                  {/* User-specific Links */}
                  {user && (
                    <div className="pt-6 space-y-3 border-t">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Account
                      </h3>
                      <Link
                        to="/profile"
                        {...getLinkStyles("flex items-center py-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors")}
                        onClick={() => setOpen(false)}
                      >
                        <User size={20} className="mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/order"
                        {...getLinkStyles("flex items-center py-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors")}
                        onClick={() => setOpen(false)}
                      >
                        <Package size={20} className="mr-3" />
                        Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        {...getLinkStyles("flex items-center py-2 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors")}
                        onClick={() => setOpen(false)}
                      >
                        <Heart size={20} className="mr-3" />
                        Wishlist ({wishlistItems.length})
                      </Link>
                    </div>
                  )}

                  {/* Admin Link */}
                  {isAdmin && (
                    <div className="pt-6 border-t">
                      <Link
                        to="/dashboard"
                        {...getLinkStyles("flex items-center py-2 text-lg font-medium text-red-600 hover:text-red-700 transition-colors")}
                        onClick={() => setOpen(false)}
                      >
                        <Settings size={20} className="mr-3" />
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/profit-expense"
                        {...getLinkStyles("flex items-center py-2 text-lg font-medium text-red-600 hover:text-red-700 transition-colors")}
                        onClick={() => setOpen(false)}
                      >
                        Profit & Expense
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Footer */}
                <div className="border-t px-4 py-6">
                  {user ? (
                    <button
                        onClick={logout}
                      className="flex items-center w-full py-3 text-lg font-medium text-red-600 hover:text-red-700 transition-colors"
                      >
                      <LogOut size={20} className="mr-3" />
                        Logout
                    </button>
                  ) : (
                      <Link
                      to="/signup"
                      {...getLinkStyles("flex items-center w-full py-3 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors")}
                      onClick={() => setOpen(false)}
                    >
                      <User size={20} className="mr-3" />
                      Sign Up
                      </Link>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Main Header */}
      <header className="relative">
        {/* Top Banner */}
        <div
          className="bg-black text-white text-center py-2 text-sm font-medium"
          style={{
            backgroundColor: mode === "dark" ? "rgb(40, 40, 40)" : "black",
          }}
        >
          Free shipping on orders over ₹1499 
        </div>

        {/* Main Navigation */}
        <nav className="w-full px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Mobile Menu + Logo + Navigation */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                <Menu size={24} />
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center ml-2.5">
                    <h1
                  className="text-2xl font-black tracking-tight"
                  style={{ color: mode === "dark" ? "white" : "black" }}
                    >
             <img src="/logo.png" alt="Viberaze Logo" className="h-10 w-auto object-contain" />
                    </h1>
                </Link>

              {/* Desktop Navigation - Next to Logo */}
              <div className="hidden lg:flex items-center space-x-6 ml-6">
                  <Link
                  to="/men"
                  {...getLinkStyles("text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors uppercase tracking-wide")}
                  >
                    Men
                  </Link>
                  <Link
                  to="/women"
                  {...getLinkStyles("text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors uppercase tracking-wide")}
                  >
                    Women
                  </Link>
                  <Link
                  to="/kids"
                  {...getLinkStyles("text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors uppercase tracking-wide")}
                  >
                  Kids
                  </Link>
                    <Link
                  to="/accessories"
                  {...getLinkStyles("text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors uppercase tracking-wide")}
                    >
                  Accessories
                    </Link>
                {isAdmin && (
                    <Link
                    to="/dashboard"
                    {...getLinkStyles("text-sm font-medium text-red-600 hover:text-red-700 transition-colors uppercase tracking-wide")}
                    >
                      Admin
                    </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/profit-expense"
                    {...getLinkStyles("text-sm font-medium text-red-600 hover:text-red-700 transition-colors uppercase tracking-wide")}
                  >
                    Profit & Expense
                  </Link>
                )}
              </div>
            </div>

            {/* Center - Empty for balance */}
            <div className="hidden lg:flex flex-1"></div>

            {/* Right Side - Icons */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <div className="hidden lg:block">
                {showSearchBar ? (
                  <div className="flex items-center">
                    <div className="w-64">
                      <SearchBar />
                    </div>
                    <button
                      onClick={toggleSearchBar}
                      className="ml-2 p-2 text-gray-600 hover:text-gray-900 transition-colors"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  ) : (
                  <button
                    onClick={toggleSearchBar}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    <Search size={20} />
                  </button>
                  )}
                </div>

              {/* Mobile Search Icon */}
              <button
                onClick={toggleSearchBar}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                <Search size={20} />
              </button>

              {/* User Profile */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                    <button
                    onClick={toggleProfileDropdown}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                    <User size={20} />
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                         style={{ backgroundColor: mode === "dark" ? "rgb(40, 40, 40)" : "white" }}>
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium" style={{ color: mode === "dark" ? "white" : "black" }}>
                          {user?.name || user?.user?.name || user?.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email || user?.user?.email}
                        </p>
                      </div>
                        <Link
                          to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        style={{ color: mode === "dark" ? "white" : "" }}
                        onClick={() => setShowProfileDropdown(false)}
                        >
                        <User size={16} className="mr-3" />
                          Profile
                        </Link>
                        <Link
                          to="/order"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        style={{ color: mode === "dark" ? "white" : "" }}
                        onClick={() => setShowProfileDropdown(false)}
                        >
                        <Package size={16} className="mr-3" />
                          Orders
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                        >
                        <LogOut size={16} className="mr-3" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
              ) : (
                <Link
                  to="/signup"
                  className="hidden lg:block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Sign Up
                </Link>
                )}
                
                {/* Wishlist */}
                  <Link
                to="/wishlist"
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                )}
                  </Link>

                {/* Cart */}
                  <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                )}
                  </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Search Bar */}
        {showSearchBar && (
          <div className="lg:hidden border-t bg-white px-4 py-3" style={{ backgroundColor: mode === "dark" ? "rgb(18, 18, 18)" : "white" }}>
            <SearchBar />
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;