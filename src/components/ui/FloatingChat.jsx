import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  MessageCircle,
  X,
  Send,
  Minimize2,
  Maximize2,
  Loader2,
  Sparkles,
  FileText,
  TrendingUp,
  Target,
  Clock,
  Lightbulb,
  Search,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import aiService from "../utils/aiService.js";

const FloatingChat = ({ meetingData, onGuideMe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      content:
        "Hello! I'm your AI assistant. I can help you with:\n• Smart Summary\n• Sentiment Analysis\n• Key Points\n• Action Items\n• Smart Insights\n• Guide Me to sections\n\nWhat would you like to do?",
      timestamp: Date.now(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [awaitingFeatureSelection, setAwaitingFeatureSelection] =
    useState(null);
  const chatEndRef = useRef(null);

  const sections = [
    {
      id: "overview",
      name: "Overview",
      content: "Overview section with meeting statistics and quick summary.",
    },
    {
      id: "meeting1",
      name: "Meeting 1",
      content: meetingData?.content || "Meeting 1 content.",
    },
    {
      id: "meeting2",
      name: "Meeting 2",
      content: "Meeting 2 content about patient management.",
    },
    {
      id: "presentations",
      name: "Presentations",
      content: "Presentations section with various dashboards and reports.",
    },
    {
      id: "actions",
      name: "Action Items",
      content: "Action Items section with tasks and deadlines.",
    },
  ];

  const aiFeatures = [
    {
      id: "summary",
      name: "Smart Summary",
      icon: FileText,
      description: "Get an AI-powered summary",
    },
    {
      id: "sentiment",
      name: "Sentiment Analysis",
      icon: TrendingUp,
      description: "Analyze the mood and tone",
    },
    {
      id: "keypoints",
      name: "Key Points",
      icon: Target,
      description: "Extract important discussion points",
    },
    {
      id: "actions",
      name: "Action Items",
      icon: Clock,
      description: "Identify tasks and deadlines",
    },
    {
      id: "insights",
      name: "Smart Insights",
      icon: Lightbulb,
      description: "Generate actionable insights",
    },
    {
      id: "search",
      name: "Smart Search",
      icon: Search,
      description: "Search meeting content",
    },
    {
      id: "guide",
      name: "Guide Me",
      icon: Navigation,
      description: "Navigate to specific sections",
    },
  ];

  // Scroll to bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Process AI feature
  const processFeature = async (featureId, sectionId) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    setLoading(true);
    try {
      let result;

      switch (featureId) {
        case "summary":
          result = await aiService.summarizeText(section.content);
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `📝 **Summary for ${section.name}:**\n\n${result}`,
              timestamp: Date.now(),
            },
          ]);
          break;

        case "sentiment":
          result = await aiService.analyzeSentiment(section.content);
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `😊 **Sentiment Analysis for ${
                section.name
              }:**\n\nSentiment: ${result.label}\nConfidence: ${Math.round(
                result.score * 100
              )}%\n\n${
                result.label === "POSITIVE"
                  ? "The content has a positive tone with constructive discussions."
                  : result.label === "NEGATIVE"
                  ? "The content shows some concerns that may need attention."
                  : "The content maintains a neutral, professional tone."
              }`,
              timestamp: Date.now(),
            },
          ]);
          break;

        case "keypoints":
          result = await aiService.extractKeyPoints(section.content);
          const keyPointsText =
            result.length > 0
              ? result
                  .map((point, index) => `${index + 1}. ${point}`)
                  .join("\n")
              : "No key points identified.";
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `🎯 **Key Points for ${section.name}:**\n\n${keyPointsText}`,
              timestamp: Date.now(),
            },
          ]);
          break;

        case "actions":
          result = await aiService.extractActionItems(section.content);
          const actionsText =
            result.length > 0
              ? result
                  .map(
                    (action, index) =>
                      `${index + 1}. ${action.text}\n   👤 ${
                        action.assignee
                      } | 📅 ${action.deadline} | 🔥 ${action.priority}`
                  )
                  .join("\n\n")
              : "No action items identified.";
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `⏰ **Action Items for ${section.name}:**\n\n${actionsText}`,
              timestamp: Date.now(),
            },
          ]);
          break;

        case "insights":
          result = await aiService.generateInsights({
            content: section.content,
          });
          const insightsText =
            result.length > 0
              ? result
                  .map(
                    (insight, index) =>
                      `${index + 1}. **${insight.title}**\n   ${
                        insight.description
                      }`
                  )
                  .join("\n\n")
              : "No insights generated.";
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `💡 **Smart Insights for ${section.name}:**\n\n${insightsText}`,
              timestamp: Date.now(),
            },
          ]);
          break;

        case "guide":
          onGuideMe(sectionId);
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `🧭 **Guiding you to ${section.name}**\n\nI've scrolled the page to show you the ${section.name} section. You should now see it highlighted on the main page.`,
              timestamp: Date.now(),
            },
          ]);
          break;

        default:
          setChatHistory((prev) => [
            ...prev,
            {
              type: "ai",
              content: `Sorry, I don't know how to process "${featureId}" yet.`,
              timestamp: Date.now(),
            },
          ]);
      }
    } catch (error) {
      console.error(`Error processing ${featureId}:`, error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          content: `❌ **Error:** Sorry, I encountered an error while processing your request: ${error.message}`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
      setAwaitingFeatureSelection(null);
      setSelectedSection(null);
    }
  };

  // Handle chat input
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;

    const userMessage = chatInput.trim();
    setChatHistory((prev) => [
      ...prev,
      { type: "user", content: userMessage, timestamp: Date.now() },
    ]);
    setChatInput("");
    setLoading(true);

    // Simple AI response logic
    let aiResponse = "";
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      aiResponse =
        "Hello! 👋 How can I help you today? I can provide summaries, analyze sentiment, extract key points, identify action items, generate insights, or guide you to specific sections.";
    } else if (
      lowerMessage.includes("summary") ||
      lowerMessage.includes("summarize")
    ) {
      aiResponse =
        "I can create a summary for you! Which section would you like me to summarize?";
      setAwaitingFeatureSelection("summary");
    } else if (
      lowerMessage.includes("sentiment") ||
      lowerMessage.includes("mood") ||
      lowerMessage.includes("tone")
    ) {
      aiResponse =
        "I can analyze the sentiment and tone! Which section would you like me to analyze?";
      setAwaitingFeatureSelection("sentiment");
    } else if (
      lowerMessage.includes("key points") ||
      lowerMessage.includes("important") ||
      lowerMessage.includes("highlights")
    ) {
      aiResponse =
        "I can extract key points for you! Which section would you like me to analyze?";
      setAwaitingFeatureSelection("keypoints");
    } else if (
      lowerMessage.includes("action") ||
      lowerMessage.includes("task") ||
      lowerMessage.includes("todo")
    ) {
      aiResponse =
        "I can identify action items and tasks! Which section would you like me to analyze?";
      setAwaitingFeatureSelection("actions");
    } else if (
      lowerMessage.includes("insight") ||
      lowerMessage.includes("analysis") ||
      lowerMessage.includes("recommendation")
    ) {
      aiResponse =
        "I can generate smart insights! Which section would you like me to analyze?";
      setAwaitingFeatureSelection("insights");
    } else if (
      lowerMessage.includes("guide") ||
      lowerMessage.includes("navigate") ||
      lowerMessage.includes("show") ||
      lowerMessage.includes("go to")
    ) {
      aiResponse =
        "I can guide you to any section! Which section would you like to visit?";
      setAwaitingFeatureSelection("guide");
    } else if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("what can you do")
    ) {
      aiResponse =
        "I can help you with:\n\n📝 **Smart Summary** - Get AI-powered summaries\n😊 **Sentiment Analysis** - Analyze mood and tone\n🎯 **Key Points** - Extract important points\n⏰ **Action Items** - Identify tasks and deadlines\n💡 **Smart Insights** - Generate actionable insights\n🧭 **Guide Me** - Navigate to specific sections\n\nJust ask me about any of these features!";
    } else {
      aiResponse =
        'I\'m not sure I understand. Could you try asking about:\n• Summary\n• Sentiment analysis\n• Key points\n• Action items\n• Insights\n• Guide me to a section\n\nOr just say "help" to see all my features!';
    }

    setChatHistory((prev) => [
      ...prev,
      { type: "ai", content: aiResponse, timestamp: Date.now() },
    ]);
    setLoading(false);
  };

  // Handle section selection
  const handleSectionSelection = (sectionId) => {
    if (awaitingFeatureSelection) {
      processFeature(awaitingFeatureSelection, sectionId);
    }
  };

  // Handle feature button click
  const handleFeatureClick = (featureId) => {
    if (featureId === "guide") {
      setAwaitingFeatureSelection("guide");
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          content: "🧭 Which section would you like me to guide you to?",
          timestamp: Date.now(),
        },
      ]);
    } else {
      setAwaitingFeatureSelection(featureId);
      const feature = aiFeatures.find((f) => f.id === featureId);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          content: `${
            feature?.description || "Processing"
          } - Which section would you like me to analyze?`,
          timestamp: Date.now(),
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Bot className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border ${
              isMinimized ? "w-80 h-16" : "w-80 sm:w-96 h-96 sm:h-[500px]"
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">AI Assistant</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-1 h-auto"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-1 h-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <div className="flex flex-col h-full">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-lg text-sm ${
                          msg.type === "user"
                            ? "bg-blue-500 text-white rounded-br-sm"
                            : "bg-white text-gray-800 shadow-sm rounded-bl-sm border"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        <div
                          className={`text-xs mt-1 ${
                            msg.type === "user"
                              ? "text-blue-100"
                              : "text-gray-400"
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 shadow-sm rounded-lg rounded-bl-sm border p-3 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  )}

                  {/* Section Selection Buttons */}
                  {awaitingFeatureSelection && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 shadow-sm rounded-lg border p-3 max-w-[85%]">
                        <div className="text-sm mb-2">Choose a section:</div>
                        <div className="flex flex-wrap gap-1">
                          {sections.map((section) => (
                            <Button
                              key={section.id}
                              onClick={() => handleSectionSelection(section.id)}
                              size="sm"
                              variant="outline"
                              className="text-xs h-7"
                            >
                              {section.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Quick Action Buttons */}
                <div className="p-2 bg-white border-t">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {aiFeatures.slice(0, 4).map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <Button
                          key={feature.id}
                          onClick={() => handleFeatureClick(feature.id)}
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 flex items-center gap-1"
                          disabled={loading}
                        >
                          <Icon className="h-3 w-3" />
                          {feature.name.split(" ")[0]}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Input */}
                <form
                  onSubmit={handleChatSubmit}
                  className="p-3 bg-white border-t"
                >
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 text-sm"
                      disabled={loading}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={loading || !chatInput.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
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

export default FloatingChat;
