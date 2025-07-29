import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
  }, [setUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:8090/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        // Store the full user object for session persistence
        Cookies.set("user", JSON.stringify(data.user), { expires: 2 });
        navigate("/");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow form">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            autoFocus
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-sm text-red-600">{message}</div>
      )}
    </div>
  );
};

export default Login;
