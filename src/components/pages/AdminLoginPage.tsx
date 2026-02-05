import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { mockAdmins } from "../../constants/mockAdmins";

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-stone-50 via-white to-amber-50/30 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-amber-100/20 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-stone-100/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-full bg-linear-to-br from-amber-100 to-amber-50 p-3 flex items-center justify-center mx-auto mb-4 ring-4 ring-white shadow-sm">
            <img
              src="/images/hirelink-logo.png"
              alt="HireLink Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-stone-800 to-stone-700 bg-clip-text text-transparent mb-2">
            Admin Portal
          </h1>
          <p className="text-stone-600">Secure access to hiring dashboard</p>
        </div>

        {/* credentials box */}
        <div className="mb-8 p-5 border border-amber-200 bg-linear-to-r from-amber-50/80 to-amber-50/50 rounded-xl shadow-sm backdrop-blur-sm">
          <p className="font-medium text-amber-900 mb-3 text-sm tracking-wide">
            FOR ASSESSMENT PURPOSES ONLY:
          </p>
          <div className="space-y-2.5">
            {mockAdmins.map((admin) => (
              <div
                key={admin.email}
                className="p-3 bg-white/60 rounded-lg border border-amber-100 hover:border-amber-200 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-700 truncate">
                      {admin.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-px w-3 bg-stone-300 hidden sm:block"></div>
                    <code className="text-sm font-mono text-amber-700 bg-amber-50 px-2 py-1 rounded">
                      {admin.password}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* login form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 bg-white/90 backdrop-blur-sm p-7 rounded-2xl shadow-sm border border-stone-100"
        >
          <div className="space-y-1">
            <label className="text-sm font-medium text-stone-700">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 border border-stone-200 rounded-lg bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100 focus:outline-none transition-all placeholder:text-stone-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-stone-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 border border-stone-200 rounded-lg bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100 focus:outline-none transition-all placeholder:text-stone-400"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full p-3.5 rounded-lg font-medium transition-all duration-200 ${
              loading
                ? "bg-linear-to-r from-amber-300 to-amber-300 cursor-not-allowed"
                : "bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 shadow-sm hover:shadow"
            } text-white`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Logging in...
              </span>
            ) : (
              "Login to Dashboard"
            )}
          </button>

          <button
            type="button"
            className="w-full p-3.5 rounded-lg border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 hover:border-stone-400 transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Continue as Candidate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
