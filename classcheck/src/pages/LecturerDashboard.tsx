import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../utils/api";
import LoadingScreen from "../components/public/LoadingScreen";
import DashboardPage from "@/components/lecturer/dashboard-page";

const LecturerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLecturer = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        await getRequest("lecturer/me", token);
      } catch (err: unknown) {
        console.error("Error fetching lecturer info:", err);
        navigate("/lecturer/login");
      } finally {
        setLoading(false);
      }
    };

    fetchLecturer();
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <DashboardPage />
        </div>
      )}
    </div>
  );
};
export default LecturerDashboard;
