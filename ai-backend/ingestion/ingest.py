import os
import math
from typing import List, Dict, Optional

import soundfile as sf

from .video_loader import load_video
from .audio_extractor import extract_audio


def _format_ts(seconds: float) -> str:
    """Format seconds to HH:MM:SS"""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def process_video_to_windows(
    video_path: str,
    output_dir: str,
    fps: int = 5,
    window_duration: float = 5.0,
    hop_duration: Optional[float] = 5.0,
) -> List[Dict]:
    """
    Convert a continuous video feed into time-aligned windows.

    Args:
        video_path: Path to input video file.
        output_dir: Directory where per-window audio clips will be written.
        fps: Number of frames per second to sample from the video (approx).
        window_duration: Duration (seconds) of each window.
        hop_duration: Step between window starts. If None, defaults to window_duration (non-overlapping).

    Returns:
        A list of window artifacts with keys: window_id, start, end, frames, audio_clip
    """
    if hop_duration is None:
        hop_duration = window_duration

    os.makedirs(output_dir, exist_ok=True)

    # Load frames and timestamps (timestamps in seconds)
    frames, timestamps = load_video(video_path, fps=fps)

    # Extract audio samples and sample rate
    audio, sr = extract_audio(video_path, sr=16000)

    if not timestamps:
        return []

    # Determine overall duration from timestamps or audio length
    video_start = timestamps[0]
    video_end = timestamps[-1]
    total_duration = max(video_end, len(audio) / sr)

    windows = []
    window_id = 0
    start_time = video_start

    while start_time < total_duration:
        end_time = start_time + window_duration

        # Select frames whose timestamps fall within [start_time, end_time)
        win_frames = [f for f, ts in zip(frames, timestamps) if start_time <= ts < end_time]
        if not win_frames:
            # Advance and continue (still create empty windows if desired?)
            start_time += hop_duration
            window_id += 1
            continue

        # Slice audio for the same time interval
        start_sample = int(max(0, math.floor(start_time * sr)))
        end_sample = int(min(len(audio), math.ceil(end_time * sr)))
        window_audio = audio[start_sample:end_sample]

        # Write audio clip to disk
        audio_filename = f"chunk_{window_id}.wav"
        audio_path = os.path.join(output_dir, audio_filename)
        sf.write(audio_path, window_audio, sr)

        artifact = {
            "window_id": window_id,
            "start": _format_ts(start_time),
            "end": _format_ts(min(end_time, total_duration)),
            "frames": win_frames,
            "audio_clip": audio_filename,
        }
        windows.append(artifact)

        start_time += hop_duration
        window_id += 1

    return windows
