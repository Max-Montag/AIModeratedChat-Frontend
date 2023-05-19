import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ConnectPartner() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const connectPartner = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}api/connectPartner/${partnerId}/`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        navigate("/home");
      } catch (error) {
        console.error("Failed to connect with partner:", error);
      }
    };
    connectPartner();
  }, [partnerId, navigate, accessToken]);

  return (
    <div className="text-center">
      <h2>Connecting with partner...</h2>
    </div>
  );
}

export default ConnectPartner;
