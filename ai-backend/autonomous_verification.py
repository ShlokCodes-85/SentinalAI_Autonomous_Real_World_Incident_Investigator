import logging
from typing import List, Dict, Any
import requests

logging.basicConfig(filename='verification.log', level=logging.INFO)

GEMINI_API_KEY = "AIzaSyD9-toht5qOgAs5rL_5IhEv42Yv7QlvRRk"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY

def verify_with_llm(hypotheses: List[Dict[str, Any]], perception_results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Send hypotheses and evidence to Gemini for verification and confidence adjustment.
    """
    verified = []
    for hyp in hypotheses:
        prompt = f"""
        Given the hypothesis: {hyp['hypothesis']} with confidence {hyp['confidence']} and evidence {hyp['evidence']},
        and perception results: {perception_results},
        Re-analyze, challenge the conclusion, test counter-hypotheses, and return revised confidence and verification status.
        """
        headers = {"Content-Type": "application/json"}
        payload = {"contents": [{"parts": [{"text": prompt}]}]}
        response = requests.post(GEMINI_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        # Parse Gemini response for revised confidence and verification
        text = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        revised_conf = hyp["confidence"]
        verified_status = False
        for line in text.split("\n"):
            if line.lower().startswith("confidence"):
                try:
                    revised_conf = float(line.split(":", 1)[-1].strip())
                except Exception:
                    pass
            if "verified" in line.lower():
                verified_status = "true" in line.lower()
        verified.append({
            "hypothesis": hyp["hypothesis"],
            "confidence": revised_conf,
            "evidence": hyp.get("evidence", []),
            "verified": verified_status
        })
    return verified
