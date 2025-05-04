import DashboardPage from "@/components/dashboard-page"

export default function Home() {
  // In a real application, you would check authentication here
  // If not authenticated, redirect to login
  // const isAuthenticated = checkAuth();
  // if (!isAuthenticated) return redirect("/login");

  return <DashboardPage />
}
