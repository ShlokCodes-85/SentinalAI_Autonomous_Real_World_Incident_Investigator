import subprocess
import librosa
import tempfile
import os
import shutil

def find_ffmpeg():
    """Find ffmpeg executable in PATH or common installation locations."""
    # Try to find in PATH
    ffmpeg_path = shutil.which("ffmpeg")
    if ffmpeg_path:
        return ffmpeg_path
    
    # Common Windows installation paths
    common_paths = [
        r"C:\ProgramData\chocolatey\bin\ffmpeg.exe",
        r"C:\ffmpeg\bin\ffmpeg.exe",
    ]
    
    # Check winget installation path
    import glob
    winget_pattern = os.path.expanduser(r"~\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg*\ffmpeg*\bin\ffmpeg.exe")
    winget_paths = glob.glob(winget_pattern)
    if winget_paths:
        common_paths.extend(winget_paths)
    
    for path in common_paths:
        if os.path.exists(path):
            return path
    
    return "ffmpeg"  # Fall back to just "ffmpeg"

def extract_audio(video_path, sr=16000):
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video not found: {video_path}")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        tmp_path = tmp.name

    try:
        # Find ffmpeg executable
        ffmpeg_cmd = find_ffmpeg()
        
        # Use ffmpeg to extract audio from video
        subprocess.run(
            [ffmpeg_cmd, "-i", video_path, "-vn", "-acodec", "pcm_s16le", "-ar", str(sr), "-ac", "2", "-y", tmp_path],
            check=True,
            capture_output=True,
            text=True
        )
        audio, _ = librosa.load(tmp_path, sr=sr)
        return audio, sr
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"FFmpeg failed to extract audio: {e.stderr}")
    except FileNotFoundError:
        raise RuntimeError("FFmpeg not found. Please install FFmpeg and add it to your PATH.")
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
