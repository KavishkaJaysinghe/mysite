import { NavLink, useLocation } from "react-router-dom";
import { logo } from "../assets/images";

const Navbar = () => {
  const location = useLocation(); // Detects the current page

  return (
    <header className="header flex items-center justify-between p-4">
      {/* Hide logo on the home page */}
      {location.pathname !== "/" && (
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-8 h-8 object-contain opacity-100" />
        </NavLink>
      )}

<nav className="flex text-lg gap-7 font-medium">
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `px-3 py-2 rounded-lg transition duration-300 ${
              isActive ? "text-white bg-blue-600" : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          About
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            `px-3 py-2 rounded-lg transition duration-300 ${
              isActive ? "text-white bg-blue-600" : "text-gray-700 hover:text-blue-600"
            }`
          }
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
