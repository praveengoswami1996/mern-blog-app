import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-[90px] px-10 flex items-center justify-between border-b">
        {/* Logo Starts */}
        <div>   
            <Link to={"/"}>
                <span className="px-3 py-2 bg-indigo-500 text-white text-xl font-bold rounded-md">Devv Blog</span>
            </Link>
        </div>
        {/* Logo Ends */}

        {/* Search Bar Starts */}
        <div>
            <input 
                type="search"
                placeholder="Search here..."
                className="w-full border border-gray-300 px-5 py-2 rounded-lg outline-none "
            />
        </div>
        {/* Search Bar Ends */}

        {/* Navigation Links Starts */}
        <nav>
            <ul className="flex items-center gap-10 font-semibold">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
            </ul>
        </nav>
        {/* Navigation Links Ends */}

        {/* Dark Mode Toggle Button and Sign in Button Starts */}
        <div className="flex items-center gap-1 justify-end">
            <div className="flex-none">
                <button type="button" className="border p-3 rounded-full">
                    Dark
                </button>
            </div>
            <div className="flex-none">
                <Link to="/signin" className="px-8 py-3 border rounded-md">
                    Sign In
                </Link>
            </div>
        </div>    
        {/* Dark Mode Toggle Button and Sign In Button Ends */}
    </header>
  )
}

export default Header;