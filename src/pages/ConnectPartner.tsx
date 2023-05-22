import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createAuthenticatedClient } from "../contexts/AuthContext";

function ConnectPartner() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const connectPartner = async () => {
      try {
        const client = createAuthenticatedClient();
        await client.post(`api/connectPartner/${partnerId}/`, {});
        navigate("/home");
      } catch (error) {
        console.error("Failed to connect with partner:", error);
      }
    };
    connectPartner();
  }, [partnerId, navigate]);

  return (
    <div className="text-center">
      <h2>Connecting with partner...</h2>
    </div>
  );
}

export default ConnectPartner;
