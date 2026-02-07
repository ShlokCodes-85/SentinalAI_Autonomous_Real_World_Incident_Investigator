import requests
from typing import List, Dict, Any

GEMINI_API_KEY = "AIzaSyD9-toht5qOgAs5rL_5IhEv42Yv7QlvRRk"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY

def build_causal_timeline(events: List[Dict[str, Any]]) -> List[str]:
    """
    Use Gemini 3 API to generate a human-understandable causal timeline from events.
    Args:
        events: List of event dicts with keys: 'timestamp', 'description', etc.
    Returns:
        List of formatted timeline strings from Gemini.
    """
    prompt = "Given the following ordered events, generate a human-understandable causal timeline with cause-effect chains.\n"
    for e in sorted(events, key=lambda x: x.get('timestamp', 0)):
        prompt += f"T-{int(e.get('timestamp', 0))}s: {e.get('description', '')}\n"
    prompt += "\nFormat as a timeline."
    headers = {"Content-Type": "application/json"}
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    response = requests.post(GEMINI_API_URL, json=payload, headers=headers)
    response.raise_for_status()
    result = response.json()
    text = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
    return [line for line in text.split("\n") if line.strip()]
