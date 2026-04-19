# UniBot - AI University Helpdesk Chatbot

An intelligent web-based chatbot that answers university-related questions using Natural Language Processing (NLP). Built with React + FastAPI + scikit-learn.

---

## Features

- **18 Built-in Intents**: Admissions, courses, fees, exams, library, hostel, transport, scholarships, events & more
- **AI-Powered Responses**: TF-IDF + Naive Bayes intent classification
- **Beautiful Chat UI**: Animated interface with typing indicators and quick-reply buttons
- **Fully Customizable**: Just edit the JSON knowledge base to add your university's data

---

## Project Structure

```
unibot/
├── backend/
│   ├── data/
│   │   └── university_data.json    # Knowledge base (edit this!)
│   ├── chatbot_engine.py           # AI/NLP brain
│   ├── knowledge_base.py           # Data loader
│   ├── main.py                     # FastAPI server
│   └── requirements.txt            # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx      # Main chat interface
│   │   │   ├── MessageBubble.tsx   # Individual message
│   │   │   ├── TypingIndicator.tsx # Animated dots
│   │   │   └── QuickReplies.tsx    # Suggestion buttons
│   │   ├── hooks/
│   │   │   └── useChat.ts         # Chat logic & API calls
│   │   ├── types/
│   │   │   └── chat.ts            # TypeScript types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

---

## How to Run

### 1. Backend (Terminal 1)

```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

Backend will start at: `http://localhost:8000`

### 2. Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at: `http://localhost:5173`

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API health check |
| `/health` | GET | Server status |
| `/chat` | POST | Send message, get response |
| `/suggestions` | GET | Quick-reply suggestions |
| `/intents` | GET | All available intent tags |

View interactive docs at: `http://localhost:8000/docs`

---

## Customizing for Your University

Edit `backend/data/university_data.json` to add your real university data:

1. Modify existing responses with your actual information
2. Add new intents for topics specific to your university
3. Add more patterns (keywords) to improve matching
4. Restart the backend to reload the knowledge base

---

## Test Queries

- "What is the admission deadline?"
- "Tell me about CS courses"
- "How much is the fee?"
- "What are the library timings?"
- "How do I apply for scholarship?"
- "When are the exams?"

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Tailwind CSS + Framer Motion |
| Backend | Python + FastAPI |
| AI/NLP | scikit-learn (TF-IDF + Naive Bayes) |
| Data | JSON Knowledge Base |

---

## For Your Project Report

- **Title**: UniBot - AI University Helpdesk Chatbot
- **Key Concepts**: NLP, Intent Classification, TF-IDF, REST API, Full-Stack Development
- **Lines of Code**: ~1,000 across 12 files
- **Features**: 18 intents, animated UI, real-time AI responses

---

Built for CS semester project. Good luck!
