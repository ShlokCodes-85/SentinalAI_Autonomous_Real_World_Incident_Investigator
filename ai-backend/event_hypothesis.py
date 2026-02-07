import requests
import base64
import io
from typing import List, Dict, Any
from PIL import Image
import os

GEMINI_API_KEY = "AIzaSyD9-toht5qOgAs5rL_5IhEv42Yv7QlvRRk"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"


def prepare_multimodal_prompt(window: Dict[str, Any], perception_results: Dict[str, Any]) -> str:
    """
    Prepare a prompt for Gemini 3 using window and perception layer outputs.
    Includes full audio file (base64) and all video frames (base64 PNG).
    """
    # Encode audio file
    audio_path = window.get("audio_clip")
    audio_b64 = None
    if audio_path and os.path.exists(audio_path):
        with open(audio_path, "rb") as f:
            audio_bytes = f.read()
            audio_b64 = base64.b64encode(audio_bytes).decode("utf-8")
    # Encode all video frames as PNG base64
    frame_imgs_b64 = []
    frames = window.get("frames", [])
    for frame in frames:
        img = Image.fromarray(frame)
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        frame_imgs_b64.append(base64.b64encode(buf.getvalue()).decode("utf-8"))
    
    # Format audio info safely
    audio_info = f"{audio_b64[:100]}... (truncated)" if audio_b64 else "No audio available"
    
    prompt = f"""
    Incident window:
    - Start: {window['start']}
    - End: {window['end']}
    - Audio (base64 WAV): {audio_info}
    - Video frames (base64 PNG): {[b[:100]+'...' for b in frame_imgs_b64]}
    - Perception results: {perception_results}
    Generate possible real-world event hypotheses, assign confidence, and list supporting evidence.
    """
    return prompt


def call_gemini_api(prompt: str) -> Dict[str, Any]:
    """
    Call Gemini 3 API with the prompt and return hypotheses.
    """
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    response = requests.post(GEMINI_API_URL, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()


def generate_event_hypotheses(window: Dict[str, Any], perception_results: Dict[str, Any]) -> List[Dict[str, Any]]:
    prompt = prepare_multimodal_prompt(window, perception_results)
    gemini_response = call_gemini_api(prompt)
    # Parse Gemini response for hypotheses, confidence, evidence
    # Example parsing (depends on Gemini output format)
    hypotheses = []
    for candidate in gemini_response.get("candidates", []):
        text = candidate.get("content", {}).get("parts", [{}])[0].get("text", "")
        # Simple parsing: look for lines like 'Hypothesis: ...', 'Confidence: ...', 'Evidence: ...'
        lines = text.split("\n")
        hyp = {"hypothesis": None, "confidence": None, "evidence": []}
        for line in lines:
            if line.lower().startswith("hypothesis"):
                hyp["hypothesis"] = line.split(":", 1)[-1].strip()
            elif line.lower().startswith("confidence"):
                try:
                    hyp["confidence"] = float(line.split(":", 1)[-1].strip())
                except Exception:
                    hyp["confidence"] = None
            elif line.lower().startswith("evidence"):
                hyp["evidence"].append(line.split(":", 1)[-1].strip())
        if hyp["hypothesis"]:
            hypotheses.append(hyp)
    return hypotheses
