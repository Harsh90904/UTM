import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Account = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Form state for updating seller account
  const [form, setForm] = useState({
    name: user?.name || "",
    marketplace: user?.marketplace || "",
    apiCredentials: user?.apiCredentials || "",
  });
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("user");
    navigate("/Login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:8090/api/seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Account updated!");
        setUser({ ...user, ...form });
        Cookies.set("user", JSON.stringify({ ...user, ...form }), {
          expires: 7,
        });
      } else {
        setMessage(data.message || "Update failed.");
      }
    } catch {
      setMessage("Server error.");
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-6">Please log in</h2>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-6">Account</h2>
      <p className="mb-4">
        Welcome, <span className="font-semibold">{user.name}</span>!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Marketplace</label>
          <select
            name="marketplace"
            value={form.marketplace}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Marketplace</option>
            <option value="Amazon">Amazon</option>
            <option value="Flipkart">Flipkart</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">API Credentials</label>
          <input
            name="apiCredentials"
            value={form.apiCredentials}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Account
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-green-600">{message}</div>
      )}
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default Account;
