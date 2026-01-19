import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/login");
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <select onChange={e => setForm({...form, role: e.target.value})}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="chef">Chef</option>
        <option value="waiter">Waiter</option>
        <option value="manager">Manager</option>
      </select>
      <button>Register</button>
    </form>
  );
}
