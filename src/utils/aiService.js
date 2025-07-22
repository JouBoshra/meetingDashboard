// Enhanced AI Service for Meeting Dashboard
// Advanced AI capabilities with creative and detailed analysis

class EnhancedAIService {
  constructor() {
    // Enhanced cache system with categorization
    this.cache = new Map();
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
    this.analysisHistory = new Map();

    // Advanced analysis patterns
    this.patterns = {
      urgency: [
        "urgent",
        "asap",
        "immediately",
        "critical",
        "emergency",
        "priority",
      ],
      positive: [
        "success",
        "achievement",
        "excellent",
        "great",
        "improvement",
        "progress",
        "effective",
      ],
      negative: [
        "problem",
        "issue",
        "concern",
        "delay",
        "challenge",
        "risk",
        "failure",
      ],
      action: [
        "will",
        "should",
        "must",
        "need to",
        "responsible",
        "assign",
        "complete",
        "deliver",
      ],
      decision: [
        "decided",
        "agreed",
        "approved",
        "confirmed",
        "resolved",
        "concluded",
      ],
      future: [
        "plan",
        "next",
        "upcoming",
        "future",
        "schedule",
        "timeline",
        "roadmap",
      ],
    };

    // Enhanced keyword categories
    this.domainKeywords = {
      healthcare: [
        "patient",
        "medical",
        "treatment",
        "diagnosis",
        "therapy",
        "clinical",
      ],
      business: [
        "revenue",
        "profit",
        "market",
        "customer",
        "sales",
        "strategy",
      ],
      technology: [
        "system",
        "software",
        "platform",
        "integration",
        "automation",
        "digital",
      ],
      management: [
        "team",
        "leadership",
        "process",
        "workflow",
        "efficiency",
        "performance",
      ],
    };
  }

