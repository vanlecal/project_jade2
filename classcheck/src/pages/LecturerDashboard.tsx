// 1.Authenticated Lecturer User component
// import { useEffect, useState } from "react";
// import { getRequest } from "../utils/api"; // adjust path as needed

// const LecturerDashboard = () => {
//   const [lecturerName, setLecturerName] = useState("");

//   useEffect(() => {
//     const fetchLecturer = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No token found");
//         }

//         const data = await getRequest("lecturer/me", token);
//         setLecturerName(data.name);
//       } catch (error: unknown) {
//         console.error(
//           "Error fetching lecturer info:",
//           error instanceof Error ? error.message : error
//         );
//       }
//     };

//     fetchLecturer();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Lecturer Dashboard</h2>
//       <h3>Welcome {lecturerName || "Loading..."}</h3>
//       <p>Generate a QR code for your class session.</p>
//       {/* QR generation button and session list will go here */}
//     </div>
//   );
// };
// export default LecturerDashboard;

// 2.Generate QR Code
// import { useEffect, useRef, useState } from "react";
// import { generateQr } from "../utils/api";
// import { QRCodeCanvas } from "qrcode.react";

// const REFRESH_INTERVAL = 3 * 60 * 1000; // 3 minutes in milliseconds
// const REFRESH_SECONDS = REFRESH_INTERVAL / 1000; // 180 seconds

// const LecturerDashboard = () => {
//   const [title, setTitle] = useState("");
//   const [qrCode, setQrCode] = useState<string | null>(null);
//   const [expiresAt, setExpiresAt] = useState<string | null>(null);
//   const [generatedAt, setGeneratedAt] = useState<string | null>(null);
//   const [error, setError] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [countdown, setCountdown] = useState<number>(REFRESH_SECONDS); // ✅ countdown in seconds

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const countdownRef = useRef<NodeJS.Timeout | null>(null);

//   const generateAndSetQr = async () => {
//     try {
//       const { code, expiresAt } = await generateQr(title);
//       const now = new Date();
//       setQrCode(code);
//       setGeneratedAt(now.toLocaleTimeString());
//       setExpiresAt(new Date(expiresAt).toLocaleTimeString());
//       setCountdown(REFRESH_SECONDS); // ✅ reset countdown
//     } catch (err: unknown) {
//       setError(
//         err instanceof Error ? err.message : "Failed to generate QR code"
//       );
//     }
//   };

//   const handleGenerateQr = async () => {
//     if (!title) return setError("Please enter a QR title");
//     setError("");
//     setIsGenerating(true);
//     await generateAndSetQr();

//     // Clear old intervals if any
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (countdownRef.current) clearInterval(countdownRef.current);

//     // Start QR regeneration loop
//     intervalRef.current = setInterval(() => {
//       generateAndSetQr();
//     }, REFRESH_INTERVAL);

//     // Start countdown timer (updates every second)
//     countdownRef.current = setInterval(() => {
//       setCountdown((prev) => (prev > 0 ? prev - 1 : REFRESH_SECONDS));
//     }, 1000);
//   };

//   const stopGeneration = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//     if (countdownRef.current) {
//       clearInterval(countdownRef.current);
//       countdownRef.current = null;
//     }
//     setIsGenerating(false);
//     setCountdown(REFRESH_SECONDS); // reset
//   };

//   // Clear intervals on unmount
//   useEffect(() => {
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       if (countdownRef.current) clearInterval(countdownRef.current);
//     };
//   }, []);

//   return (
//     <div className="container mt-5 text-center">
//       <h2>Lecturer Dashboard</h2>
//       <h4 className="mb-3">Generate a QR code for your class</h4>

//       <input
//         type="text"
//         placeholder="Enter session title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="form-control mb-3"
//         disabled={isGenerating}
//       />

//       <div className="mb-4">
//         {!isGenerating ? (
//           <button onClick={handleGenerateQr} className="btn btn-primary">
//             Generate & Auto-Refresh QR
//           </button>
//         ) : (
//           <button onClick={stopGeneration} className="btn btn-danger">
//             Stop Auto-Generate
//           </button>
//         )}
//       </div>

//       {error && <p className="text-danger">{error}</p>}

//       {qrCode && (
//         <div>
//           <h5>QR Code for: {title}</h5>
//           <QRCodeCanvas value={qrCode} size={256} />
//           <p className="mt-2">Generated at: {generatedAt}</p>
//           <p>Expires at: {expiresAt}</p>
//           <p className="text-muted">
//             Auto refreshes every 3 mins 🔁 — Next in: {countdown}s
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LecturerDashboard;

// 3.Session List

// import GenerateQR from "../components/lecturer/QRGenerate";
// import LecturerUser from "../components/lecturer/LecturerUser";
// import SessionList from "../components/lecturer/SessionList";

// const LecturerDashboard = () => {
//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Lecturer name</h2>
//       <LecturerUser />
//       <GenerateQR />
//       <SessionList />
//     </div>
//   );
// };

// export default LecturerDashboard;

//4
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRequest } from "../utils/api";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { User, QrCode, AlertCircle } from "lucide-react";
// import GenerateQR from "../components/lecturer/QRGenerate";
// import LecturerUser from "../components/lecturer/LecturerUser";
// import SessionList from "../components/lecturer/SessionList";
// import LoadingScreen from "../components/public/LoadingScreen";

// const LecturerDashboard = () => {
//   const [lecturerName, setLecturerName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLecturer = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No token found");
//         }

//         const data = await getRequest("lecturer/me", token);
//         setLecturerName(data.name);
//       } catch (err: unknown) {
//         const errorMessage =
//           err instanceof Error ? err.message : "Failed to fetch lecturer data";
//         setError(errorMessage);
//         console.error("Error fetching lecturer info:", err);
//         navigate("/lecturer/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLecturer();
//   }, [navigate]);

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       {loading ? (
//         <LoadingScreen />
//       ) : (
//         <Card className="shadow-lg">
//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <h3 className="text-xl font-medium">
//                 Welcome,{" "}
//                 <span className="text-blue-600 dark:text-blue-400">
//                   {lecturerName}
//                 </span>
//                 !
//               </h3>
//             </div>
//           </CardContent>
//           <GenerateQR />
//           <SessionList />
//         </Card>
//       )}
//     </div>
//   );
// };

// export default LecturerDashboard;

//5

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../utils/api";
import LoadingScreen from "../components/public/LoadingScreen";
import DashboardPage from "@/TestRoom/lecturer/dashboard-page";

const LecturerDashboard = () => {
  const [lecturerName, setLecturerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLecturer = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const data = await getRequest("lecturer/me", token);
        setLecturerName(data.name);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch lecturer data";
        setError(errorMessage);
        console.error("Error fetching lecturer info:", err);
        navigate("/lecturer/login");
      } finally {
        setLoading(false);
      }
    };

    fetchLecturer();
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <DashboardPage />
        </div>
      )}
    </div>
  );
};

export default LecturerDashboard;
