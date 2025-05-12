//1

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Users, Clock, AlertCircle } from "lucide-react";
import { RecentAttendanceSessions } from "./recent-attendance-sessions";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sessions
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">Across 3 programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Sessions
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">CS101, CS205</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Absence Alerts
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Students with 3+ absences
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Sessions</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <RecentAttendanceSessions />
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Your scheduled QR attendance sessions for the next 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No upcoming sessions scheduled.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
//2

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CalendarDays, Users, Clock, AlertCircle } from "lucide-react";
// import { RecentAttendanceSessions } from "./recent-attendance-sessions";

// export function DashboardOverview() {
//   return (
//     <div className="space-y-6">
//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Sessions
//             </CardTitle>
//             <CalendarDays className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">24</div>
//             <p className="text-xs text-muted-foreground">+ All Sessions</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Atendees
//             </CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">145</div>
//             <p className="text-xs text-muted-foreground">
//               Across all programs [A]
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Absence Alerts
//             </CardTitle>
//             <AlertCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">5</div>
//             <p className="text-xs text-muted-foreground">
//               Students with 3+ absences
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="recent">
//         <TabsList>
//           <TabsTrigger value="recent">Recent Sessions [A]</TabsTrigger>
//           {/* <TabsTrigger value="upcoming">Upcoming Sessions [A]</TabsTrigger> */}
//         </TabsList>
//         <TabsContent value="recent" className="space-y-4">
//           <RecentAttendanceSessions />
//         </TabsContent>
//         <TabsContent value="upcoming">
//           <Card>
//             <CardHeader>
//               <CardTitle>Upcoming Sessions</CardTitle>
//               <CardDescription>
//                 Your scheduled QR attendance sessions for the next 7 days.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground">
//                 No upcoming sessions scheduled.
//               </p>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
