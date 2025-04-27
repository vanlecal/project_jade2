//Tailwind view

// import { useState } from "react";
// import { QrCode, LogOut, HelpCircle } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export default function StudentDashboard() {
//   const [student, setStudent] = useState({
//     name: "Nana Yaw",
//     indexNumber: "1012345",
//     recentAttendance: [
//       { date: "2025-04-18", time: "10:05 AM", status: "Present" },
//       { date: "2025-04-17", time: "02:15 PM", status: "Present" },
//       { date: "2025-04-16", time: "09:30 AM", status: "Present" },
//       { date: "2025-04-15", time: "01:45 PM", status: "Absent" },
//       { date: "2025-04-14", time: "11:20 AM", status: "Present" },
//     ],
//   });

//   const handleLogout = () => {
//     // Implement logout functionality
//     console.log("Logging out...");
//     // Redirect to login page or call your logout API
//   };

//   const handleHelp = () => {
//     // Implement help functionality
//     console.log("Opening help...");
//     // Show help modal or redirect to help page
//   };

//   const handleScanQR = () => {
//     // In a real app, this would open the camera for QR scanning
//     console.log("Opening QR scanner...");
//     // Implement QR code scanning logic
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Header */}
//         <Card className="mb-6 border-t-4 border-t-primary">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Welcome, {student.name}!</CardTitle>
//             <p className="text-muted-foreground">
//               Index Number: {student.indexNumber}
//             </p>
//           </CardHeader>
//         </Card>

//         {/* QR Code Section */}
//         <Card className="mb-6">
//           <CardContent className="flex flex-col items-center justify-center py-10">
//             <Button
//               onClick={handleScanQR}
//               size="lg"
//               className="flex items-center gap-2 text-lg h-16 px-8 bg-slate-950 text-white"
//             >
//               <QrCode className="h-6 w-6" />
//               SCAN QR CODE
//             </Button>
//             <p className="mt-4 text-sm text-muted-foreground">
//               Scan the QR code to mark your attendance
//             </p>
//           </CardContent>
//         </Card>

//         {/* Recent Attendance */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>Recent Attendance</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Time</TableHead>
//                   <TableHead>Status</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {student.recentAttendance.map((record, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{record.date}</TableCell>
//                     <TableCell>{record.time}</TableCell>
//                     <TableCell>
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           record.status === "Present"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {record.status}
//                       </span>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Footer */}
//         <div className="flex justify-between">
//           <Button
//             variant="destructive"
//             onClick={handleLogout}
//             className="flex items-center gap-2"
//           >
//             <LogOut className="h-4 w-4" />
//             Logout
//           </Button>
//           <Button
//             variant="outline"
//             onClick={handleHelp}
//             className="flex items-center gap-2"
//           >
//             <HelpCircle className="h-4 w-4" />
//             Help?
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// //2
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRequest } from "../utils/api";
// import QRScanner from "../components/student/QRScanner";
// import AttendanceHistory from "@/components/student/AttendanceHistory";

// const StudentDashbboard = () => {
//   const [studentName, setStudentName] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("No token found");

//         const data = await getRequest("student/me", token);
//         setStudentName(data.name);
//       } catch (error: unknown) {
//         console.error("Error fetching student info:", error);

//         let errMsg = "Authentication error";

//         if (typeof error === "string") {
//           errMsg = error;
//         } else if (
//           typeof error === "object" &&
//           error !== null &&
//           "message" in error &&
//           typeof (error as { message?: string }).message === "string"
//         ) {
//           errMsg = (error as { message: string }).message;
//         }

//         if (
//           errMsg === "Token verification failed" ||
//           errMsg === "No token found"
//         ) {
//           localStorage.removeItem("token");
//           navigate("student/login");
//         }
//       }
//     };

//     fetchStudentData();
//   }, [navigate]);

//   return (
//     <div className="container mt-5 text-center">
//       <h2>Welcome {studentName || "Loading..."}</h2>
//       <h2>Scan Attendance QR Code</h2>
//       <p>
//         Allow camera access and scan the QR code displayed by your lecturer.
//       </p>
//       <QRScanner />
//       <p>Attendance</p>
//       <AttendanceHistory />
//     </div>
//   );
// };

// export default StudentDashbboard;


//3
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../utils/api";
import QRScanner from "../components/student/QRScanner";
import AttendanceHistory from "@/components/student/AttendanceHistory";
import LoadingScreen from "../components/public/LoadingScreen"; // 👈 import your loading screen

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true); // 👈 Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const data = await getRequest("student/me", token);
        setStudentName(data.name);
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
          navigate("/student/login"); // 👈 (I added a "/" missing before)
        }
      } finally {
        setLoading(false); // 👈 Turn off loading whether success or error
      }
    };

    fetchStudentData();
  }, [navigate]);

  if (loading) {
    return <LoadingScreen />; // 👈 show loading screen while loading
  }

  return (
    <div className="container mt-5 text-center">
      <h2>Welcome {studentName}</h2>
      <h2>Scan Attendance QR Code</h2>
      <p>
        Allow camera access and scan the QR code displayed by your lecturer.
      </p>
      <QRScanner />
      <p>Attendance</p>
      <AttendanceHistory />
    </div>
  );
};

export default StudentDashboard;
