from schemas.window import Window, Signal
from perception.motion import motion_intensity, direction_change
from perception.audio_signals import audio_energy, frequency_shift

def build_window(window_data, audio, sr):
    frames = window_data["frames"]
    start = window_data["start"]
    end = window_data["end"]

    a_start = int(start * sr)
    a_end = int(end * sr)
    audio_seg = audio[a_start:a_end] if a_end > a_start else []

    signals = [
        Signal(name="motion_intensity", value=motion_intensity(frames), confidence=0.9),
        Signal(name="direction_change", value=direction_change(frames), confidence=0.85),
        Signal(name="audio_energy", value=audio_energy(audio_seg), confidence=0.9),
        Signal(name="frequency_shift", value=frequency_shift(audio_seg, sr), confidence=0.8),
    ]

    return Window(
        id=window_data["id"],
        start_time=start,
        end_time=end,
        signals=signals
    )
