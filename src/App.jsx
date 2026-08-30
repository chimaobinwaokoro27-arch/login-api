import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/Login";
import Profile from "./page/Profile";
import NotFound from "./page/NOTfound";
import ProtectedRoute from "./componenets/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;