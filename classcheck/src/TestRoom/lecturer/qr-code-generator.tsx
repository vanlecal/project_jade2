
//1
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { QrCode } from "lucide-react"

// const programs = [
//   { id: "cs101", name: "Computer Science 101" },
//   { id: "cs205", name: "Data Structures" },
//   { id: "it110", name: "Introduction to IT" },
//   { id: "cs310", name: "Software Engineering" },
//   { id: "cy201", name: "Cybersecurity Fundamentals" },
// ]

// export function QrCodeGenerator() {
//   const [title, setTitle] = useState("")
//   const [program, setProgram] = useState("")
//   const [qrGenerated, setQrGenerated] = useState(false)

//   const handleGenerate = () => {
//     if (title && program) {
//       setQrGenerated(true)
//     }
//   }

//   const handleReset = () => {
//     setTitle("")
//     setProgram("")
//     setQrGenerated(false)
//   }

//   return (
//     <div className="grid gap-6 md:grid-cols-2">
//       <Card>
//         <CardHeader>
//           <CardTitle>Generate QR Code</CardTitle>
//           <CardDescription>Create a QR code for student attendance tracking.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="title">Session Title</Label>
//             <Input
//               id="title"
//               placeholder="e.g., Week 5 Lecture"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="program">Program/Class</Label>
//             <Select value={program} onValueChange={setProgram}>
//               <SelectTrigger id="program">
//                 <SelectValue placeholder="Select a program" />
//               </SelectTrigger>
//               <SelectContent>
//                 {programs.map((prog) => (
//                   <SelectItem key={prog.id} value={prog.id}>
//                     {prog.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button variant="outline" onClick={handleReset}>
//             Reset
//           </Button>
//           <Button onClick={handleGenerate} disabled={!title || !program}>
//             Generate QR Code
//           </Button>
//         </CardFooter>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>QR Code Preview</CardTitle>
//           <CardDescription>Scan this QR code to mark attendance.</CardDescription>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center justify-center p-6">
//           {qrGenerated ? (
//             <div className="space-y-4 text-center">
//               <div className="mx-auto border border-dashed p-6 rounded-lg">
//                 <QrCode className="h-48 w-48 mx-auto" />
//               </div>
//               <div>
//                 <h3 className="font-semibold">{title}</h3>
//                 <p className="text-sm text-muted-foreground">{programs.find((p) => p.id === program)?.name}</p>
//                 <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleDateString()}</p>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
//               <QrCode className="h-16 w-16 mb-4 opacity-20" />
//               <p>Fill in the form and click "Generate QR Code" to create a QR code for attendance.</p>
//             </div>
//           )}
//         </CardContent>
//         {qrGenerated && (
//           <CardFooter className="flex justify-center">
//             <Button variant="outline">Download QR Code</Button>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   )
// }



//2

import { useEffect, useRef, useState } from "react";
import { generateQr } from "../../utils/api";
import { QRCodeCanvas } from "qrcode.react";
import socket from "../../utils/socket";

const REFRESH_INTERVAL = 3 * 60 * 1000; // 3 minutes in milliseconds
const REFRESH_SECONDS = REFRESH_INTERVAL / 1000; // 180 seconds

export function QrCodeGenerator() {
  const [title, setTitle] = useState("");
  const [program, setProgram] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [countdown, setCountdown] = useState<number>(REFRESH_SECONDS);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);


  const generateAndSetQr = async () => {
    try {
      const { code, expiresAt } = await generateQr(title, program);
      const now = new Date();
      setQrCode(code);
      setGeneratedAt(now.toLocaleTimeString());
      setExpiresAt(new Date(expiresAt).toLocaleTimeString());
      setCountdown(REFRESH_SECONDS); // reset countdown

      // Emit event to notify students in this program
      socket.emit("attendance_opened", {
        program,
        title,
        code,
        generatedAt: now.toISOString(),
        expiresAt,
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to generate QR code"
      );
    }
  };

  const handleGenerateQr = async () => {
    if (!title) return setError("Please enter a QR title");
    setError("");
    setIsGenerating(true);
    await generateAndSetQr();

    // Clear old intervals if any
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    // Start QR regeneration loop
    intervalRef.current = setInterval(() => {
      generateAndSetQr();
    }, REFRESH_INTERVAL);

    // Start countdown timer (updates every second)
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : REFRESH_SECONDS));
    }, 1000);
  };

  const stopGeneration = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setIsGenerating(false);
    setCountdown(REFRESH_SECONDS); // reset
  };

  // Clear intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h2>Lecturer Dashboard</h2>
      <h4 className="mb-3">Generate a QR code for your class</h4>

      <input
        type="text"
        placeholder="Enter session title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control mb-3"
        disabled={isGenerating}
      />

      <select
        value={program}
        onChange={(e) => setProgram(e.target.value)}
        className="form-control mb-3"
        disabled={isGenerating}
      >
        <option value="">Select Program/Class</option>
        <option value="Computer Science L100">Computer Science L100</option>
        <option value="Computer Science L200">Computer Science L200</option>
        <option value="Computer Science L300">Computer Science L300</option>
        <option value="Computer Science L400">Computer Science L400</option>
        <option value="AI/ML L100">AI/ML L100</option>
        <option value="AI/ML L200">AI/ML L200</option>
        <option value="AI/ML L300">AI/ML L300</option>
        <option value="AI/ML L400">AI/ML L400</option>
      </select>

      <div className="mb-4">
        {!isGenerating ? (
          <button onClick={handleGenerateQr} className="btn btn-primary">
            Generate & Auto-Refresh QR
          </button>
        ) : (
          <button onClick={stopGeneration} className="btn btn-danger">
            Stop Auto-Generate
          </button>
        )}
      </div>

      {error && <p className="text-danger">{error}</p>}

      {qrCode && (
        <div>
          <h5>QR Code for: {title}</h5>
          <QRCodeCanvas value={qrCode} size={256} />
          <p className="mt-2">Generated at: {generatedAt}</p>
          <p>Expires at: {expiresAt}</p>
          <p className="text-muted">
            Auto refreshes every 3 mins 🔁 — Next in: {countdown}s
          </p>
        </div>
      )}
    </div>
  );
};


