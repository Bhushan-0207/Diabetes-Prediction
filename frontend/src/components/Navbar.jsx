import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const userName = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="bg-gray-600 text-white flex justify-between items-center px-6 py-2 shadow">

      {/* LEFT */}
      <div className="flex gap-6 font-medium">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/predict" className="hover:text-gray-200">Predict</Link>
        <Link to="/history" className="hover:text-gray-200">History</Link>
      </div>

      {/* RIGHT */}
      <div className="relative">
        {!token ? (
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/signup" className="hover:text-gray-200">Signup</Link>
          </div>
        ) : (
          <div>
            
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer bg-white text-gray-600 w-9 h-9 flex items-center justify-center rounded-full font-bold"
            >
              {userName?.charAt(0).toUpperCase()}
            </div>

            {/* 🔽 Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg p-3">
                <p className="font-semibold mb-2">{userName}</p>

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 hover:bg-gray-100 p-1 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}