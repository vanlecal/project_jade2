// // 3.Session List
// import { useEffect, useState } from "react";
// import { getRequest, deleteRequest } from "../../utils/api";

// interface QrSession {
//   _id: string;
//   title: string;
//   program: string;
//   createdAt: string;
// }

// interface Student {
//   name: string;
//   index: string;
//   phone: string;
// }

// interface AttendanceRecord {
//   _id: string;
//   student: Student;

//   location: string;
//   scannedAt: string;
// }

// const SessionList = () => {
//   const [sessions, setSessions] = useState<QrSession[]>([]);
//   const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
//     null
//   );
//   const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch all QR sessions
//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.warn("No token found");
//           return;
//         }

//         const data = await getRequest("lecturer/sessions", token);
//         setSessions(data);
//       } catch (err) {
//         console.error("Failed to fetch sessions", err);
//       }
//     };

//     fetchSessions();
//   }, []);

//   // Fetch attendance for selected session
//   const fetchAttendance = async (sessionId: string) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("No token found");
//         return;
//       }

//       const data = await getRequest(`lecturer/attendance/${sessionId}`, token);
//       setAttendance(data);
//       setSelectedSessionId(sessionId);
//     } catch (err) {
//       console.error("Failed to fetch attendance", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteSession = async (sessionId: string) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this session?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("No token found");
//         return;
//       }

//       await deleteRequest(`lecturer/sessions/${sessionId}`, token);

//       setSessions((prev) => prev.filter((s) => s._id !== sessionId));

//       if (selectedSessionId === sessionId) {
//         setSelectedSessionId(null);
//         setAttendance([]);
//       }
//     } catch (err) {
//       console.error("Error deleting session:", err);
//       alert("Failed to delete session");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Session Lists</h2>

//       {sessions.length === 0 ? (
//         <p>No QR sessions created yet.</p>
//       ) : (
//         <ul className="list-group mb-4">
//           {sessions.map((session) => (
//             <li
//               key={session._id}
//               className={`list-group-item d-flex justify-content-between align-items-center ${
//                 session._id === selectedSessionId ? "active" : ""
//               }`}
//               style={{ cursor: "pointer" }}
//             >
//               <div onClick={() => fetchAttendance(session._id)}>
//                 <div>
//                   Title - {session.title} Programm: {session.program} Date:{" "}
//                   {new Date(session.createdAt).toLocaleDateString()}
//                 </div>
//               </div>
//               <button
//                 className="btn btn-sm btn-danger"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDeleteSession(session._id);
//                 }}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {selectedSessionId && (
//         <>
//           <h5 className="mb-2">Attendance List</h5>
//           {loading ? (
//             <p>Loading attendance...</p>
//           ) : attendance.length === 0 ? (
//             <p>No students have marked attendance for this session yet.</p>
//           ) : (
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Index Number</th>
//                   <th>Location</th>
//                   <th>Scan Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {attendance.map((record) => (
//                   <tr key={record._id}>
//                     <td>{record.student.name}</td>
//                     <td>{record.student.index}</td>
//                     <td>{record.location}</td>
//                     <td>{new Date(record.scannedAt).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default SessionList;

//2
// import { useEffect, useState } from "react";
// import { getRequest } from "../../utils/api";
// import { Card, CardContent } from "@/components/ui/card";
// import { ChevronDown, ChevronUp } from "lucide-react";

// interface QrSession {
//   _id: string;
//   title: string;
//   program: string;
//   createdAt: string;
//   totalExpected?: number;
//   totalPresent?: number;
// }

// interface Student {
//   name: string;
//   index: string;
//   phone: string;
// }

// interface AttendanceRecord {
//   _id: string;
//   student: Student;
//   location: string;
//   scannedAt: string;
// }

// const SessionList = () => {
//   const [sessions, setSessions] = useState<QrSession[]>([]);
//   const [expandedSessionId, setExpandedSessionId] = useState<string | null>(
//     null
//   );
//   const [attendanceMap, setAttendanceMap] = useState<
//     Record<string, AttendanceRecord[]>
//   >({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const data = await getRequest("lecturer/sessions", token);
//         setSessions(data);
//       } catch (err) {
//         console.error("Failed to fetch sessions", err);
//       }
//     };
//     fetchSessions();
//   }, []);

//   const toggleSession = async (sessionId: string) => {
//     if (expandedSessionId === sessionId) {
//       setExpandedSessionId(null);
//       return;
//     }

//     setExpandedSessionId(sessionId);

//     if (!attendanceMap[sessionId]) {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");
//         const data = await getRequest(
//           `lecturer/attendance/${sessionId}`,
//           token
//         );
//         setAttendanceMap((prev) => ({ ...prev, [sessionId]: data }));
//       } catch (err) {
//         console.error("Failed to fetch attendance", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const formatDate = (iso: string) => {
//     const date = new Date(iso);
//     return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {sessions.map((session) => {
//         const attendance = attendanceMap[session._id] || [];
//         const present = session.totalPresent ?? attendance.length;
//         const expected = session.totalExpected ?? 35;
//         const percentage = Math.round((present / expected) * 100);

//         return (
//           <Card key={session._id} className="border rounded-xl shadow-sm">
//             <CardContent className="p-6">
//               <div
//                 className="flex justify-between items-start cursor-pointer"
//                 onClick={() => toggleSession(session._id)}
//               >
//                 <div>
//                   <h3 className="text-xl font-bold">{session.title}</h3>
//                   <p className="text-muted-foreground text-sm">
//                     {session.program} — {formatDate(session.createdAt)} —
//                     Attendance: {present}/{expected} ({percentage}%)
//                   </p>
//                 </div>
//                 {expandedSessionId === session._id ? (
//                   <ChevronUp className="mt-1" />
//                 ) : (
//                   <ChevronDown className="mt-1" />
//                 )}
//               </div>

//               {expandedSessionId === session._id && (
//                 <div className="mt-6">
//                   {loading ? (
//                     <p className="text-sm text-muted-foreground">
//                       Loading attendance...
//                     </p>
//                   ) : attendance.length === 0 ? (
//                     <p className="text-sm text-muted-foreground">
//                       No students marked attendance yet.
//                     </p>
//                   ) : (
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm mt-4">
//                         <thead className="border-b text-left">
//                           <tr>
//                             <th className="py-2 pr-4">Name</th>
//                             <th className="py-2 pr-4">Index Number</th>
//                             <th className="py-2 pr-4">GPS Location</th>
//                             <th className="py-2">Time</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {attendance.map((record) => (
//                             <tr key={record._id} className="border-b">
//                               <td className="py-2 pr-4">
//                                 {record.student.name}
//                               </td>
//                               <td className="py-2 pr-4">
//                                 {record.student.index}
//                               </td>
//                               <td className="py-2 pr-4">{record.location}</td>
//                               <td className="py-2">
//                                 {new Date(record.scannedAt).toLocaleTimeString(
//                                   [],
//                                   { hour: "2-digit", minute: "2-digit" }
//                                 )}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default SessionList;
