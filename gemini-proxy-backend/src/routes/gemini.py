import os
import google.generativeai as genai
from flask import Blueprint, request, jsonify

gemini_bp = Blueprint('gemini', __name__)

# ─── Configure Gemini API ──────────────────────────────────────────────────────
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None

# ─── Meeting Context ───────────────────────────────────────────────────────────
# Replace or extend this string with your full dashboard context as needed
MEETING_CONTEXT = """
**Brain Health USA Meeting Dashboard – July 2025**
Organization: Brain Health USA Center  
Total Meetings: 4  
Total Attendees: 19  
Key Presentations: 6  

**Session 1 – Network Accreditation & Expansion (July 18, 2025):**
- NCQA network accreditation pursuit  
- Medicaid expansion to states like Maryland  
- In-person coverage: 28 providers across 11 locations  
- Enhanced intake & scheduling processes  
- 24-hour issue resolution policy  
- Attendees: Michael Yacoub, Kerolos Osama, Ayman, Test, Lillian, Marcilleno Sameh, Ekram, Youssef Boshra  

**Session 2 – Patient Management & Care Coordination (July 18, 2025):**
- No-show percentage monitoring & interventions  
- Beacon patients management (2-week protocol)  
- Scheduler responsibilities & queue management  
- Patient retention focus  
- Assessment distribution optimization  
- Booking within 24 hours  
- Attendees: Dr. Ehab, Mariam Fayez, Mario Ghaly, Abanoub Gad, Raef Gendy, Peter Izaq, John Makary, Michael Shawky, Youlita Elyas, Andria Samir, David  

**Monthly Business Review – June 2025 (July 15, 2025):**
- 79 employees (8 team leaders, 2 managers, 1 director)  
- 100,593 inbound calls (87,461 answered, 13,132 abandoned)  
- Abandoned rate improved 4.0 % → 0.0 %  
- 2,261 intake appts (Mar–Jun), 24,067 active patients  
- 8.7 % no-show rate, 17.5 % YoY billed appt growth  

**Revenue Cycle Dashboard (July 17, 2025):**
- 44 % collection rate (×2 vs 2024)  
- Blue Shield denials 70–81 % of total denials  
- 1,156 pending records, 124 avg daily processed  
- Billing & EOB team performance metrics  

**Key Action Items:**
- NCQA application due July 25  
- 24-hr resolution policy due July 22  
- Medicaid research due Aug 15  
- No-show interventions due July 30  
- Scheduler role update due Aug 5  
- Beacon protocols due Aug 20  
- Intake streamlining due Sep 1  
- Billing audit due July 28  
- Claims audit due Aug 2  
"""

# ─── Prompt Engineering ────────────────────────────────────────────────────────
def structured_prompt(user_message: str, task_type: str = "general") -> str:
    """
    Returns a fully structured prompt for Gemini based on the requested task.
    """
    if task_type == "consultation":
        return f"""
{MEETING_CONTEXT}

### Consultation Request:
{user_message or 'Provide strategic insights and recommendations based on the meeting data above.'}

### Your Role:
You are the Chief Strategy Officer at Brain Health USA.

### Deliverables:
1. **Executive Summary:** 2–3 sentences.
2. **Strengths & Achievements:** Bullet points.
3. **Critical Improvement Areas:** Detailed.
4. **Strategic Recommendations:** Prioritized, actionable steps.
5. **Risks & Mitigation:** Bullet points.

### Tone:
Executive-level, data-driven, professional.
"""
    elif task_type == "follow-up-questions":
        return f"""
{MEETING_CONTEXT}

### Task:
Generate exactly 3 strategic, thought-provoking follow-up questions to help Brain Health USA leadership dive deeper into their meeting outcomes.

### Requirements:
- Must reference specific data from the context.
- Each question should lead to actionable insights.
- Vary focus across operational, financial, and strategic areas.
- Format: 3 questions, one per line, no numbering.

### Tone:
Executive-level, strategic.
"""
    else:  # "general" chat
        return f"""
{MEETING_CONTEXT}

### User Question:
{user_message}

### Your Role:
Senior healthcare business consultant specializing in operational strategy, revenue cycle management, and performance analytics.

### Instructions:
- Provide concise, actionable insights.
- Offer next steps or recommendations.
- Maintain a professional, consultative tone.
"""

# ─── Endpoints ────────────────────────────────────────────────────────────────
@gemini_bp.route('/gemini/chat', methods=['POST'])
def chat_with_gemini():
    """Proxy for general chat questions."""
    if not model:
        return jsonify({'error': 'Gemini not configured', 'success': False}), 500

    data = request.get_json() or {}
    user_message = data.get('message', '').strip()
    context_type = data.get('context', 'general')

    if not user_message:
        return jsonify({'error': 'Message is required', 'success': False}), 400

    prompt = structured_prompt(user_message, task_type=context_type)
    resp = model.generate_content(prompt)

    if resp.text:
        return jsonify({'response': resp.text, 'success': True})
    return jsonify({'error': 'No response generated', 'success': False}), 500

@gemini_bp.route('/gemini/consultation', methods=['POST'])
def generate_consultation():
    """Generate a strategic consultation report."""
    if not model:
        return jsonify({'error': 'Gemini not configured', 'success': False}), 500

    data = request.get_json() or {}
    question = data.get('question', '').strip()
    prompt = structured_prompt(question, task_type="consultation")
    resp = model.generate_content(prompt)

    if resp.text:
        return jsonify({'consultation': resp.text, 'success': True})
    return jsonify({'error': 'No consultation generated', 'success': False}), 500

@gemini_bp.route('/gemini/follow-up-questions', methods=['POST'])
def generate_follow_up_questions():
    """Generate 3 follow-up questions."""
    if not model:
        return jsonify({'error': 'Gemini not configured', 'success': False}), 500

    prompt = structured_prompt("", task_type="follow-up-questions")
    resp = model.generate_content(prompt)

    if resp.text:
        questions = [q.strip() for q in resp.text.split('\n') if q.strip()]
        return jsonify({'questions': questions[:3], 'success': True})
    return jsonify({'error': 'No questions generated', 'success': False}), 500

@gemini_bp.route('/gemini/status', methods=['GET'])
def gemini_status():
    """Check Gemini configuration status."""
    return jsonify({
        'configured': model is not None,
        'ready': bool(GEMINI_API_KEY),
        'success': True
    })