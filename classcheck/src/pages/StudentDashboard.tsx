import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../utils/api";
import QRScanner from "../components/student/QRScanner";
import SessionStatusList from "@/components/student/SessionStatusList";
import LoadingScreen from "../components/public/LoadingScreen";
import socket from "../utils/socket";

import { QrCode, LogOut, HelpCircle, X, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState("");
  const [studentindex, setStudentindex] = useState("");
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("token");
    navigate("/student/login");
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const data = await getRequest("student/me", token);
        setStudentName(data.name);
        setStudentindex(data.index);

        // ✅ JOIN socket room after program is known
        socket.emit("join_class", data.program);
        console.log(`Joined class room: ${data.program}`);

        // ✅ Listen for attendance alert from lecturer
        socket.on("attendance_opened", (payload) => {
          if (payload.program === data.program) {
            alert(`📢 Attendance session opened for ${payload.program}`);
          }
        });
      } catch (error: unknown) {
        console.error("Error fetching student info:", error);

        let errMsg = "Authentication error";

        if (typeof error === "string") {
          errMsg = error;
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message?: string }).message === "string"
        ) {
          errMsg = (error as { message: string }).message;
        }

        if (
          errMsg === "Token verification failed" ||
          errMsg === "No token found"
        ) {
          localStorage.removeItem("token");
          navigate("/student/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();

    return () => {
      socket.off("attendance_opened");
    };
  }, [navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Card className="mb-6 border-t-4 border-t-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome, {studentName}!</CardTitle>
            <p className="text-muted-foreground">
              Index Number: {studentindex}
            </p>
          </CardHeader>
        </Card>

        {/* QR Code Section */}
        <Card className="mb-6">
          <CardContent className="flex flex-col items-center justify-center py-10">
            {!showScanner && (
              <div>
                <div className="ml-6">
                  <Button
                    onClick={() => setShowScanner(true)}
                    size="lg"
                    className="flex items-center gap-2 text-lg h-16 px-8 bg-slate-950 text-white border-radius-50"
                  >
                    <QrCode className="h-6 w-6" />
                    SCAN QR CODE
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Scan the QR code to mark your attendance
                </p>
              </div>
            )}
            {showScanner && <QRScanner />}
          </CardContent>
        </Card>

        {/* Recent Attendance */}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <SessionStatusList />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-between">
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowHelpPopup(true)}
            className="flex items-center gap-2"
          >
            <HelpCircle className="h-4 w-4" />
            Help?
          </Button>
        </div>
      </div>

      {/* Help Popup */}
      {showHelpPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Help & Support</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHelpPopup(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-gray-600">050-991-1195</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-600">
                    enyanjustine146@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => setShowHelpPopup(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
