// const LecturerLogin = () => {
//   return (
//     <div className="container mt-5">
//       <h2>Lecturer Login</h2>
//       <form>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter your email"
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter your password"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LecturerLogin;

//2
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/api";

const LecturerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await postRequest("lecturer/login", { email, password });
      localStorage.setItem("token", response.token); // Save JWT token
      navigate("/lecturer/dashboard"); // Redirect to lecturer dashboard
    } catch (err) {
      console.error("Registration error:", err);
      setError("Invalid credentials, please try again!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Lecturer Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LecturerLogin;
