import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Message, { MessageData } from "./Message";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

function ChatRoom() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [messageText, setMessageText] = useState("");
  const { currentUser } = useAuth();
  const accessToken = localStorage.getItem("access");
  let { chatRoomId } = useParams();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}api/chatrooms/${chatRoomId}/messages`
      )
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Failed to receive messages for chatroom", error);
      });
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    if (!currentUser) {
      console.error("User not logged in!");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/chatrooms/${chatRoomId}/messages/`,
        {
          chatroom: chatRoomId,
          text: messageText,
          timestamp: new Date().toISOString(),
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now(), // TODO replace with real id
          chatroom: chatRoomId || "",
          text: messageText,
          timestamp: new Date().toISOString(),
          author: currentUser,
        },
      ]);

      setMessageText("");
    } catch (error) {
      console.error("Failed to send message: ", error);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-between bg-gray-900">
        <div className="overflow-y-auto items-center mt-5 mb-2 ">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center bg-gray-700 px-2 py-2 mx-6 rounded-md mb-4">
          <input
            className="flex-grow bg-gray-700 rounded px-3 py-2 mr-4 text-gray-100"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <div
            onClick={handleSendMessage}
            className="cursor-pointer transform rotate-45 mx-2"
          >
            <PaperAirplaneIcon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
