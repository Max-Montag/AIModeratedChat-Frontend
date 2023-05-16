import { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import axios from "axios";
import { SearchIcon } from "@heroicons/react/outline";

function AddFriend() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<{ username: string }[]>(
    []
  );
  const accessToken = localStorage.getItem("access");

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}api/users?search=${search}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setSearchResults(response.data);
  };

  const handleAddFriend = async (username: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/addFriend/`,
        { username },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-5 bg-white rounded shadow-lg w-96">
        <form onSubmit={handleSearch} className="flex mb-4">
          <input
            type="text"
            placeholder="Search for a friend..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="p-2 bg-white rounded-l-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </button>
        </form>
        {searchResults.map((user) =>
          user && user.username ? (
            <div
              key={user.username}
              className="flex justify-between items-center p-2 mb-2 border rounded"
            >
              <div>{user.username}</div>
              <button
                onClick={() => handleAddFriend(user.username)}
                className="p-2 bg-green-500 text-white rounded-full"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default AddFriend;
