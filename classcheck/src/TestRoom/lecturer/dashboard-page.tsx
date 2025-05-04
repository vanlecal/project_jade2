"use client";

import { useState } from "react";
import { DashboardLayout } from "./dashboard-layout";
import { DashboardOverview } from "./dashboard-overview";
import { QrCodeGenerator } from "./qr-code-generator";
import { AttendanceRecords } from "./attendance-records";
import { StudentTracking } from "./student-tracking";

type View = "overview" | "generate" | "records" | "tracking";

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<View>("overview");

  return (
    <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>
      {currentView === "overview" && <DashboardOverview />}
      {currentView === "generate" && <QrCodeGenerator />}
      {currentView === "records" && <AttendanceRecords />}
      {currentView === "tracking" && <StudentTracking />}
    </DashboardLayout>
  );
}
