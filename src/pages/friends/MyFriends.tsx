import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import axios from "axios";

interface FriendData {
  user1: string;
  user2: string;
}

function MyFriends() {
  const [friends, setFriends] = useState<FriendData[]>([]);
  const navigate = useNavigate();
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

  const handleAddFriend = () => {
    navigate("/addfriend");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-5 bg-white rounded shadow-lg w-96">
        <button
          onClick={handleAddFriend}
          className="w-full p-2 mb-4 bg-blue-500 text-white rounded flex justify-center items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Friend
        </button>
        {friends.map((friend) => (
          <div
            key={friend.user1}
            className="flex justify-between items-center p-2 mb-2 border rounded"
          >
            {friend.user1}
            {friend.user2}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyFriends;
