import React, { useState, useEffect, useRef } from "react";
import Message, { MessageData } from "./Message";
import { PaperAirplaneIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { useAuth, createAuthenticatedClient } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ChatRoom() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [messageText, setMessageText] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate("/home");
  };

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

  function formatDate(date: Date) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toLocaleDateString() === today.toLocaleDateString()) {
      return "Today";
    } else if (date.toLocaleDateString() === yesterday.toLocaleDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0">
        <ArrowLeftIcon
          className="ml-4 mt-4 h-6 w-6 text-black cursor-pointer"
          onClick={handleBack}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="overflow-y-auto w-full flex flex-col items-start">
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const showMessageDate =
              index === 0 ||
              (prevMessage &&
                new Date(prevMessage.timestamp).toLocaleDateString() !==
                  new Date(message.timestamp).toLocaleDateString());

            return (
              <React.Fragment key={message.id}>
                {showMessageDate && (
                  <div className="ml-24 text-center my-2 text-gray-500">
                    {formatDate(new Date(message.timestamp))}
                  </div>
                )}
                <Message
                  message={message}
                  ownMessage={message.author === currentUser?.username}
                />
              </React.Fragment>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex items-center bg-gray-100">
          <div className="flex items-center w-full bg-gray-700 px-2 py-2 mx-6 rounded-xl mb-4 mt-2">
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
      </div>
    </>
  );
}

export default ChatRoom;
