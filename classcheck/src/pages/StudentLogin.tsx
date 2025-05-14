// const StudentLogin = () => {
//   return (
//     <div className="container mt-5">
//       <h2>Student Login</h2>
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

// export default StudentLogin;

// //2
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { postRequest } from "../utils/api";

// const StudentLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await postRequest("student/login", { email, password });
//       localStorage.setItem("token", response.token); // Save JWT token
//       navigate("/student/scan"); // Redirect to student dashboard
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError("Invalid credentials, please try again!");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Student Login</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleLogin}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentLogin;

//3
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Clear any previous errors

    try {
      const response = await postRequest("student/login", { email, password });
      localStorage.setItem("token", response.token);
      navigate("/student/scan");
    } catch (err: Error | unknown) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message || "Invalid credentials, please try again!");
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          errorResponse.response?.data?.message ||
            "Invalid credentials, please try again!"
        );
      } else {
        setError("Invalid credentials, please try again!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-md rounded-lg border">
        <CardHeader className="text-center bg-indigo-600 text-white">
          <CardTitle className="text-2xl font-bold">Student Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <Lock className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
            <div className="mt-4 text-center text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => navigate("/student/register")}
                className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold underline"
              >
                Signup now
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default StudentLogin;
