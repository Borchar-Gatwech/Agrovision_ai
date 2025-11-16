🌾 AgroVision — AI-Powered Agricultural Insights

AgroVision is a web application that leverages Machine Learning, real-time weather data, and Supabase Edge Functions to provide actionable agricultural insights.
Built using Vite + React, the project aims to support farmers, researchers, and agritech teams with smart predictions, automated insights, and accessible data visualizations.

Live Project → https://agrovision-2.vercel.app/

Project Overview (Canva) → https://www.canva.com/design/DAG1ar8opDo/1MrMNsOWD2ZOLpB_9igLRg/edit

🗂️ Project Structure
agrovision_ai/
├── backend/                     # ML/Backend service (Render/Deployment)
├── public/                      # Static assets
├── src/                         # Frontend source code (React + Vite)
├── supabase/                    # Supabase functions & scripts
├── .env                         # Environment variables (excluded from Git)
├── .gitignore
├── README.md
├── README_BACKEND.md
├── SETUP_DASHBOARD_TABLES.sql   # Supabase DB setup
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.*.json

🚀 Project Overview

Uses a Machine Learning backend for predictions (e.g., crop condition analysis, yield predictions, etc.)

Integrates OpenWeather API to fetch real-time weather forecasts

Uses a Supabase Edge Function to generate intelligent AI insights

Built with Vite + React + TypeScript + ShadCN UI

Manages data using Supabase

Secure configuration using environment variables

🌟 Features

Predictive Analysis: Upload an image or data for instant ML-based predictions

Weather Forecasts: Get 5-day forecasts via OpenWeather API

AI-Assisted Insights: Generate agricultural recommendations using Supabase Edge Functions

Fast, Modern UI: Powered by Vite, React, TailwindCSS, and ShadCN

Secure API Keys: All sensitive values stored in .env

Responsive Layout: Works across devices

📷 Demo / Screenshots

![Screenshot](./image.png)



Then display it below:

🛠 Getting Started
✔ Prerequisites

Node.js (v18+ recommended)

npm or yarn

Supabase project

Hugging Face API key

OpenWeather API key

Optional: Render account for backend deployment

📥 Installation
1. Clone the Repository
git clone https://github.com/Rufron/agrovision_ai.git
cd agrovision_ai

2. Install Dependencies
npm install
# or
yarn install

🔐 Environment Variables

Create a .env file in the project root:

VITE_API_BASE_URL="YOUR_ML_BASE_URL"
NEXT_PUBLIC_WEATHER_API_KEY="YOUR_OPENWEATHER_API_KEY"
VITE_HF_API_KEY="YOUR_HUGGING_FACE_API_KEY"
VITE_SUPABASE_URL="https://YOUR_SUPABASE_URL.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_KEY"


Make sure .env is in your .gitignore.

▶️ Running Locally
npm run dev
# or
yarn dev


Open:

http://localhost:3000

⚙️ Usage

Go to Prediction to upload images/data for ML inference

Visit Weather to view real-time forecasts

Use Insights to generate AI-powered agricultural recommendations

Dashboard visualizes responses, predictions, insights, and forecasts

🧭 Roadmap

 Improve ML model accuracy

 Add user authentication (Supabase Auth)

 Store user predictions & insights in Supabase DB

 Add multi-language support

 Improve UI/UX (charts, export options, animations)

 Offline-first PWA mode

👥 Contributors
Name	Role
Brian Kipchumba	Frontend Development
Faith Kiplagat	Backend & Database Integration
Borchar Gatwetch	Machine Learning & AI Integration