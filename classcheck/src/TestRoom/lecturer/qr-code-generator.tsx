"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode } from "lucide-react"

const programs = [
  { id: "cs101", name: "Computer Science 101" },
  { id: "cs205", name: "Data Structures" },
  { id: "it110", name: "Introduction to IT" },
  { id: "cs310", name: "Software Engineering" },
  { id: "cy201", name: "Cybersecurity Fundamentals" },
]

export function QrCodeGenerator() {
  const [title, setTitle] = useState("")
  const [program, setProgram] = useState("")
  const [qrGenerated, setQrGenerated] = useState(false)

  const handleGenerate = () => {
    if (title && program) {
      setQrGenerated(true)
    }
  }

  const handleReset = () => {
    setTitle("")
    setProgram("")
    setQrGenerated(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generate QR Code</CardTitle>
          <CardDescription>Create a QR code for student attendance tracking.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Session Title</Label>
            <Input
              id="title"
              placeholder="e.g., Week 5 Lecture"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program">Program/Class</Label>
            <Select value={program} onValueChange={setProgram}>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((prog) => (
                  <SelectItem key={prog.id} value={prog.id}>
                    {prog.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleGenerate} disabled={!title || !program}>
            Generate QR Code
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>QR Code Preview</CardTitle>
          <CardDescription>Scan this QR code to mark attendance.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {qrGenerated ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto border border-dashed p-6 rounded-lg">
                <QrCode className="h-48 w-48 mx-auto" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{programs.find((p) => p.id === program)?.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
              <QrCode className="h-16 w-16 mb-4 opacity-20" />
              <p>Fill in the form and click "Generate QR Code" to create a QR code for attendance.</p>
            </div>
          )}
        </CardContent>
        {qrGenerated && (
          <CardFooter className="flex justify-center">
            <Button variant="outline">Download QR Code</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
