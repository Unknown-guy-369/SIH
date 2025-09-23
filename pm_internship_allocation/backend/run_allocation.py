# run_allocation_list.py
from preprocessing import split_skills_field
from matcher import compute_match_score, hybrid_match
from allocator import greedy_allocate, ortools_allocate

def build_pairs(applicants, internships):
    pairs = []
    int_map = {i["id"]: i for i in internships}
    for app in applicants:
        applied_id = app.get("applied_id") or app.get("applied_internship_id") or app.get("appliedTo") or ""
        
        # If applicant applied to a specific internship
        if applied_id:
            jobs = [int_map[applied_id]] if applied_id in int_map else []
        else:
            jobs = internships  # else consider all internships

        cand_skills = split_skills_field(app.get("skills", ""))
        for job in jobs:
            req_skills = split_skills_field(job.get("req_text") or job.get("req_skills") or job.get("requirements", ""))
            matched = hybrid_match(cand_skills, req_skills)
            score = compute_match_score(cand_skills + matched, req_skills)

            pairs.append({
                "app_id": app["id"],
                "app_name": app.get("name", ""),
                "int_id": job["id"],
                "int_title": job.get("title", ""),
                "score": float(score),
                "past_participation": int(app.get("past_participation", 0))
            })
    return pairs


def run_allocation(applicants, internships, mode="greedsy", skip_prev=True):
    pairs = build_pairs(applicants, internships)

    if mode == "greedy":
        allocations = greedy_allocate(pairs, internships, skip_prev_participation=skip_prev)
    else:
        print(pairs)
        allocations = ortools_allocate(pairs, applicants, internships)

    return allocations


if __name__ == "__main__":
    # Example applicants
    applicants = [
        {"id": "A1", "name": "Alice", "skills": "pandas,numpy", "applied_id": "I1", "past_participation": 0},
        {"id": "A2", "name": "Bob", "skills": "Flutter", "applied_id": "I2", "past_participation": 1},
        {"id": "A3", "name": "Charlie", "skills": "React; javascript; css", "applied_id": "I3", "past_participation": 0},
        {"id": "A4", "name": "Diana", "skills": "python; data analysis; pandas", "applied_id": "I1", "past_participation": 0},
    ]

    # Example internships
    internships = [
        {"id": "I1", "title": "Data Science Intern", "req_skills": "Python; Machine Learning; SQL", "seats": 2},
        {"id": "I2", "title": "App Developer", "req_skills": " Flutter", "seats": 2},
        {"id": "I3", "title": "Frontend Developer", "req_skills": "React; JavaScript; CSS", "seats": 4},
    ]

    # Run allocation
    allocations = run_allocation(applicants, internships)
    print("Allocations:")
    for alloc in allocations:
        print(alloc)
