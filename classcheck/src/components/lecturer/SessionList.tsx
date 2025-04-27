// 3.Session List
import { useEffect, useState } from "react";
import { getRequest, deleteRequest } from "../../utils/api";

interface QrSession {
  _id: string;
  title: string;
  code: string;
  createdAt: string;
  expiresAt: string;
}

interface Student {
  name: string;
  index: string;
  phone: string;
}

interface AttendanceRecord {
  _id: string;
  student: Student;
  createdAt: string;
}

const SessionList = () => {
  const [sessions, setSessions] = useState<QrSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all QR sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found");
          return;
        }

        const data = await getRequest("lecturer/sessions", token);
        setSessions(data);
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      }
    };

    fetchSessions();
  }, []);

  // Fetch attendance for selected session
  const fetchAttendance = async (sessionId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      const data = await getRequest(`lecturer/attendance/${sessionId}`, token);
      setAttendance(data);
      setSelectedSessionId(sessionId);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      await deleteRequest(`lecturer/sessions/${sessionId}`, token);

      setSessions((prev) => prev.filter((s) => s._id !== sessionId));

      if (selectedSessionId === sessionId) {
        setSelectedSessionId(null);
        setAttendance([]);
      }
    } catch (err) {
      console.error("Error deleting session:", err);
      alert("Failed to delete session");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Session Lists</h2>

      {sessions.length === 0 ? (
        <p>No QR sessions created yet.</p>
      ) : (
        <ul className="list-group mb-4">
          {sessions.map((session) => (
            <li
              key={session._id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                session._id === selectedSessionId ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <div onClick={() => fetchAttendance(session._id)}>
                <strong>{session.title}</strong> - Code: {session.code}
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSession(session._id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedSessionId && (
        <>
          <h5 className="mb-2">Attendance List</h5>
          {loading ? (
            <p>Loading attendance...</p>
          ) : attendance.length === 0 ? (
            <p>No students have marked attendance for this session yet.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Index Number</th>
                  <th>Phone</th>
                  <th>Scan Time</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id}>
                    <td>{record.student.name}</td>
                    <td>{record.student.index}</td>
                    <td>{record.student.phone}</td>
                    <td>{new Date(record.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default SessionList;
