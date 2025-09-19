# backend/preprocessing.py
import re

def normalize_token(s: str) -> str:
    """Lowercase + clean special chars from a skill string"""
    if not isinstance(s, str):
        return ""
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9\s]", " ", s)  # keep only alphanumeric + spaces
    s = re.sub(r"\s+", " ", s)  # collapse multiple spaces
    return s.strip()

def split_skills_field(field: str):
    """Split comma/semicolon/pipe separated skill strings"""
    if not isinstance(field, str):
        return []
    parts = [p.strip() for p in re.split(r',|;|\||\n', field) if p.strip()]
    parts = [normalize_token(p) for p in parts]
    return parts
