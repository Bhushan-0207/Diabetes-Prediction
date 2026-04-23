import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await login(form);
      // console.log("LOGIN RESPONSE:", res.data);
      const token = res.data.access_token;
      if (!token) {
        alert("Login failed!");
        return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("name", res.data.name);
      setToken(token);
      navigate("/predict");
    } catch (err) {
      console.log(err.response?.data);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-gray-100 p-5 max-w-sm mx-auto mt-10 border rounded shadow">
      <h2 className="text-xl font-bold mb-3 text-center">Login</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const value = e.target.value;
          setForm({ ...form, email: value });
          if (emailRegex.test(value) || value === "") {
            setErrors({ ...errors, email: false });
          } else {
            setErrors({ ...errors, email: true });
          }
        }}
        className="border p-2 mb-2 w-full"
      />
      {/* 🔴 Error Message */}
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">Enter a valid email address</p>
      )}
      <input
        className="border p-2 mb-2 w-full"
        type="password"
        placeholder="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className="bg-green-500 text-white p-2 w-full rounded mt-2 hover:bg-green-600"
        onClick={handleSubmit}
      >
        Login
      </button>
      <p className="text-center mt-3">
        Don't have account?
        <button
          onClick={() => navigate("/signup")}
          className="text-blue-500 ml-2"
        >
          Signup
        </button>
      </p>
    </div>
  );
}

export default Login;
