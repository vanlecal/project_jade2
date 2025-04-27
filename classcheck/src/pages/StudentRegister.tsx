// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { postRequest } from "../utils/api";

// const StudentRegister = () => {
//   const [name, setName] = useState("");
//   const [index, setIndex] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState(""); // NEW
//   const [sex, setSex] = useState("");
//   const [program, setProgram] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await postRequest("student/register", {
//         name,
//         index,
//         phone,
//         email,
//         sex,
//         program,
//         password,
//       });
//       localStorage.setItem("token", response.token); // Save JWT token
//       navigate("/student/scan"); // Redirect to student dashboard
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError("Registration failed, please try again!");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Student Register</h2>
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
//           <label>Index Number</label>
//           <input
//             type="text"
//             className="form-control"
//             value={index}
//             onChange={(e) => setIndex(e.target.value)}
//             placeholder="Enter your index number"
//           />
//         </div>
//         <div className="mb-3">
//           <label>Phone Number</label>
//           <input
//             type="tel"
//             className="form-control"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Enter your phone number"
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
//         </div>
//         <div className="mb-3">
//           <label>Gender</label>
//           <select
//             className="form-control"
//             value={sex}
//             onChange={(e) => setSex(e.target.value)}
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label>Program</label>
//           <select
//             className="form-control"
//             value={program}
//             onChange={(e) => setProgram(e.target.value)}
//             required
//           >
//             <option value="">Select Class</option>
//             <option value="Comper Science L100">Comper Science L100</option>
//             <option value="Comper Science L200">Comper Science L200</option>
//             <option value="Comper Science L300">Comper Science L300</option>
//             <option value="Comper Science L400">Comper Science 4100</option>
//             <option value="AI/ML L100">AI/ML L100</option>
//             <option value="AI/ML L200">AI/ML L200</option>
//             <option value="AI/ML L300">AI/ML L300</option>
//             <option value="AI/ML L400">AI/ML L400</option>
//           </select>
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
//         <div className="mb-3">
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Confirm your password"
//           />
//         </div>
//         <button type="submit" className="btn btn-success w-100">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentRegister;

//2
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { postRequest } from "../utils/api";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// const StudentRegister = () => {
//   const [name, setName] = useState("");
//   const [index, setIndex] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [sex, setSex] = useState("");
//   const [program, setProgram] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await postRequest("student/register", {
//         name,
//         index,
//         phone,
//         email,
//         sex,
//         program,
//         password,
//       });
//       localStorage.setItem("token", response.token);
//       navigate("/student/scan");
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError("Registration failed, please try again!");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Student Registration
//         </h2>

//         {error && (
//           <Alert variant="destructive" className="mb-4">
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         <form onSubmit={handleRegister} className="space-y-4">
//           <div>
//             <Label>Full Name</Label>
//             <Input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your full name"
//               required
//             />
//           </div>

//           <div>
//             <Label>Index Number</Label>
//             <Input
//               type="text"
//               value={index}
//               onChange={(e) => setIndex(e.target.value)}
//               placeholder="Enter your index number"
//               required
//             />
//           </div>

//           <div>
//             <Label>Phone Number</Label>
//             <Input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Enter your phone number"
//               required
//             />
//           </div>

//           <div>
//             <Label>Email</Label>
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div>
//             <Label>Gender</Label>
//             <Select value={sex} onValueChange={(value) => setSex(value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select gender" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="male">Male</SelectItem>
//                 <SelectItem value="female">Female</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Program</Label>
//             <Select
//               value={program}
//               onValueChange={(value) => setProgram(value)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select program" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Computer Science L100">
//                   Computer Science L100
//                 </SelectItem>
//                 <SelectItem value="Computer Science L200">
//                   Computer Science L200
//                 </SelectItem>
//                 <SelectItem value="Computer Science L300">
//                   Computer Science L300
//                 </SelectItem>
//                 <SelectItem value="Computer Science L400">
//                   Computer Science L400
//                 </SelectItem>
//                 <SelectItem value="AI/ML L100">AI/ML L100</SelectItem>
//                 <SelectItem value="AI/ML L200">AI/ML L200</SelectItem>
//                 <SelectItem value="AI/ML L300">AI/ML L300</SelectItem>
//                 <SelectItem value="AI/ML L400">AI/ML L400</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Password</Label>
//             <Input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Create a password"
//               required
//             />
//           </div>

//           <div>
//             <Label>Confirm Password</Label>
//             <Input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm your password"
//               required
//             />
//           </div>

//           <Button type="submit" className="w-full">
//             Register
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentRegister;

//3
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StudentRegister = () => {
  const [name, setName] = useState("");
  const [index, setIndex] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sex, setSex] = useState("");
  const [program, setProgram] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await postRequest("student/register", {
        name,
        index,
        phone,
        email,
        sex,
        program,
        password,
      });
      localStorage.setItem("token", response.token);
      navigate("/student/scan");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed, please try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-indigo-600 text-white">
          <CardTitle className="text-2xl font-bold">
            Student Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="index">Index Number</Label>
              <Input
                id="index"
                type="text"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                placeholder="Enter your index number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

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
              <Label htmlFor="sex">Gender</Label>
              <Select value={sex} onValueChange={setSex} required>
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
              <Label htmlFor="program">Program</Label>
              <Select value={program} onValueChange={setProgram} required>
                <SelectTrigger id="program">
                  <SelectValue placeholder="Select Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Comper Science L100">
                    Computer Science L100
                  </SelectItem>
                  <SelectItem value="Comper Science L200">
                    Computer Science L200
                  </SelectItem>
                  <SelectItem value="Comper Science L300">
                    Computer Science L300
                  </SelectItem>
                  <SelectItem value="Comper Science L400">
                    Computer Science L400
                  </SelectItem>
                  <SelectItem value="AI/ML L100">AI/ML L100</SelectItem>
                  <SelectItem value="AI/ML L200">AI/ML L200</SelectItem>
                  <SelectItem value="AI/ML L300">AI/ML L300</SelectItem>
                  <SelectItem value="AI/ML L400">AI/ML L400</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegister;
