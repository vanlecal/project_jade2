// 1

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Eye, FileDown } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { getRequest } from "@/utils/api";

// type Session = {
//   id: string;
//   title: string;
//   program: string;
//   date: string;
//   createdAt: string;
//   totalStudents: number;
//   attendees: number;
// };

// export function RecentAttendanceSessions() {
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchSessions() {
//       try {
//         setLoading(true);
//         const response = await fetch("/data/attendance-data.json");

//         if (!response.ok) {
//           throw new Error("Failed to fetch attendance data");
//         }

//         const data = await response.json();
//         setSessions(data.sessions);
//       } catch (err) {
//         console.error("Error fetching sessions:", err);
//         setError("Failed to load recent sessions. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSessions();
//   }, []);

//   if (error) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Attendance Sessions</CardTitle>
//           <CardDescription>
//             Your most recent QR code attendance sessions.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-6 text-destructive">{error}</div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (loading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Attendance Sessions</CardTitle>
//           <CardDescription>
//             Your recent QR code attendance sessions.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-2">
//             {Array.from({ length: 4 }).map((_, index) => (
//               <Skeleton key={index} className="h-12 w-full" />
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Attendance Sessions</CardTitle>
//         <CardDescription>
//           Your recent QR code attendance sessions.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Title</TableHead>
//               <TableHead>Program</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Attendance</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {sessions.map((session) => (
//               <TableRow key={session.id}>
//                 <TableCell className="font-medium">{session.title}</TableCell>
//                 <TableCell>{session.program}</TableCell>
//                 <TableCell>
//                   {new Date(session.date).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>
//                   {session.attendees}/{session.totalStudents}
//                   <span className="ml-2 text-xs text-muted-foreground">
//                     (
//                     {Math.round(
//                       (session.attendees / session.totalStudents) * 100
//                     )}
//                     %)
//                   </span>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <div className="flex gap-2">
//                     <Button variant="ghost" size="icon">
//                       <FileDown className="h-4 w-4" />
//                       <span className="sr-only">Download</span>
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

//2

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getRequest } from "@/utils/api";

type Session = {
  id: string;
  title: string;
  program: string;
  date: string;
  createdAt: string;
  totalStudents: number;
  attendees: number;
};

export function RecentAttendanceSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSessions() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found");
          return;
        }
        const response = await getRequest("lecturer/sessions", token);
        console.log(response);

        const data = await response;
        setSessions(data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setError("Failed to load recent sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, []);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance Sessions</CardTitle>
          <CardDescription>
            Your most recent QR code attendance sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance Sessions</CardTitle>
          <CardDescription>
            Your recent QR code attendance sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Attendance Sessions</CardTitle>
        <CardDescription>
          Your recent QR code attendance sessions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">{session.title}</TableCell>
                <TableCell>{session.program}</TableCell>
                <TableCell>
                  {new Date(session.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {session.attendees}/{session.totalStudents}
                  <span className="ml-2 text-xs text-muted-foreground">
                    (
                    {Math.round(
                      (session.attendees / session.totalStudents) * 100
                    )}
                    %)
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <FileDown className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
