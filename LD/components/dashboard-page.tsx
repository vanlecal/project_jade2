"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"
import { QrCodeGenerator } from "@/components/qr-code-generator"
import { AttendanceRecords } from "@/components/attendance-records"
import { StudentTracking } from "@/components/student-tracking"

type View = "overview" | "generate" | "records" | "tracking"

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<View>("overview")

  return (
    <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>
      {currentView === "overview" && <DashboardOverview />}
      {currentView === "generate" && <QrCodeGenerator />}
      {currentView === "records" && <AttendanceRecords />}
      {currentView === "tracking" && <StudentTracking />}
    </DashboardLayout>
  )
}
