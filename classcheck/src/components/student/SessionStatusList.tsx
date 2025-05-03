// import { useEffect, useState } from "react";
// import { getRequest } from "../../utils/api";

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

// interface SessionItem {
//   qrCode: string;
//   sessionTitle: string;
//   createdAt: string;
//   expiresAt: string;
//   attended: boolean;
// }

// const SessionStatusList: React.FC = () => {
//   const [sessions, setSessions] = useState<SessionItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Authentication token not found");

//         const response = await getRequest("student/my-qr-sessions", token);
//         setSessions(response.sessions); // no `.data` since getRequest returns `.data` already
//       } catch (err) {
//         if (err instanceof Error) {
//           console.error("Error fetching session status:", err.message);
//           setError(err.message);
//         } else {
//           console.error("Unexpected error:", err);
//           setError("An unexpected error occurred.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSessions();
//   }, []);

//   if (loading) return <p>Loading session status...</p>;
//   if (error) return <p className="text-danger">Error: {error}</p>;
//   if (sessions.length === 0) return <p>No QR sessions available.</p>;

//   return (
//     <div className="mt-4">
//       <h3>QR Attendance Sessions</h3>
//       <table className="table table-bordered mt-3">
//         <thead>
//           <tr>
//             <th>Session Title</th>
//             <th>QR Code</th>
//             <th>Created At</th>
//             <th>Expires At</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sessions.map((session) => (
//             <tr key={session.qrCode}>
//               <td>{session.sessionTitle}</td>
//               <td>{session.qrCode}</td>
//               <td>{new Date(session.createdAt).toLocaleString()}</td>
//               <td>{new Date(session.expiresAt).toLocaleString()}</td>
//               <td>
//                 {session.attended ? (
//                   <span className="text-success">✅ Attended</span>
//                 ) : (
//                   <span className="text-danger">❌ Missed</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SessionStatusList;

//2
import { useEffect, useState } from "react";
import { getRequest } from "../../utils/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SessionItem {
  qrCode: string;
  sessionTitle: string;
  createdAt: string;
  expiresAt: string;
  attended: boolean;
}

const SessionStatusList: React.FC = () => {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await getRequest("student/my-qr-sessions", token);
        setSessions(response.sessions);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching session status:", err.message);
          setError(err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <p>Loading session status...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (sessions.length === 0) return <p>No QR sessions available.</p>;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.qrCode}>
              <TableCell>
                {new Date(session.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(session.createdAt).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                {session.attended ? (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Present
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Miss
                  </span>
                )}
              </TableCell>
              <TableCell>{session.sessionTitle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SessionStatusList;
