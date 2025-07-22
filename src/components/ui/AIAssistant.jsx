import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import backendGeminiService from "../../services/backendGeminiService";

// Custom markdown parser for basic formatting
const parseMarkdown = (text) => {
  if (!text) return "";

  // Convert markdown to HTML-like JSX elements
  let parsed = text
    // Bold text **text** -> <strong>text</strong>
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold text-gray-900">$1</strong>'
    )
    // Italic text *text* -> <em>text</em>
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
    // Headers ## text -> <h2>text</h2>
    .replace(
      /^### (.*$)/gm,
      '<h3 class="text-sm font-bold text-gray-700 mb-1">$1</h3>'
    )
    .replace(
      /^## (.*$)/gm,
      '<h2 class="text-base font-bold text-gray-800 mb-2">$1</h2>'
    )
    .replace(
      /^# (.*$)/gm,
      '<h1 class="text-lg font-bold text-gray-800 mb-2">$1</h1>'
    )
    // List items • text -> <li>text</li>
    .replace(/^• (.*$)/gm, '<li class="text-gray-800 ml-4">• $1</li>')
    // Line breaks
    .replace(/\n/g, "<br />");

  return parsed;
};

import {
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Send,
  Bot,
  User,
  Loader2,
  Target,
  FileText,
  Navigation,
  Users,
  BarChart3,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AIAssistant = ({ onGuideMe, meetingData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [awaitingFeatureSelection, setAwaitingFeatureSelection] =
    useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showAdditionalFeatures, setShowAdditionalFeatures] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);
  const [isGeminiConfigured, setIsGeminiConfigured] = useState(false);
  const chatEndRef = useRef(null);

  // Check backend Gemini status on component mount
  useEffect(() => {
    const checkGeminiStatus = async () => {
      const status = await backendGeminiService.checkStatus();
      setIsGeminiConfigured(status);
    };
    checkGeminiStatus();
  }, []);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      setChatHistory([
        {
          type: "ai",
          content: `🤖 **Hello! I'm your Advanced AI Assistant** 

✨ **I can help you with 2 main functions:**

🧭 **Guide Me**
• Navigate to any section
• Smart section guidance
• Interactive navigation

🎨 **AI Consultant**
• Professional consulting on meeting insights
• Strategic recommendations and analysis
• Expert guidance on business decisions

📋 **Additional Features** (Click "More Options" to access):
• Smart Summary • Key Points

🚀 **Enhanced AI Power:**
• Powered by Google Gemini AI for unlimited conversations
• Get answers to any question beyond meeting topics
• Professional AI consulting on any business topic
• ${
            isGeminiConfigured
              ? "✅ **AI Service Active**"
              : "⚠️ **AI Service Connecting...**"
          }

**What would you like me to help you with today?** 🚀`,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [isOpen, isGeminiConfigured]);

  // Meeting sections data - Updated with all 4 meetings
  const sections = [
    {
      id: "overview",
      name: "Overview",
      icon: BarChart3,
      description: "General overview of meeting statistics and quick summary",
      content:
        "Overview section with meeting statistics and quick summary. Total meetings: 4, Total attendees: 19, Key points: 15, Presentations: 6. This section provides a comprehensive overview of all July 2025 meeting activities and key metrics including Network Expansion, Patient Management, Monthly Business Review, and Revenue Cycle Dashboard.",
    },
    {
      id: "meetings",
      name: "Meetings",
      icon: Users,
      description: "All July 2025 meeting sessions",
      content: `JUL Meetings Summary:

**Session 1 - Network Accreditation & Expansion (July 18, 2025):**
NCQA network accreditation pursuit, Medicaid expansion in new states, Enhanced intake and scheduling processes, 24-hour issue resolution policy. 
Attendees: Michael Yacoub, Kerolos Osama, Ayman, Test, Lillian, Marcilleno Sameh, Ekram, Youssef Boshra. 
Key discussion points include NCQA accreditation for network prestige, Medicaid expansion to states like Maryland with higher rates, in-person coverage with 28 providers across 11 locations, patient intake improvements, and 24-hour resolution protocols.

**Session 2 - Patient Management & Care Coordination (July 18, 2025):**
No-show percentage monitoring, Beacon patients management, Scheduler responsibilities update, Patient retention focus. 
Attendees: Dr. Ehab, Mariam Fayez, Mario Ghaly, Abanoub Gad, Raef Gendy, Peter Izaq, John Makary, Michael Shawky, Youlita Elyas, Andria Samir, David. 
Key points include no-show statistics compilation, booking appointments within 24 hours max, Beacon patient monitoring for two weeks, assessment distribution concerns, scheduler and queue management updates, and patient retention as primary target.

**Monthly Business Review – June 2025 (July 15, 2025):**
Comprehensive business performance analysis featuring team metrics, call center performance, operational KPIs, and financial impact analysis. 
Key metrics: 79 total employees (8 team leaders, 2 managers, 1 director), 100,593 inbound calls (87,461 answered, 13,132 abandoned), abandoned call rate improved from 4.0% to 0.0%, 2,261 intake appointments (Mar-Jun), 24,067 active patients, 8.7% no-show rate, 17.5% YoY growth in billed appointments.

**Revenue Cycle Dashboard (July 17, 2025):**
Financial performance metrics and revenue cycle analysis covering Jan-May 2025 data. 
Key metrics: 44% collection rate (doubled vs 2024), Blue Shield denials 70-81% of total denials, 1,156 pending medical record requests, 124 average daily processed records, productivity targets and incentive plans, billing team and EOB team performance metrics.

**Combined Key Outcomes:**
- Total attendees across all meetings: 19 participants
- Strategic focus on network expansion, patient care optimization, business performance, and revenue cycle management
- Critical action items identified for NCQA accreditation, operational improvements, and financial optimization
- Comprehensive approach to healthcare delivery enhancement across all operational areas`,
    },
    {
      id: "presentations",
      name: "Presentations",
      icon: FileText,
      description: "Interactive presentations and dashboards",
      content:
        "Presentations section with various dashboards and reports. Featured presentations: Monthly Business Review – June 2025 (comprehensive business performance analysis), Revenue Cycle Dashboard (financial performance metrics), Denied Business Review - June 2025 (comprehensive analysis of denied claims). Other presentations include Network Strategy, Patient Management Dashboard, Medicaid Analysis, and Quality Metrics Dashboard. Interactive dashboards with financial analysis, claims review, and quality indicators.",
    },
    {
      id: "actions",
      name: "Action Items",
      icon: CheckCircle,
      description: "Tasks and follow-ups with deadlines organized by meeting",
      content:
        "Action Items & Follow-ups organized by meeting sessions with assigned owners and deadlines. Session 1 (Network): Submit NCQA accreditation application (Due: July 25, Dr. Sarah Johnson), Implement 24-hour issue resolution policy (Due: July 22, Michael Chen), Research Medicaid expansion opportunities (Due: August 15, Lisa Rodriguez). Session 2 (Patient Management): Develop no-show intervention strategies (Due: July 30, James Wilson), Update scheduler role definitions (Due: August 5, Thomas Anderson), Enhance beacon patient protocols (Due: August 20, Dr. Emily Carter), Streamline intake processes (Due: September 1, David Kim). Revenue Cycle: Complete time audit for billing team (Due: July 28), Conduct error audit on claims (Due: August 2).",
    },
  ];

  // Main AI Features - 2 primary buttons
  const mainFeatures = [
    {
      id: "guide",
      name: "Guide Me",
      icon: Navigation,
      description: "Navigate to specific sections",
      color: "bg-cyan-500",
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      id: "followup",
      name: "AI Consultant",
      icon: Sparkles,
      description: "Professional AI consulting & insights",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  // Additional Features - Secondary options
  const additionalFeatures = [
    {
      id: "summary",
      name: "Smart Summary",
      icon: FileText,
      description: "Intelligent content summarization",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "keypoints",
      name: "Key Points",
      icon: Target,
      description: "Extract important insights",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  // Handle chat submission - Enhanced with Backend Gemini AI
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;

    const userMessage = chatInput.trim();
    setChatInput("");

    // Add user message to chat
    setChatHistory((prev) => [
      ...prev,
      {
        type: "user",
        content: userMessage,
        timestamp: Date.now(),
      },
    ]);

    setLoading(true);

    try {
      // If Gemini is configured, use it for all questions
      if (isGeminiConfigured && backendGeminiService.isReady()) {
        try {
          const response = await backendGeminiService.chat(
            userMessage,
            "general"
          );
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `## 🤖 AI Assistant Response

${response}

*Powered by Google Gemini AI via secure backend*`,
              timestamp: Date.now(),
            },
          ]);
        } catch (error) {
          console.error("Backend Gemini API Error:", error);
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `❌ **AI Service Temporarily Unavailable**

I encountered an issue connecting to the AI service. Please try again in a moment, or use the built-in features like "Guide Me" and "AI Consultant" buttons.

**Error:** ${error.message}`,
              timestamp: Date.now(),
            },
          ]);
        }
      } else {
        // Fallback to built-in responses when backend is not available
        if (
          userMessage.toLowerCase().includes("guide me") ||
          userMessage.toLowerCase().includes("navigate")
        ) {
          setAwaitingFeatureSelection(true);
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content:
                "I can help you navigate to any section. Please select which section you'd like to visit:",
              timestamp: Date.now(),
            },
          ]);
        } else if (
          userMessage.toLowerCase().includes("smart summary") ||
          userMessage.toLowerCase().includes("summary")
        ) {
          handleFeatureClick("summary");
        } else if (
          userMessage.toLowerCase().includes("key points") ||
          userMessage.toLowerCase().includes("key insights")
        ) {
          handleFeatureClick("keypoints");
        } else if (
          userMessage.toLowerCase().includes("consultant") ||
          userMessage.toLowerCase().includes("advice")
        ) {
          handleFeatureClick("followup");
        } else {
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `🤖 **I can help you with:**

• **Guide Me** - Navigate to any section
• **AI Consultant** - Get strategic insights about meetings
• **Smart Summary** & **Key Points** - Analyze meeting content

⚠️ **AI Service Status:** ${
                isGeminiConfigured ? "Connected" : "Connecting..."
              } - Full AI capabilities ${
                isGeminiConfigured ? "available" : "will be available shortly"
              }.`,
              timestamp: Date.now(),
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "I apologize, but I encountered an error processing your request. Please try again or use one of the quick action buttons below.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Generate creative follow-up questions
  const generateCreativeFollowUp = (context = "meetings") => {
    const questionSets = {
      meetings: [
        "What specific metrics would best measure the success of our NCQA accreditation efforts?",
        "How can we leverage our improved call abandonment rate to enhance patient satisfaction?",
        "What innovative strategies could we implement to reduce our 8.7% no-show rate even further?",
      ],
      presentations: [
        "Which presentation insights could be transformed into actionable quarterly goals?",
        "How might we visualize the revenue cycle improvements to better communicate success to stakeholders?",
        "What additional data points would strengthen our Monthly Business Review analysis?",
      ],
      actions: [
        "Which action items could benefit from cross-departmental collaboration?",
        "How can we create accountability systems that ensure timely completion of critical tasks?",
        "What potential roadblocks should we anticipate for our highest priority action items?",
      ],
      overview: [
        "What trends do you notice across our 4 meetings that might indicate broader organizational patterns?",
        "How could we better integrate insights from different meeting sessions for maximum impact?",
        "What would be the most strategic next steps based on our current meeting outcomes?",
      ],
    };

    const contextQuestions = questionSets[context] || questionSets.meetings;

    // Add some dynamic elements based on current data
    const dynamicQuestions = [
      `Given our ${
        context === "meetings" ? "19 total attendees" : "current progress"
      }, what engagement strategies could maximize participation?`,
      `How might we transform our ${
        context === "meetings" ? "key discussion points" : "main insights"
      } into measurable KPIs?`,
      `What creative approaches could we use to address the challenges identified in our ${context} analysis?`,
    ];

    // Combine and shuffle, then take maximum 3
    const allQuestions = [...contextQuestions, ...dynamicQuestions];
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  const generateSummary = (section) => {
    const content = section.content;
    const sentences = content
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 20);
    const keyInfo = sentences.slice(0, 3).join(". ") + ".";

    return `## 📝 Smart Summary: ${section.name}

### **Overview**
${keyInfo}

### **Key Information**
${section.description}

### **Main Topics**
${extractMainTopics(content)}

### **Quick Insights**
- **Section Focus:** ${section.name}
- **Content Type:** ${getContentType(content)}
- **Key Areas:** ${getKeyAreas(content)}

*Summary generated at ${new Date().toLocaleTimeString()}*`;
  };

  // Extract key points - Reliable implementation
  const extractKeyPoints = (section) => {
    const content = section.content;
    const keyPoints = [];

    // Extract bullet points and important statements
    const bulletPoints = content.match(/[•\-\*]\s*([^•\-\*\n]+)/g) || [];
    const importantSentences =
      content.match(
        /[A-Z][^.!?]*(?:important|key|critical|essential|main|primary)[^.!?]*[.!?]/gi
      ) || [];

    // Add bullet points
    bulletPoints.slice(0, 5).forEach((point, index) => {
      keyPoints.push(point.replace(/[•\-\*]\s*/, "").trim());
    });

    // Add important sentences
    importantSentences.slice(0, 3).forEach((sentence) => {
      keyPoints.push(sentence.trim());
    });

    // If no specific points found, extract from main content
    if (keyPoints.length === 0) {
      const sentences = content
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 30);
      sentences.slice(0, 5).forEach((sentence) => {
        keyPoints.push(sentence.trim());
      });
    }

    return `## 🎯 Key Points: ${section.name}

${keyPoints
  .slice(0, 6)
  .map((point, index) => `### ${index + 1}. ${point}`)
  .join("\n\n")}

