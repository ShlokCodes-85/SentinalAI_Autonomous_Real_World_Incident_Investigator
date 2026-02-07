import sys
import os
from ingestion.ingest import process_video_to_windows
from perception.audio_signals import analyze_audio
from perception.motion import analyze_motion
from event_hypothesis import generate_event_hypotheses
from autonomous_verification import verify_with_llm
from temporal_memory import IncidentState
from causal_timeline import build_causal_timeline
from incident_decision import decide_incident_status
from report_generation import generate_report

# Usage: python run_pipeline.py <video_path>
if len(sys.argv) < 2:
    print("Usage: python run_pipeline.py <video_path>")
    sys.exit(1)
video_path = sys.argv[1]
output_dir = "windows_output"

# Layer 1: Ingestion
windows = process_video_to_windows(video_path, output_dir)

# Layer 2: Perception (dummy: audio + motion)
perception_results = []
for window in windows:
    audio_result = analyze_audio(window["audio_clip"]) if os.path.exists(window["audio_clip"]) else {}
    motion_result = analyze_motion(window["frames"]) if window["frames"] else {}
    perception_results.append({"audio": audio_result, "motion": motion_result})

# Layer 3: Event Hypothesis
hypotheses = []
for window, pr in zip(windows, perception_results):
    h = generate_event_hypotheses(window, pr)
    hypotheses.extend(h)

# Layer 4: Autonomous Verification
verified = verify_with_llm(hypotheses, perception_results)

# Layer 5: Temporal Memory
incident_state = IncidentState()
for idx, hyp in enumerate(verified):
    incident_id = incident_state.link_window_to_incident(idx, hyp["hypothesis"], hyp["confidence"])
    hyp["incident_id"] = incident_id
    hyp["status"] = "ongoing"
incidents = incident_state.all_states()

# Layer 6: Causal Timeline
events = []
for idx, pr in enumerate(perception_results):
    if "audio" in pr and "event" in pr["audio"]:
        events.append({"timestamp": idx * 5, "description": pr["audio"]["event"]})
    if "motion" in pr and "event" in pr["motion"]:
        events.append({"timestamp": idx * 5, "description": pr["motion"]["event"]})
timeline = build_causal_timeline(events)

# Layer 7: Incident Decision
final_incidents = decide_incident_status(verified)

# Layer 8: Report Generation
result = generate_report(final_incidents, timeline)

print("\n===== JSON Output =====\n")
print(result["json"])
print("\n===== Human-Readable Report =====\n")
print(result["report"])
