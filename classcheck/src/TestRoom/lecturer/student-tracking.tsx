"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Mock data for programs
const programs = [
  { id: "cs", name: "Computer Science" },
  { id: "it", name: "Information Technology" },
  { id: "cy", name: "Cybersecurity" },
]

// Mock data for students with absences
const studentsWithAbsences = [
  {
    id: "1",
    name: "John Doe",
    index: "CS2021001",
    program: "cs",
    absences: 3,
    missedSessions: ["Introduction to Algorithms", "Data Structures", "Software Engineering"],
  },
  {
    id: "2",
    name: "Jane Smith",
    index: "CS2021002",
    program: "cs",
    absences: 4,
    missedSessions: ["Introduction to Algorithms", "Data Structures", "Software Engineering", "Database Systems"],
  },
  {
    id: "3",
    name: "Michael Johnson",
    index: "IT2021003",
    program: "it",
    absences: 3,
    missedSessions: ["IT Fundamentals", "Web Development", "Network Basics"],
  },
  {
    id: "4",
    name: "Emily Brown",
    index: "CY2021004",
    program: "cy",
    absences: 5,
    missedSessions: ["Security Basics", "Cryptography", "Network Security", "Ethical Hacking", "Security Protocols"],
  },
  {
    id: "5",
    name: "David Wilson",
    index: "IT2021005",
    program: "it",
    absences: 3,
    missedSessions: ["IT Fundamentals", "Database Systems", "System Analysis"],
  },
]

export function StudentTracking() {
  const [selectedProgram, setSelectedProgram] = useState<string>("")

  const filteredStudents = selectedProgram
    ? studentsWithAbsences.filter((student) => student.program === selectedProgram)
    : studentsWithAbsences

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Absence Tracking</CardTitle>
          <CardDescription>Monitor students who have missed 3 or more sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Index Number</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Absences</TableHead>
                <TableHead>Missed Sessions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.index}</TableCell>
                  <TableCell>{programs.find((p) => p.id === student.program)?.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={student.absences >= 5 ? "destructive" : student.absences >= 4 ? "default" : "secondary"}
                    >
                      {student.absences}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px] truncate">{student.missedSessions.join(", ")}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No students with 3+ absences found in this program.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
