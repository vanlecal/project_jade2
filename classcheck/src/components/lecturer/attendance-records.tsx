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
  ip: string;
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
                            <th className="py-2">Device IP</th>
                            
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
                              <td className="py-2 pr-4">
                                {new Date(record.scannedAt).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </td>
                              <td className="py-2 pr-4">{record.ip}</td>
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
