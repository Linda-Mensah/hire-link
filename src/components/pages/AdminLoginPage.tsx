import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const mockAdmins = [
  { email: "admin@hirelink.com", password: "admin123" },
  { email: "recruiter@hirelink.com", password: "recruit123" },
  { email: "hr@hirelink.com", password: "hr123" },
];

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);

      if (success) {
        toast.success("Login successful!");
        navigate("/recruiter");
      } else {
        toast.error("Invalid credentials");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

      {/* Mock Credentials */}
      <div className="mb-6 p-4 border border-amber-400 bg-amber-50 rounded-md w-full max-w-sm">
        <p className="font-medium text-amber-900 mb-2">
          For assessment purposes only:
        </p>
        <ul className="text-stone-700">
          {mockAdmins.map((admin) => (
            <li key={admin.email}>
              Email: <span className="font-semibold">{admin.email}</span> |
              Password: <span className="font-semibold">{admin.password}</span>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 bg-white p-6 rounded-md shadow-md"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-stone-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-stone-300 rounded"
          required
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white font-medium transition ${
            loading
              ? "bg-amber-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="w-full p-2 rounded border border-amber-500 text-amber-700 font-medium hover:bg-amber-50 transition"
          onClick={() => navigate("/")}
        >
          Continue as Candidate
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
