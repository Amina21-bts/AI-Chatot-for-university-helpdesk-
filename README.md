# UniBot - AI University Helpdesk Chatbot


---

## Overview

**UniBot** is a full-stack AI chatbot application designed to assist students, faculty, and visitors with university-related queries. It uses Natural Language Processing (NLP) techniques to understand user intent and provide accurate, contextual responses from a comprehensive knowledge base covering admissions, courses, fees, exams, campus facilities, and more.

This project was developed as a semester project for the Computer Science program, demonstrating full-stack development, REST API design, NLP implementation, and modern UI/UX principles.

## Features

### Core Functionality
- **Natural Language Understanding** - Processes user queries using keyword matching and weighted scoring algorithms
- **Intent Classification** - Automatically categorizes queries into 19+ intent types
- **Context-Aware Responses** - Provides detailed, formatted answers tailored to each topic
- **Real-time Chat Interface** - Smooth, responsive messaging experience
- **Typing Indicators** - Visual feedback while the bot processes queries
- **Quick Reply Suggestions** - One-click buttons for common questions
- **Message History** - Maintains conversation context throughout the session

### Topics Covered
| Category | Topics |
|----------|--------|
| **Admissions** | Deadlines, requirements, application process |
| **Academics** | CS courses, IT courses, curriculum details |
| **Financial** | Fee structure, payment methods, scholarships |
| **Examinations** | Exam schedules, result checking, deadlines |
| **Campus Life** | Library, hostel, transport, labs, events |

### Technical Highlights
- Full-stack architecture with separate frontend and backend
- RESTful API design with CORS support
- Component-based React architecture with custom hooks
- Framer Motion animations for smooth UI transitions
- Responsive design optimized for desktop and mobile
- Pure Python NLP engine (no external AI APIs required)
- Extensible knowledge base system via JSON

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [React 18](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Vite](https://vitejs.dev/) | Build tool |

### Backend
| Technology | Purpose |
|------------|---------|
| [Python 3.10+](https://www.python.org/) | Programming language |
| [Flask](https://flask.palletsprojects.com/) | Web framework |
| [Flask-CORS](https://flask-cors.readthedocs.io/) | Cross-origin support |

### NLP Engine
- **Text Preprocessing** - Lowercasing, normalization, special character removal
- **Keyword Matching** - Word overlap scoring with weighted coverage/density
- **Intent Classification** - Pattern-based matching across 100+ training examples
- **Entity Extraction** - Semester numbers and department detection

## Project Structure

```
unibot/
├── backend/
│   ├── data/
│   │   └── university_data.json    # Knowledge base (19 intents, 100+ patterns)
│   └── main.py                     # Flask server + NLP engine
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx      # Main chat interface
│   │   │   ├── MessageBubble.tsx   # Individual message renderer
││   │   ├── TypingIndicator.tsx   # Animated typing dots
│   │   │   └── QuickReplies.tsx    # Suggestion pill buttons
│   │   ├── hooks/
│   │   │   └── useChat.ts         # Chat state management hook
│   │   ├── types/
│   │   │   └── chat.ts            # TypeScript type definitions
│   │   ├── App.tsx                # Root component
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Global styles + Tailwind
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## Prerequisites

Before running this project, ensure you have the following installed:

| Software | Version | Download Link |
|----------|---------|---------------|
| **Python** | 3.10 or higher | [python.org/downloads](https://www.python.org/downloads/) |
| **Node.js** | 18 LTS or higher | [nodejs.org](https://nodejs.org/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

### Verify Installations

```bash
python --version    # Should show Python 3.10+
node --version      # Should show v18+
npm --version       # Should show 9+
git --version       # Should show any version
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/[your-username]/unibot.git
cd unibot
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install flask flask-cors

# Start the server
python main.py
```

The backend will start on `http://localhost:8000`

### 3. Frontend Setup

Open a **new terminal** window (keep the backend running):

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Open in Browser

Navigate to [http://localhost:5173](http://localhost:5173) to use the chatbot.

## API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

#### 1. Root / Health Check
```http
GET /
```
**Response:**
```json
{
  "status": "online",
  "service": "UniBot API",
  "version": "1.0.0"
}
```

#### 2. Send Chat Message
```http
POST /chat
Content-Type: application/json

{
  "message": "What is the admission deadline?",
  "user_id": "optional-user-id"
}
```
**Response:**
```json
{
  "response": "The admission deadline for Fall 2026 is August 15, 2026...",
  "intent": "admission_deadline",
  "confidence": 0.95,
  "entities": {},
  "timestamp": "2026-01-01T12:00:00"
}
```

#### 3. Get Quick Suggestions
```http
GET /suggestions
```
**Response:**
```json
{
  "suggestions": [
    "Admission requirements",
    "Fee structure",
    "CS courses"
  ]
}
```

#### 4. List All Intents
```http
GET /intents
```
**Response:**
```json
{
  "intents": ["greeting", "goodbye", "admission_deadline", ...],
  "count": 20
}
```

## Usage Examples

### Example Conversation

| User | UniBot |
|------|--------|
| "Hello" | "Hello! Welcome to UniBot, your university helpdesk assistant..." |
| "What is the admission deadline?" | "The admission deadline for Fall 2026 is August 15, 2026..." |
| "Tell me about CS courses" | "The Computer Science (BSCS) program covers: Semester 1: Programming Fundamentals..." |
| "How much is the fee?" | "Here is the complete fee structure per semester: Admission Fee..." |
| "Thanks" | "You're welcome! I'm glad I could help..." |
| "Bye" | "Goodbye! Have a great day at university!" |

## Customization Guide

### Adding New Topics

1. Open `backend/data/university_data.json`
2. Add a new intent object following this structure:

```json
{
  "tag": "your_topic_name",
  "patterns": [
    "keyword phrase 1",
    "keyword phrase 2",
    "different way to ask"
  ],
  "responses": [
    "Your detailed response here.",
    "Alternative response for variety."
  ]
}
```

3. Restart the backend server
4. The chatbot will automatically include the new topic

### Customizing University Information

Edit the existing responses in `university_data.json` to match your actual university:
- Update fee amounts and deadlines
- Modify course names and structure
- Add your university's contact information
- Include real event dates and details

### Styling Customization

The frontend uses Tailwind CSS. Key customization points:

| File | What to Customize |
|------|------------------|
| `tailwind.config.js` | Primary color palette, fonts |
| `frontend/src/index.css` | Global styles, scrollbar |
| `ChatWindow.tsx` | Layout, header, footer |
| `MessageBubble.tsx` | Message styling, avatars |


