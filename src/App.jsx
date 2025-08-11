import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.jsx";
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Building2,
  UserCheck,
  FileText,
  Target,
  Zap,
  Heart,
  Presentation,
  ExternalLink,
  Play,
  BarChart3,
  PieChart,
  TestTube,
  MessageCircle,
  Menu,
  X,
  LogOut,
  User,
  Bot,
  Sparkles,
  DollarSign,
  Activity,
  ClipboardList,
  Stethoscope,
  CalendarDays,
} from "lucide-react";
import Logo from "./assets/Brain-Health-USA-Center_white-png(1).webp";
import LoginForm from "./components/ui//LoginForm.jsx";
import AIAssistant from "./components/ui/AIAssistant.jsx";
import "./App.css";
import FirebaseComments from "./components/ui/FirebaseComments.jsx";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check for existing session on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedExpiry = localStorage.getItem("authExpiration");

    if (savedAuth && savedExpiry) {
      const now = new Date().getTime();
      const expiryTime = parseInt(savedExpiry);

      if (now < expiryTime) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authExpiration");
    localStorage.removeItem("authenticatedUser");
    setIsAuthenticated(false);
  };

  // Sample meeting data for AI Assistant - Updated with all 4 meetings
  const currentMeetingData = {
    title: "July 2025 Meetings Summary",
    content: `JUL Meetings Summary:
    
    Session 1 - Network Accreditation & Expansion (July 18, 2025): NCQA network accreditation pursuit, Medicaid expansion in new states, Enhanced intake and scheduling processes, 24-hour issue resolution policy.
    
    Session 2 - Patient Management & Care Coordination (July 18, 2025): No-show percentage monitoring, Beacon patients management, Scheduler responsibilities update, Patient retention focus.
    
    Monthly Business Review – June 2025 (July 15, 2025): Team performance analysis with 79 total employees, Inbound calls performance (100,593 total, 87,461 answered), Abandoned call rate improvement from 4.0% to 0.0%, Operational KPIs tracking, Follow-up requests analysis, Intake appointments (2,261 total), Scheduling metrics and financial impact analysis.
    
    Revenue Cycle Dashboard (July 17, 2025): Monthly claims overview (Jan-May 2025), Blue Shield denial trends analysis, Operational team performance metrics, Medical records and subpoena status, Collection team YTD updates with 44% collection rate, Productivity targets and incentive plans.
    
    Key attendees across meetings included Michael Yacoub, Kerolos Osama, Dr. Ehab, Mariam Fayez, and other team members. Important decisions were made regarding network expansion, patient care improvements, business performance analysis, and revenue cycle optimization.`,
    attendees: [
      "Michael Yacoub",
      "Kerolos Osama",
      "Ayman",
      "Test",
      "Lillian",
      "Marcilleno Sameh",
      "Ekram",
      "Youssef Boshra",
      "Dr. Ehab",
      "Mariam Fayez",
      "Mario Ghaly",
      "Abanoub Gad",
      "Raef Gendy",
      "Peter Izaq",
      "John Makary",
      "Michael Shawky",
      "Youlita Elyas",
      "Andria Samir",
      "David",
    ],
    duration: 240,
    date: "2025-07-15 to 2025-07-18",
  };

  // Function to scroll to a specific section
  const handleGuideMe = (sectionId) => {
    let targetTab;
    switch (sectionId) {
      case "overview":
        targetTab = "overview";
        break;
      case "meetings":
        targetTab = "meetings"; // Navigate to meetings tab
        break;
      case "presentations":
        targetTab = "presentations";
        break;
      case "actions":
        targetTab = "actions";
        break;
      default:
        targetTab = "overview";
        break;
    }

    // Activate the corresponding tab
    setActiveTab(targetTab);

    // Scroll to the top of the page to show the selected tab
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Add a highlight effect to the selected tab
    setTimeout(() => {
      const tabButton = document.querySelector(`[value="${targetTab}"]`);
      if (tabButton) {
        tabButton.style.animation = "pulse 2s ease-in-out";
        setTimeout(() => {
          tabButton.style.animation = "";
        }, 2000);
      }
    }, 500);
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return <LoginForm onLogin={setIsAuthenticated} />;
  }

  // Main dashboard content
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Logo and Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Logout Button - positioned absolutely */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute top-4 right-4 z-10 flex items-center gap-2"
          >
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </motion.div>

          <div className="flex flex-col items-center space-y-4 pt-8 sm:pt-4">
            {/* Company Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
                <img
                  src={Logo}
                  alt="Brain Health USA Center"
                  className="h-16 w-auto filter brightness-0 invert"
                />
              </div>
            </motion.div>

            {/* Title and Subtitle */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-3"
              >
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                Meeting Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-base sm:text-lg text-gray-600 mt-2 flex items-center justify-center gap-2"
              >
                Brain Health Meeting Hub , Where Every Meeting Drives Progress.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content with proper spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation Tabs - Updated with 4 meetings count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border p-2 sticky top-4 z-30">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="overview"
                  className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-200 rounded-lg hover:bg-blue-50 min-h-[40px] sm:min-h-[44px] tabs-trigger-overview"
                >
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline truncate">Overview</span>
                  <span className="sm:hidden truncate">Over</span>
                  <Badge
                    variant="secondary"
                    className="ml-1 bg-blue-100 text-blue-600 text-xs px-1 py-0 h-4 min-w-[16px] flex items-center justify-center"
                  >
                    2
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="meetings"
                  className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-200 rounded-lg hover:bg-orange-50 min-h-[40px] sm:min-h-[44px] tabs-trigger-meetings"
                >
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline truncate">Meetings</span>
                  <span className="sm:hidden truncate">Meet</span>
                  <Badge
                    variant="secondary"
                    className="ml-1 bg-orange-100 text-orange-600 text-xs px-1 py-0 h-4 min-w-[16px] flex items-center justify-center"
                  >
                    12
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="presentations"
                  className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm data-[state=active]:bg-teal-500 data-[state=active]:text-white transition-all duration-200 rounded-lg hover:bg-teal-50 min-h-[40px] sm:min-h-[44px] tabs-trigger-presentations"
                >
                  <Presentation className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline truncate">
                    Presentations
                  </span>
                  <span className="sm:hidden truncate">Pres</span>
                  <Badge
                    variant="secondary"
                    className="ml-1 bg-teal-100 text-teal-600 text-xs px-1 py-0 h-4 min-w-[16px] flex items-center justify-center"
                  >
                    11
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="actions"
                  className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm data-[state=active]:bg-pink-500 data-[state=active]:text-white transition-all duration-200 rounded-lg hover:bg-pink-50 min-h-[40px] sm:min-h-[44px] tabs-trigger-actions"
                >
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline truncate">
                    Action Items
                  </span>
                  <span className="sm:hidden truncate">Act</span>
                  <Badge
                    variant="secondary"
                    className="ml-1 bg-pink-100 text-pink-600 text-xs px-1 py-0 h-4 min-w-[16px] flex items-center justify-center"
                  >
                    38
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>
          </motion.div>

          {/* Tab Contents */}
          <div className="mt-8 pb-8">
            {/* Overview Tab - Updated stats */}
            <TabsContent value="overview" className="space-y-6 tabs-content">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {/* Stats Cards */}
                <motion.div variants={itemVariants}>
                  <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Total Meetings
                          </p>
                          <p className="text-3xl font-bold text-blue-600">12</p>
                        </div>
                        <Calendar className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Total Attendees
                          </p>
                          <p className="text-3xl font-bold text-green-600">
                            21
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Key Points
                          </p>
                          <p className="text-3xl font-bold text-orange-600">
                            38
                          </p>
                        </div>
                        <FileText className="h-8 w-8 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Presentations
                          </p>
                          <p className="text-3xl font-bold text-purple-600">
                            11
                          </p>
                        </div>
                        <Presentation className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Quick Summary - Updated with all 4 meetings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      JUL Meetings Quick Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          🏢 Session 1 - Network & Expansion
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            NCQA network accreditation pursuit
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            Medicaid expansion in new states
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            Enhanced intake and scheduling processes
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            24-hour issue resolution policy
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          👥 Session 2 - Patient Management
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            No-show percentage monitoring
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            Beacon patients management
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            Scheduler responsibilities update
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            Patient retention focus
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          📊 Monthly Business Review
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            Team performance analysis (79 employees)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            Inbound calls performance tracking
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            Abandoned call rate improvement
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            Operational KPIs and scheduling metrics
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          🧾 Revenue Cycle Dashboard
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            Monthly claims overview analysis
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            Blue Shield denial trends
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            Team performance metrics
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            Collection rate improvements (44%)
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          👥 CCD Meeting – July 21, 2025
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500">•</span> No-show
                            percentage stats compiled and shared; outcome
                            pending discussion.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            Beacon patients monitoring: 1 case exceeded limit;
                            investigation ongoing.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            Assessment distribution process
                            reaffirmed—transcribers continue handling.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            Scheduler & queue updates: new billing-alert
                            guidelines and booking protocols implemented.
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          🔄 CCD Meeting – July 23, 2025
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500">•</span>
                            Upper management updates and process improvements
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500">•</span>
                            Beacon patients monitoring (4 cases exceeded)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500">•</span>
                            Scheduler & queue management updates
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500">•</span>
                            Training program for new agent batch
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          🔄 CCD Meeting – July 24, 2025
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-500">•</span>
                            Scheduler coverage and patient classification
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-500">•</span>
                            6-month policy reconfirmation
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-500">•</span>
                            Visit reason updates implementation
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-500">•</span>
                            Continued beacon patients monitoring
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          🔄 CCD Meeting – July 25, 2025
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-rose-500">•</span>
                            Team concerns and Spanish patient challenges
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-rose-500">•</span>
                            Process issues and improvement discussions
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-rose-500">•</span>
                            Provider feedback and booking policies
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-rose-500">•</span>
                            Quality assurance and training needs
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          ⚙️ Process Standardization – July 28, 2025
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Comprehensive process updates and team restructuring
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            New outbound team structure implementation
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Zone-based patient distribution strategy
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Payment plans and individual performance tracking
                          </li>
                        </ul>
                      </div>
                      {/* 1. CCD 1st August Meeting Minutes */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          📑 Meeting Minutes – August 1, 2025
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Monitoring will continue over the next two weeks; 12
                            cases only exceeded 4
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            For the 4 new cases, Abanoub will update the team
                            leaders after the meeting
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Pending: add visit reasons “Eval – Returning
                            Patient” and “Eval – New Patient” (Mariam)
                          </li>
                          <li className="flex flex-col gap-2">
                            <span className="text-amber-500">•</span>
                            Teams’ Concerns:
                            <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                              <li>
                                Peter: add no-show Eval patients with status
                                “unseen” and coordinate with ERP (Abanoub)
                              </li>
                              <li>
                                Mario &amp; Mariam: resolve all provider/patient
                                issues within 24 hrs
                              </li>
                              <li>
                                Michael: Cerritos office relocation pending
                                update
                              </li>
                              <li>
                                Abanoub: ERP patient-number discrepancy—waiting
                                on schedulers &amp; ERP team
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>

                      {/* 2. MD Thomas J Questionnaire */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          📝 MD Thomas J Questionnaire
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Physical Health Snapshot: BP/HR readings; current
                            weight and any recent changes
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Mental Health Check-in: sleep quality, appetite,
                            mood, energy, focus/attention, hallucinations,
                            delusions
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Medication &amp; Side Effects: current meds list,
                            adherence challenges, any new or worsening side
                            effects
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Health Updates: new diagnoses, new allergies,
                            discontinued medications
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Safety Screening: thoughts of self-harm or harming
                            others, with crisis-response instructions
                          </li>
                        </ul>
                      </div>

                      {/* 3. August 4 Meeting Minutes */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          📆 Meeting Minutes – August 4, 2025
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Attendees: Sylvia, Youssef Boshra, Leah, Mariam,
                            Ayman, Lilian, Michael Yacoub, Shady Shaker,
                            Abanoub, Test
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Business Review: Airbnb issues &amp; app
                            integrations; refine ticket management &amp; Office
                            Ally→ERP data flow
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Accountability &amp; RACI chart: clarify roles for
                            schedulers, handlers &amp; PCM; schedulers to tag
                            patients in ERP
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Claims &amp; Insurance: ~50% Blue Shield paid; legal
                            follow-up schedule; report on denied claims
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* JUL Meetings Tab - All 4 meetings organized */}
            <TabsContent value="meetings" className="space-y-6 tabs-content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    JUL Meetings
                  </h2>
                  <p className="text-gray-600">
                    All meeting sessions from July 2025
                  </p>
                </div>

                {/* Session 1 Card */}
                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-orange-500">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-6 w-6 text-orange-700" />
                        <div>
                          <CardTitle className="text-orange-700">
                            Session 1: Network Accreditation & Expansion
                          </CardTitle>
                          <CardDescription className="text-orange-600">
                            Strategic planning for network growth and
                            accreditation
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-orange-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>July 18, 2025</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-xl font-bold text-orange-600">
                          8
                        </div>
                        <div className="text-xs text-orange-700">Attendees</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          60
                        </div>
                        <div className="text-xs text-blue-700">Minutes</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          5
                        </div>
                        <div className="text-xs text-green-700">Key Points</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          Attendees (8)
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Michael Yacoub</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Kerolos Osama</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Ayman, Test, Lillian</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Marcilleno Sameh, Ekram, Youssef Boshra</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          Key Focus Areas
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500">•</span>
                            <span>NCQA network accreditation pursuit</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500">•</span>
                            <span>Medicaid expansion in new states</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500">•</span>
                            <span>
                              Enhanced intake and scheduling processes
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500">•</span>
                            <span>24-hour issue resolution policy</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500">•</span>
                            <span>
                              Provider hiring focus on NPs and therapists
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Session 2 Card */}
                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-purple-500">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-6 w-6 text-purple-700" />
                        <div>
                          <CardTitle className="text-purple-700">
                            Session 2: Patient Management & Care Coordination
                          </CardTitle>
                          <CardDescription className="text-purple-600">
                            Comprehensive care delivery and patient management
                            strategies
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-purple-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>July 18, 2025</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">
                          11
                        </div>
                        <div className="text-xs text-purple-700">Attendees</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          60
                        </div>
                        <div className="text-xs text-blue-700">Minutes</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          4
                        </div>
                        <div className="text-xs text-green-700">Key Points</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          Attendees (11)
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Dr. Ehab</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Mariam Fayez, Mario Ghaly</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Abanoub Gad, Raef Gendy, Peter Izaq</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>John Makary, Michael Shawky</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Youlita Elyas, Andria Samir, David</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          Key Focus Areas
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            <span>No-show percentage monitoring</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            <span>Beacon patients management</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            <span>Scheduler responsibilities update</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            <span>Patient retention focus</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Business Review Card */}
                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-green-500">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-green-700" />
                        <div>
                          <CardTitle className="text-green-700">
                            Monthly Business Review – June 2025
                          </CardTitle>
                          <CardDescription className="text-green-600">
                            Comprehensive business performance analysis and team
                            metrics
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-green-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>July 15, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Updated 15 July 2025</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          79
                        </div>
                        <div className="text-xs text-green-700">
                          Total Employees
                        </div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          100,593
                        </div>
                        <div className="text-xs text-blue-700">
                          Inbound Calls
                        </div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-xl font-bold text-yellow-600">
                          0.0%
                        </div>
                        <div className="text-xs text-yellow-700">
                          Abandoned Rate (June)
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          Attendance
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Not showing the attendance</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          Key Metrics
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>
                              Team Leaders: 8, Managers: 2, Director: 1
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>87,461 calls answered, 13,132 abandoned</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>Intake appointments: 2,261 (Mar-Jun)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>
                              Active patients: 24,067, No-show rate: 8.7%
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>Billed appointments grew 17.5% YoY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Cycle Dashboard Card */}
                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-teal-500">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-6 w-6 text-teal-700" />
                        <div>
                          <CardTitle className="text-teal-700">
                            Revenue Cycle Dashboard
                          </CardTitle>
                          <CardDescription className="text-teal-600">
                            Financial performance metrics and revenue cycle
                            analysis
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-teal-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>July 17, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          <span>Jan-May 2025 Data</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-teal-50 rounded-lg">
                        <div className="text-xl font-bold text-teal-600">
                          44%
                        </div>
                        <div className="text-xs text-teal-700">
                          Collection Rate
                        </div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-xl font-bold text-red-600">
                          70-81%
                        </div>
                        <div className="text-xs text-red-700">
                          Blue Shield Denials
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">
                          1,156
                        </div>
                        <div className="text-xs text-purple-700">
                          Pending Records
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          Attendance
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>Not showing the attendance</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          Key Metrics
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            <span>Monthly claims overview (Jan-May 2025)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            <span>Blue Shield primary denial driver</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            <span>Collection rate doubled vs 2024</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            <span>Productivity targets & incentive plans</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            <span>
                              Medical records: 124 avg processed daily
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* — CCD Meeting Summary Card */}
                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-indigo-500">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-6 w-6 text-indigo-700" />
                        <div>
                          <CardTitle className="text-indigo-700">
                            CCD Meeting Summary – July 21, 2025
                          </CardTitle>
                          <CardDescription className="text-indigo-600">
                            40-minute review of key CCD action items and updates
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-indigo-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>July 21, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Duration: 40 min</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    {/* stats row */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-indigo-50 rounded-lg">
                        <div className="text-xl font-bold text-indigo-600">
                          11
                        </div>
                        <div className="text-xs text-indigo-700">Attendees</div>
                      </div>
                      <div className="text-center p-3 bg-indigo-50 rounded-lg">
                        <div className="text-xl font-bold text-indigo-600">
                          4
                        </div>
                        <div className="text-xs text-indigo-700">
                          Agenda Items
                        </div>
                      </div>
                      <div className="text-center p-3 bg-indigo-50 rounded-lg">
                        <div className="text-xl font-bold text-indigo-600">
                          1
                        </div>
                        <div className="text-xs text-indigo-700">
                          Updates Pending
                        </div>
                      </div>
                    </div>

                    {/* two-column content */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Attendance */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4 text-indigo-500" />
                          Attendance
                        </h4>
                        <div className="space-y-2 text-sm">
                          {[
                            "Dr. Ehab",
                            "Mariam Fayez",
                            "Mario Ghaly",
                            "Abanoub Gad",
                            "Raef Gendy",
                            "Peter Izaq",
                            "John Makary",
                            "Michael Shawky",
                            "Andria Samir",
                            "Sameh Ikram",
                            "Sara Osama",
                          ].map((name) => (
                            <div key={name} className="flex items-center gap-2">
                              <User className="h-3 w-3 text-gray-400" />
                              <span>{name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Updates */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-indigo-500" />
                          Key Metrics
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-500">•</span>
                            No-show stats compiled; file shared, pending
                            discussion.
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-500">•</span>
                            Beacon patients: 1 case over limit; investigation
                            ongoing.
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-500">•</span>
                            Assessment process reaffirmed: transcribers continue
                            handling.
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-500">•</span>
                            Scheduler & queue: billing alerts & new guidelines
                            implemented.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* New July Meetings */}
                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-indigo-500">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-indigo-700" />
                        <div>
                          <CardTitle className="text-indigo-700">
                            CCD Meeting – July 23, 2025
                          </CardTitle>
                          <CardDescription className="text-indigo-600">
                            Upper management updates and process improvements
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-indigo-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>July 23, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>30 minutes</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Duration</span>
                        <Badge variant="outline">30 minutes</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Attendees</span>
                        <Badge variant="outline">11 participants</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2">Key Topics</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                          • Upper management updates (discrepancy in numbers)
                        </li>
                        <li>• Beacon patients monitoring (4 cases exceeded)</li>
                        <li>• Scheduler & queue management updates</li>
                        <li>• Training program for new agent batch</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-cyan-500">
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-cyan-700" />
                        <div>
                          <CardTitle className="text-cyan-700">
                            CCD Meeting – July 24, 2025
                          </CardTitle>
                          <CardDescription className="text-cyan-600">
                            Scheduler coverage and patient classification
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-cyan-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>July 24, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>30 minutes</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Duration</span>
                        <Badge variant="outline">30 minutes</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Attendees</span>
                        <Badge variant="outline">7 participants</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2">Key Topics</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Scheduler coverage (Sara covering for Sameh)</li>
                        <li>• Patient classification (6-month policy)</li>
                        <li>• Visit reason updates implementation</li>
                        <li>• Continued beacon patients monitoring</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-rose-500">
                  <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-rose-700" />
                        <div>
                          <CardTitle className="text-rose-700">
                            CCD Meeting – July 25, 2025
                          </CardTitle>
                          <CardDescription className="text-rose-600">
                            Team concerns and Spanish patient challenges
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-rose-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>July 25, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>50 minutes</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Duration</span>
                        <Badge variant="outline">50 minutes</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Attendees</span>
                        <Badge variant="outline">7 participants</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2">Key Topics</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Team concerns and Spanish patient challenges</li>
                        <li>• Process issues and improvement discussions</li>
                        <li>• Provider feedback and booking policies</li>
                        <li>• Quality assurance and training needs</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-amber-500">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-6 w-6 text-amber-700" />
                        <div>
                          <CardTitle className="text-amber-700">
                            Process Standardization – July 28, 2025
                          </CardTitle>
                          <CardDescription className="text-amber-600">
                            Comprehensive process updates and team restructuring
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-amber-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>July 28, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>45 minutes</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Duration</span>
                        <Badge variant="outline">45 minutes</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Attendees</span>
                        <Badge variant="outline">3 teams</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          In Progress
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2">Key Topics</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• New outbound team structure implementation</li>
                        <li>• Zone-based patient distribution strategy</li>
                        <li>• Payment plans and follow-up procedures</li>
                        <li>• Individual performance tracking system</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-emerald-500">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-6 w-6 text-emerald-700" />
                        <div>
                          <CardTitle className="text-emerald-700">
                            Meeting Minutes – August 1, 2025
                          </CardTitle>
                          <CardDescription className="text-emerald-600">
                            Monitoring will continue over the next two weeks; 12
                            cases exceeded threshold
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right text-sm text-emerald-600">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>Aug 1, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>45 minutes</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Duration</span>
                        <Badge variant="outline">45 minutes</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Attendees</span>
                        <Badge variant="outline">7 people</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2">Key Topics</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Continue monitoring; 12 cases over threshold</li>
                        <li>• Abanoub to update team leaders on 4 new cases</li>
                        <li>
                          • Pending “Eval – Returning Patient” & “Eval – New
                          Patient” visit reasons
                        </li>
                        <li>
                          • Teams’ concerns: no-show status, provider issues,
                          Cerritos relocation, ERP discrepancy
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. MD Thomas J Questionnaire */}
                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-6 w-6 text-blue-700" />
                      <div>
                        <CardTitle className="text-blue-700">
                          MD Thomas J Questionnaire
                        </CardTitle>
                        <CardDescription className="text-blue-600">
                          Comprehensive physical & mental health check
                          questionnaire
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Sections</span>
                        <Badge variant="outline">5</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Questions</span>
                        <Badge variant="outline">20+</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          Ready
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2">Key Sections</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Physical Health Snapshot (BP, HR, Weight)</li>
                        <li>
                          • Mental Health Check-in (Sleep, Appetite, Mood,
                          Energy, Focus, Hallucinations, Delusions)
                        </li>
                        <li>• Medication & Side Effects Review</li>
                        <li>
                          • Health Updates (New conditions, allergies,
                          discontinued meds)
                        </li>
                        <li>
                          • Safety Screening (Self-harm or harm to others)
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* 3. Meeting Minutes – August 4, 2025 */}
                <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-violet-500">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-violet-100">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-6 w-6 text-violet-700" />
                      <div>
                        <CardTitle className="text-violet-700">
                          Meeting Minutes – August 4, 2025
                        </CardTitle>
                        <CardDescription className="text-violet-600">
                          Business Review, RACI chart planning & claims
                          follow-up
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Attendees</span>
                        <Badge variant="outline">10 people</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className="bg-violet-100 text-violet-800">
                          Completed
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2">Key Topics</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                          • Business Review discussion (Airbnb issues, app
                          integrations, ticket management)
                        </li>
                        <li>
                          • Accountability & RACI chart for schedulers, handlers
                          & PCM teams
                        </li>
                        <li>
                          • Claims & insurance follow-up with legal team;
                          denied-claims report
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Presentations Tab - Updated with new presentations */}
            <TabsContent
              value="presentations"
              className="space-y-6 tabs-content"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Featured Presentations Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Monthly Business Review */}
                  <Card className="bg-green-50 border-2 border-green-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <BarChart3 className="h-6 w-6" />
                        Monthly Business Review – June 2025
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex-1">
                          <p className="text-gray-600 mb-4">
                            Comprehensive business performance analysis
                            featuring team metrics, call center performance,
                            operational KPIs, and financial impact analysis for
                            June 2025.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-green-100 text-green-700">
                              Live
                            </Badge>
                            <Badge variant="outline">Business Analysis</Badge>
                            <Badge variant="outline">Team Performance</Badge>
                            <Badge variant="outline">KPIs</Badge>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() =>
                                window.open(
                                  "https://jouboshra.github.io/new1-/",
                                  "_blank"
                                )
                              }
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Live
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Revenue Cycle Dashboard */}
                  <Card className="bg-teal-50 border-2 border-teal-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-teal-700">
                        <DollarSign className="h-6 w-6" />
                        Revenue Cycle Dashboard
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex-1">
                          <p className="text-gray-600 mb-4">
                            Financial performance dashboard with claims
                            analysis, denial trends, team performance metrics,
                            and collection rate improvements for comprehensive
                            revenue cycle management.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-teal-100 text-teal-700">
                              Live
                            </Badge>
                            <Badge variant="outline">Financial Analysis</Badge>
                            <Badge variant="outline">Claims Review</Badge>
                            <Badge variant="outline">Revenue Cycle</Badge>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              className="bg-teal-600 hover:bg-teal-700 text-white"
                              onClick={() =>
                                window.open(
                                  "https://jouboshra.github.io/-Revenue-Cycle-Dashboard/",
                                  "_blank"
                                )
                              }
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Live
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Existing Featured Presentation */}
                <Card className="bg-blue-50 border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Presentation className="h-6 w-6" />
                      Denied Business Review - June 2025
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-1">
                        <p className="text-gray-600 mb-4">
                          Comprehensive analysis of denied claims and business
                          review metrics for June 2025, featuring interactive
                          dashboards and detailed financial breakdowns.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className="bg-green-100 text-green-700">
                            Live
                          </Badge>
                          <Badge variant="outline">Financial Analysis</Badge>
                          <Badge variant="outline">Claims Review</Badge>
                          <Badge variant="outline">Interactive</Badge>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() =>
                              window.open(
                                "https://jouboshra.github.io/Denied-Business-Review-June-25/",
                                "_blank"
                              )
                            }
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live
                          </Button>
                          <Button variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Demo
                          </Button>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 p-4 rounded-lg">
                          <PieChart className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                          <p className="text-sm text-blue-600 font-medium">
                            Interactive Dashboard
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700">
                      <ExternalLink className="h-6 w-6" />
                      CCD Meeting Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A live link to your CCD Meeting Dashboard.
                    </p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() =>
                        window.open(
                          "https://ccd-dashboard.vercel.app",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open CCD Dashboard
                    </Button>
                  </CardContent>
                </Card>
                {/* Aug Updates */}
                <Card className="bg-indigo-50 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700">
                      <ExternalLink className="h-6 w-6" />
                      CCD Meeting – July 23, 2025
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A live link to your CCD Meeting – July 23, 2025.
                    </p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() =>
                        window.open(
                          "https://jouboshra.github.io/Meeting-Documents/ccd_july23.html",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Meeting – July 23, 2025
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700">
                      <ExternalLink className="h-6 w-6" />
                      CCD Meeting – July 24, 2025
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A live link to your CCD Meeting – July 24, 2025.
                    </p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() =>
                        window.open(
                          "https://jouboshra.github.io/Meeting-Documents/ccd_july24.html",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open CCD Meeting – July 24, 2025
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700">
                      <ExternalLink className="h-6 w-6" />
                      CCD Meeting – July 25, 2025
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A live link to your CCD Meeting – July 25, 2025.
                    </p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() =>
                        window.open(
                          "https://jouboshra.github.io/Meeting-Documents/ccd_july25.html",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open CCD Meeting – July 25, 2025
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700">
                      <ExternalLink className="h-6 w-6" />
                      CCD Meeting – August 1, 2025
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A live link to your CCD Meeting – August 1, 2025.
                    </p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() =>
                        window.open(
                          "https://jouboshra.github.io/Meeting-Documents/ccd_august1.html",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open CCD Meeting – August 1, 2025
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700">
                      <ExternalLink className="h-6 w-6" />
                      Patient Self-Report Questionnaire
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A live link to your Patient Self-Report Questionnaire.
                    </p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() =>
                        window.open(
                          "https://jouboshra.github.io/Meeting-Documents/questionnaire.html",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Self-Report Questionnaire
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700">
                      <ExternalLink className="h-6 w-6" />
                      New Account Inquiry Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A live link to your New Account Inquiry Email.
                    </p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() =>
                        window.open(
                          "https://jouboshra.github.io/Meeting-Documents/new_account_email.html",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open New Account Inquiry Email
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700">
                      <ExternalLink className="h-6 w-6" />
                      Meeting – August 4, 2025
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A live link to your Meeting – August 4, 2025.
                    </p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() =>
                        window.open(
                          "https://jouboshra.github.io/Meeting-Documents/meeting_august4.html",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Meeting – August 4, 2025
                    </Button>
                  </CardContent>
                </Card>
                {/* Other Presentations Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
              </motion.div>
            </TabsContent>

            {/* Action Items Tab - Organized by meeting and month */}
            <TabsContent value="actions" className="space-y-6 tabs-content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Action Items List - Organized by Meeting */}
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-pink-700">
                      <CheckCircle className="h-6 w-6" />
                      Action Items & Follow-ups - July 2025
                    </CardTitle>
                    <CardDescription>
                      Tasks and deliverables organized by meeting sessions with
                      assigned owners and deadlines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Previous Action Items */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">
                        Previous July Meetings
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">
                              Team performance analysis completed
                            </p>
                            <p className="text-sm text-green-600">
                              Monthly Business Review - June 2025
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                              <span className="text-xs text-green-600">
                                July 15, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">
                              Revenue cycle dashboard implementation
                            </p>
                            <p className="text-sm text-green-600">
                              Financial Performance Metrics
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                              <span className="text-xs text-green-600">
                                July 17, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              NCQA accreditation pursuit
                            </p>
                            <p className="text-sm text-yellow-600">
                              Network Accreditation & Expansion
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                July 18, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">
                              Patient retention strategies implemented
                            </p>
                            <p className="text-sm text-green-600">
                              Patient Management & Care Coordination
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                              <span className="text-xs text-green-600">
                                July 18, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              Medicaid expansion planning
                            </p>
                            <p className="text-sm text-yellow-600">
                              Network Strategy Development
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                July 18, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">
                              No-show monitoring system activated
                            </p>
                            <p className="text-sm text-green-600">
                              Patient Management Dashboard
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                              <span className="text-xs text-green-600">
                                July 18, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              Enhanced scheduling processes
                            </p>
                            <p className="text-sm text-yellow-600">
                              Operational Improvements
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                July 18, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">
                              Collection rate improvement achieved (44%)
                            </p>
                            <p className="text-sm text-green-600">
                              Revenue Cycle Optimization
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                              <span className="text-xs text-green-600">
                                July 17, 2025
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* New Action Items from July Meetings */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">
                        New July Meetings (23-28)
                      </h3>

                      {/* CCD Meeting July 23 Action Items */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-indigo-700">
                          CCD Meeting - July 23, 2025
                        </h4>

                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-red-800">
                              Revisit team number calculations
                            </p>
                            <p className="text-sm text-red-600">
                              Address discrepancy in numbers with upper
                              management
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-red-100 text-red-800">
                                High Priority
                              </Badge>
                              <span className="text-xs text-red-600">
                                Due: July 30, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              Address provider concerns with Mr Ayman
                            </p>
                            <p className="text-sm text-yellow-600">
                              Adeshwa Adekunbi refusing age range, MD William
                              Yee not accepting ADHD PTs
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                Due: July 26, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-blue-800">
                              Educate intake team on provider booking policies
                            </p>
                            <p className="text-sm text-blue-600">
                              6-month rule and returning patients process
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-blue-100 text-blue-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-blue-600">
                                Due: July 25, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-purple-800">
                              Create new visit reasons
                            </p>
                            <p className="text-sm text-purple-600">
                              Update system with new visit reason categories
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-purple-100 text-purple-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-purple-600">
                                Due: July 27, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">
                              Provide feedback on new shared preferences sheet
                            </p>
                            <p className="text-sm text-green-600">
                              Team feedback collected and documented
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                              <span className="text-xs text-green-600">
                                July 24, 2025
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CCD Meeting July 24 Action Items */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-cyan-700">
                          CCD Meeting - July 24, 2025
                        </h4>

                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">
                              Sara covering for Sameh - scheduler coverage
                              arranged
                            </p>
                            <p className="text-sm text-green-600">
                              Temporary coverage implemented successfully
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                              <span className="text-xs text-green-600">
                                July 24, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-blue-800">
                              Reconfirm 6-month policy for patient
                              classification
                            </p>
                            <p className="text-sm text-blue-600">
                              Ensure all team members understand returning
                              patient policies
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-blue-100 text-blue-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-blue-600">
                                Due: July 26, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              Implement visit reason updates
                            </p>
                            <p className="text-sm text-yellow-600">
                              Pending implementation of new visit reasons in
                              system
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                Due: July 28, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">
                              Continue beacon patients monitoring
                            </p>
                            <p className="text-sm text-green-600">
                              Ongoing monitoring of beacon patients maintained
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                Ongoing
                              </Badge>
                              <span className="text-xs text-green-600">
                                Continuous
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CCD Meeting July 25 Action Items */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-rose-700">
                          CCD Meeting - July 25, 2025
                        </h4>

                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-red-800">
                              Address Spanish patient challenges
                            </p>
                            <p className="text-sm text-red-600">
                              Develop strategies for handling Spanish-speaking
                              patient concerns
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-red-100 text-red-800">
                                High Priority
                              </Badge>
                              <span className="text-xs text-red-600">
                                Due: July 30, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              Resolve process issues marked in red
                            </p>
                            <p className="text-sm text-yellow-600">
                              Address pending process improvements identified in
                              meeting
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                Due: July 29, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-blue-800">
                              Implement provider feedback system
                            </p>
                            <p className="text-sm text-blue-600">
                              Create formal process for collecting and
                              addressing provider concerns
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-blue-100 text-blue-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-blue-600">
                                Due: August 1, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-purple-800">
                              Enhance quality assurance training
                            </p>
                            <p className="text-sm text-purple-600">
                              Develop additional training modules for quality
                              improvement
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-purple-100 text-purple-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-purple-600">
                                Due: August 5, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <Users className="h-5 w-5 text-orange-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-orange-800">
                              Review booking policies with providers
                            </p>
                            <p className="text-sm text-orange-600">
                              Ensure all providers understand and follow booking
                              guidelines
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-orange-100 text-orange-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-orange-600">
                                Due: July 31, 2025
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Process Standardization July 28 Action Items */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-amber-700">
                          Process Standardization - July 28, 2025
                        </h4>

                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-red-800">
                              Implement new outbound team structure
                            </p>
                            <p className="text-sm text-red-600">
                              Restructure outbound team to handle all outbound
                              calls, cases, missed calls, RST and voicemails
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-red-100 text-red-800">
                                High Priority
                              </Badge>
                              <span className="text-xs text-red-600">
                                Due: August 2, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              Finalize Lorine's review of intake form questions
                            </p>
                            <p className="text-sm text-yellow-600">
                              Complete review and approval of new intake form
                              questions
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                Due: July 30, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-blue-800">
                              Update availability sheet with provider capacity
                              tracking
                            </p>
                            <p className="text-sm text-blue-600">
                              Include date of joining, exceptions, and provider
                              capacity in availability sheet
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-blue-100 text-blue-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-blue-600">
                                Due: August 1, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-purple-800">
                              Implement individual performance incentive scheme
                            </p>
                            <p className="text-sm text-purple-600">
                              Develop and implement individual performance
                              tracking and incentive system
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-purple-100 text-purple-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-purple-600">
                                Due: August 5, 2025
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* MON_$_AUG2025 */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-emerald-700">
                          Meeting Minutes – August 1, 2025 Action Items
                        </h4>

                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-red-800">
                              Abanoub to update team leaders on the 4 new Beacon
                              cases
                            </p>
                            <p className="text-sm text-red-600">
                              Notify leaders of patient exceedances and next
                              steps
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-red-100 text-red-800">
                                High Priority
                              </Badge>
                              <span className="text-xs text-red-600">
                                Due: August 3, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              Mariam to add “Eval – Returning Patient” & “Eval –
                              New Patient” visit reasons
                            </p>
                            <p className="text-sm text-yellow-600">
                              Update system visit codes for returning and new
                              patients
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                Due: August 4, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-blue-800">
                              Abanoub & ERP team to implement “unseen” status
                              for no-show eval patients
                            </p>
                            <p className="text-sm text-blue-600">
                              Coordinate with schedulers to tag unseen cases in
                              ERP
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-blue-100 text-blue-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-blue-600">
                                Due: August 6, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-purple-800">
                              Mario & Mariam to resolve all provider/patient
                              issues within 24 hours
                            </p>
                            <p className="text-sm text-purple-600">
                              Escalate complex cases to leadership as needed
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-purple-100 text-purple-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-purple-600">
                                Due: August 2, 2025
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* MD Thomas J Questionnaire Action Items */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-blue-700">
                          MD Thomas J Questionnaire Action Items
                        </h4>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              Finalize questionnaire sections and layout
                            </p>
                            <p className="text-sm text-yellow-600">
                              Ensure all five domains and prompts are reviewed
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                Due: August 5, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-blue-800">
                              Distribute form to patients before appointments
                            </p>
                            <p className="text-sm text-blue-600">
                              Send via portal and provide paper copies at
                              check-in
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-blue-100 text-blue-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-blue-600">
                                Due: August 7, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-purple-800">
                              Train staff on administering the health check
                              questionnaire
                            </p>
                            <p className="text-sm text-purple-600">
                              Hold a short workshop and distribute quick-start
                              guide
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-purple-100 text-purple-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-purple-600">
                                Due: August 8, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">
                              Integrate completed questionnaires into patient
                              records
                            </p>
                            <p className="text-sm text-green-600">
                              Work with IT to map fields into the EMR
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-green-100 text-green-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-green-600">
                                Due: August 10, 2025
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Meeting Minutes – August 4, 2025 Action Items */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-violet-700">
                          Meeting Minutes – August 4, 2025 Action Items
                        </h4>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-yellow-800">
                              Sylvia to prepare for Business Review and
                              integrate Office Ally data
                            </p>
                            <p className="text-sm text-yellow-600">
                              Compile and format data for ERP ingestion
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                In Progress
                              </Badge>
                              <span className="text-xs text-yellow-600">
                                Due: August 6, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-blue-800">
                              Michael to draft the RACI chart; schedulers to tag
                              patients in ERP
                            </p>
                            <p className="text-sm text-blue-600">
                              Define and assign roles within the system
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-blue-100 text-blue-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-blue-600">
                                Due: August 7, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-red-800">
                              Ayman & Nivin to coordinate with legal team on
                              claims status
                            </p>
                            <p className="text-sm text-red-600">
                              Expedite denials and underpayments resolution
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-red-100 text-red-800">
                                High Priority
                              </Badge>
                              <span className="text-xs text-red-600">
                                Due: August 5, 2025
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-purple-800">
                              Sylvia to compile a report on denied claims for
                              further analysis
                            </p>
                            <p className="text-sm text-purple-600">
                              Include denial reasons and volumes by provider
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-purple-100 text-purple-800">
                                Pending
                              </Badge>
                              <span className="text-xs text-purple-600">
                                Due: August 8, 2025
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary Statistics */}
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="font-semibold text-lg mb-4">
                        Summary Statistics
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-green-600">
                            14
                          </div>
                          <div className="text-sm text-gray-600">Completed</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-yellow-600">
                            7
                          </div>
                          <div className="text-sm text-gray-600">
                            In Progress
                          </div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-red-600">
                            10
                          </div>
                          <div className="text-sm text-gray-600">
                            High Priority
                          </div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-purple-600">
                            78%
                          </div>
                          <div className="text-sm text-gray-600">
                            Completion Rate
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Comments Section */}
        <FirebaseComments sectionId={activeTab} />
      </div>

      {/* Floating Chat Component */}
      <AIAssistant meetingData={currentMeetingData} onGuideMe={handleGuideMe} />
      <Analytics />
    </div>
  );
}

export default App;
