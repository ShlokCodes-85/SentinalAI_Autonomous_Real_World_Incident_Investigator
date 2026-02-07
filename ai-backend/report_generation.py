import json
from typing import List, Dict, Any
import requests

GEMINI_API_KEY = "AIzaSyD9-toht5qOgAs5rL_5IhEv42Yv7QlvRRk"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY


def generate_report(incidents: List[Dict[str, Any]], timeline: List[str]) -> Dict[str, Any]:
    """
    Generate audit-ready, court-grade report with summary, evidence, alternatives, known/inferred separation.
    Output: JSON + human-readable report.
    """
    # Prepare JSON
    report_json = {
        "incidents": incidents,
        "timeline": timeline
    }
    # Build human-readable report
    report_lines = ["Incident Report", "===================="]
    for inc in incidents:
        report_lines.append(f"Incident ID: {inc.get('incident_id', 'N/A')}")
        report_lines.append(f"Status: {inc.get('status', 'N/A')}")
        report_lines.append(f"Confidence: {inc.get('confidence', 'N/A')}")
        report_lines.append(f"Hypothesis: {inc.get('hypothesis', 'N/A')}")
        report_lines.append("Evidence:")
        for ev in inc.get('evidence', []):
            report_lines.append(f"  - {ev}")
        if 'alternatives' in inc:
            report_lines.append("Alternatives considered:")
            for alt in inc['alternatives']:
                report_lines.append(f"  - {alt}")
        if 'known' in inc or 'inferred' in inc:
            report_lines.append("Known vs Inferred:")
            if 'known' in inc:
                report_lines.append(f"  Known: {inc['known']}")
            if 'inferred' in inc:
                report_lines.append(f"  Inferred: {inc['inferred']}")
        report_lines.append("")
    report_lines.append("Timeline:")
    for t in timeline:
        report_lines.append(f"  {t}")
    report = "\n".join(report_lines)
    return {
        "json": report_json,
        "report": report
    }
