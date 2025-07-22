// Backend-based Gemini service that uses Flask proxy
class BackendGeminiService {
  constructor() {
    this.baseURL = "https://gemini-proxy-backend.vercel.app/api/gemini";
    this.isConfigured = false;
    this.checkStatus();
  }

  async checkStatus() {
    try {
      const response = await fetch(`${this.baseURL}/status`);
      const data = await response.json();
      this.isConfigured = data.configured && data.ready;
      return this.isConfigured;
    } catch (error) {
      console.error("Error checking Gemini status:", error);
      this.isConfigured = false;
      return false;
    }
  }

  isReady() {
    return this.isConfigured;
  }

  async generateConsultation(question, context = "meetings") {
    try {
      const response = await fetch(`${this.baseURL}/consultation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          context: context,
        }),
      });

      const data = await response.json();

      if (data.success) {
        return data.consultation;
      } else {
        throw new Error(data.error || "Failed to generate consultation");
      }
    } catch (error) {
      console.error("Error generating consultation:", error);
      throw error;
    }
  }

  async generateFollowUpQuestions(context = "meetings") {
    try {
      const response = await fetch(`${this.baseURL}/follow-up-questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: context,
        }),
      });

      const data = await response.json();

      if (data.success) {
        return data.questions;
      } else {
        throw new Error(data.error || "Failed to generate follow-up questions");
      }
    } catch (error) {
      console.error("Error generating follow-up questions:", error);
      throw error;
    }
  }

  async chat(message, context = "general") {
    try {
      const response = await fetch(`${this.baseURL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          context: context,
        }),
      });

      const data = await response.json();

      if (data.success) {
        return data.response;
      } else {
        throw new Error(data.error || "Failed to get chat response");
      }
    } catch (error) {
      console.error("Error in chat:", error);
      throw error;
    }
  }

  // Legacy methods for compatibility
  configure(apiKey) {
    // This method is not needed for backend service
    // but kept for compatibility
    return this.isConfigured;
  }
}

// Create and export a singleton instance
const backendGeminiService = new BackendGeminiService();
export default backendGeminiService;
