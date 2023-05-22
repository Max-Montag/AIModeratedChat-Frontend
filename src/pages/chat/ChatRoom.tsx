import React, { useState, useEffect, useRef } from "react";
import Message, { MessageData } from "./Message";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { useAuth, createAuthenticatedClient } from "../../contexts/AuthContext";

function ChatRoom() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [messageText, setMessageText] = useState("");
  const { currentUser } = useAuth();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const client = createAuthenticatedClient();
        const response = await client.get(`api/ourChat/messages/`);
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to receive messages for chatroom", error);
      }
    };
    getMessages();
  }, [createAuthenticatedClient]);

  const handleSendMessage = async () => {
    if (!currentUser) {
      console.error("User not logged in!");
      return;
    }

    try {
      const client = createAuthenticatedClient();
      await client.post(`api/ourChat/messages/`, {
        text: messageText,
        timestamp: new Date().toISOString(),
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now(),
          chatroom: "",
          text: messageText,
          timestamp: new Date().toISOString(),
          author: currentUser.username,
        },
      ]);

      setMessageText("");
    } catch (error) {
      console.error("Failed to send message: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="overflow-y-auto mt-5 mb-24 w-full max-w-xl flex flex-col items-start">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              ownMessage={message.author === currentUser?.username}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-4 left-0 right-0 flex items-center bg-gray-700 px-2 py-2 mx-6 rounded-md mb-4">
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
