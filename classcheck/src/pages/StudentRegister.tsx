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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setIsSubmitting(false);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 relative">
      <img
        src="/fromJade.jpg"
        alt="Background"
        className="fixed inset-0 w-full h-full object-contain opacity-30 z-0"
      />
      <div className="fixed inset-0 bg-black/10 z-0"></div>
      <Card
        className="w-full max-w-md shadow-lg rounded-2xl overflow-hidden relative z-10 bg-white/95"
        style={{ background: "rgb(255 255 255 / 83%)" }}
      >
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
                  <SelectItem value="Computer Science L100">
                    Computer Science L100
                  </SelectItem>
                  <SelectItem value="Computer Science L200">
                    Computer Science L200
                  </SelectItem>
                  <SelectItem value="Computer Science L300">
                    Computer Science L300
                  </SelectItem>
                  <SelectItem value="Computer Science L400">
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Register"}
            </Button>
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/student/login")}
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

export default StudentRegister;
