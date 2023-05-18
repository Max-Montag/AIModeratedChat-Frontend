import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ChatList from "./pages/chat/ChatList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChatRoom from "./pages/chat/ChatRoom";
import MyFriends from "./pages/friends/MyFriends";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route
        path="/chatlist"
        element={
          <PrivateRoute>
            <ChatList />
          </PrivateRoute>
        }
      />
      <Route
        path="/chatroom/:chatRoomId"
        element={
          <PrivateRoute>
            <ChatRoom />
          </PrivateRoute>
        }
      />
      <Route
        path="/myfriends"
        element={
          <PrivateRoute>
            <MyFriends />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
