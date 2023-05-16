import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatListElement, { ChatListElementData } from "./ChatListElement";
import { useAuth } from "../../contexts/AuthContext";

const ChatList = () => {
  const [chats, setChats] = useState<ChatListElementData[]>([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const fetchChats = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/chatrooms/`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setChats(response.data);
    };
    fetchChats();
  }, []);

  const createNewChat = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/chatrooms/create/`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      navigate(`/chatroom/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center">
      <div className="mt-8">
        {chats.map((chat: ChatListElementData) => {
          const chatPartner =
            chat.participant1.username !== currentUser
              ? chat.participant1
              : chat.participant2;

          return (
            <ChatListElement
              key={chat.id}
              chat={chat}
              chatPartner={chatPartner}
            />
          );
        })}
      </div>
      <div
        className="p-4 m-2 bg-gray-500 rounded shadow cursor-pointer hover:bg-gray-400"
        onClick={createNewChat}
      >
        <p className="text-md">New Chat</p>
      </div>
    </div>
  );
};

export default ChatList;
