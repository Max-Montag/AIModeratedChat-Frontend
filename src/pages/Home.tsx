import { useNavigate } from "react-router-dom";
import { createAuthenticatedClient, useAuth } from "../contexts/AuthContext";
import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";

interface Stats {
  total_messages: number;
  therapist_messages: number;
}

function Home() {
  const [stats, setStats] = useState({} as Stats);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const openChat = () => {
    navigate(`/ourChat`);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const client = createAuthenticatedClient();
        const statsResponse = await client.get(`api/stats/`, {});
        setStats(statsResponse.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  const urlToShare = `${process.env.REACT_APP_FRONTEND_BASE_URL}connectPartner/${currentUser?.id}`;

  return (
    <div className="text-center text-gray-900">
      <div>
        {currentUser?.userprofile.partner ? (
          <>
            <div className="m-5 text-2xl font-semibold">
              <h2>Your partner: {currentUser?.userprofile.partner}</h2>
            </div>
            <div>
              <div className="m-5 text-x">
                {stats && (
                  <div>
                    <h2 className="mb-2 font-semibold">Your stats:</h2>
                    <p>Total messages: {stats.total_messages}</p>
                    <p>Therapist messages: {stats.therapist_messages}</p>
                    <p>
                      Intervention rate:{" "}
                      {(stats.therapist_messages / stats.total_messages) * 100}%
                    </p>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={openChat}
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 mb-5 rounded"
            >
              Open chat
            </button>
          </>
        ) : (
          <>
            <div className="m-5 text-xl font-semibold">
              <h2>You have not yet connected with your partner</h2>
            </div>
            {currentUser && (
              <div>
                <div className="m-2 text-md font-semibold">
                  <p>Share this link in order to connect to your partner:</p>
                </div>
                <div className="flex justify-center my-10">
                  <div className="flex items-center bg-gray-700 px-2 py-2 mx-6 rounded-md mb-4">
                    <input
                      className="flex-grow bg-gray-700 rounded px-3 py-2 mr-4 text-gray-100"
                      value={urlToShare}
                      readOnly
                    />
                    <CopyToClipboard text={urlToShare}>
                      <div className="cursor-pointer transform mx-2">
                        <DocumentDuplicateIcon className="h-6 w-6 text-white" />
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
