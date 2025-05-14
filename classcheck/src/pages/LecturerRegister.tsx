// //1

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { postRequest } from "../utils/api";

// const LecturerRegister = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [sex, setSex] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await postRequest("lecturer/register", {
//         name,
//         email,
//         sex,
//         phone,
//         password,
//       });
//       localStorage.setItem("token", response.token); // Save JWT token
//       navigate("/lecturer/dashboard"); // Redirect to lecturer dashboard
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError("Registration failed, please try again!");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Lecturer Register</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleRegister}>
//         <div className="mb-3">
//           <label>Full Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//           />
//         </div>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//           <div className="mb-3">
//             <label>Phone Number</label>
//             <input
//               type="tel"
//               className="form-control"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Enter your phone number"
//             />
//           </div>
//           <div className="mb-3">
//             <label>Gender</label>
//             <select
//               className="form-control"
//               value={sex}
//               onChange={(e) => setSex(e.target.value)}
//               required
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Create a password"
//           />
//         </div>
//         <button type="submit" className="btn btn-success w-100">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LecturerRegister;

//2
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LecturerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await postRequest("lecturer/register", {
        name,
        email,
        sex,
        phone,
        password,
      });
      localStorage.setItem("token", response.token);
      navigate("/lecturer/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed, please try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-indigo-600 text-white">
          <CardTitle className="text-center text-2xl font-bold">
            Lecturer Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sex">Gender</Label>
              <Select value={sex} onValueChange={setSex}>
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </Button>
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/lecturer/login")}
                className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold underline"
              >
                Log In
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LecturerRegister;
