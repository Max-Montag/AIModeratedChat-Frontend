import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { MenuIcon } from "@heroicons/react/solid";

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="fixed z-10 flex items-center justify-between p-5 bg-gray-500 w-full">
      <div className="flex items-center">
        <MenuIcon className="h-6 w-6 text-white" />
        <span className="ml-2 text-white">{currentUser}</span>
      </div>
      <button
        className="bg-gray-400 text-white px-4 py-1 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
