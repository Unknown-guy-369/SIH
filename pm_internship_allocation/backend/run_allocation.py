# run_allocation.py
import argparse
from utils import read_applicants, read_internships, write_allocations
from preprocessing import split_skills_field
from matcher import compute_match_score, hybrid_match
from allocator import greedy_allocate, ortools_allocate

def build_pairs(applicants, internships):
    pairs = []
    # map internship id to req skills list
    int_map = {i["id"]: i for i in internships}
    for app in applicants:
        applied_id = app.get("applied_id") or app.get("applied_internship_id") or app.get("appliedTo") or ""
        # If applicant didn't apply to a specific internship, we consider all internships (optional)
        if applied_id:
            jobs = [int_map[applied_id]] if applied_id in int_map else []
        else:
            jobs = internships
        cand_skills = split_skills_field(app.get("skills",""))
        for job in jobs:
            req_skills = split_skills_field(job.get("req_text") or job.get("req_skills") or job.get("requirements",""))
            # first do hybrid matching to get matched skill list
            matched = hybrid_match(cand_skills, req_skills)
            score = compute_match_score(cand_skills + matched, req_skills)
            pairs.append({
                "app_id": app["id"],
                "app_name": app.get("name",""),
                "int_id": job["id"],
                "int_title": job.get("title",""),
                "score": float(score),
                "past_participation": int(app.get("past_participation", 0))
            })
    return pairs

def main(args):
    applicants = read_applicants(args.applicants)
    internships = read_internships(args.internships)
    pairs = build_pairs(applicants, internships)

    # choose allocator
    if args.mode == "greedy":
        allocations = greedy_allocate(pairs, internships, skip_prev_participation=args.skip_prev)
    else:
        allocations = ortools_allocate(pairs, applicants, internships)

    write_allocations(args.out, allocations)
    print(f"Wrote {len(allocations)} allocations to {args.out}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--applicants", default="data/applicants.csv")
    parser.add_argument("--internships", default="data/internships.csv")
    parser.add_argument("--out", default="allocations.csv")
    parser.add_argument("--mode", choices=["greedy","ortools"], default="greedy")
    parser.add_argument("--skip-prev", action="store_true", default=True,
                        help="Skip applicants with past participation>0")
    args = parser.parse_args()
    main(args)