  // Enhanced caching with metadata
  getCachedResult(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      cached.accessCount = (cached.accessCount || 0) + 1;
      cached.lastAccessed = Date.now();
      return cached.data;
    }
    return null;
  }

  setCachedResult(key, data, metadata = {}) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      metadata,
      accessCount: 1,
      lastAccessed: Date.now(),
    });
  }

  // Advanced text analysis
  analyzeTextComplexity(text) {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const words = text.split(/\s+/).filter((w) => w.length > 0);
    const avgWordsPerSentence = words.length / sentences.length;
    const longWords = words.filter((w) => w.length > 6).length;

    return {
      sentences: sentences.length,
      words: words.length,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      complexity:
        longWords / words.length > 0.3
          ? "high"
          : longWords / words.length > 0.15
          ? "medium"
          : "low",
      readabilityScore: Math.max(
        0,
        Math.min(
          100,
          100 - avgWordsPerSentence * 2 - (longWords / words.length) * 50
        )
      ),
    };
  }

  // Enhanced summarization with context awareness
  async summarizeText(text, options = {}) {
    const cacheKey = this.generateCacheKey(text, "enhanced_summary");
    const cached = this.getCachedResult(cacheKey);
    if (cached) return cached;

    try {
      const complexity = this.analyzeTextComplexity(text);
      const domain = this.detectDomain(text);
      const keyThemes = this.extractThemes(text);

      // Multi-layered summarization approach
      const extractiveSummary = this.advancedExtractiveSummary(text);
      const structuredSummary = this.createStructuredSummary(text, keyThemes);

      const enhancedSummary = {
        main: extractiveSummary,
        structured: structuredSummary,
        metadata: {
          complexity,
          domain,
          themes: keyThemes,
          confidence: this.calculateConfidence(text, extractiveSummary),
        },
      };

      this.setCachedResult(cacheKey, enhancedSummary, {
        type: "summary",
        domain,
      });
      return enhancedSummary.main;
    } catch (error) {
      console.error("Enhanced summarization error:", error);
      return this.fallbackSummary(text);
    }
  }

  // Advanced extractive summary with scoring
  advancedExtractiveSummary(text) {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);
    const wordFreq = this.calculateWordFrequency(text);

    const scoredSentences = sentences.map((sentence) => {
      let score = 0;
      const words = sentence.toLowerCase().split(/\W+/);

      // Frequency-based scoring
      words.forEach((word) => {
        if (wordFreq[word] && word.length > 3) {
          score += wordFreq[word];
        }
      });

      // Position scoring (first and last sentences are important)
      const position = sentences.indexOf(sentence);
      if (position === 0 || position === sentences.length - 1) {
        score *= 1.5;
      }

      // Pattern-based scoring
      Object.entries(this.patterns).forEach(([category, patterns]) => {
        patterns.forEach((pattern) => {
          if (sentence.toLowerCase().includes(pattern)) {
            score += category === "decision" || category === "action" ? 3 : 2;
          }
        });
      });

      return { sentence: sentence.trim(), score };
    });

    // Select top sentences
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.min(3, Math.ceil(sentences.length * 0.3)))
      .sort(
        (a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence)
      );

    return topSentences.map((s) => s.sentence).join(" ");
  }

  // Calculate word frequency for scoring
  calculateWordFrequency(text) {
    const words = text
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 3);
    const freq = {};
    words.forEach((word) => {
      freq[word] = (freq[word] || 0) + 1;
    });
    return freq;
  }

  // Detect domain/context of the text
  detectDomain(text) {
    const textLower = text.toLowerCase();
    let maxScore = 0;
    let detectedDomain = "general";

    Object.entries(this.domainKeywords).forEach(([domain, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (textLower.split(keyword).length - 1);
      }, 0);

      if (score > maxScore) {
        maxScore = score;
        detectedDomain = domain;
      }
    });

    return detectedDomain;
  }

  // Extract key themes from text
  extractThemes(text) {
    const themes = [];
    const textLower = text.toLowerCase();

    // Pattern-based theme detection
    Object.entries(this.patterns).forEach(([theme, patterns]) => {
      const matches = patterns.filter((pattern) => textLower.includes(pattern));
      if (matches.length > 0) {
        themes.push({
          theme,
          strength: matches.length,
          keywords: matches,
        });
      }
    });

    return themes.sort((a, b) => b.strength - a.strength);
  }

  // Create structured summary with sections
  createStructuredSummary(text, themes) {
    const structure = {
      overview: "",
      keyPoints: [],
      decisions: [],
      actions: [],
      concerns: [],
    };

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);

    sentences.forEach((sentence) => {
      const sentenceLower = sentence.toLowerCase();

      if (this.patterns.decision.some((p) => sentenceLower.includes(p))) {
        structure.decisions.push(sentence.trim());
      } else if (this.patterns.action.some((p) => sentenceLower.includes(p))) {
        structure.actions.push(sentence.trim());
      } else if (
        this.patterns.negative.some((p) => sentenceLower.includes(p))
      ) {
        structure.concerns.push(sentence.trim());
      } else if (this.patterns.urgency.some((p) => sentenceLower.includes(p))) {
        structure.keyPoints.push(sentence.trim());
      }
    });

    return structure;
  }

  // Enhanced sentiment analysis with emotional intelligence
  async analyzeSentiment(text) {
    const cacheKey = this.generateCacheKey(text, "enhanced_sentiment");
    const cached = this.getCachedResult(cacheKey);
    if (cached) return cached;

    try {
      const emotionalAnalysis = this.analyzeEmotions(text);
      const toneAnalysis = this.analyzeTone(text);
      const contextualSentiment = this.analyzeContextualSentiment(text);

      const enhancedSentiment = {
        overall: contextualSentiment.label,
        confidence: contextualSentiment.score,
        emotions: emotionalAnalysis,
        tone: toneAnalysis,
        nuances: this.detectSentimentNuances(text),
        recommendations: this.generateSentimentRecommendations(
          contextualSentiment,
          emotionalAnalysis
        ),
      };

      this.setCachedResult(cacheKey, enhancedSentiment, { type: "sentiment" });
      return enhancedSentiment;
    } catch (error) {
      console.error("Enhanced sentiment analysis error:", error);
      return this.fallbackSentimentAnalysis(text);
    }
  }

  // Analyze emotional content
  analyzeEmotions(text) {
    const emotions = {
      joy: [
        "happy",
        "excited",
        "pleased",
        "satisfied",
        "delighted",
        "thrilled",
      ],
      trust: ["confident", "reliable", "secure", "stable", "dependable"],
      fear: ["worried", "concerned", "anxious", "uncertain", "risky"],
      surprise: ["unexpected", "sudden", "amazing", "shocking", "remarkable"],
      sadness: ["disappointed", "frustrated", "upset", "discouraged"],
      disgust: ["unacceptable", "terrible", "awful", "horrible"],
      anger: ["angry", "furious", "outraged", "irritated", "annoyed"],
      anticipation: ["excited", "eager", "looking forward", "expecting"],
    };

    const textLower = text.toLowerCase();
    const emotionScores = {};

    Object.entries(emotions).forEach(([emotion, words]) => {
      const score = words.reduce((acc, word) => {
        return acc + (textLower.split(word).length - 1);
      }, 0);
      emotionScores[emotion] = score;
    });

    const totalEmotions = Object.values(emotionScores).reduce(
      (a, b) => a + b,
      0
    );
    const normalizedEmotions = {};

    Object.entries(emotionScores).forEach(([emotion, score]) => {
      normalizedEmotions[emotion] =
        totalEmotions > 0 ? score / totalEmotions : 0;
    });

    return normalizedEmotions;
  }

  // Analyze tone of communication
  analyzeTone(text) {
    const toneIndicators = {
      formal: [
        "therefore",
        "furthermore",
        "consequently",
        "accordingly",
        "respectively",
      ],
      informal: ["yeah", "okay", "sure", "basically", "actually"],
      assertive: ["must", "should", "will", "definitely", "certainly"],
      tentative: ["maybe", "perhaps", "possibly", "might", "could"],
      urgent: ["immediately", "asap", "urgent", "critical", "emergency"],
      collaborative: [
        "together",
        "team",
        "cooperation",
        "partnership",
        "jointly",
      ],
    };

    const textLower = text.toLowerCase();
    const toneScores = {};

    Object.entries(toneIndicators).forEach(([tone, indicators]) => {
      const score = indicators.reduce((acc, indicator) => {
        return acc + (textLower.split(indicator).length - 1);
      }, 0);
      toneScores[tone] = score;
    });

    const dominantTone = Object.entries(toneScores).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      dominant: dominantTone ? dominantTone[0] : "neutral",
      scores: toneScores,
      confidence: dominantTone ? dominantTone[1] / text.split(" ").length : 0,
    };
  }

  // Contextual sentiment analysis
  analyzeContextualSentiment(text) {
    const positivePatterns = this.patterns.positive;
    const negativePatterns = this.patterns.negative;

    const textLower = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;

    positivePatterns.forEach((pattern) => {
      positiveScore += (textLower.split(pattern).length - 1) * 2;
    });

    negativePatterns.forEach((pattern) => {
      negativeScore += (textLower.split(pattern).length - 1) * 2;
    });

    // Context modifiers
    const intensifiers = ["very", "extremely", "highly", "significantly"];
    const diminishers = ["slightly", "somewhat", "relatively", "fairly"];

    intensifiers.forEach((intensifier) => {
      if (textLower.includes(intensifier)) {
        positiveScore *= 1.5;
        negativeScore *= 1.5;
      }
    });

    diminishers.forEach((diminisher) => {
      if (textLower.includes(diminisher)) {
        positiveScore *= 0.7;
        negativeScore *= 0.7;
      }
    });

    const totalScore = positiveScore + negativeScore;
    const netSentiment = positiveScore - negativeScore;

    if (Math.abs(netSentiment) < 1) {
      return { label: "NEUTRAL", score: 0.5 };
    } else if (netSentiment > 0) {
      return {
        label: "POSITIVE",
        score: Math.min(0.95, 0.5 + (netSentiment / (totalScore || 1)) * 0.45),
      };
    } else {
      return {
        label: "NEGATIVE",
        score: Math.max(0.05, 0.5 + (netSentiment / (totalScore || 1)) * 0.45),
      };
    }
  }

  // Detect sentiment nuances
  detectSentimentNuances(text) {
    const nuances = [];
    const textLower = text.toLowerCase();

    if (textLower.includes("but") || textLower.includes("however")) {
      nuances.push("mixed_feelings");
    }

    if (textLower.includes("hope") || textLower.includes("optimistic")) {
      nuances.push("hopeful");
    }

    if (textLower.includes("concern") || textLower.includes("worry")) {
      nuances.push("cautious");
    }

    if (textLower.includes("excited") || textLower.includes("enthusiastic")) {
      nuances.push("enthusiastic");
    }

    return nuances;
  }

  // Generate sentiment-based recommendations
  generateSentimentRecommendations(sentiment, emotions) {
    const recommendations = [];

    if (sentiment.label === "NEGATIVE") {
      recommendations.push(
        "Consider addressing concerns raised in the discussion"
      );
      recommendations.push("Follow up with team members to resolve issues");
    } else if (sentiment.label === "POSITIVE") {
      recommendations.push(
        "Leverage the positive momentum for future initiatives"
      );
      recommendations.push("Document successful practices for replication");
    }

    if (emotions.fear > 0.3) {
      recommendations.push(
        "Provide additional clarity and reassurance to the team"
      );
    }

    if (emotions.anger > 0.2) {
      recommendations.push(
        "Schedule one-on-one meetings to address frustrations"
      );
    }

    return recommendations;
  }

  // Enhanced key points extraction with categorization
  async extractKeyPoints(text) {
    const cacheKey = this.generateCacheKey(text, "enhanced_keypoints");
    const cached = this.getCachedResult(cacheKey);
    if (cached) return cached;

    try {
      const sentences = text
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 10);
      const categorizedPoints = {
        strategic: [],
        operational: [],
        financial: [],
        technical: [],
        general: [],
      };

      sentences.forEach((sentence) => {
        const category = this.categorizeKeyPoint(sentence);
        const importance = this.calculateImportanceScore(sentence);

        if (importance > 2) {
          categorizedPoints[category].push({
            text: sentence.trim(),
            importance,
            category,
            keywords: this.extractKeywords(sentence),
          });
        }
      });

      // Flatten and sort by importance
      const allPoints = Object.values(categorizedPoints)
        .flat()
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 8)
        .map((point) => point.text);

      this.setCachedResult(cacheKey, allPoints, { type: "keypoints" });
      return allPoints;
    } catch (error) {
      console.error("Enhanced key points extraction error:", error);
      return this.fallbackKeyPoints(text);
    }
  }

  // Categorize key points
  categorizeKeyPoint(sentence) {
    const sentenceLower = sentence.toLowerCase();

    const categories = {
      strategic: [
        "strategy",
        "vision",
        "goal",
        "objective",
        "plan",
        "direction",
      ],
      operational: [
        "process",
        "workflow",
        "procedure",
        "operation",
        "execution",
      ],
      financial: ["budget", "cost", "revenue", "profit", "financial", "money"],
      technical: ["system", "technology", "software", "platform", "technical"],
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword) => sentenceLower.includes(keyword))) {
        return category;
      }
    }

    return "general";
  }

  // Calculate importance score for sentences
  calculateImportanceScore(sentence) {
    let score = 0;
    const sentenceLower = sentence.toLowerCase();

    // Pattern-based scoring
    Object.entries(this.patterns).forEach(([category, patterns]) => {
      patterns.forEach((pattern) => {
        if (sentenceLower.includes(pattern)) {
          score +=
            category === "decision"
              ? 5
              : category === "action"
              ? 4
              : category === "urgency"
              ? 3
              : 2;
        }
      });
    });

    // Length and structure scoring
    const words = sentence.split(" ").length;
    if (words >= 8 && words <= 25) score += 2;
    if (sentence.includes(":") || sentence.includes("-")) score += 1;

    return score;
  }

  // Extract keywords from sentence
  extractKeywords(sentence) {
    const words = sentence
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 3);
    const stopWords = [
      "that",
      "this",
      "with",
      "from",
      "they",
      "have",
      "will",
      "been",
      "were",
    ];
    return words.filter((word) => !stopWords.includes(word)).slice(0, 3);
  }

  // Enhanced action items extraction with smart categorization
  async extractActionItems(text) {
    const cacheKey = this.generateCacheKey(text, "enhanced_actions");
    const cached = this.getCachedResult(cacheKey);
    if (cached) return cached;

    try {
      const sentences = text
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 10);
      const actionItems = [];

      sentences.forEach((sentence) => {
        if (this.isActionItem(sentence)) {
          const actionItem = {
            text: sentence.trim(),
            priority: this.determinePriorityAdvanced(sentence),
            assignee: this.extractAssigneeAdvanced(sentence),
            deadline: this.extractDeadlineAdvanced(sentence),
            category: this.categorizeAction(sentence),
            complexity: this.estimateComplexity(sentence),
            dependencies: this.identifyDependencies(sentence, sentences),
          };
          actionItems.push(actionItem);
        }
      });

      // Sort by priority and complexity
      const sortedActions = actionItems
        .sort((a, b) => {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        })
        .slice(0, 10);

      this.setCachedResult(cacheKey, sortedActions, { type: "actions" });
      return sortedActions;
    } catch (error) {
      console.error("Enhanced action items extraction error:", error);
      return this.fallbackActionItems(text);
    }
  }

  // Check if sentence is an action item
  isActionItem(sentence) {
    const actionIndicators = [
      ...this.patterns.action,
      "assign",
      "delegate",
      "schedule",
      "plan",
      "organize",
      "coordinate",
      "follow up",
      "check",
      "review",
      "update",
      "prepare",
      "create",
    ];

    const sentenceLower = sentence.toLowerCase();
    return actionIndicators.some((indicator) =>
      sentenceLower.includes(indicator)
    );
  }

  // Advanced priority determination
  determinePriorityAdvanced(sentence) {
    const sentenceLower = sentence.toLowerCase();
    let priorityScore = 0;

    // Urgency indicators
    this.patterns.urgency.forEach((word) => {
      if (sentenceLower.includes(word)) priorityScore += 3;
    });

    // Time indicators
    const timeIndicators = [
      "today",
      "tomorrow",
      "this week",
      "next week",
      "end of month",
    ];
    timeIndicators.forEach((indicator) => {
      if (sentenceLower.includes(indicator)) {
        priorityScore +=
          indicator.includes("today") || indicator.includes("tomorrow") ? 3 : 2;
      }
    });

    // Impact indicators
    const impactWords = ["critical", "important", "essential", "key", "major"];
    impactWords.forEach((word) => {
      if (sentenceLower.includes(word)) priorityScore += 2;
    });

    if (priorityScore >= 5) return "High";
    if (priorityScore >= 2) return "Medium";
    return "Low";
  }

  // Advanced assignee extraction
  extractAssigneeAdvanced(sentence) {
    // Look for name patterns
    const namePattern = /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g;
    const names = sentence.match(namePattern);

    if (names && names.length > 0) {
      return names[0];
    }

    // Look for role-based assignments
    const rolePattern =
      /\b(team|manager|lead|coordinator|analyst|developer)\b/gi;
    const roles = sentence.match(rolePattern);

    if (roles && roles.length > 0) {
      return roles[0];
    }

    return "To be assigned";
  }

  // Advanced deadline extraction
  extractDeadlineAdvanced(sentence) {
    const datePatterns = [
      /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g,
      /\b\d{1,2}-\d{1,2}-\d{4}\b/g,
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi,
      /\b(today|tomorrow|next week|this week|end of week|end of month)\b/gi,
      /\bby\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi,
    ];

    for (const pattern of datePatterns) {
      const match = sentence.match(pattern);
      if (match) {
        return match[0];
      }
    }

    // Look for relative time expressions
    const relativeTime = /\bin\s+(\d+)\s+(days?|weeks?|months?)\b/gi;
    const relativeMatch = sentence.match(relativeTime);
    if (relativeMatch) {
      return relativeMatch[0];
    }

    return "No deadline specified";
  }

  // Categorize actions
  categorizeAction(sentence) {
    const sentenceLower = sentence.toLowerCase();

    const actionCategories = {
      communication: [
        "email",
        "call",
        "meeting",
        "discuss",
        "inform",
        "notify",
      ],
      documentation: ["document", "write", "record", "report", "update"],
      analysis: ["analyze", "review", "evaluate", "assess", "study"],
      development: ["develop", "create", "build", "implement", "design"],
      coordination: ["coordinate", "organize", "schedule", "arrange", "plan"],
    };

    for (const [category, keywords] of Object.entries(actionCategories)) {
      if (keywords.some((keyword) => sentenceLower.includes(keyword))) {
        return category;
      }
    }

    return "general";
  }

  // Estimate action complexity
  estimateComplexity(sentence) {
    const complexityIndicators = {
      high: ["develop", "implement", "design", "create", "build", "establish"],
      medium: ["coordinate", "organize", "analyze", "review", "prepare"],
      low: ["email", "call", "inform", "update", "check"],
    };

    const sentenceLower = sentence.toLowerCase();

    for (const [level, indicators] of Object.entries(complexityIndicators)) {
      if (indicators.some((indicator) => sentenceLower.includes(indicator))) {
        return level;
      }
    }

    return "medium";
  }

  // Identify dependencies between actions
  identifyDependencies(sentence, allSentences) {
    const dependencies = [];
    const sentenceLower = sentence.toLowerCase();

    // Look for dependency keywords
    const dependencyKeywords = [
      "after",
      "before",
      "once",
      "when",
      "following",
      "depends on",
    ];

    dependencyKeywords.forEach((keyword) => {
      if (sentenceLower.includes(keyword)) {
        // Find related sentences
        const relatedSentences = allSentences.filter(
          (s) => s !== sentence && s.toLowerCase().includes(keyword)
        );
        dependencies.push(...relatedSentences.slice(0, 2));
      }
    });

    return dependencies;
  }

  // Generate comprehensive insights with predictive analysis
  async generateInsights(meetingData) {
    try {
      const insights = [];
      const content = meetingData.content || "";

      // Trend analysis
      const trends = this.analyzeTrends(content);
      if (trends.length > 0) {
        insights.push({
          type: "trends",
          title: "Emerging Trends",
          description: `Identified ${trends.length} key trends: ${trends
            .slice(0, 3)
            .join(", ")}`,
          actionable: true,
          priority: "medium",
        });
      }

      // Risk assessment
      const risks = this.assessRisks(content);
      if (risks.length > 0) {
        insights.push({
          type: "risks",
          title: "Risk Assessment",
          description: `${
            risks.length
          } potential risks identified. Primary concerns: ${risks
            .slice(0, 2)
            .join(", ")}`,
          actionable: true,
          priority: "high",
        });
      }

      // Opportunity identification
      const opportunities = this.identifyOpportunities(content);
      if (opportunities.length > 0) {
        insights.push({
          type: "opportunities",
          title: "Strategic Opportunities",
          description: `${
            opportunities.length
          } opportunities for improvement: ${opportunities
            .slice(0, 2)
            .join(", ")}`,
          actionable: true,
          priority: "medium",
        });
      }

      // Performance indicators
      const performance = this.analyzePerformance(meetingData);
      insights.push({
        type: "performance",
        title: "Meeting Performance",
        description: `Meeting efficiency: ${performance.efficiency}%. Engagement level: ${performance.engagement}`,
        actionable: false,
        priority: "low",
      });

      // Predictive insights
      const predictions = this.generatePredictions(content, meetingData);
      if (predictions.length > 0) {
        insights.push({
          type: "predictions",
          title: "Predictive Analysis",
          description: `Based on current trends: ${predictions[0]}`,
          actionable: true,
          priority: "medium",
        });
      }

      return insights;
    } catch (error) {
      console.error("Enhanced insights generation error:", error);
      return this.fallbackInsights(meetingData);
    }
  }

  // Analyze trends in content
  analyzeTrends(content) {
    const trends = [];
    const contentLower = content.toLowerCase();

    const trendIndicators = {
      digital_transformation: ["digital", "automation", "ai", "technology"],
      remote_work: ["remote", "virtual", "online", "distributed"],
      sustainability: ["sustainable", "green", "environment", "carbon"],
      customer_focus: ["customer", "client", "user", "experience"],
      data_driven: ["data", "analytics", "metrics", "insights"],
    };

    Object.entries(trendIndicators).forEach(([trend, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (contentLower.split(keyword).length - 1);
      }, 0);

      if (score >= 2) {
        trends.push(trend.replace("_", " "));
      }
    });

    return trends;
  }

  // Assess potential risks
  assessRisks(content) {
    const risks = [];
    const contentLower = content.toLowerCase();

    const riskIndicators = {
      timeline_risk: ["delay", "behind", "late", "postpone"],
      resource_risk: ["shortage", "lack", "insufficient", "limited"],
      quality_risk: ["issue", "problem", "concern", "defect"],
      communication_risk: ["unclear", "confusion", "misunderstanding"],
      budget_risk: ["over budget", "cost", "expensive", "financial"],
    };

    Object.entries(riskIndicators).forEach(([risk, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (contentLower.split(keyword).length - 1);
      }, 0);

      if (score >= 1) {
        risks.push(risk.replace("_", " "));
      }
    });

    return risks;
  }

  // Identify opportunities
  identifyOpportunities(content) {
    const opportunities = [];
    const contentLower = content.toLowerCase();

    const opportunityIndicators = {
      process_improvement: ["improve", "optimize", "streamline", "enhance"],
      cost_reduction: ["save", "reduce", "efficient", "economical"],
      growth_opportunity: ["expand", "grow", "scale", "increase"],
      innovation: ["innovate", "new", "creative", "breakthrough"],
      partnership: ["partner", "collaborate", "alliance", "cooperation"],
    };

    Object.entries(opportunityIndicators).forEach(([opportunity, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (contentLower.split(keyword).length - 1);
      }, 0);

      if (score >= 1) {
        opportunities.push(opportunity.replace("_", " "));
      }
    });

    return opportunities;
  }

  // Analyze meeting performance
  analyzePerformance(meetingData) {
    const duration = meetingData.duration || 60;
    const attendees = meetingData.attendees?.length || 5;
    const content = meetingData.content || "";

    // Calculate efficiency based on content density and duration
    const wordsPerMinute = content.split(" ").length / duration;
    const efficiency = Math.min(100, Math.max(0, (wordsPerMinute / 10) * 100));

    // Calculate engagement based on content richness
    const sentences = content.split(/[.!?]+/).length;
    const avgSentenceLength = content.split(" ").length / sentences;
    const engagement =
      avgSentenceLength > 15
        ? "High"
        : avgSentenceLength > 10
        ? "Medium"
        : "Low";

    return {
      efficiency: Math.round(efficiency),
      engagement,
      attendeeRatio:
        attendees > 10 ? "Large" : attendees > 5 ? "Medium" : "Small",
    };
  }

  // Generate predictive insights
  generatePredictions(content, meetingData) {
    const predictions = [];
    const contentLower = content.toLowerCase();

    // Predict based on action items and trends
    if (contentLower.includes("deadline") && contentLower.includes("tight")) {
      predictions.push(
        "High probability of timeline pressure in upcoming weeks"
      );
    }

    if (contentLower.includes("budget") && contentLower.includes("review")) {
      predictions.push("Budget reassessment likely in next quarter");
    }

    if (contentLower.includes("team") && contentLower.includes("expand")) {
      predictions.push("Team growth expected in coming months");
    }

    return predictions;
  }

  // Fallback methods for error handling
  fallbackSummary(text) {
    return text.substring(0, 200) + "...";
  }

  fallbackSentimentAnalysis(text) {
    return { overall: "NEUTRAL", confidence: 0.5 };
  }

  fallbackKeyPoints(text) {
    return text
      .split(/[.!?]+/)
      .slice(0, 3)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  fallbackActionItems(text) {
    return [
      {
        text: "Review meeting content for action items",
        priority: "Medium",
        assignee: "Team Lead",
        deadline: "Next week",
      },
    ];
  }

  fallbackInsights(meetingData) {
    return [
      {
        type: "general",
        title: "Meeting Completed",
        description: "Meeting has been documented and is available for review",
        actionable: false,
        priority: "low",
      },
    ];
  }

  // Utility methods
  generateCacheKey(text, operation) {
    return `${operation}_${btoa(text.substring(0, 100)).substring(0, 20)}`;
  }

  calculateConfidence(originalText, result) {
    const originalLength = originalText.length;
    const resultLength = result.length;
    return Math.min(1, resultLength / (originalLength * 0.3));
  }

  // Clear cache and get statistics
  clearCache() {
    this.cache.clear();
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
      totalAccesses: Array.from(this.cache.values()).reduce(
        (acc, item) => acc + (item.accessCount || 0),
        0
      ),
    };
  }
}

// Export enhanced singleton instance
export default new EnhancedAIService();
