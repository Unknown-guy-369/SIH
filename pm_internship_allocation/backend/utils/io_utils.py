# backend/utils/io_utils.py
import csv

def read_applicants(file_path: str):
    """Read applicants CSV into list of dicts"""
    with open(file_path, "r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return list(reader)

def read_internships(file_path: str):
    """Read internships CSV into list of dicts"""
    with open(file_path, "r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return list(reader)

def write_allocations(file_path: str, allocations):
    """Write allocations to CSV"""
    if not allocations:
        return
    with open(file_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=allocations[0].keys())
        writer.writeheader()
        writer.writerows(allocations)
