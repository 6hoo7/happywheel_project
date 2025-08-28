import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-end px-6 py-4 bg-transparent absolute top-0 left-0">
      <Link
        to="/login"
        className="flex items-center gap-2 px-5 py-2 
                   bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 
                   text-white font-semibold rounded-full shadow-md 
                   hover:scale-105 hover:shadow-xl transition duration-300"
      >
        <FaUser size={18} />
        Đăng nhập
      </Link>
    </nav>
  );
};

export default Navbar;
