import React from "react";
import { useNavigate } from "react-router-dom";

export interface ChatListElementData {
  id: string;
  name: string;
}

interface ChatListElementProps {
  chat: ChatListElementData;
}

const ChatListElement = ({ chat }: ChatListElementProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chatroom/${chat.id}`);
  };

  return (
    <div
      className="p-4 m-2 bg-gray-500 rounded shadow cursor-pointer hover:bg-gray-400"
      onClick={handleClick}
    >
      <p className="text-md">{chat.name}</p>
    </div>
  );
};

export default ChatListElement;
