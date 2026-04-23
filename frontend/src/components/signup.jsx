import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    try {
        //   console.log("SENDING DATA:", form); // 👈 DEBUG
        
      const res = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (!res.data) {
        throw new Error("Signup failed");
      }
      alert("Signup successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
      alert("Signup failed!");
    }
  };
  //   console.log("SIGNUP DATA:", form);

  return (
    <div className="bg-gray-100 p-5 max-w-sm mx-auto mt-10 border rounded shadow">
      <h2 className="text-xl font-bold mb-3 text-center">Signup</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => {
          const value = e.target.value;
          setForm({ ...form, email: value });
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (emailRegex.test(value) || value === "") {
            setErrors({ ...errors, email: false });
          } else {
            setErrors({ ...errors, email: true });
          }
        }}
        className= "border p-2 w-full mb-2" 
      />
        {/* message */}
        {errors.email && (
            <p className="text-red-500 text-sm mb-2">
                Enter a valid email addresss
            </p>
        )}

      <input
        placeholder="password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-2 w-full rounded mt-2 cursor-pointer hover:bg-green-600"
      >
        Signup
      </button>
      <p className="text-center">
        Already have acount?
        <button
          onClick={() => navigate("/login")}
          className=" text-blue-500 rounded p-2  cursor-pointer"
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
