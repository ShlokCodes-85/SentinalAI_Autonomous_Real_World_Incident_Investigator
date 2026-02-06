from pydantic import BaseModel
from typing import List, Optional

class Signal(BaseModel):
    name: str
    value: float
    confidence: float
    z_score: Optional[float] = None
    is_anomaly: Optional[bool] = None

class Window(BaseModel):
    id: int
    start_time: float
    end_time: float
    signals: List[Signal]
