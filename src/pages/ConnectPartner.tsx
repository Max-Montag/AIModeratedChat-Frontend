import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createAuthenticatedClient } from "../contexts/AuthContext";
import { RefreshIcon } from "@heroicons/react/outline";

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
    <div className="flex justify-center items-center min-h-screen">
      <RefreshIcon className="h-24 w-24 text-gray-500 animate-spin" />
    </div>
  );
}

export default ConnectPartner;
