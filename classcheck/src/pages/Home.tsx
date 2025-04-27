//1
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
//       <div
//         className="p-4 shadow rounded bg-white"
//         style={{ maxWidth: "600px", width: "90%" }}
//       >
//         <h1 className="mb-3 text-primary">📚 ClassCheck</h1>
//         <p className="lead mb-4">
//           A smart and secure way to manage classroom attendance with real-time
//           QR scans and GPS tracking.
//         </p>

//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <div className="border p-3 rounded">
//               <h5 className="mb-3">Student</h5>
//               <Link
//                 to="/student/login"
//                 className="btn btn-outline-primary w-100 mb-2"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/student/register"
//                 className="btn btn-outline-secondary w-100"
//               >
//                 Register
//               </Link>
//             </div>
//           </div>

//           <div className="col-md-6 mb-3">
//             <div className="border p-3 rounded">
//               <h5 className="mb-3">Lecturer</h5>
//               <Link
//                 to="/lecturer/login"
//                 className="btn btn-outline-primary w-100 mb-2"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/lecturer/register"
//                 className="btn btn-outline-secondary w-100"
//               >
//                 Register
//               </Link>
//             </div>
//           </div>
//         </div>

//         <p className="text-muted mt-4" style={{ fontSize: "0.9rem" }}>
//           Made with ❤️ using the MERN stack.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Home;

//2

// import { Link } from "react-router-dom";
// import { GraduationCap, Users, LogIn, UserPlus, BookOpen } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { motion } from "framer-motion";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-4xl mx-auto"
//       >
//         <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
//           <CardHeader className="text-center space-y-2">
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 260,
//                 damping: 20,
//                 delay: 0.1,
//               }}
//             >
//               <div className="flex justify-center mb-2">
//                 <div className="bg-primary/10 p-3 rounded-full">
//                   <BookOpen className="h-8 w-8 text-primary" />
//                 </div>
//               </div>
//               <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">
//                 ClassCheck
//               </CardTitle>
//             </motion.div>
//             <CardDescription className="text-base sm:text-lg max-w-xl mx-auto">
//               A smart and secure way to manage classroom attendance with
//               real-time QR scans and GPS tracking.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <motion.div
//                 whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                 className="h-full"
//               >
//                 <Card className="h-full border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
//                   <CardHeader className="pb-2">
//                     <div className="flex items-center justify-center mb-2">
//                       <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
//                         <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                       </div>
//                     </div>
//                     <CardTitle className="text-xl text-center text-blue-600 dark:text-blue-400">
//                       Student
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-3 pt-2">
//                     <Button
//                       asChild
//                       variant="outline"
//                       className="w-full group"
//                       size="lg"
//                     >
//                       <Link
//                         to="/student/login"
//                         className="flex items-center justify-center"
//                       >
//                         <LogIn className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                         Login
//                       </Link>
//                     </Button>
//                     <Button
//                       asChild
//                       variant="ghost"
//                       className="w-full group"
//                       size="lg"
//                     >
//                       <Link
//                         to="/student/register"
//                         className="flex items-center justify-center"
//                       >
//                         <UserPlus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
//                         Register
//                       </Link>
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               <motion.div
//                 whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                 className="h-full"
//               >
//                 <Card className="h-full border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
//                   <CardHeader className="pb-2">
//                     <div className="flex items-center justify-center mb-2">
//                       <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full">
//                         <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
//                       </div>
//                     </div>
//                     <CardTitle className="text-xl text-center text-emerald-600 dark:text-emerald-400">
//                       Lecturer
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-3 pt-2">
//                     <Button
//                       asChild
//                       variant="outline"
//                       className="w-full group"
//                       size="lg"
//                     >
//                       <Link
//                         to="/lecturer/login"
//                         className="flex items-center justify-center"
//                       >
//                         <LogIn className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                         Login
//                       </Link>
//                     </Button>
//                     <Button
//                       asChild
//                       variant="ghost"
//                       className="w-full group"
//                       size="lg"
//                     >
//                       <Link
//                         to="/lecturer/register"
//                         className="flex items-center justify-center"
//                       >
//                         <UserPlus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
//                         Register
//                       </Link>
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </div>
//           </CardContent>

//           <CardFooter className="flex justify-center pb-6">
//             <p className="text-sm text-muted-foreground">
//               Made with <span className="text-red-500">❤️</span> using the MERN
//               stack.
//             </p>
//           </CardFooter>
//         </Card>
//       </motion.div>
//     </div>
//   );
// };

// export default Home;

//3
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-indigo-100/50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <QrCode className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            QR Attend
          </span>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/student/login">Student Login</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/lecturer/login">Lecturer Login</Link>
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
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Student Login
              </Link>
              <Link
                to="/lecturer/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Lecturer Login
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
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
            <Button asChild size="lg" className="gap-2 bg-blue-300">
              <Link to="/student/register">
                <User className="w-4 h-4" />
                Student Register
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/lecturer/register">
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
            <Card className="h-full">
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
            <Card className="h-full">
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
            <Card className="h-full">
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
      <section className="bg-white py-16">
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
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
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Ready to Transform Your Attendance System?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Join hundreds of lecturers and students already using our platform for
          seamless attendance management.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="gap-2 bg-blue-300">
            <Link to="/student/register">
              <User className="w-4 h-4" />
              Student Register
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link to="/lecturer/register">
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
