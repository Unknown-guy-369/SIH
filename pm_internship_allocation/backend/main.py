# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# Data Models



class Internship(BaseModel):
    id: Optional[str] = None
    title: str
    department: str
    positions: int
    duration: int       # months
    stipend: int
    deadline: str       # ISO date string
    skills: List[str]
    description: str
    status: str
    location: str
    applicants: int
    filled: int
    


class Application(BaseModel):
    id: str
    student_id: str
    internship_id: str
    status: str = "Pending" 

class ApplicationCreate(BaseModel):
    student_id: str
    internship_id: str


# In-Memory Storage (prototype)

internships: List[Internship] = []
applications: List[Application] = []
# -------------------------------
# Industry APIs
# -------------------------------
@app.post("/industry/internships", response_model=Internship)
def create_internship(internship: Internship):
    
    internship.id = str(uuid4())
    internships.append(internship)
    return internship

@app.get("/industry/internships", response_model=List[Internship])
def list_internships():
    return internships

# -------------------------------
# Student APIs
# -------------------------------
@app.post("/student/apply", response_model=Application)
def apply_internship(application: ApplicationCreate):
    # check internship exists
    print(internships)
    internship = next((i for i in internships if i.id == application.internship_id), None)
    if not internship:
        raise HTTPException(status_code=404, detail="Internship not found")
    
    new_application = Application(
        id=str(uuid4()),
        student_id=application.student_id,
        internship_id=application.internship_id,
    )
    applications.append(new_application)
    print(applications)
    return new_application

@app.get("/student/applications/{student_name}", response_model=List[Application])
def get_student_applications(student_name: str):
    return [app for app in applications if app.student_name == student_name]

# -------------------------------
# Admin APIs
# -------------------------------
@app.get("/admin/applications", response_model=List[Application])
def get_all_applications():
    return applications

@app.put("/admin/applications/{application_id}", response_model=Application)
def update_application_status(application_id: str, status: str):
    app_obj = next((a for a in applications if a.id == application_id), None)
    if not app_obj:
        raise HTTPException(status_code=404, detail="Application not found")
    
    app_obj.status = status
    return app_obj

# -------------------------------
# CORS Middleware
# -------------------------------
origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
