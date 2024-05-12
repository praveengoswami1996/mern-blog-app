import { Link } from "react-router-dom";
import { NavLinks } from "../data";

const Navbar = () => {
  return (
    <nav className="max-[900px]:hidden">
      <ul className="flex items-center gap-10 font-semibold">
        {NavLinks.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
