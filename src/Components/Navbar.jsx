import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo & Name */}
      <Link to="/" className="text-2xl font-bold tracking-wider text-blue-400 hover:text-blue-500">
        📝 Notely
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/pastes" className="hover:text-gray-300">Pastes</Link>
      </div>
    </nav>
  );
};

export default Navbar;
