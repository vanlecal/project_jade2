import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock, Eye, EyeOff } from "lucide-react";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 New state for toggle
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await postRequest("student/login", { email, password });
      localStorage.setItem("token", response.token);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/student/scan");
      }, 1200);
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <img
        src="/fromJade.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-contain opacity-30 z-0"
      />
      <div className="absolute inset-0 bg-black/10"></div>
      <Card
        className="w-full max-w-md shadow-lg rounded-lg border relative z-10 "
        style={{ background: "#ffffffa6" }}
      >
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
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"} // 👈 Toggle between text/password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="pr-10" // Space for icon
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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
