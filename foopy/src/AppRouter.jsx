import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ResetPassword from "./auth/ResetPassword";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Reset password is standalone */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Everything else is Foopy */}
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
