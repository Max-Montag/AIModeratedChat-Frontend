import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const openChat = () => {
    navigate(`/ourChat`);
  };

  return (
    <div className="text-center text-gray-900">
      <div>
        {currentUser?.userprofile.partner ? (
          <>
            <h2>Dein Partner: {currentUser?.userprofile.partner}</h2>
            <button onClick={openChat}>Chat öffnen</button>
          </>
        ) : (
          <>
            <h2>Kein Partner verbunden</h2>
            {currentUser && (
              <p>
                Teile diesen Link, um als Partner verbunden zu werden:{" "}
                <button
                  onClick={() => navigate(`/connectPartner/${currentUser.id}`)}
                >
                  {`${process.env.REACT_APP_FRONTEND_BASE_URL}connectPartner/${currentUser.id}`}
                </button>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
