import { useEffect, useState } from "react";
import { getRequest } from "../../utils/api";

interface Attendance {
  _id: string;
  sessionTitle: string;
  lecturerName: string;
  lecturerEmail: string;
  scannedAt: string;
  location?: string;
}

const AttendanceHistory = () => {
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await getRequest("student/attendance/history", token);
        setAttendanceList(response.data); // Backend already returns flattened data
        // console.log(response.data); // Optional: for debugging
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching attendance history:", err.message);
          setError(err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceHistory();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">Loading attendance history...</div>
    );
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Attendance History</h2>
      {attendanceList.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Session Title</th>
              <th>Lecturer</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((item) => (
              <tr key={item._id}>
                <td>{item.sessionTitle}</td>
                <td>
                  {item.lecturerName} <br />
                  <small>{item.lecturerEmail}</small>
                </td>
                <td>{new Date(item.scannedAt).toLocaleString()}</td>
                <td>{item.location || "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceHistory;
