# backend/matcher.py
import numpy as np
from rapidfuzz import fuzz, process
from typing import List, Tuple
from backend.preprocessing import split_skills_field
import logging

USE_SBERT = True
USE_FAISS = True

try:
    from sentence_transformers import SentenceTransformer
    import faiss
except Exception as e:
    logging.warning("SBERT/FAISS not available: %s", e)
    USE_SBERT = False
    USE_FAISS = False

# Load SBERT model if available
SBERT_MODEL = None
if USE_SBERT:
    SBERT_MODEL = SentenceTransformer("all-MiniLM-L6-v2")

def build_faiss_index(skill_list: List[str]):
    """Build FAISS index for required skills"""
    if not USE_SBERT or not USE_FAISS:
        return None, None
    embeddings = SBERT_MODEL.encode(skill_list, convert_to_numpy=True)
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(np.array(embeddings, dtype="float32"))
    return index, embeddings

def rapidfuzz_match(skill: str, choices: List[str], threshold: int = 80) -> Tuple[str, int]:
    """Return best lexical match and score"""
    if not choices:
        return None, 0
    choice = process.extractOne(skill, choices, scorer=fuzz.token_sort_ratio)
    if not choice:
        return None, 0
    best, score, _ = choice
    return best, score if score else 0

def hybrid_match(candidate_skills: List[str], required_skills: List[str],
                 fuzz_threshold: int = 80, top_k: int = 2) -> List[str]:
    """
    Hybrid matching pipeline:
    1. RapidFuzz lexical matching
    2. SBERT+FAISS semantic nearest neighbors
    """
    matches = set()
    reqs = [r for r in required_skills if r]

    # Stage 1: RapidFuzz
    for skill in candidate_skills:
        best, score = rapidfuzz_match(skill, reqs, threshold=fuzz_threshold)
        if best and score >= fuzz_threshold:
            matches.add(best)

    # Stage 2: SBERT+FAISS
    unmatched = [s for s in candidate_skills if s not in matches]
    if unmatched and USE_SBERT and USE_FAISS:
        index, _ = build_faiss_index(reqs)
        if index is not None:
            emb_un = SBERT_MODEL.encode(unmatched, convert_to_numpy=True)
            D, I = index.search(np.array(emb_un, dtype="float32"), top_k)
            for row in I:
                for j in row:
                    if 0 <= j < len(reqs):
                        matches.add(reqs[j])

    return list(matches)

def compute_match_score(candidate_skills: List[str], required_skills: List[str]) -> float:
    """Compute ratio of matched skills to total required"""
    if not required_skills:
        return 0.0
    matched = set(candidate_skills) & set(required_skills)
    hybrid = hybrid_match(candidate_skills, required_skills)
    matched = matched.union(set(hybrid))
    return len(matched) / float(len(required_skills))
