from fastapi import FastAPI, APIRouter, HTTPException, Request, UploadFile, File
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
import shutil

ROOT_DIR = Path(__file__).parent
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ.get('JWT_SECRET', 'texas-bha-default-secret')
JWT_ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ==================== MODELS ====================

class Committee(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    mission: str = ""
    leadership: List[str] = []
    photo_url: str = ""
    order: int = 0
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image_url: str = ""
    status: str = "ongoing"
    outcome: str = ""
    tags: List[str] = []
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Policy(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    summary: str
    status: str = "In Progress"
    tags: List[str] = []
    category: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class GalleryItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    image_url: str
    category: str = "Events"
    date: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Chapter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    university: str = ""
    location: str
    founding_date: str = ""
    leadership: List[str] = []
    description: str = ""
    signup_link: str = ""
    lat: float = 0.0
    lng: float = 0.0
    chapter_type: str = "college"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Opportunity(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    type: str = "general"
    cta_text: str = "Learn More"
    cta_link: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str = ""
    message: str
    inquiry_type: str = "General"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Announcement(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str = ""
    active: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AdminLogin(BaseModel):
    email: str
    password: str

class ConsultingService(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class TeamMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    category: str = "Executive Board"
    bio: str = ""
    photo_url: str = ""
    order: int = 0
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Newsletter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    date: str = ""
    preview: str = ""
    content: str = ""
    link: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# ==================== AUTH HELPERS ====================

async def get_current_admin(request: Request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ==================== PUBLIC ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Texas BHA API"}

@api_router.get("/committees")
async def get_committees():
    items = await db.committees.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return items

@api_router.get("/projects")
async def get_projects():
    items = await db.projects.find({}, {"_id": 0}).to_list(100)
    return items

@api_router.get("/policies")
async def get_policies():
    items = await db.policies.find({}, {"_id": 0}).to_list(100)
    return items

@api_router.get("/gallery")
async def get_gallery():
    items = await db.gallery.find({}, {"_id": 0}).to_list(200)
    return items

@api_router.get("/chapters")
async def get_chapters():
    items = await db.chapters.find({}, {"_id": 0}).to_list(100)
    return items

@api_router.get("/opportunities")
async def get_opportunities():
    items = await db.opportunities.find({}, {"_id": 0}).to_list(100)
    return items

@api_router.get("/announcements")
async def get_announcements():
    items = await db.announcements.find({"active": True}, {"_id": 0}).to_list(50)
    return items

@api_router.get("/consulting-services")
async def get_consulting_services():
    items = await db.consulting_services.find({}, {"_id": 0}).to_list(50)
    return items

@api_router.get("/newsletters")
async def get_newsletters():
    items = await db.newsletters.find({}, {"_id": 0}).sort("date", -1).to_list(50)
    return items

@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(data: NewsletterSubscriber):
    existing = await db.newsletter_subscribers.find_one({"email": data.email}, {"_id": 0})
    if existing:
        return {"success": True, "message": "You're already subscribed!"}
    doc = data.model_dump()
    await db.newsletter_subscribers.insert_one(doc)
    return {"success": True, "message": "Successfully subscribed!"}

@api_router.get("/team")
async def get_team_members():
    items = await db.team_members.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return items

# ==================== FILE UPLOAD ====================

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico', '.heic', '.heif'}

@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload an image file and return the URL"""
    # Check file extension
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400, 
            detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Return the URL path
    return {"url": f"/api/uploads/{unique_filename}", "filename": unique_filename}

@api_router.get("/uploads/{filename}")
async def get_uploaded_file(filename: str):
    """Serve uploaded files"""
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)

# ==================== CONTACT FORM ====================

@api_router.post("/contact")
async def submit_contact(data: ContactSubmission):
    doc = data.model_dump()
    await db.contacts.insert_one(doc)
    return {"success": True, "message": "Thank you for contacting us!"}

# ==================== ADMIN AUTH ====================

@api_router.post("/admin/login")
async def admin_login(data: AdminLogin):
    admin = await db.admins.find_one({"email": data.email}, {"_id": 0})
    if not admin or not pwd_context.verify(data.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode({"email": admin["email"], "role": "admin"}, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"token": token, "email": admin["email"]}

@api_router.get("/admin/verify")
async def verify_admin(request: Request):
    admin = await get_current_admin(request)
    return {"valid": True, "email": admin["email"]}

# ==================== ADMIN CRUD ROUTES ====================

# --- Committees ---
@api_router.post("/admin/committees")
async def create_committee(data: Committee, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.committees.insert_one(doc)
    return await db.committees.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/committees/{item_id}")
async def update_committee(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.committees.update_one({"id": item_id}, {"$set": body})
    return await db.committees.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/committees/{item_id}")
async def delete_committee(item_id: str, request: Request):
    await get_current_admin(request)
    await db.committees.delete_one({"id": item_id})
    return {"success": True}

# --- Projects ---
@api_router.post("/admin/projects")
async def create_project(data: Project, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.projects.insert_one(doc)
    return await db.projects.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/projects/{item_id}")
async def update_project(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.projects.update_one({"id": item_id}, {"$set": body})
    return await db.projects.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/projects/{item_id}")
async def delete_project(item_id: str, request: Request):
    await get_current_admin(request)
    await db.projects.delete_one({"id": item_id})
    return {"success": True}

# --- Policies ---
@api_router.post("/admin/policies")
async def create_policy(data: Policy, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.policies.insert_one(doc)
    return await db.policies.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/policies/{item_id}")
async def update_policy(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.policies.update_one({"id": item_id}, {"$set": body})
    return await db.policies.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/policies/{item_id}")
async def delete_policy(item_id: str, request: Request):
    await get_current_admin(request)
    await db.policies.delete_one({"id": item_id})
    return {"success": True}

# --- Gallery ---
@api_router.post("/admin/gallery")
async def create_gallery_item(data: GalleryItem, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.gallery.insert_one(doc)
    return await db.gallery.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/gallery/{item_id}")
async def update_gallery_item(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.gallery.update_one({"id": item_id}, {"$set": body})
    return await db.gallery.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/gallery/{item_id}")
async def delete_gallery_item(item_id: str, request: Request):
    await get_current_admin(request)
    await db.gallery.delete_one({"id": item_id})
    return {"success": True}

# --- Chapters ---
@api_router.post("/admin/chapters")
async def create_chapter(data: Chapter, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.chapters.insert_one(doc)
    return await db.chapters.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/chapters/{item_id}")
async def update_chapter(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.chapters.update_one({"id": item_id}, {"$set": body})
    return await db.chapters.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/chapters/{item_id}")
async def delete_chapter(item_id: str, request: Request):
    await get_current_admin(request)
    await db.chapters.delete_one({"id": item_id})
    return {"success": True}

# --- Opportunities ---
@api_router.post("/admin/opportunities")
async def create_opportunity(data: Opportunity, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.opportunities.insert_one(doc)
    return await db.opportunities.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/opportunities/{item_id}")
async def update_opportunity(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.opportunities.update_one({"id": item_id}, {"$set": body})
    return await db.opportunities.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/opportunities/{item_id}")
async def delete_opportunity(item_id: str, request: Request):
    await get_current_admin(request)
    await db.opportunities.delete_one({"id": item_id})
    return {"success": True}

# --- Announcements ---
@api_router.post("/admin/announcements")
async def create_announcement(data: Announcement, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.announcements.insert_one(doc)
    return await db.announcements.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/announcements/{item_id}")
async def update_announcement(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.announcements.update_one({"id": item_id}, {"$set": body})
    return await db.announcements.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/announcements/{item_id}")
async def delete_announcement(item_id: str, request: Request):
    await get_current_admin(request)
    await db.announcements.delete_one({"id": item_id})
    return {"success": True}

# --- Consulting Services ---
@api_router.post("/admin/consulting-services")
async def create_consulting_service(data: ConsultingService, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.consulting_services.insert_one(doc)
    return await db.consulting_services.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/consulting-services/{item_id}")
async def update_consulting_service(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.consulting_services.update_one({"id": item_id}, {"$set": body})
    return await db.consulting_services.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/consulting-services/{item_id}")
async def delete_consulting_service(item_id: str, request: Request):
    await get_current_admin(request)
    await db.consulting_services.delete_one({"id": item_id})
    return {"success": True}

# --- Newsletters ---
@api_router.post("/admin/newsletters")
async def create_newsletter(data: Newsletter, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.newsletters.insert_one(doc)
    return await db.newsletters.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/newsletters/{item_id}")
async def update_newsletter(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.newsletters.update_one({"id": item_id}, {"$set": body})
    return await db.newsletters.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/newsletters/{item_id}")
async def delete_newsletter(item_id: str, request: Request):
    await get_current_admin(request)
    await db.newsletters.delete_one({"id": item_id})
    return {"success": True}

@api_router.get("/admin/subscribers")
async def get_subscribers(request: Request):
    await get_current_admin(request)
    items = await db.newsletter_subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items

# --- Team Members ---
@api_router.post("/admin/team")
async def create_team_member(data: TeamMember, request: Request):
    await get_current_admin(request)
    doc = data.model_dump()
    await db.team_members.insert_one(doc)
    return await db.team_members.find_one({"id": doc["id"]}, {"_id": 0})

@api_router.put("/admin/team/{item_id}")
async def update_team_member(item_id: str, request: Request):
    await get_current_admin(request)
    body = await request.json()
    body.pop("_id", None)
    body.pop("id", None)
    await db.team_members.update_one({"id": item_id}, {"$set": body})
    return await db.team_members.find_one({"id": item_id}, {"_id": 0})

@api_router.delete("/admin/team/{item_id}")
async def delete_team_member(item_id: str, request: Request):
    await get_current_admin(request)
    await db.team_members.delete_one({"id": item_id})
    return {"success": True}

# --- Admin Contacts ---
@api_router.get("/admin/contacts")
async def get_contacts(request: Request):
    await get_current_admin(request)
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items

@api_router.delete("/admin/contacts/{item_id}")
async def delete_contact(item_id: str, request: Request):
    await get_current_admin(request)
    await db.contacts.delete_one({"id": item_id})
    return {"success": True}

# ==================== SEED DATA ====================

async def seed_database():
    logger.info("Seeding database with initial data...")

    # Admin user
    admin_exists = await db.admins.find_one({"email": "admin@texasbha.org"})
    if not admin_exists:
        await db.admins.insert_one({
            "email": "admin@texasbha.org",
            "password_hash": pwd_context.hash("TexasBHA2024!"),
            "role": "admin"
        })

    # Committees
    committees = [
        Committee(name="Healthcare Consulting", description="Provides consulting services to healthcare organizations, bridging business strategy with clinical excellence.", mission="To empower healthcare organizations with data-driven solutions.", leadership=["Sarah Mitchell", "James Rodriguez"], photo_url="https://images.pexels.com/photos/7108403/pexels-photo-7108403.jpeg?auto=compress&cs=tinysrgb&w=600", order=1),
        Committee(name="Policy & Advocacy", description="Researches and advocates for evidence-based healthcare policies that impact Texas communities.", mission="To shape healthcare policy through rigorous research and advocacy.", leadership=["Dr. Emily Chen", "Marcus Williams"], photo_url="https://images.pexels.com/photos/8761541/pexels-photo-8761541.jpeg?auto=compress&cs=tinysrgb&w=600", order=2),
        Committee(name="Health Economics", description="Analyzes healthcare market dynamics, pricing strategies, and economic impacts on patient care.", mission="To advance understanding of healthcare economics.", leadership=["Priya Patel", "David Kim"], photo_url="https://images.pexels.com/photos/7108284/pexels-photo-7108284.jpeg?auto=compress&cs=tinysrgb&w=600", order=3),
        Committee(name="Community Outreach", description="Connects Texas BHA with local communities through health fairs, workshops, and volunteer programs.", mission="To bring healthcare business knowledge to underserved communities.", leadership=["Maria Gonzalez", "Tyler Johnson"], photo_url="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600", order=4),
        Committee(name="Professional Development", description="Organizes workshops, mentorship programs, and networking events to develop future healthcare leaders.", mission="To cultivate the next generation of healthcare business professionals.", leadership=["Alex Thompson", "Nina Brooks"], photo_url="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600", order=5),
        Committee(name="Technology & Innovation", description="Explores emerging technologies in healthcare including AI, telehealth, and digital health platforms.", mission="To drive innovation at the intersection of technology and healthcare.", leadership=["Kevin Zhao", "Rachel Adams"], photo_url="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600", order=6),
    ]
    for c in committees:
        await db.committees.insert_one(c.model_dump())

    # Projects
    projects = [
        Project(title="Texas Rural Health Access Study", description="Comprehensive analysis of healthcare accessibility in rural Texas counties, identifying gaps and proposing solutions.", image_url="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600", status="completed", outcome="Identified 15 underserved counties and proposed a mobile clinic network.", tags=["Research", "Rural Health"]),
        Project(title="Healthcare Startup Accelerator", description="12-week program supporting early-stage healthcare startups with mentorship, funding connections, and business strategy.", image_url="https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=600", status="ongoing", outcome="Currently mentoring 8 startups in cohort 3.", tags=["Entrepreneurship", "Mentorship"]),
        Project(title="Mental Health Policy Brief", description="Research-backed policy brief on mental health parity in Texas, submitted to state legislators.", image_url="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600", status="completed", outcome="Brief cited in 3 legislative committee hearings.", tags=["Policy", "Mental Health"]),
        Project(title="Telehealth Implementation Guide", description="Step-by-step guide for small practices to implement telehealth solutions efficiently and cost-effectively.", image_url="https://images.pexels.com/photos/4031710/pexels-photo-4031710.jpeg?auto=compress&cs=tinysrgb&w=600", status="ongoing", outcome="Guide in beta testing with 12 partner practices.", tags=["Technology", "Telehealth"]),
        Project(title="Hospital Efficiency Optimization", description="Data analytics project improving operational efficiency at partner hospitals through process optimization.", image_url="https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600", status="completed", outcome="Achieved 18% reduction in patient wait times.", tags=["Analytics", "Operations"]),
        Project(title="Community Health Worker Program", description="Training and deploying community health workers in underserved neighborhoods across Houston and Dallas.", image_url="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600", status="ongoing", outcome="25 CHWs deployed, serving 3,000+ residents.", tags=["Community", "Public Health"]),
    ]
    for p in projects:
        await db.projects.insert_one(p.model_dump())

    # Policies
    policies = [
        Policy(title="Healthcare Price Transparency", summary="Analyzing the impact of federal price transparency rules on Texas hospitals and insurance markets. Our research examines compliance rates, consumer utilization, and effects on healthcare costs.", status="Active Research", tags=["Transparency", "Pricing"], category="Market Policy"),
        Policy(title="Mental Health Parity in Texas", summary="Evaluating the enforcement of mental health parity laws across Texas health plans. Documenting gaps between federal mandates and state-level implementation.", status="Policy Brief Published", tags=["Mental Health", "Parity"], category="Health Equity"),
        Policy(title="Telehealth Regulation Reform", summary="Proposing regulatory frameworks that balance patient safety with innovation in telehealth delivery. Examining licensure, reimbursement, and cross-state practice barriers.", status="Active Research", tags=["Telehealth", "Regulation"], category="Digital Health"),
        Policy(title="Health Insurance Market Competition", summary="Studying market concentration in Texas health insurance and its effects on premiums, provider networks, and consumer choice.", status="Data Collection", tags=["Insurance", "Competition"], category="Market Policy"),
        Policy(title="Rural Healthcare Access", summary="Comprehensive policy analysis of rural hospital closures in Texas and innovative models for sustaining rural healthcare infrastructure.", status="Active Research", tags=["Rural Health", "Access"], category="Access & Equity"),
    ]
    for p in policies:
        await db.policies.insert_one(p.model_dump())

    # Gallery
    gallery_items = [
        GalleryItem(title="Annual Healthcare Conference 2024", image_url="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600", category="Conferences", date="2024-10-15"),
        GalleryItem(title="Committee Leadership Meeting", image_url="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600", category="Meetings", date="2024-09-20"),
        GalleryItem(title="Community Health Fair", image_url="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600", category="Events", date="2024-08-10"),
        GalleryItem(title="Networking Social Event", image_url="https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=600", category="Socials", date="2024-07-22"),
        GalleryItem(title="Student Chapter Summit", image_url="https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=600", category="Conferences", date="2024-06-15"),
        GalleryItem(title="Policy Research Workshop", image_url="https://images.pexels.com/photos/8761541/pexels-photo-8761541.jpeg?auto=compress&cs=tinysrgb&w=600", category="Meetings", date="2024-05-18"),
        GalleryItem(title="Volunteer Day at Local Clinic", image_url="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600", category="Events", date="2024-04-12"),
        GalleryItem(title="Professional Development Mixer", image_url="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600", category="Socials", date="2024-03-08"),
    ]
    for g in gallery_items:
        await db.gallery.insert_one(g.model_dump())

    # Chapters
    chapters = [
        Chapter(name="UT Austin", university="University of Texas at Austin", location="Austin, TX", founding_date="2022-09-01", leadership=["Jordan Lee", "Ashley Martinez"], description="The founding chapter of Texas BHA, leading initiatives in healthcare policy and consulting at UT Austin.", signup_link="#", lat=30.2849, lng=-97.7341, chapter_type="college"),
        Chapter(name="Texas A&M", university="Texas A&M University", location="College Station, TX", founding_date="2023-01-15", leadership=["Chris Walker", "Samantha Davis"], description="Focused on rural health economics and community outreach in the Brazos Valley region.", signup_link="#", lat=30.6187, lng=-96.3365, chapter_type="college"),
        Chapter(name="Rice University", university="Rice University", location="Houston, TX", founding_date="2023-04-01", leadership=["Michael Chang", "Laura Bennett"], description="Bridging the Texas Medical Center with business innovation and healthcare entrepreneurship.", signup_link="#", lat=29.7174, lng=-95.4018, chapter_type="college"),
        Chapter(name="Baylor University", university="Baylor University", location="Waco, TX", founding_date="2023-08-20", leadership=["Daniel Foster", "Emma Wilson"], description="Combining faith-based healthcare values with evidence-based business strategies.", signup_link="#", lat=31.5493, lng=-97.1467, chapter_type="college"),
        Chapter(name="University of Houston", university="University of Houston", location="Houston, TX", founding_date="2024-01-10", leadership=["Aisha Johnson", "Ryan Patel"], description="Connecting diverse perspectives in one of the nation's most diverse healthcare markets.", signup_link="#", lat=29.7199, lng=-95.3422, chapter_type="college"),
        Chapter(name="Prosper High School", university="Prosper High School", location="Prosper, TX", founding_date="2024-03-01", leadership=[], description="Introducing healthcare business to the next generation.", signup_link="#", lat=33.2362, lng=-96.8011, chapter_type="high_school"),
        Chapter(name="Bridgeland High School", university="Bridgeland High School", location="Cypress, TX", founding_date="2024-04-15", leadership=[], description="Introducing healthcare business to the next generation.", signup_link="#", lat=29.9541, lng=-95.6743, chapter_type="high_school"),
        Chapter(name="Wylie High School", university="Wylie High School", location="Wylie, TX", founding_date="2024-05-01", leadership=[], description="Introducing healthcare business to the next generation.", signup_link="#", lat=33.0151, lng=-96.5389, chapter_type="high_school"),
        Chapter(name="Round Rock High School", university="Round Rock High School", location="Round Rock, TX", founding_date="2024-06-01", leadership=[], description="Introducing healthcare business to the next generation.", signup_link="#", lat=30.5083, lng=-97.6789, chapter_type="high_school"),
        Chapter(name="Travis High School", university="Travis High School", location="Austin, TX", founding_date="2024-07-01", leadership=[], description="Introducing healthcare business to the next generation.", signup_link="#", lat=30.2302, lng=-97.7706, chapter_type="high_school"),
    ]
    for ch in chapters:
        await db.chapters.insert_one(ch.model_dump())

    # Opportunities
    opportunities = [
        Opportunity(title="Summer Healthcare Consulting Internship", description="Gain hands-on experience in healthcare consulting with our partner firms. 10-week paid program for undergraduate and graduate students.", type="internship", cta_text="Apply Now", cta_link="#"),
        Opportunity(title="Annual Health Policy Conference Volunteer", description="Join our team of volunteers for the largest student-run health policy conference in Texas. Great networking opportunity.", type="volunteer", cta_text="Sign Up", cta_link="#"),
        Opportunity(title="Community Health Fair Partnership", description="Partner with us to organize health fairs in underserved communities. We provide training, resources, and coordination support.", type="philanthropy", cta_text="Get Involved", cta_link="#"),
        Opportunity(title="Corporate Sponsorship Program", description="Support the next generation of healthcare leaders. Sponsorship packages include branding, recruitment access, and event participation.", type="sponsorship", cta_text="Learn More", cta_link="#"),
        Opportunity(title="Healthcare Innovation Challenge", description="Annual competition for innovative healthcare solutions. $10,000 in prizes and mentorship from industry leaders.", type="competition", cta_text="Register", cta_link="#"),
        Opportunity(title="Mentorship Program", description="Connect with experienced healthcare professionals for personalized career guidance. Available for all Texas BHA members.", type="professional_development", cta_text="Join Program", cta_link="#"),
    ]
    for o in opportunities:
        await db.opportunities.insert_one(o.model_dump())

    # Announcements
    announcements = [
        Announcement(title="Spring 2025 Membership Drive Now Open", content="Join Texas BHA and access exclusive resources, networking events, and career opportunities.", active=True),
        Announcement(title="Annual Conference Registration Opens March 1", content="Early bird pricing available for the 2025 Texas Healthcare Business Conference.", active=True),
        Announcement(title="New Chapter at SMU - Welcome Mustangs!", content="We're excited to announce our newest chapter at Southern Methodist University.", active=True),
        Announcement(title="Healthcare Innovation Challenge - Applications Due April 15", content="Submit your innovative healthcare solutions for a chance to win $10,000.", active=True),
        Announcement(title="Summer Internship Placements - Apply by March 30", content="Exclusive consulting internship opportunities with our partner firms.", active=True),
    ]
    for a in announcements:
        await db.announcements.insert_one(a.model_dump())

    # Consulting Services
    services = [
        ConsultingService(title="Strategic Planning", description="Comprehensive strategic planning services for healthcare organizations, including market analysis, competitive positioning, and growth strategies.", icon="target"),
        ConsultingService(title="Operational Efficiency", description="Process optimization and workflow analysis to reduce costs and improve patient outcomes in clinical and administrative settings.", icon="settings"),
        ConsultingService(title="Financial Analysis", description="Healthcare financial modeling, revenue cycle optimization, and cost-benefit analyses for capital investments and program launches.", icon="bar-chart"),
        ConsultingService(title="Policy Advisory", description="Expert guidance on healthcare regulatory compliance, policy impact assessment, and government relations strategy.", icon="shield"),
        ConsultingService(title="Technology Assessment", description="Evaluation and implementation planning for health IT systems, EHRs, telehealth platforms, and digital health tools.", icon="cpu"),
        ConsultingService(title="Market Research", description="Primary and secondary research on healthcare markets, consumer behavior, and industry trends to inform strategic decisions.", icon="search"),
    ]
    for s in services:
        await db.consulting_services.insert_one(s.model_dump())

    logger.info("Database seeded successfully!")
    
    # Newsletters
    newsletters = [
        Newsletter(title="Texas BHA Spring 2025 Newsletter", date="2025-03-01", preview="Highlights from our spring membership drive, upcoming conference details, and new chapter announcements.", link="#"),
        Newsletter(title="Healthcare Innovation Spotlight - Q4 2024", date="2024-12-15", preview="Year-end recap of our consulting projects, policy briefs, and the Healthcare Innovation Challenge winners.", link="#"),
        Newsletter(title="Chapter Expansion Update - Fall 2024", date="2024-10-01", preview="Three new chapters launched this fall! Read about our expansion to SMU, UNT, and Texas State.", link="#"),
        Newsletter(title="Summer Internship Recap 2024", date="2024-08-15", preview="Our interns share their experiences at top healthcare consulting firms and hospitals across Texas.", link="#"),
    ]
    for n in newsletters:
        await db.newsletters.insert_one(n.model_dump())

    # Team Members
    team_members = [
        TeamMember(name="Jordan Lee", role="President", category="Executive Board", bio="Senior, Healthcare Administration minor. Leading Texas BHA's strategic vision and institutional partnerships.", photo_url="", order=1),
        TeamMember(name="Ashley Martinez", role="Vice President", category="Executive Board", bio="Junior, Pre-Med & Business. Overseeing committee operations and cross-functional initiatives.", photo_url="", order=2),
        TeamMember(name="Chris Walker", role="Treasurer", category="Executive Board", bio="Senior, Finance & Healthcare Admin. Managing organizational finances and sponsorship programs.", photo_url="", order=3),
        TeamMember(name="Samantha Davis", role="Secretary", category="Executive Board", bio="Junior, Public Health. Managing communications, meeting coordination, and organizational records.", photo_url="", order=4),
        TeamMember(name="Sarah Mitchell", role="Consulting Committee Lead", category="Committee Leads", bio="Leads our consulting engagements with healthcare organizations across Texas.", photo_url="", order=10),
        TeamMember(name="Dr. Emily Chen", role="Policy Committee Lead", category="Committee Leads", bio="Directs healthcare policy research and legislative advocacy initiatives.", photo_url="", order=11),
        TeamMember(name="Michael Chang", role="Expansion Committee Lead", category="Committee Leads", bio="Drives chapter growth at universities across the state.", photo_url="", order=12),
        TeamMember(name="Rachel Adams", role="Outreach Committee Lead", category="Committee Leads", bio="Manages branding, social media, and event promotion strategy.", photo_url="", order=13),
        TeamMember(name="Maria Gonzalez", role="Philanthropy Committee Lead", category="Committee Leads", bio="Coordinates community health initiatives and volunteer programs.", photo_url="", order=14),
    ]
    for t in team_members:
        await db.team_members.insert_one(t.model_dump())

# ==================== APP SETUP ====================

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    count = await db.committees.count_documents({})
    if count == 0:
        await seed_database()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
