//1
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { FileDown, Search } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// // Define types for our data
// type Session = {
//   id: string;
//   title: string;
//   program: string;
//   date: string;
//   totalStudents: number;
//   attendees: number;
// };

// type Student = {
//   id: string;
//   name: string;
//   index: string;
//   gps: string;
//   time: string;
// };

// type AttendanceData = {
//   sessions: Session[];
//   studentAttendance: {
//     [key: string]: Student[];
//   };
// };

// export function AttendanceRecords() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [data, setData] = useState<AttendanceData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedSession, setSelectedSession] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);
//         const response = await fetch("/data/attendance-data.json");

//         if (!response.ok) {
//           throw new Error("Failed to fetch attendance data");
//         }

//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (err) {
//         console.error("Error fetching attendance data:", err);
//         setError("Failed to load attendance data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   // Filter students based on search query
//   const filterStudents = (students: Student[]) => {
//     if (!searchQuery) return students;

//     return students.filter(
//       (student) =>
//         student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         student.index.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   };

//   if (error) {
//     return (
//       <div className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Attendance Records</CardTitle>
//             <CardDescription>
//               View and manage attendance records for your sessions.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="text-center py-6 text-destructive">{error}</div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   // Render a specific session if selected
//   if (selectedSession && data) {
//     const session = data.sessions.find((s) => s.id === selectedSession);
//     const students = data.studentAttendance[selectedSession] || [];
//     const filteredStudents = filterStudents(students);

