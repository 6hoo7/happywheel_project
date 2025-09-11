import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { auth } from "../Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // 🔹 modal confirm
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="w-full flex justify-end px-6 py-4 bg-transparent absolute top-0 left-0">
      {!user ? (
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
      ) : (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-5 py-2 
                       bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 
                       text-white font-semibold rounded-full shadow-md 
                       hover:scale-105 hover:shadow-xl transition duration-300"
          >
            <FaUser size={18} />
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setShowMenu(false)}
              >
                Thông tin cá nhân
              </Link>
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowConfirm(true); // 🔹 mở modal
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      )}

      {/* 🔹 Modal xác nhận */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Bạn chắc chắn muốn đăng xuất?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
