import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NewPost from "./pages/NewPost";
import MyProfile from "./pages/MyProfile";
import PostDetails from "./pages/PostDetails"; 
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>

          {/* Home */}
          <Route index element={<Dashboard />} />

          {/* Auth Pages */}
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />

          {/* Single Post Page */}
          <Route path="post/:id" element={<PostDetails />} />

          {/* Protected Routes */}
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewPost />
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
