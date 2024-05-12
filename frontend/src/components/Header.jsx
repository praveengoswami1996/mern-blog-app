import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDarkMode } from "react-icons/md";
import Navbar from "./Navbar";
import { useState } from "react";
import { NavLinks } from "../data";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="h-auto w-full px-3 md:px-10 flex flex-col border-b">
      <div className="w-full h-[90px] flex items-center justify-between">
        {/* Logo Starts */}
        <div>
          <Link to={"/"}>
            <span className="px-3 py-1 bg-indigo-500 text-white text-xl font-bold rounded-md">
              Devv&apos;s
            </span>
            <span className="text-xl font-semibold">Blog</span>
          </Link>
        </div>
        {/* Logo Ends */}

        {/* Search Bar Starts */}
        <div className="max-[640px]:hidden">
          <input
            type="search"
            placeholder="Search here..."
            className="w-full border border-gray-300 px-5 py-2 rounded-lg outline-none bg-gray-100"
          />
        </div>
        {/* Search Bar Ends */}

        {/* Navigation Links Starts */}
        <Navbar />
        {/* Navigation Links Ends */}

        {/* Dark Mode Toggle Button and Sign in Button Starts */}
        <div className="flex items-center gap-3 justify-end">
          <div className="flex-none">
            <button type="button" className="border p-3 rounded-full">
              <span>
                <MdDarkMode />
              </span>
            </button>
          </div>
          <div className="flex-none">
            <Link
              to="/sign-in"
              className="px-8 py-3 border-2 border-indigo-500 rounded-md text-indigo-500"
            >
              Sign In
            </Link>
          </div>
          <div className="min-[901px]:hidden flex-none">
            <button onClick={() => setShowMenu(!showMenu)} type="button" className="border p-3 rounded-full">
              <span>
                <RxHamburgerMenu />
              </span>
            </button>
          </div>
        </div>
        {/* Dark Mode Toggle Button and Sign In Button Ends */}
      </div>
      {showMenu && (
        <div className="flex flex-col gap-2 transition-all duration-500 min-[900px]:hidden">
          {NavLinks.map((item, index) => {
            return (
                <Link key={index} to={item.to} className="hover:bg-indigo-500 hover:text-white font-semibold text-center py-3">
                    { item.label }
                </Link>
            )
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
