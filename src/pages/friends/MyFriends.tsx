import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import AddFriend from "./AddFriend";
import { useNavigate } from "react-router-dom";

export interface userData {
  id: string;
  username: string;
}

interface FriendData {
  user1: userData;
  user2: userData;
}

function MyFriends() {
  const [friends, setFriends] = useState<FriendData[]>([]);
  const { currentUser } = useAuth();
  const accessToken = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/myfriends/`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setFriends(response.data);
    };

    fetchFriends();
  }, []);

  const createNewChat = async (userId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/chatrooms/create/`,
        { user_id: userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      navigate(`/chatroom/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="p-5 bg-white rounded shadow-lg w-96">
        {friends.map((friend, index) => {
          const friendData =
            friend.user1.username !== currentUser ? friend.user1 : friend.user2;

          return (
            <div
              key={friendData.username}
              className={
                "flex justify-between items-center p-2 mb-2 border rounded cursor-pointer"
              }
              onClick={() => createNewChat(friendData.id)}
            >
              {friendData.username}
            </div>
          );
        })}
      </div>
      <AddFriend />
    </div>
  );
}

export default MyFriends;
