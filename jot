import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  QrCode,
  Scan,
  User,
  School,
  Clock,
  Shield,
  MapPin,
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50/50 to-indigo-100/50 relative"
      style={{
        backgroundImage: `url('/fromJade.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "400px 400px",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <QrCode className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            QR Attend
          </span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/student/login" className="!no-underline">
              Student Login
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/lecturer/login" className="!no-underline">
              Lecturer Login
            </Link>
          </Button>
        </div>
        {/* Mobile Menu Toggle */}
        <div className="md:hidden relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
              <Link
                to="/student/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 !no-underline"
              >
                Student Login
              </Link>
              <Link
                to="/lecturer/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 !no-underline"
              >
                Lecturer Login
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="container mx-auto px-6 py-16 md:py-24 text-center"
        style={{ backgroundColor: "#fffffff2" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Modern Classroom{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Attendance
            </span>{" "}
            System
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Streamline your class attendance with secure QR codes, real-time
            tracking, and automated records. Perfect for lecturers and students
            alike.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 ">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-blue-300 hover:bg-blue-400 transition-colors"
            >
              <Link to="/student/register" className="!no-underline">
                <User className="w-4 h-4" />
                Student Register
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/lecturer/register" className="!no-underline">
                <School className="w-4 h-4" />
                Lecturer Register
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full" style={{ backgroundColor: "#fffffff2" }}>
              <CardHeader>
                <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <QrCode className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Dynamic QR Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Lecturers generate unique QR codes that automatically refresh
                  every 5 minutes for enhanced security.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full" style={{ backgroundColor: "#fffffff2" }}>
              <CardHeader>
                <div className="p-3 bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Scan className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Instant Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Students scan the QR code to submit attendance with their
                  biodata, including GPS location verification.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full" style={{ backgroundColor: "#fffffff2" }}>
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <School className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Comprehensive Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Lecturers can view and manage all attendance records with
                  detailed student information for each session.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16" style={{ backgroundColor: "#fffffff2" }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Lecturer Generates QR",
                desc: "Lecturer creates a session with a unique, time-limited QR code",
                color: "blue",
              },
              {
                step: 2,
                title: "Students Scan",
                desc: "Students scan the QR code during class",
                color: "indigo",
              },
              {
                step: 3,
                title: "Data Captured",
                desc: "Student biodata and location are securely recorded",
                color: "purple",
              },
              {
                step: 4,
                title: "Attendance Managed",
                desc: "Lecturer views and manages attendance records",
                color: "green",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-${item.color}-100 flex items-center justify-center mb-4`}
                >
                  <span className={`text-${item.color}-600 font-bold text-xl`}>
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="container mx-auto px-6 py-16">
        {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white"> */}
        <div
          className="rounded-2xl p-8 md:p-12 text-white"
          style={{ backgroundColor: "oklch(0.51 0.26 276.97 / 0.89)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Secure Attendance Tracking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Time-Limited Codes</h3>
                <p className="text-blue-100 text-sm">
                  QR codes refresh every 5 minutes to prevent misuse
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Location Verification</h3>
                <p className="text-blue-100 text-sm">
                  GPS ensures students are physically present
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Data Protection</h3>
                <p className="text-blue-100 text-sm">
                  Student information is securely stored and managed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="container mx-auto px-6 py-16 text-center"
        style={{ backgroundColor: "#fffffff2" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Ready to Transform Your Attendance System?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Join hundreds of lecturers and students already using our platform for
          seamless attendance management.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-blue-300 hover:bg-blue-400 transition-colors"
          >
            <Link to="/student/register" className="!no-underline">
              <User className="w-4 h-4" />
              Student Register
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link to="/lecturer/register" className="!no-underline">
              <School className="w-4 h-4" />
              Lecturer Register
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
