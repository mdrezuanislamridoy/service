import { useState } from "react";
import useUserStore from "../../store/user.store";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const { register } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("User created Successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Signup</legend>

        <label className="label">Name</label>
        <input
          type="name"
          className="input"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
        />
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

        <label className="label">Role</label>
        <div className="flex gap-2">
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="provider"
              checked={formData.role === "provider"}
              onChange={handleChange}
            />
            Provider
          </label>
        </div>
        <button onClick={handleSubmit} className="btn btn-neutral mt-4">
          Signup
        </button>
        <p className="text-center py-2">
          Don't have an account?{" "}
          <Link className="text-blue-400 underline" to={"/login"}>
            login
          </Link>
        </p>
      </fieldset>
    </div>
  );
}
