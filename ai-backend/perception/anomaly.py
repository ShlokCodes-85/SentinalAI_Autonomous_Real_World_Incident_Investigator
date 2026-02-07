import numpy as np

def detect_anomalies(windows, threshold=2.0, min_history=3):
    """
    Detect anomalies using only past windows as baseline
    """

    signal_history = {}

    for i, w in enumerate(windows):
        for s in w.signals:
            history = signal_history.get(s.name, [])

            # Not enough history → cannot judge yet
            if len(history) < min_history:
                s.z_score = 0.0
                s.is_anomaly = False
            else:
                mean = np.mean(history)
                std = np.std(history) if np.std(history) > 0 else 1e-6
                z = (s.value - mean) / std
                s.z_score = round(float(z), 2)
                s.is_anomaly = abs(z) >= threshold

            # Update history AFTER evaluation
            history.append(s.value)
            signal_history[s.name] = history

    return windows
