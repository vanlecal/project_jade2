import { useState } from "react";
import { DashboardLayout } from "./dashboard-layout";
import { DashboardOverview } from "./dashboard-overview";
import { QrCodeGenerator } from "./qr-code-generator";
import { AttendanceRecords } from "./attendance-records";
import { StudentTracking } from "./student-tracking";
import LecturerProfile from "./LecturerProfile";

type View = "overview" | "generate" | "records" | "tracking" | "myprofile";

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<View>("overview");

  return (
    <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>
      {currentView === "overview" && <DashboardOverview />}
      {currentView === "generate" && <QrCodeGenerator />}
      {currentView === "records" && <AttendanceRecords />}
      {currentView === "tracking" && <StudentTracking />}
      {currentView === "myprofile" && <LecturerProfile />}
    </DashboardLayout>
  );
}
