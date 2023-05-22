import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import ChatRoom from "./pages/chat/ChatRoom";
import ConnectPartner from "./pages/ConnectPartner";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/ourchat"
        element={
          <PrivateRoute>
            <ChatRoom />
          </PrivateRoute>
        }
      />
      <Route
        path="/connectPartner/:partnerId"
        element={
          <PrivateRoute>
            <ConnectPartner />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default AppRoutes;
