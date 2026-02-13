import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../config/api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

async function submit() {
  if (!password || password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword: password })
  });

  if (!res.ok) {
    setError("Reset link is invalid or expired");
    return;
  }

  setDone(true);
}


  if (!token) {
    return <p>Invalid reset link.</p>;
  }

  if (done) {
    return <p>Password reset successful. You can now log in.</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Set new password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="New password"
      />
      <button onClick={submit}>Reset password</button>
    </div>
  );
}
