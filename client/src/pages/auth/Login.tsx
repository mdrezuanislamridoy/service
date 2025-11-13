import { useState } from "react";
import useUserStore from "../../store/user.store";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { login } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      alert("login successful");
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className="btn btn-neutral mt-4">
          Login
        </button>
        <p className="text-center py-2">
          Don't have an account?{" "}
          <Link className="text-blue-400 underline" to={"/register"}>
            Signup
          </Link>
        </p>
      </fieldset>
    </div>
  );
}