### **Summary**
These key points represent the most important information from the ${
      section.name
    } section, focusing on actionable insights and critical details.

*Analysis completed at ${new Date().toLocaleTimeString()}*`;
  };

  // Helper functions
  const extractMainTopics = (content) => {
    const topics = [];
    if (content.includes("NCQA")) topics.push("NCQA Accreditation");
    if (content.includes("Medicaid")) topics.push("Medicaid Expansion");
    if (content.includes("patient")) topics.push("Patient Management");
    if (content.includes("revenue")) topics.push("Revenue Cycle");
    if (content.includes("business")) topics.push("Business Performance");
    if (content.includes("action")) topics.push("Action Items");

    return topics.length > 0 ? topics.join(", ") : "General meeting topics";
  };

  const getContentType = (content) => {
    if (content.includes("attendees")) return "Meeting Summary";
    if (content.includes("presentation")) return "Presentation Content";
    if (content.includes("action")) return "Action Items";
    return "General Information";
  };

  const getKeyAreas = (content) => {
    const areas = [];
    if (content.includes("strategic")) areas.push("Strategic Planning");
    if (content.includes("operational")) areas.push("Operations");
    if (content.includes("financial")) areas.push("Financial");
    if (content.includes("clinical")) areas.push("Clinical");

    return areas.length > 0 ? areas.join(", ") : "Multiple areas";
  };

  // Handle feature clicks - Enhanced with AI Consultant
  const handleFeatureClick = async (featureId) => {
    if (loading) return;

    setLoading(true);

    try {
      let response = "";
      const currentSection = sections[1]; // Default to meetings section

      switch (featureId) {
        case "summary":
          response = generateSummary(currentSection);
          break;
        case "keypoints":
          response = extractKeyPoints(currentSection);
          break;
        case "guide":
          setAwaitingFeatureSelection(true);
          response =
            "I can help you navigate to any section. Please select which section you'd like to visit:";
          break;
        case "followup":
          setIsGeneratingFollowUp(true);

          // Use Backend Gemini AI if configured, otherwise use built-in logic
          if (isGeminiConfigured && backendGeminiService.isReady()) {
            try {
              const questions =
                await backendGeminiService.generateFollowUpQuestions(
                  "meetings"
                );
              setFollowUpQuestions(questions);
              response = `## 🎯 AI Consultant - Strategic Insights (Powered by Gemini AI)

