import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MenuIcon, UserCircleIcon, XIcon } from "@heroicons/react/solid";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const navigateToChatrooms = () => {
    navigate(`/chatlist`);
    toggleOpen();
  };

  const navigateToMyFriends = () => {
    navigate(`/myfriends`);
    toggleOpen();
  };

  return (
    <nav className="fixed z-10 flex items-center justify-between p-5 bg-gray-500 w-full">
      <button onClick={toggleOpen}>
        {isOpen ? (
          <XIcon className="h-6 w-6 text-white" />
        ) : (
          <MenuIcon className="h-6 w-6 text-white" />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-12 left-0 w-full bg-gray-500 p-5">
          <p
            className="text-white mb-2 cursor-pointer"
            onClick={navigateToChatrooms}
          >
            My Chats
          </p>
          <p
            className="text-white mb-2 cursor-pointer"
            onClick={navigateToMyFriends}
          >
            My Friends
          </p>
          <button
            className="bg-gray-400 text-white px-4 py-1 rounded"
            onClick={() => {
              logout();
              toggleOpen();
            }}
          >
            Logout
          </button>
        </div>
      )}
      <div className="flex items-center">
        <span className="text-white">{currentUser}</span>
        <UserCircleIcon className="h-6 w-6 text-white ml-2" />
      </div>
    </nav>
  );
}

export default Navbar;
