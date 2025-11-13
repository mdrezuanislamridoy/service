import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Signup";
import useUserStore from "./store/user.store";
import {  useEffect } from "react";
import Dashboard from "./pages/dashboard/Dashboard";

export default function App() {
  const { user, profile } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      await profile();
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
      </Routes>
    </div>
  );
}
