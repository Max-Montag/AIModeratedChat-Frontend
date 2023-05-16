import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ChatList from "./pages/ChatList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotLoggedIn from "./pages/NotLoggedIn";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  return currentUser ? <>{children}</> : <Navigate to="/notloggedin" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/chatlist"
        element={
          <PrivateRoute>
            <ChatList />
          </PrivateRoute>
        }
      />
      <Route path="/notloggedin" element={<NotLoggedIn />} />
      <Route path="*" element={<Navigate to="/notloggedin" />} />
    </Routes>
  );
};

export default AppRoutes;