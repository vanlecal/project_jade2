import React, { useEffect, useState } from "react";
import { getRequest } from "../utils/api";

interface DashboardStats {
  totalSessions: number;
  totalStudents: number;
  todaysSessions: number;
  absentStudents: number;
}

const LecturerStats: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await getRequest("lecturer/dashboard-stats", token);
        setStats(response);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching dashboard stats:", err.message);
          setError(err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) return <p className="text-gray-600">Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Lecturer Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-800">
            Total Sessions
          </h2>
          <p className="text-2xl">{stats?.totalSessions}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-green-800">
            Total Students
          </h2>
          <p className="text-2xl">{stats?.totalStudents}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-yellow-800">
            Today's Sessions
          </h2>
          <p className="text-2xl">{stats?.todaysSessions}</p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-red-800">
            Absent Students
          </h2>
          <p className="text-2xl">{stats?.absentStudents}</p>
        </div>
      </div>
    </div>
  );
};

export default LecturerStats;
