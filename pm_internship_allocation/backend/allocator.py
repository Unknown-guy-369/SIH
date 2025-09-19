# allocator.py
from ortools.linear_solver import pywraplp
from typing import List, Dict

def greedy_allocate(pairs: List[Dict], internships: List[Dict], skip_prev_participation=True) -> List[Dict]:
    """
    pairs: list of dicts with keys: app_id, int_id, score, app_name, int_title, past_participation
    internships: list of dicts with id and seats
    """
    seats_left = {i["id"]: int(i["seats"]) for i in internships}
    assigned = set()
    allocations = []
    # sort by score desc
    for p in sorted(pairs, key=lambda x: x["score"], reverse=True):
        if p["app_id"] in assigned:
            continue
        if skip_prev_participation and int(p.get("past_participation", 0)) > 0:
            continue
        if seats_left.get(p["int_id"], 0) <= 0:
            continue
        allocations.append(p)
        assigned.add(p["app_id"])
        seats_left[p["int_id"]] -= 1
    return allocations

def ortools_allocate(pairs: List[Dict], applicants: List[Dict], internships: List[Dict]) -> List[Dict]:
    """
    Solve ILP: maximize sum(score * x_ai)
    Constraints:
      - each applicant assigned to at most one internship
      - each internship capacity respected
    Returns allocated pairs (subset of input pairs)
    """
    # create solver
    solver = pywraplp.Solver.CreateSolver('CBC')  # or SCIP if available
    if not solver:
        raise RuntimeError("OR-Tools solver unavailable")

    # var x_{a,i} for pairs present
    x = {}
    for p in pairs:
        key = (p["app_id"], p["int_id"])
        x[key] = solver.IntVar(0, 1, f"x_{p['app_id']}_{p['int_id']}")

    # each applicant at most 1
    app_ids = {a["id"] for a in applicants}
    for aid in app_ids:
        relevant = [x[(p["app_id"], p["int_id"])] for p in pairs if p["app_id"] == aid]
        if relevant:
            solver.Add(sum(relevant) <= 1)

    # internship capacities
    seats = {j["id"]: int(j["seats"]) for j in internships}
    int_ids = seats.keys()
    for jid in int_ids:
        relevant = [x[(p["app_id"], p["int_id"])] for p in pairs if p["int_id"] == jid]
        if relevant:
            solver.Add(sum(relevant) <= seats[jid])

    # objective: maximize sum(score * x)
    objective = solver.Sum([p["score"] * x[(p["app_id"], p["int_id"])] for p in pairs])
    solver.Maximize(objective)

    status = solver.Solve()
    if status not in (pywraplp.Solver.OPTIMAL, pywraplp.Solver.FEASIBLE):
        return []

    allocated = []
    for p in pairs:
        key = (p["app_id"], p["int_id"])
        if x[key].solution_value() > 0.5:
            allocated.append(p)
    return allocated
