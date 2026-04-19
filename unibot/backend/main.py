"""
UniBot Flask Server
Simple REST API backend for the university chatbot.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import random
import re
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# ========== LOAD KNOWLEDGE BASE ==========

def load_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(base_dir, "data", "university_data.json")
    with open(data_path, 'r', encoding='utf-8') as f:
        return json.load(f)

data = load_data()
intents = data['intents']

# Build pattern map: list of (pattern_words, tag)
pattern_map = []
tag_responses = {}
for intent in intents:
    tag_responses[intent['tag']] = intent['responses']
    for pattern in intent['patterns']:
        pattern_map.append((pattern.lower(), intent['tag']))

print(f"Loaded {len(intents)} intents with {len(pattern_map)} patterns.")

# ========== CHATBOT ENGINE ==========

def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def calculate_score(message, pattern):
    msg_words = set(message.split())
    pat_words = set(pattern.split())
    
    if not pat_words:
        return 0.0
    
    if pattern in message:
        return 1.0
    
    common = msg_words & pat_words
    if not common:
        return 0.0
    
    coverage = len(common) / len(pat_words)
    density = len(common) / len(msg_words) if msg_words else 0
    return (coverage * 0.7) + (density * 0.3)

def predict_intent(message):
    clean_msg = preprocess(message)
    if not clean_msg:
        return 'unknown', 0.0
    
    scores = {}
    for pattern, tag in pattern_map:
        score = calculate_score(clean_msg, pattern)
        if score > 0:
            if tag not in scores:
                scores[tag] = []
            scores[tag].append(score)
    
    if not scores:
        return 'unknown', 0.0
    
    best_tag = ''
    best_score = 0.0
    for tag, tag_scores in scores.items():
        tag_scores.sort(reverse=True)
        avg = sum(tag_scores[:2]) / min(2, len(tag_scores))
        if avg > best_score:
            best_score = avg
            best_tag = tag
    
    if best_score < 0.15:
        return 'unknown', best_score
    
    return best_tag, best_score

def extract_entities(message):
    entities = {}
    match = re.search(r'\b(\d+)(?:st|nd|rd|th)?\s*sem(?:ester)?\b', message.lower())
    if match:
        entities['semester'] = match.group(1)
    
    depts = ['cs', 'computer science', 'it', 'software engineering', 'se']
    for dept in depts:
        if dept in message.lower():
            entities['department'] = dept
            break
    
    return entities

def process_message(message):
    intent_tag, confidence = predict_intent(message)
    entities = extract_entities(message)
    
    if confidence < 0.15:
        intent_tag = 'unknown'
    
    response = random.choice(tag_responses.get(intent_tag, ["I'm not sure about that."]))
    
    return {
        'response': response,
        'intent': intent_tag,
        'confidence': round(confidence, 3),
        'entities': entities
    }

def get_suggestions():
    return [
        "Admission requirements",
        "Fee structure",
        "CS courses",
        "Exam schedule",
        "Library timing",
        "Hostel facilities"
    ]

# ========== API ROUTES ==========

@app.route('/')
def root():
    return jsonify({
        "status": "online",
        "service": "UniBot API",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "intents_count": len(intents),
        "timestamp": datetime.now().isoformat()
    })

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        result = process_message(message)
        
        return jsonify({
            'response': result['response'],
            'intent': result['intent'],
            'confidence': result['confidence'],
            'entities': result['entities'],
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/suggestions', methods=['GET'])
def suggestions():
    return jsonify({'suggestions': get_suggestions()})

@app.route('/intents', methods=['GET'])
def get_intents():
    return jsonify({
        'intents': list(tag_responses.keys()),
        'count': len(tag_responses)
    })

# ========== RUN ==========

if __name__ == '__main__':
    print("=" * 50)
    print("  UniBot Server Starting...")
    print("  API Docs: http://localhost:8000/")
    print("  Chat API: http://localhost:8000/chat")
    print("=" * 50)
    app.run(host='0.0.0.0', port=8000, debug=True)