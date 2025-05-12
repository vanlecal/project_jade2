
//1
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { useState } from "react"

// // Mock data for programs
// const programs = [
//   { id: "cs", name: "Computer Science" },
//   { id: "it", name: "Information Technology" },
//   { id: "cy", name: "Cybersecurity" },
// ]

// // Mock data for students with absences
// const studentsWithAbsences = [
//   {
//     id: "1",
//     name: "John Doe",
//     index: "CS2021001",
//     program: "cs",
//     absences: 3,
//     missedSessions: ["Introduction to Algorithms", "Data Structures", "Software Engineering"],
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     index: "CS2021002",
//     program: "cs",
//     absences: 4,
//     missedSessions: ["Introduction to Algorithms", "Data Structures", "Software Engineering", "Database Systems"],
//   },
//   {
//     id: "3",
//     name: "Michael Johnson",
//     index: "IT2021003",
//     program: "it",
//     absences: 3,
//     missedSessions: ["IT Fundamentals", "Web Development", "Network Basics"],
//   },
//   {
//     id: "4",
//     name: "Emily Brown",
//     index: "CY2021004",
//     program: "cy",
//     absences: 5,
//     missedSessions: ["Security Basics", "Cryptography", "Network Security", "Ethical Hacking", "Security Protocols"],
//   },
//   {
//     id: "5",
//     name: "David Wilson",
//     index: "IT2021005",
//     program: "it",
//     absences: 3,
//     missedSessions: ["IT Fundamentals", "Database Systems", "System Analysis"],
//   },
// ]

// export function StudentTracking() {
//   const [selectedProgram, setSelectedProgram] = useState<string>("")

//   const filteredStudents = selectedProgram
//     ? studentsWithAbsences.filter((student) => student.program === selectedProgram)
//     : studentsWithAbsences

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Absence Tracking</CardTitle>
//           <CardDescription>Monitor students who have missed 3 or more sessions.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="mb-6">
//             <Select value={selectedProgram} onValueChange={setSelectedProgram}>
//               <SelectTrigger className="w-full md:w-[250px]">
//                 <SelectValue placeholder="Filter by program" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Programs</SelectItem>
//                 {programs.map((program) => (
//                   <SelectItem key={program.id} value={program.id}>
//                     {program.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Index Number</TableHead>
//                 <TableHead>Program</TableHead>
//                 <TableHead>Absences</TableHead>
//                 <TableHead>Missed Sessions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredStudents.map((student) => (
//                 <TableRow key={student.id}>
//                   <TableCell className="font-medium">{student.name}</TableCell>
//                   <TableCell>{student.index}</TableCell>
//                   <TableCell>{programs.find((p) => p.id === student.program)?.name}</TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={student.absences >= 5 ? "destructive" : student.absences >= 4 ? "default" : "secondary"}
//                     >
//                       {student.absences}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="max-w-[300px] truncate">{student.missedSessions.join(", ")}</div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {filteredStudents.length === 0 && (
//             <div className="text-center py-6 text-muted-foreground">
//               No students with 3+ absences found in this program.
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


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

// export function StudentTracking() {
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


//3
import React, { useEffect, useState } from "react";
import axios from "axios";

interface MissedSession {
  title: string;
  date: string;
}

interface Student {
  name: string;
  indexNumber: string;
  program: string;
}

interface Absentee {
  student: Student;
  missedSessions: MissedSession[];
}

export function StudentTracking() {
  const [absentees, setAbsentees] = useState<Absentee[]>([]);
  const [filteredProgram, setFilteredProgram] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbsentees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/lecturer/attendance/absentees/by-lecturer",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAbsentees(response.data.absentees);
      } catch (err: any) {
        setError(err.message || "Failed to fetch absentees");
      } finally {
        setLoading(false);
      }
    };
    fetchAbsentees();
  }, []);

  const filteredAbsentees = filteredProgram
    ? absentees.filter(
        (a) =>
          a.student.program.toLowerCase() === filteredProgram.toLowerCase()
      )
    : absentees;

  const uniquePrograms = [
    ...new Set(absentees.map((a) => a.student.program)),
  ];

  const getBadgeColor = (count: number) => {
    if (count >= 5) return "bg-red-600";
    if (count === 4) return "bg-blue-500";
    return "bg-gray-600";
  };

  if (loading) return <p>Loading absentee summary...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Absence Tracking</h2>
          <p className="text-sm text-gray-500">
            Track students with 3 or more absences.
          </p>
        </div>
        <div className="w-full sm:w-60">
          <select
            onChange={(e) => setFilteredProgram(e.target.value)}
            value={filteredProgram}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Programs</option>
            {uniquePrograms.map((program, i) => (
              <option key={i} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredAbsentees.length === 0 ? (
        <p className="text-center text-gray-500">No absentees found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="border-b border-gray-200 text-gray-600">
              <tr>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Index Number</th>
                <th className="py-2 pr-4">Program</th>
                <th className="py-2 pr-4">Absences</th>
                <th className="py-2">Missed Sessions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAbsentees.map((absent, idx) => {
                const absenceCount = absent.missedSessions.length;
                return (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 pr-4 font-medium text-gray-900">
                      {absent.student.name}
                    </td>
                    <td className="py-3 pr-4">{absent.student.indexNumber}</td>
                    <td className="py-3 pr-4">{absent.student.program}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-white text-xs font-semibold rounded-full px-3 py-1 ${getBadgeColor(
                          absenceCount
                        )}`}
                      >
                        {absenceCount}
                      </span>
                    </td>
                    <td className="py-3 text-gray-700">
                      <ul className="list-disc list-inside space-y-1">
                        {absent.missedSessions.map((s, i) => (
                          <li key={i}>
                            {s.title} –{" "}
                            <span className="text-xs text-gray-500">
                              {new Date(s.date).toLocaleDateString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
