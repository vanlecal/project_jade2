// 2.Generate QR Code

// import { useEffect, useRef, useState } from "react";
// import { generateQr } from "../../utils/api";
// import { QRCodeCanvas } from "qrcode.react";
// import socket from "../../utils/socket";

// const REFRESH_INTERVAL = 3 * 60 * 1000; // 3 minutes in milliseconds
// const REFRESH_SECONDS = REFRESH_INTERVAL / 1000; // 180 seconds

// export function GenerateQR() {
//   const [title, setTitle] = useState("");
//   const [program, setProgram] = useState("");
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
//       const { code, expiresAt } = await generateQr(title, program);
//       const now = new Date();
//       setQrCode(code);
//       setGeneratedAt(now.toLocaleTimeString());
//       setExpiresAt(new Date(expiresAt).toLocaleTimeString());
//       setCountdown(REFRESH_SECONDS); //reset countdown

//       // Emit event to notify students in this program
//       socket.emit("attendance_opened", {
//         program,
//         title,
//         code,
//         generatedAt: now.toISOString(),
//         expiresAt,
//       });
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

//       <select
//         value={program}
//         onChange={(e) => setProgram(e.target.value)}
//         className="form-control mb-3"
//         disabled={isGenerating}
//       >
//         <option value="">Select Program/Class</option>
//         <option value="Computer Science L100">Computer Science L100</option>
//         <option value="Computer Science L200">Computer Science L200</option>
//         <option value="Computer Science L300">Computer Science L300</option>
//         <option value="Computer Science L400">Computer Science L400</option>
//         <option value="AI/ML L100">AI/ML L100</option>
//         <option value="AI/ML L200">AI/ML L200</option>
//         <option value="AI/ML L300">AI/ML L300</option>
//         <option value="AI/ML L400">AI/ML L400</option>
//       </select>

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
