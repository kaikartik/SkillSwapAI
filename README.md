# ⚡ Skill-Swap AI (1-Hour MVP)

A real-time platform where community members swap skills in 15-minute video bursts. 

### 🚀 Features
- **Google Auth:** One-tap secure login.
- **AI Matching:** Gemini 1.5 Flash analyzes your problem and finds the best expert online.
- **Real-time Pulse:** Live dashboard of community help sessions using Firestore.
- **Video Swap:** Built-in video calling for instant collaboration.
- **Mobile First:** Minimalist, responsive dark-mode UI.

### 🛠️ Tech Stack
- **Frontend:** Vanilla JS, Tailwind CSS (CDN)
- **Database/Auth:** Firebase (Firestore & Auth)
- **AI Brain:** Google AI Studio (Gemini API)
- **Deployment:** GitHub Pages

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
