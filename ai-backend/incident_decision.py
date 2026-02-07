from typing import List, Dict, Any

def decide_incident_status(verified_hypotheses: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Classify incident severity and certainty based on confidence.
    Responsibilities:
      - Confidence thresholding
      - Incident categorization
      - False-positive suppression
      - Status assignment
    Decision Logic:
      0.75 → Verified
      0.4–0.75 → Possible
      <0.4 → No incident
    """
    decisions = []
    for hyp in verified_hypotheses:
        conf = hyp.get("confidence", 0)
        if conf >= 0.75:
            status = "Verified"
        elif conf >= 0.4:
            status = "Possible"
        else:
            status = "No incident"
        # False-positive suppression: only keep incidents above 0.4
        if status != "No incident":
            decisions.append({
                "hypothesis": hyp["hypothesis"],
                "confidence": conf,
                "status": status,
                "evidence": hyp.get("evidence", [])
            })
    return decisions
