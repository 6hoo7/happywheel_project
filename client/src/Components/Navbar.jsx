import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <nav className="w-full flex justify-end px-6 py-4 bg-transparent absolute top-0 left-0 z-50">
      {!user ? (
        <Link
          to="/login"
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition duration-300"
        >
          <FaUser size={18} />
          Đăng nhập
        </Link>
      ) : (
        <div className="flex items-center gap-3 bg-white/10 p-2 rounded-full pr-4">
          <img src={user.picture} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
          <div className="flex flex-col mr-2">
            <span className="text-black font-medium text-sm">{user.name}</span>

            {/* CHỈ 1 NÚT ĐĂNG XUẤT */}
            <button
              onClick={signOut}
              className="text-xs text-black hover:underline"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
