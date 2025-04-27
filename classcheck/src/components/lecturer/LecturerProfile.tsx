// 1.Authenticated Lecturer User component

import { useEffect, useState } from "react";
import { getRequest } from "../../utils/api"; // adjust path as needed

const LecturerProfile = () => {
  const [lecturerName, setLecturerName] = useState("");

  useEffect(() => {
    const fetchLecturer = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const data = await getRequest("lecturer/me", token);
        setLecturerName(data.name);
      } catch (error: unknown) {
        console.error(
          "Error fetching lecturer info:",
          error instanceof Error ? error.message : error
        );
      }
    };

    fetchLecturer();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lecturer Dashboard</h2>
      <h3>Welcome {lecturerName || "Loading..."}</h3>
      <p>Generate a QR code for your class session.</p>
      {/* QR generation button and session list will go here */}
    </div>
  );
};
export default LecturerProfile;
