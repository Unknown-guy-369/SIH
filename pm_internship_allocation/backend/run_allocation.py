# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4

app = FastAPI()

# -------------------------------
# Data Models
# -------------------------------

class Internship(BaseModel):
    id: str
    title: str
    req_skills: str
    seats: int

class InternshipCreate(BaseModel):
    title: str
    req_skills: str
    seats: int

class Applicant(BaseModel):
    id: str
    name: str
    skills: str
    applied_id: str
    past_participation: int

class Application(BaseModel):
    id: str
    student_name: str
    internship_id: str
    status: str = "Pending"

class ApplicationCreate(BaseModel):
    student_name: str
    internship_id: str

# -------------------------------
# Sample Data (Prototype)
# -------------------------------
applicants: List[Applicant] = [
    {"id": "A1", "name": "Alice", "skills": "pandas,numpy", "applied_id": "I1", "past_participation": 0},
    {"id": "A2", "name": "Bob", "skills": "Flutter", "applied_id": "I2", "past_participation": 1},
    {"id": "A3", "name": "Charlie", "skills": "React; javascript; css", "applied_id": "I3", "past_participation": 0},
    {"id": "A4", "name": "Diana", "skills": "python; data analysis; pandas", "applied_id": "I1", "past_participation": 0},
]

internships: List[Internship] = [
    {"id": "I1", "title": "Data Science Intern", "req_skills": "Python; Machine Learning; SQL", "seats": 2},
    {"id": "I2", "title": "App Developer", "req_skills": "Flutter", "seats": 2},
    {"id": "I3", "title": "Frontend Developer", "req_skills": "React; JavaScript; CSS", "seats": 4},
]

applications: List[Application] = []  # dynamic as students apply

# -------------------------------
# Industry APIs
# -------------------------------
@app.get("/industry/internships", response_model=List[Internship])
def list_internships():
    return internships

@app.post("/industry/internships", response_model=Internship)
def create_internship(internship: InternshipCreate):
    new_internship = {
        "id": str(uuid4()),
        "title": internship.title,
        "req_skills": internship.req_skills,
        "seats": internship.seats,
    }
    internships.append(new_internship)
    return new_internship

# -------------------------------
# Student APIs
# -------------------------------
@app.post("/student/apply", response_model=Application)
def apply_internship(application: ApplicationCreate):
    internship = next((i for i in internships if i["id"] == application.internship_id), None)
    if not internship:
        raise HTTPException(status_code=404, detail="Internship not found")

    new_application = {
        "id": str(uuid4()),
        "student_name": application.student_name,
        "internship_id": application.internship_id,
        "status": "Pending"
    }
    applications.append(new_application)
    return new_application

@app.get("/student/applications/{student_name}", response_model=List[Application])
def get_student_applications(student_name: str):
    return [a for a in applications if a["student_name"] == student_name]

# -------------------------------
# Admin APIs
# -------------------------------
@app.get("/admin/applications", response_model=List[Application])
def get_all_applications():
    return applications

@app.put("/admin/applications/{application_id}", response_model=Application)
def update_application_status(application_id: str, status: str):
    app_obj = next((a for a in applications if a["id"] == application_id), None)
    if not app_obj:
        raise HTTPException(status_code=404, detail="Application not found")
    app_obj["status"] = status
    return app_obj

@app.get("/admin/applicants", response_model=List[Applicant])
def list_applicants():
    return applicants
