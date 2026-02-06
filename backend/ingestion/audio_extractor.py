import ffmpeg
import librosa
import tempfile
import os

def extract_audio(video_path, sr=16000):
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video not found: {video_path}")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        tmp_path = tmp.name

    try:
        (
            ffmpeg
            .input(video_path)
            .output(tmp_path, ac=1, ar=sr)
            .overwrite_output()
            .run(capture_stdout=True, capture_stderr=True)
        )

        audio, _ = librosa.load(tmp_path, sr=sr)
        return audio, sr

    except ffmpeg.Error as e:
        print("FFMPEG STDOUT:", e.stdout.decode())
        print("FFMPEG STDERR:", e.stderr.decode())
        raise RuntimeError("FFmpeg failed to extract audio")

    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
