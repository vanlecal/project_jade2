import { useRequireAuth } from "@/utils/useRequireAuth";
import { useEffect, useState } from "react";
import { getRequest } from "../../utils/api";
import LoadingScreen from "@/components/public/LoadingScreen";

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
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await getRequest(
          "lecturer/attendance/absentees/by-lecturer",
          token
        );
        setAbsentees(response.absentees);
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
    fetchAbsentees();
  }, []);
  useRequireAuth();

  const filteredAbsentees = filteredProgram
    ? absentees.filter(
        (a) => a.student.program.toLowerCase() === filteredProgram.toLowerCase()
      )
    : absentees;

  const uniquePrograms = [...new Set(absentees.map((a) => a.student.program))];

  const getBadgeColor = (count: number) => {
    if (count >= 5) return "bg-red-600";
    if (count === 4) return "bg-blue-500";
    return "bg-gray-600";
  };

  if (loading)
    return (
      <p>
        <LoadingScreen />
      </p>
    );
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