### **Professional Analysis & Recommendations**

Based on your meeting data and current business context, here are my AI-generated strategic recommendations and key questions to consider:

### **🔍 Strategic Questions for Consideration:**

${questions
  .map((question, index) => `**${index + 1}.** ${question}`)
  .join("\n\n")}

### **💡 Consultant Insights:**
- **Focus Area:** Meeting optimization and strategic planning
- **Key Opportunity:** Leverage your improved metrics for competitive advantage
- **Recommendation:** Consider implementing cross-functional KPIs based on these insights

### **📊 Next Steps:**
1. Prioritize which strategic question resonates most with your current goals
2. Develop action plans around the identified opportunities
3. Schedule follow-up sessions to track progress on recommendations

*Professional consultation powered by Google Gemini AI via secure backend at ${new Date().toLocaleTimeString()}*

**Would you like me to elaborate on any of these strategic points?**`;
            } catch (error) {
              console.error("Backend Gemini AI Error:", error);
              // Fallback to built-in logic
              const questions = generateCreativeFollowUp("meetings");
              setFollowUpQuestions(questions);
              response = `## 🎯 AI Consultant - Strategic Insights

### **Professional Analysis & Recommendations**

Based on your meeting data and current business context, here are my strategic recommendations and key questions to consider:

### **🔍 Strategic Questions for Consideration:**

