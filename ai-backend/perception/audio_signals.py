import numpy as np
import librosa

def audio_energy(audio_segment):
    if audio_segment is None or len(audio_segment) == 0:
        return 0.0
    return float(np.mean(np.abs(audio_segment)))

def frequency_shift(audio_segment, sr):
    if audio_segment is None or len(audio_segment) < 2048:
        return 0.0
    spec = np.abs(librosa.stft(audio_segment, n_fft=2048))
    return float(np.std(spec))

def analyze_audio(audio_path):
    # Dummy analysis: return event name or empty
    return {"event": "Audio analyzed"}
