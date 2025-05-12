"use client";

import type { ReactNode } from "react";
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
import { useMobile } from "@/hooks/use-mobile";

type View = "overview" | "generate" | "records" | "tracking";

interface DashboardLayoutProps {
  children: ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
}

export function DashboardLayout({
  children,
  currentView,
  onNavigate,
}: DashboardLayoutProps) {
  const isMobile = useMobile();

  const menuItems = [
    { icon: BarChart3, label: "Overview", value: "overview" },
    { icon: QrCode, label: "Generate QR Code", value: "generate" },
    { icon: ClipboardList, label: "Attendance Records", value: "records" },
    { icon: AlertTriangle, label: "Absence Tracking", value: "tracking" },
  ];

  const renderMenu = () => (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.value}>
          <SidebarMenuButton
            isActive={currentView === item.value}
            onClick={() => onNavigate(item.value as View)}
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
                      <p className="font-medium">Dr. Smith</p>
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
                        onClick={() => onNavigate(item.value as View)}
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
                <AvatarFallback>LC</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Dr. Smith</p>
                <p className="text-sm text-muted-foreground">
                  Computer Science
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>{renderMenu()}</SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
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
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
