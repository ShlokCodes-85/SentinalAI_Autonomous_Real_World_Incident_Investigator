def create_windows(frames, timestamps, window_size=5):
    windows = []
    total = len(frames)

    for i in range(0, total, window_size):
        win_frames = frames[i:i+window_size]
        win_ts = timestamps[i:i+window_size]
        if not win_frames:
            continue

        windows.append({
            "id": i // window_size,
            "frames": win_frames,
            "start": win_ts[0],
            "end": win_ts[-1]
        })
    return windows
