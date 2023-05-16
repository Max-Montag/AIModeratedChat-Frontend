import React from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../pages/friends/MyFriends";

export interface ChatListElementData {
  id: string;
  participant1: userData;
  participant2: userData;
}

interface ChatListElementProps {
  chat: ChatListElementData;
  chatPartner: userData;
}

function ChatListElement(props: ChatListElementProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chatroom/${props.chat.id}`);
  };

  return (
    <div
      className="p-4 m-2 bg-gray-500 rounded shadow cursor-pointer hover:bg-gray-400"
      onClick={handleClick}
    >
      <p className="text-md">{props.chatPartner.username}</p>
    </div>
  );
}

export default ChatListElement;
