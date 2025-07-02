import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/storeContext";
const baseURL = import.meta.env.VITE_BASE_URL;

const Signup = ({ showLogin, setShowLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const { token, setToken } = useContext(StoreContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/api/user/register`, formData);
      if (response.data.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        })
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin("");
      }
    } catch (error) {
      console.log("Error");
      toast.error("Error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg z-50 relative">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Signup
          </h2>

          <button
            onClick={() => setShowLogin(null)}
            className="text-gray-500 text-2xl hover:text-orange-600"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              type={showPwd ? "text" : "password"}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute inset-y-0 top-5 right-2 flex items-center text-gray-500 hover:text-orange-600"
              tabIndex={-1}
            >
              
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-orange-600" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-orange-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
          >
            Sign up
          </button>
        </form>

      </div>
    </div>
  );
};

export default Signup;
