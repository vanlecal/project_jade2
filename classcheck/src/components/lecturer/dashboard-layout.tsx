//1
import type { JSX, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  QrCode,
  ClipboardList,
  AlertTriangle,
  LogOut,
  Menu,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { getRequest } from "../../utils/api";

type View = "overview" | "generate" | "records" | "tracking" | "myprofile";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  value: View;
}

interface DashboardLayoutProps {
  children: ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
}

export function DashboardLayout({
  children,
  currentView,
  onNavigate,
}: DashboardLayoutProps): JSX.Element {
  const isMobile = useIsMobile();

  const [lecturerName, setLecturerName] = useState("");
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { icon: BarChart3, label: "Overview", value: "overview" },
    { icon: QrCode, label: "Generate QR Code", value: "generate" },
    { icon: ClipboardList, label: "Attendance Records", value: "records" },
    { icon: AlertTriangle, label: "Absence Tracking", value: "tracking" },
  ];

  // Logout function
  const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("token");
    navigate("/lecturer/login");
  };

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
        navigate("/lecturer/login");
      }
    };

    fetchLecturer();
  }, [navigate]);

  const renderMenu = (): JSX.Element => (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.value}>
          <SidebarMenuButton
            isActive={currentView === item.value}
            onClick={() => onNavigate(item.value)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b bg-background px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback>LC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr.{lecturerName || "Loading..."}</p>
                      <p className="text-sm text-muted-foreground">
                        Computer Science
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <nav className="space-y-1 px-2">
                    {menuItems.map((item) => (
                      <button
                        key={item.value}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                          currentView === item.value
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                        onClick={() => onNavigate(item.value)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold">Lecturer Dashboard</h1>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>LC</AvatarFallback>
          </Avatar>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>{lecturerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Dr.{lecturerName || "Loading..."}</p>
                <p className="text-sm text-muted-foreground">UENR</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>{renderMenu()}</SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onNavigate("myprofile")}>
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </SidebarMenuButton>{" "}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <header className="border-b bg-background px-6 py-3 flex items-center">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-xl font-semibold">
              {menuItems.find((item) => item.value === currentView)?.label}
            </h1>
          </header>
          <main className="ml-21 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
