import cv2
import numpy as np

def motion_intensity(frames):
    diffs = []
    for i in range(1, len(frames)):
        prev = cv2.cvtColor(frames[i-1], cv2.COLOR_BGR2GRAY)
        curr = cv2.cvtColor(frames[i], cv2.COLOR_BGR2GRAY)
        diff = cv2.absdiff(prev, curr)
        diffs.append(np.mean(diff))
    return float(np.mean(diffs)) if diffs else 0.0

def direction_change(frames):
    flow_mags = []
    for i in range(1, len(frames)):
        prev = cv2.cvtColor(frames[i-1], cv2.COLOR_BGR2GRAY)
        curr = cv2.cvtColor(frames[i], cv2.COLOR_BGR2GRAY)
        flow = cv2.calcOpticalFlowFarneback(
            prev, curr, None, 0.5, 3, 15, 3, 5, 1.2, 0
        )
        mag, _ = cv2.cartToPolar(flow[...,0], flow[...,1])
        flow_mags.append(np.mean(mag))
    return float(np.std(flow_mags)) if flow_mags else 0.0

def analyze_motion(frames):
    # Dummy analysis: return event name or empty
    return {"event": "Motion analyzed"}
