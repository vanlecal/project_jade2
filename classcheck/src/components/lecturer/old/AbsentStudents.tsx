// //localhost:5000/ap/api/attendance/absent/
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// interface AbsentStudent {
//   name: string;
//   indexNumber: string;
//   program: string;
//   missedSessionTitle: string;
// }

// const AbsentStudents: React.FC = () => {
//   const { qrSessionId } = useParams<{ qrSessionId: string }>();
//   const [absentees, setAbsentees] = useState<AbsentStudent[]>([]);
//   const [sessionTitle, setSessionTitle] = useState("");
//   const [program, setProgram] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAbsentStudents = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/ap/api/attendance/absent/${qrSessionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`, // or another secure source
//             },
//           }
//         );
//         console.log("API response:", response.data);

//         const { absentees, sessionTitle, program } = response.data;
//         setAbsentees(absentees);
//         setSessionTitle(sessionTitle);
//         setProgram(program);
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (qrSessionId) fetchAbsentStudents();
//   }, [qrSessionId]);

//   if (loading) return <p>Loading absentees...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Absent Students</h2>
//       <p className="mb-2">
//         Session: <strong>{sessionTitle}</strong>
//       </p>
//       <p className="mb-4">
//         Program: <strong>{program}</strong>
//       </p>

//       {absentees.length === 0 ? (
//         <p>No students missed this session.</p>
//       ) : (
//         <table className="w-full table-auto border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Index Number</th>
//               <th className="border px-4 py-2">Program</th>
//               <th className="border px-4 py-2">Missed Session</th>
//             </tr>
//           </thead>
//           <tbody>
//             {absentees.map((student: AbsentStudent, idx: number) => (
//               <tr key={idx}>
//                 <td className="border px-4 py-2">{student.name}</td>
//                 <td className="border px-4 py-2">{student.indexNumber}</td>
//                 <td className="border px-4 py-2">{student.program}</td>
//                 <td className="border px-4 py-2">
//                   {student.missedSessionTitle}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };
// export default AbsentStudents;

//2
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface MissedSession {
//   title: string;
//   date: string;
// }

// interface Student {
//   name: string;
//   indexNumber: string;
//   program: string;
// }

// interface Absentee {
//   student: Student;
//   missedSessions: MissedSession[];
// }

// const AbsentSummaryTable: React.FC = () => {
//   const [absentees, setAbsentees] = useState<Absentee[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAbsentees = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/lecturer/attendance/absentees/by-lecturer",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setAbsentees(response.data.absentees);
//       } catch (err: Error | unknown) {
//         setError(
//           err instanceof Error ? err.message : "Failed to fetch absentees"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAbsentees();
//   }, []);

//   if (loading) return <p>Loading absentee summary...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Students with Missed Sessions</h2>
//       {absentees.length === 0 ? (
//         <p>No absentees found.</p>
//       ) : (
//         <table className="w-full border border-gray-300 table-auto">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Index Number</th>
//               <th className="border px-4 py-2">Program</th>
//               <th className="border px-4 py-2">Missed Sessions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {absentees.map((absent, idx) => (
//               <tr key={idx}>
//                 <td className="border px-4 py-2">{absent.student.name}</td>
//                 <td className="border px-4 py-2">
//                   {absent.student.indexNumber}
//                 </td>
//                 <td className="border px-4 py-2">{absent.student.program}</td>
//                 <td className="border px-4 py-2">
//                   <ul className="list-disc pl-4">
//                     {absent.missedSessions.map((session, sIdx) => (
//                       <li key={sIdx}>
//                         {session.title} ({session.date})
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AbsentSummaryTable;
