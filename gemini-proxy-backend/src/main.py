# src/main.py

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Import your blueprints
from .routes.gemini import gemini_bp

load_dotenv()

app = Flask(__name__)
CORS(app) # Enable CORS for all origins

# Register blueprints
app.register_blueprint(gemini_bp, url_prefix="/api")

@app.route("/")
def home():
    return "Flask Backend is running!"

# This block ensures the app runs only when executed directly (e.g., for local development)
# Vercel will import 'app' directly, so this block won't run on Vercel.
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=os.getenv("PORT", 5050))
