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
import { FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getRequest } from "@/utils/api";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { useRequireAuth } from "@/utils/useRequireAuth";

type Session = {
  id: string;
  _id: string;
  title: string;
  program: string;
  date: string;
  createdAt: string;
  totalStudents: number;
  attendeeCount: number;
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
  useRequireAuth();

  async function downloadCSV(sessionId: string, sessionTitle: string) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      return;
    }

    try {
      const data = await getRequest(`lecturer/attendance/${sessionId}`, token);

      if (!Array.isArray(data) || data.length === 0) {
        alert("No attendance data found.");
        return;
      }

      interface AttendanceRecord {
        student: {
          name: string;
          email: string;
          index: string;
          phone: string;
          sex: string;
          program: string;
        };
        scannedAt: string;
        location: string;
      }

      const attendanceRecords = data.map((record: AttendanceRecord) => ({
        Name: record.student.name,
        Email: record.student.email,
        Index: record.student.index,
        Phone: record.student.phone,
        Sex: record.student.sex,
        Program: record.student.program,
        ScannedAt: new Date(record.scannedAt).toLocaleString(),
        Location: record.location,
      }));

      const csv = Papa.unparse(attendanceRecords);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

      const filename = `${sessionTitle.replace(/\s+/g, "_")}_attendance.csv`;
      saveAs(blob, filename);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download attendance.");
    }
  }
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
                  {session.attendeeCount}/{session.totalStudents}
                  <span className="ml-2 text-xs text-muted-foreground">
                    (
                    {Math.round(
                      (session.attendeeCount / session.totalStudents) * 100
                    )}
                    %)
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => downloadCSV(session._id, session.title)}
                    >
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