//     return (
//       <div className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Attendance Records</CardTitle>
//             <CardDescription>
//               View and manage attendance records for your sessions.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col gap-4 md:flex-row md:items-end">
//               <div className="flex-1 space-y-2">
//                 <Select
//                   value={selectedSession}
//                   onValueChange={setSelectedSession}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a session" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Sessions</SelectItem>
//                     {data.sessions.map((session) => (
//                       <SelectItem key={session.id} value={session.id}>
//                         {session.title} -{" "}
//                         {new Date(session.date).toLocaleDateString()}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex-1 relative">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search by name or ID"
//                   className="pl-8"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <Button variant="outline" size="icon" className="shrink-0">
//                 <FileDown className="h-4 w-4" />
//                 <span className="sr-only">Download</span>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>{session?.title}</CardTitle>
//             <CardDescription>
//               {session?.program} -{" "}
//               {new Date(session?.date || "").toLocaleDateString()}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Index Number</TableHead>
//                   <TableHead>GPS Location</TableHead>
//                   <TableHead>Time</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredStudents.map((student) => (
//                   <TableRow key={student.id}>
//                     <TableCell className="font-medium">
//                       {student.name}
//                     </TableCell>
//                     <TableCell>{student.index}</TableCell>
//                     <TableCell>{student.gps}</TableCell>
//                     <TableCell>{student.time}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             {filteredStudents.length === 0 && (
//               <div className="text-center py-6 text-muted-foreground">
//                 No students found matching your search criteria.
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Attendance Records</CardTitle>
//           <CardDescription>
//             View and manage attendance records for your sessions.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-4 md:flex-row md:items-end">
//             <div className="flex-1 space-y-2">
//               {loading ? (
//                 <Skeleton className="h-10 w-full" />
//               ) : (
//                 <Select
//                   value={selectedSession || "all"}
//                   onValueChange={(value) =>
//                     setSelectedSession(value === "all" ? null : value)
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="All Sessions" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Sessions</SelectItem>
//                     {data?.sessions.map((session) => (
//                       <SelectItem key={session.id} value={session.id}>
//                         {session.title} -{" "}
//                         {new Date(session.date).toLocaleDateString()}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             </div>
//             <div className="flex-1 relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search by name or ID"
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 disabled={loading}
//               />
//             </div>
//             <Button
//               variant="outline"
//               size="icon"
//               className="shrink-0"
//               disabled={loading}
//             >
//               <FileDown className="h-4 w-4" />
//               <span className="sr-only">Download</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {loading ? (
//         Array.from({ length: 3 }).map((_, index) => (
//           <Card key={index} className="mb-6">
//             <CardHeader>
//               <Skeleton className="h-6 w-48" />
//               <Skeleton className="h-4 w-72 mt-2" />
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 {Array.from({ length: 3 }).map((_, idx) => (
//                   <Skeleton key={idx} className="h-12 w-full" />
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         ))
//       ) : (
//         <Accordion
//           type="multiple"
//           defaultValue={data?.sessions.map((s) => s.id) || []}
//         >
//           {data?.sessions.map((session) => {
//             const students = data.studentAttendance[session.id] || [];
//             const filteredStudents = filterStudents(students);

//             return (
//               <AccordionItem
//                 key={session.id}
//                 value={session.id}
//                 className="mb-4 border rounded-lg overflow-hidden"
//               >
//                 <Card>
//                   <CardHeader className="p-0">
//                     <AccordionTrigger className="px-6 py-4 hover:no-underline">
//                       <div className="flex flex-col items-start text-left">
//                         <CardTitle>{session.title}</CardTitle>
//                         <CardDescription>
//                           {session.program} -{" "}
//                           {new Date(session.date).toLocaleDateString()} -
//                           Attendance: {session.attendees}/
//                           {session.totalStudents}(
//                           {Math.round(
//                             (session.attendees / session.totalStudents) * 100
//                           )}
//                           %)
//                         </CardDescription>
//                       </div>
//                     </AccordionTrigger>
//                   </CardHeader>
//                   <AccordionContent>
//                     <CardContent className="pt-0">
//                       <Table>
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Index Number</TableHead>
//                             <TableHead>GPS Location</TableHead>
//                             <TableHead>Time</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {filteredStudents.map((student) => (
//                             <TableRow key={student.id}>
//                               <TableCell className="font-medium">
//                                 {student.name}
//                               </TableCell>
//                               <TableCell>{student.index}</TableCell>
//                               <TableCell>{student.gps}</TableCell>
//                               <TableCell>{student.time}</TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       {filteredStudents.length === 0 && (
//                         <div className="text-center py-6 text-muted-foreground">
//                           No students found matching your search criteria.
//                         </div>
//                       )}
//                     </CardContent>
//                   </AccordionContent>
//                 </Card>
//               </AccordionItem>
//             );
//           })}
//         </Accordion>
//       )}
//     </div>
//   );
// }

//2
import { useNavigate } from "react-router-dom";
import { useRequireAuth } from "@/utils/useRequireAuth";
import { useEffect, useState } from "react";
import { getRequest } from "../../utils/api";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface QrSession {
  _id: string;
  title: string;
  program: string;
  createdAt: string;
  totalExpected?: number;
  totalPresent?: number;
}

interface Student {
  name: string;
  index: string;
  phone: string;
}

interface AttendanceRecord {
  _id: string;
  student: Student;
  location: string;
  scannedAt: string;
}

export function AttendanceRecords() {
  const [sessions, setSessions] = useState<QrSession[]>([]);
  const navigate = useNavigate();
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(
    null
  );
  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, AttendanceRecord[]>
  >({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const data = await getRequest("lecturer/sessions", token);
        setSessions(data);
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      }
    };
    fetchSessions();
  }, [navigate]);
  useRequireAuth();

  const toggleSession = async (sessionId: string) => {
    if (expandedSessionId === sessionId) {
      setExpandedSessionId(null);
      return;
    }

    setExpandedSessionId(sessionId);

    if (!attendanceMap[sessionId]) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const data = await getRequest(
          `lecturer/attendance/${sessionId}`,
          token
        );
        setAttendanceMap((prev) => ({ ...prev, [sessionId]: data }));
      } catch (err) {
        console.error("Failed to fetch attendance", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {sessions.map((session) => {
        const attendance = attendanceMap[session._id] || [];
        const present = session.totalPresent ?? attendance.length;
        const expected = session.totalExpected ?? 100;
        const percentage = Math.round((present / expected) * 100);

        return (
          <Card key={session._id} className="border rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleSession(session._id)}
              >
                <div>
                  <h3 className="text-xl font-bold">{session.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {session.program} — {formatDate(session.createdAt)} —
                    {/* Attendance: {present}/{expected} ({percentage}%) */}
                    Attendance: {present}/.. ({percentage}%)
                  </p>
                </div>
                {expandedSessionId === session._id ? (
                  <ChevronUp className="mt-1" />
                ) : (
                  <ChevronDown className="mt-1" />
                )}
              </div>

              {expandedSessionId === session._id && (
                <div className="mt-6">
                  {loading ? (
                    <p className="text-sm text-muted-foreground">
                      Loading attendance...
                    </p>
                  ) : attendance.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No students marked attendance yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm mt-4">
                        <thead className="border-b text-left">
                          <tr>
                            <th className="py-2 pr-4">Name</th>
                            <th className="py-2 pr-4">Index Number</th>
                            <th className="py-2 pr-4">GPS Location</th>
                            <th className="py-2">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendance.map((record) => (
                            <tr key={record._id} className="border-b">
                              <td className="py-2 pr-4">
                                {record.student.name}
                              </td>
                              <td className="py-2 pr-4">
                                {record.student.index}
                              </td>
                              <td className="py-2 pr-4">{record.location}</td>
                              <td className="py-2">
                                {new Date(record.scannedAt).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
