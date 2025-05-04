// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { FileDown, Search } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"

// // Define types for our data
// type Session = {
//   id: string
//   title: string
//   program: string
//   date: string
//   totalStudents: number
//   attendees: number
// }

// type Student = {
//   id: string
//   name: string
//   index: string
//   gps: string
//   time: string
// }

// type AttendanceData = {
//   sessions: Session[]
//   studentAttendance: {
//     [key: string]: Student[]
//   }
// }

// export function AttendanceRecords() {
//   const [selectedSession, setSelectedSession] = useState("")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [data, setData] = useState<AttendanceData | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true)
//         const response = await fetch("/data/attendance-data.json")

//         if (!response.ok) {
//           throw new Error("Failed to fetch attendance data")
//         }

//         const jsonData = await response.json()
//         setData(jsonData)
//       } catch (err) {
//         console.error("Error fetching attendance data:", err)
//         setError("Failed to load attendance data. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   // Filter students based on search query
//   const filteredStudents =
//     selectedSession && data?.studentAttendance[selectedSession]
//       ? data.studentAttendance[selectedSession].filter(
//           (student) =>
//             student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             student.index.toLowerCase().includes(searchQuery.toLowerCase()),
//         )
//       : []

//   if (error) {
//     return (
//       <div className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Attendance Records</CardTitle>
//             <CardDescription>View and manage attendance records for your sessions.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="text-center py-6 text-destructive">{error}</div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Attendance Records</CardTitle>
//           <CardDescription>View and manage attendance records for your sessions.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-4 md:flex-row md:items-end">
//             <div className="flex-1 space-y-2">
//               {loading ? (
//                 <Skeleton className="h-10 w-full" />
//               ) : (
//                 <Select value={selectedSession} onValueChange={setSelectedSession}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a session" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {data?.sessions.map((session) => (
//                       <SelectItem key={session.id} value={session.id}>
//                         {session.title} - {new Date(session.date).toLocaleDateString()}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             </div>
//             <div className="flex-1 relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search by name or ID"
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 disabled={loading || !selectedSession}
//               />
//             </div>
//             <Button variant="outline" size="icon" className="shrink-0" disabled={loading || !selectedSession}>
//               <FileDown className="h-4 w-4" />
//               <span className="sr-only">Download</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {loading ? (
//         <Card>
//           <CardHeader>
//             <Skeleton className="h-6 w-48" />
//             <Skeleton className="h-4 w-72 mt-2" />
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <Skeleton key={index} className="h-12 w-full" />
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       ) : selectedSession ? (
//         <Card>
//           <CardHeader>
//             <CardTitle>{data?.sessions.find((s) => s.id === selectedSession)?.title}</CardTitle>
//             <CardDescription>
//               {data?.sessions.find((s) => s.id === selectedSession)?.program} -
//               {new Date(data?.sessions.find((s) => s.id === selectedSession)?.date || "").toLocaleDateString()}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Index Number</TableHead>
//                   <TableHead>GPS Location</TableHead>
//                   <TableHead>Time</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredStudents.map((student) => (
//                   <TableRow key={student.id}>
//                     <TableCell className="font-medium">{student.name}</TableCell>
//                     <TableCell>{student.index}</TableCell>
//                     <TableCell>{student.gps}</TableCell>
//                     <TableCell>{student.time}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             {filteredStudents.length === 0 && (
//               <div className="text-center py-6 text-muted-foreground">
//                 No students found matching your search criteria.
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="text-center py-12 text-muted-foreground">Select a session to view attendance records.</div>
//       )}
//     </div>
//   )
// }



//2
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileDown, Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Define types for our data
type Session = {
  id: string
  title: string
  program: string
  date: string
  totalStudents: number
  attendees: number
}

type Student = {
  id: string
  name: string
  index: string
  gps: string
  time: string
}

type AttendanceData = {
  sessions: Session[]
  studentAttendance: {
    [key: string]: Student[]
  }
}

export function AttendanceRecords() {
  const [searchQuery, setSearchQuery] = useState("")
  const [data, setData] = useState<AttendanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch("/data/attendance-data.json")

        if (!response.ok) {
          throw new Error("Failed to fetch attendance data")
        }

        const jsonData = await response.json()
        setData(jsonData)
      } catch (err) {
        console.error("Error fetching attendance data:", err)
        setError("Failed to load attendance data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter students based on search query
  const filterStudents = (students: Student[]) => {
    if (!searchQuery) return students

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.index.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>View and manage attendance records for your sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-destructive">{error}</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render a specific session if selected
  if (selectedSession && data) {
    const session = data.sessions.find((s) => s.id === selectedSession)
    const students = data.studentAttendance[selectedSession] || []
    const filteredStudents = filterStudents(students)

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>View and manage attendance records for your sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1 space-y-2">
                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    {data.sessions.map((session) => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.title} - {new Date(session.date).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <FileDown className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{session?.title}</CardTitle>
            <CardDescription>
              {session?.program} - {new Date(session?.date || "").toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Index Number</TableHead>
                  <TableHead>GPS Location</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.index}</TableCell>
                    <TableCell>{student.gps}</TableCell>
                    <TableCell>{student.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredStudents.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No students found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>View and manage attendance records for your sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select
                  value={selectedSession || "all"}
                  onValueChange={(value) => setSelectedSession(value === "all" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Sessions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    {data?.sessions.map((session) => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.title} - {new Date(session.date).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0" disabled={loading}>
              <FileDown className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="mb-6">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Accordion type="multiple" defaultValue={data?.sessions.map((s) => s.id) || []}>
          {data?.sessions.map((session) => {
            const students = data.studentAttendance[session.id] || []
            const filteredStudents = filterStudents(students)

            return (
              <AccordionItem key={session.id} value={session.id} className="mb-4 border rounded-lg overflow-hidden">
                <Card>
                  <CardHeader className="p-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex flex-col items-start text-left">
                        <CardTitle>{session.title}</CardTitle>
                        <CardDescription>
                          {session.program} - {new Date(session.date).toLocaleDateString()} - Attendance:{" "}
                          {session.attendees}/{session.totalStudents}(
                          {Math.round((session.attendees / session.totalStudents) * 100)}%)
                        </CardDescription>
                      </div>
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent>
                    <CardContent className="pt-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Index Number</TableHead>
                            <TableHead>GPS Location</TableHead>
                            <TableHead>Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">{student.name}</TableCell>
                              <TableCell>{student.index}</TableCell>
                              <TableCell>{student.gps}</TableCell>
                              <TableCell>{student.time}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {filteredStudents.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No students found matching your search criteria.
                        </div>
                      )}
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            )
          })}
        </Accordion>
      )}
    </div>
  )
}