${questions
  .map((question, index) => `**${index + 1}.** ${question}`)
  .join("\n\n")}

### **💡 Consultant Insights:**
- **Focus Area:** Meeting optimization and strategic planning
- **Key Opportunity:** Leverage your improved metrics for competitive advantage
- **Recommendation:** Consider implementing cross-functional KPIs based on these insights

### **📊 Next Steps:**
1. Prioritize which strategic question resonates most with your current goals
2. Develop action plans around the identified opportunities
3. Schedule follow-up sessions to track progress on recommendations

*Professional consultation provided at ${new Date().toLocaleTimeString()}*

⚠️ **AI Service Status:** ${
                isGeminiConfigured ? "Connected" : "Connecting..."
              } - Enhanced AI capabilities ${
                isGeminiConfigured ? "active" : "will be available shortly"
              }.

**Would you like me to elaborate on any of these strategic points?**`;
            }
          } else {
            // Built-in logic when backend is not available
            const questions = generateCreativeFollowUp("meetings");
            setFollowUpQuestions(questions);
            response = `## 🎯 AI Consultant - Strategic Insights

### **Professional Analysis & Recommendations**

Based on your meeting data and current business context, here are my strategic recommendations and key questions to consider:

### **🔍 Strategic Questions for Consideration:**

${questions
  .map((question, index) => `**${index + 1}.** ${question}`)
  .join("\n\n")}

