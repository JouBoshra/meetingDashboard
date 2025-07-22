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
                July 2025 Meetings Summary 🗓️
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
                    5
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
                    7
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
                    8
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
                          <p className="text-3xl font-bold text-blue-600">5</p>
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
                            19
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
                            15
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
                            6
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
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>9:00 AM - 10:00 AM</span>
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
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>10:30 AM - 11:30 AM</span>
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
                {/* Other Presentations Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sample Presentation 1 */}
                  <Card className="hover:shadow-lg transition-shadow duration-200 border-orange-200">
                    <CardHeader className="bg-orange-50">
                      <CardTitle className="text-orange-700 flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Network Strategy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">
                        Network Accreditation Strategy
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Strategic roadmap for NCQA accreditation and network
                        expansion initiatives.
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                          In Development
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Sample
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <TestTube className="h-3 w-3 mr-2" />
                        Preview Sample
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Sample Presentation 2 */}
                  <Card className="hover:shadow-lg transition-shadow duration-200 border-purple-200">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Patient Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">
                        Patient Management Dashboard
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Real-time patient tracking and care coordination metrics
                        dashboard.
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Live
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Demo
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <TestTube className="h-3 w-3 mr-2" />
                        View Demo
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Sample Presentation 3 */}
                  <Card className="hover:shadow-lg transition-shadow duration-200 border-green-200">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="text-green-700 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Medicaid Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">
                        Medicaid Expansion Analysis
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Comprehensive analysis of Medicaid expansion
                        opportunities and impact.
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge className="bg-gray-100 text-gray-700 text-xs">
                          Completed
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Template
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <TestTube className="h-3 w-3 mr-2" />
                        View Template
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Info Note */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <TestTube className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">
                          Sample Presentations
                        </h4>
                        <p className="text-sm text-blue-700">
                          The presentations marked with "Sample", "Demo",
                          "Template", or "Prototype" badges are examples of what
                          can be developed for future portal features. These
                          showcase the potential capabilities and design
                          patterns for upcoming dashboard implementations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                    {/* Session 1 Action Items */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-orange-700 flex items-center gap-2 text-lg border-b border-orange-200 pb-2">
                        <Building2 className="h-5 w-5" />
                        Session 1: Network Accreditation & Expansion (July 18)
                      </h3>

                      {/* Critical Priority */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-red-700 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Critical Priority
                        </h4>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <div className="flex-1">
                            <p className="font-medium">
                              Submit NCQA accreditation application
                            </p>
                            <p className="text-sm text-gray-600">
                              Complete and submit network-level accreditation
                              documentation
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                              Assigned: Dr. Sarah Johnson | Meeting: Session 1
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-red-100 text-red-700">
                              Due: July 25
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              5 days left
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <div className="flex-1">
                            <p className="font-medium">
                              Implement 24-hour issue resolution policy
                            </p>
                            <p className="text-sm text-gray-600">
                              Establish protocols and staffing for critical
                              issue response
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                              Assigned: Michael Chen | Meeting: Session 1
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-red-100 text-red-700">
                              Due: July 22
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              2 days left
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Medium Priority */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-700 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Medium Priority
                        </h4>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <div className="flex-1">
                            <p className="font-medium">
                              Research Medicaid expansion opportunities
                            </p>
                            <p className="text-sm text-gray-600">
                              Analyze potential new states for network expansion
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              Assigned: Lisa Rodriguez | Meeting: Session 1
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-blue-100 text-blue-700">
                              Due: August 15
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              25 days left
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Session 2 Action Items */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-purple-700 flex items-center gap-2 text-lg border-b border-purple-200 pb-2">
                        <Heart className="h-5 w-5" />
                        Session 2: Patient Management & Care Coordination (July
                        18)
                      </h3>

                      {/* High Priority */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          High Priority
                        </h4>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <div className="flex-1">
                            <p className="font-medium">
                              Develop no-show intervention strategies
                            </p>
                            <p className="text-sm text-gray-600">
                              Create comprehensive patient engagement and
                              retention protocols
                            </p>
                            <p className="text-xs text-orange-600 mt-1">
                              Assigned: James Wilson | Meeting: Session 2
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-orange-100 text-orange-700">
                              Due: July 30
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              10 days left
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <div className="flex-1">
                            <p className="font-medium">
                              Update scheduler role definitions
                            </p>
                            <p className="text-sm text-gray-600">
                              Clarify responsibilities and accountability
                              measures for scheduling staff
                            </p>
                            <p className="text-xs text-orange-600 mt-1">
                              Assigned: Thomas Anderson | Meeting: Session 2
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-orange-100 text-orange-700">
                              Due: August 5
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              15 days left
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Medium Priority */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-700 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Medium Priority
                        </h4>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <div className="flex-1">
                            <p className="font-medium">
                              Enhance beacon patient protocols
                            </p>
                            <p className="text-sm text-gray-600">
                              Develop specialized care management for high-risk
                              patients
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              Assigned: Dr. Emily Carter | Meeting: Session 2
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-blue-100 text-blue-700">
                              Due: August 20
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              30 days left
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <div className="flex-1">
                            <p className="font-medium">
                              Streamline intake processes
                            </p>
                            <p className="text-sm text-gray-600">
                              Optimize patient onboarding and initial assessment
                              workflows
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              Assigned: David Kim | Meeting: Session 2
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-blue-100 text-blue-700">
                              Due: September 1
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              42 days left
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Revenue Cycle Dashboard Action Items */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-teal-700 flex items-center gap-2 text-lg border-b border-teal-200 pb-2">
                        <DollarSign className="h-5 w-5" />
                        Revenue Cycle Dashboard (July 17)
                      </h3>

                      {/* High Priority */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          High Priority
                        </h4>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <div className="flex-1">
                            <p className="font-medium">
                              Complete time audit for billing team
                            </p>
                            <p className="text-sm text-gray-600">
                              Track biller time for several days to spot delays
                              and inefficiencies
                            </p>
                            <p className="text-xs text-orange-600 mt-1">
                              Assigned: Revenue Team Lead | Meeting: Revenue
                              Cycle
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-orange-100 text-orange-700">
                              Due: July 28
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              8 days left
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <div className="flex-1">
                            <p className="font-medium">
                              Conduct error audit on claims
                            </p>
                            <p className="text-sm text-gray-600">
                              Review sample of 50 claims per biller to map error
                              types
                            </p>
                            <p className="text-xs text-orange-600 mt-1">
                              Assigned: Quality Assurance Team | Meeting:
                              Revenue Cycle
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-orange-100 text-orange-700">
                              Due: August 2
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              12 days left
                            </p>
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
    </div>
  );
}

export default App;
