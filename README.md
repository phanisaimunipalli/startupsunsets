<div align="center">
<img width="1000" height="540" alt="GHBanner" src="https://raw.githubusercontent.com/phanisaimunipalli/startupsunsets/refs/heads/main/screenshots/sunsethome.png" />
</div>

# Startup Sunsets 🌅

**Turning billion-dollar startup failures into a library of lessons to ensure no founder repeats the same mistake twice.**

## ✨ Key Features

### 1. AI-Powered Forensic Analysis

- **Gemini Integration**: Uses `gemini-3-flash-preview` to generate structured JSON data about failed startups.
- **Deep Dives**: Provides founder names, verified source URLs, capital burned, and specific "failure badges" (e.g., "Premature Scaling").
- **Real-Time Validation**: The system is prompted to strictly filter for _real_, verifiable companies with active source links.

### 2. Mental Models & Analogies

Every case study includes:

- **The Analogy**: A "Explain it to a 5-year-old" comparison.
- **The Mental Model**: The specific cognitive bias (e.g., "Sunk Cost Fallacy") that led to the failure.
- **The Pivot**: An alternate history strategy that could have saved the company.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS
- **Icons**: Lucide React
- **AI Engine**: Google GenAI SDK (`@google/genai`)
- **Design System**: Glassmorphism, CSS 3D Transforms, Custom Animations (`animate-in`, `scanlines`)

---

## 🚀 Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Environment**:
    Create a `.env` file and add your Google Gemini API Key:
    ```env
    API_KEY=your_google_api_key_here
    ```
4.  **Run the app**:
    ```bash
    npm start
    ```

---

## 🎨 Design Philosophy

The UI is designed to feel like a "Time Capsule" from the future looking back at the past. It uses:

- **Grainy Gradients**: To give a tactile, editorial feel.
- **Micro-interactions**: Hover states on the dynamic island and cards feel organic.
- **Typography**: Inter (Sans) for UI, Monospace for data points to emphasize the "Archive" aesthetic.

---

_Created by Phani Sai Ram_