### **💡 Consultant Insights:**
- **Focus Area:** Meeting optimization and strategic planning
- **Key Opportunity:** Leverage your improved metrics for competitive advantage
- **Recommendation:** Consider implementing cross-functional KPIs based on these insights

### **📊 Next Steps:**
1. Prioritize which strategic question resonates most with your current goals
2. Develop action plans around the identified opportunities
3. Schedule follow-up sessions to track progress on recommendations

*Professional consultation provided at ${new Date().toLocaleTimeString()}*

⚠️ **AI Service Status:** ${
              isGeminiConfigured ? "Connected" : "Connecting..."
            } - Enhanced AI capabilities ${
              isGeminiConfigured ? "active" : "will be available shortly"
            }.

**Would you like me to elaborate on any of these strategic points?**`;
          }
          setIsGeneratingFollowUp(false);
          break;
        default:
          response =
            "Feature not available. Please try Guide Me or AI Consultant.";
      }

      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          content: response,
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      console.error("Feature error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "I encountered an error processing this request. Please try again.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle section selection
  const handleSectionSelection = (sectionId) => {
    setAwaitingFeatureSelection(false);

    if (onGuideMe) {
      onGuideMe(sectionId);
    }

    setChatHistory((prev) => [
      ...prev,
      {
        type: "ai",
        content: `✅ Navigating to ${
          sections.find((s) => s.id === sectionId)?.name || "selected section"
        }. The page will scroll to show the requested section.`,
        timestamp: Date.now(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-2 left-2 right-2 sm:bottom-6 sm:right-6 sm:left-auto z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 w-full max-w-96 sm:w-auto"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className={`fixed bottom-2 left-2 right-2 sm:bottom-6 sm:right-6 sm:left-auto z-50 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 ${
              isMinimized
                ? "w-full max-w-96 sm:w-80 h-16"
                : "w-full max-w-96 sm:w-[420px] h-[700px] max-h-[800vh]"
            } transition-all duration-300 overflow-hidden flex flex-col`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-2 sm:p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">
                    AI Assistant
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100">
                    Smart Meeting Consultant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1.5 sm:p-2"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1.5 sm:p-2"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <div className="flex flex-col flex-1 min-h-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {chatHistory.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[90%] p-3 sm:p-4 rounded-2xl text-sm ${
                          msg.type === "user"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md shadow-lg"
                            : "bg-white text-gray-800 shadow-lg rounded-bl-md border-2 border-gray-100"
                        }`}
                      >
                        <div className="leading-relaxed prose prose-sm max-w-none">
                          {msg.type === "user" ? (
                            <div className="whitespace-pre-wrap text-white">
                              {msg.content}
                            </div>
                          ) : (
                            <div
                              className="markdown-content text-gray-800"
                              dangerouslySetInnerHTML={{
                                __html: parseMarkdown(msg.content),
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading indicator */}
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-lg border-2 border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Section selection buttons */}
                  {awaitingFeatureSelection && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-lg border-2 border-gray-100 max-w-[90%]">
                        <div className="grid grid-cols-2 gap-2">
                          {sections.map((section) => {
                            const IconComponent = section.icon;
                            return (
                              <Button
                                key={section.id}
                                onClick={() =>
                                  handleSectionSelection(section.id)
                                }
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 text-xs p-2 h-auto hover:bg-blue-50 hover:border-blue-300"
                              >
                                <IconComponent className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{section.name}</span>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Quick Actions */}
                {showQuickActions && (
                  <div className="p-2 sm:p-4 bg-gray-50 border-t">
                    {/* Gemini Status Indicator */}
                    {isGeminiConfigured && (
                      <div className="mb-3 p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 text-xs text-green-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-medium">
                            Gemini AI Connected - Enhanced capabilities active
                            via secure backend
                          </span>
                        </div>
                      </div>
                    )}

                    {!isGeminiConfigured && (
                      <div className="mb-3 p-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 text-xs text-yellow-700">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                          <span className="font-medium">
                            AI Service Connecting... Enhanced capabilities will
                            be available shortly
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3">
                      {mainFeatures.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                          <Button
                            key={feature.id}
                            onClick={() => handleFeatureClick(feature.id)}
                            disabled={loading}
                            variant="outline"
                            size="sm"
                            className={`flex items-center gap-1.5 text-xs p-1.5 sm:p-2 h-auto hover:bg-gradient-to-r ${feature.gradient} hover:text-white transition-all duration-200 truncate`}
                          >
                            <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{feature.name}</span>
                          </Button>
                        );
                      })}
                    </div>

                    {/* More Options Toggle */}
                    <div className="flex justify-center mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowAdditionalFeatures(!showAdditionalFeatures)
                        }
                        className="text-xs text-gray-600 hover:text-gray-800"
                      >
                        {showAdditionalFeatures
                          ? "Less Options"
                          : "More Options"}
                        <motion.div
                          animate={{ rotate: showAdditionalFeatures ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-1"
                        >
                          ▼
                        </motion.div>
                      </Button>
                    </div>

                    {/* Additional Features */}
                    <AnimatePresence>
                      {showAdditionalFeatures && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3"
                        >
                          {additionalFeatures.map((feature) => {
                            const IconComponent = feature.icon;
                            return (
                              <Button
                                key={feature.id}
                                onClick={() => handleFeatureClick(feature.id)}
                                disabled={loading}
                                variant="outline"
                                size="sm"
                                className={`flex items-center gap-1.5 text-xs p-1.5 sm:p-2 h-auto hover:bg-gradient-to-r ${feature.gradient} hover:text-white transition-all duration-200 truncate opacity-75 hover:opacity-100`}
                              >
                                <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                <span className="truncate">{feature.name}</span>
                              </Button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Input Form */}
                <form
                  onSubmit={handleChatSubmit}
                  className="p-2 sm:p-4 bg-white border-t"
                >
                  <div className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask me anything..."
                      disabled={loading}
                      className="flex-1 text-sm"
                    />
                    <Button
                      type="submit"
                      disabled={loading || !chatInput.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-3 sm:px-4"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
