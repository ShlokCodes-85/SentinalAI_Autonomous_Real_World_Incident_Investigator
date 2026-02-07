import cv2

def load_video(path, fps=5):
    cap = cv2.VideoCapture(path)
    native_fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(native_fps // fps)

    frames = []
    timestamps = []
    idx = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if idx % frame_interval == 0:
            ts = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
            frames.append(frame)
            timestamps.append(ts)

        idx += 1

    cap.release()
    return frames, timestamps
