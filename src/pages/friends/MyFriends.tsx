import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import AddFriend from "./AddFriend";

interface FriendData {
  user1: string;
  user2: string;
}

function MyFriends() {
  const [friends, setFriends] = useState<FriendData[]>([]);
  const { currentUser } = useAuth();
  const accessToken = localStorage.getItem("access");

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

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="p-5 bg-white rounded shadow-lg w-96">
        {friends.map((friend, index) => {
          const friendUsername =
            friend.user1 !== currentUser ? friend.user1 : friend.user2;

          return (
            <div
              key={friendUsername}
              className={
                "flex justify-between items-center p-2 mb-2 border rounded"
              }
            >
              {friendUsername}
            </div>
          );
        })}
      </div>
      <AddFriend />
    </div>
  );
}

export default MyFriends;
