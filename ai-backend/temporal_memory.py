import uuid
from typing import List, Dict, Any

class IncidentState:
    def __init__(self):
        self.incidents = {}

    def link_window_to_incident(self, window_id: int, hypothesis: str, confidence: float):
        # Find or create incident
        incident_id = self._find_incident(hypothesis)
        if not incident_id:
            incident_id = f"INC-{str(uuid.uuid4())[:8]}"
            self.incidents[incident_id] = {
                "incident_id": incident_id,
                "status": "ongoing",
                "confidence": confidence,
                "windows": [window_id],
                "hypotheses": [hypothesis]
            }
        else:
            inc = self.incidents[incident_id]
            inc["windows"].append(window_id)
            inc["hypotheses"].append(hypothesis)
            # Confidence accumulation (average)
            inc["confidence"] = min(1.0, (inc["confidence"] + confidence) / 2)
        return incident_id

    def _find_incident(self, hypothesis: str):
        for inc_id, inc in self.incidents.items():
            if hypothesis in inc["hypotheses"]:
                return inc_id
        return None

    def update_status(self, incident_id: str, status: str):
        if incident_id in self.incidents:
            self.incidents[incident_id]["status"] = status

    def get_state(self, incident_id: str) -> Dict[str, Any]:
        return self.incidents.get(incident_id, {})

    def all_states(self) -> List[Dict[str, Any]]:
        return list(self.incidents.values())
