from ingestion.video_loader import load_video
from ingestion.audio_extractor import extract_audio
from ingestion.windowing import create_windows
from perception.fusion import build_window
from perception.anomaly import detect_anomalies

VIDEO_PATH = "data/sample.mp4"

frames, timestamps = load_video(VIDEO_PATH)
audio, sr = extract_audio(VIDEO_PATH)

windows_raw = create_windows(frames, timestamps)
windows = [build_window(w, audio, sr) for w in windows_raw]

windows = detect_anomalies(windows, threshold=2.0)

for w in windows:
    print(w.model_dump_json(indent=2))
