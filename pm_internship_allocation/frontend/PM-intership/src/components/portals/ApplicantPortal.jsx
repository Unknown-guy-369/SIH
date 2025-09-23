//ApplicantPortal.jsx
import React, { useState, useEffect } from 'react';
import { 
  User, 
  BookOpen, 
  MapPin, 
  Star, 
  Upload, 
  Save, 
  Edit3,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Heart,
  Award,
  Building2,
  Calendar,
  Phone,
  Mail,
  GraduationCap,
  Code,
  Target,
  TrendingUp,
  Download,
  Eye,
  Plus,
  X,
  LogOut,
  Home
} from 'lucide-react';

// EXTRACTED COMPONENT: This component is now defined outside the main function
const CreateProfileSection = ({
  newProfileData,
  setNewProfileData,
  newSkill,
  setNewSkill,
  handleCreateProfile,
  availableSkills
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Your Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={newProfileData.name}
            onChange={(e) => setNewProfileData({ ...newProfileData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={newProfileData.email}
            onChange={(e) => setNewProfileData({ ...newProfileData, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={newProfileData.phone}
            onChange={(e) => setNewProfileData({ ...newProfileData, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
          <input
            type="text"
            name="college"
            value={newProfileData.college}
            onChange={(e) => setNewProfileData({ ...newProfileData, college: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <input
            type="text"
            name="department"
            value={newProfileData.department}
            onChange={(e) => setNewProfileData({ ...newProfileData, department: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Year</label>
          <select
            name="year"
            value={newProfileData.year}
            onChange={(e) => setNewProfileData({ ...newProfileData, year: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CGPA</label>
          <input
            type="text"
            name="cgpa"
            value={newProfileData.cgpa}
            onChange={(e) => setNewProfileData({ ...newProfileData, cgpa: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
          <input
            type="text"
            name="location"
            value={newProfileData.location}
            onChange={(e) => setNewProfileData({ ...newProfileData, location: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <h4 className="font-semibold text-gray-900">Skills & Expertise</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {newProfileData.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => setNewProfileData({...newProfileData, skills: newProfileData.skills.filter(s => s !== skill)})}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Type to add a skill..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {newSkill && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto">
              {availableSkills.filter(skill =>
                skill.toLowerCase().includes(newSkill.toLowerCase()) && !newProfileData.skills.includes(skill)
              ).map((skill, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setNewProfileData({...newProfileData, skills: [...newProfileData.skills, skill]});
                    setNewSkill('');
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        onClick={handleCreateProfile}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Save Profile & Continue
      </button>
    </div>
  );
};

export default function ApplicantPortal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [newProfileData, setNewProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '1st Year',
    cgpa: '',
    location: '',
    skills: [],
    profilePicture: null
  });
  const [resume, setResume] = useState(null);


  const [allocationSkills, setAllocationSkills] = useState('');
  const [allocations, setAllocations] = useState([]);
  const [allocError, setAllocError] = useState('');
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const sampleProfiles = [
    {
      id: "P1",
      name: "Priya Sharma",
      email: "priya.sharma@student.edu",
      phone: "+91 98765 43210",
      college: "Indian Institute of Technology, Delhi",
      department: "Computer Science Engineering",
      year: "3rd Year",
      cgpa: "8.7",
      location: "Delhi",
      preferredLocations: ["Delhi", "Mumbai", "Bangalore"],
      profilePicture: null,
      skills: ["Python", "JavaScript", "React", "Node.js"]
    },
    {
      id: "P2",
      name: "Rohan Verma",
      email: "rohan.verma@student.edu",
      phone: "+91 91234 56789",
      college: "Vellore Institute of Technology",
      department: "Mechanical Engineering",
      year: "4th Year",
      cgpa: "8.5",
      location: "Vellore",
      preferredLocations: ["Chennai", "Bangalore"],
      profilePicture: null,
      skills: ["SolidWorks", "AutoCAD", "MATLAB", "Finite Element Analysis"]
    }
  ];

  const applications = [
    {
      id: 1,
      company: "Digital India Corporation",
      role: "Full Stack Developer Intern",
      location: "Delhi",
      duration: "3 months",
      stipend: "₹25,000/month",
      status: "allocated",
      matchScore: 92.5,
      appliedDate: "2025-01-15",
      skills: ["React", "Node.js", "MongoDB", "Python"]
    },
    {
      id: 2,
      company: "National Informatics Centre",
      role: "Data Science Intern",
      location: "Noida",
      duration: "6 months",
      stipend: "₹30,000/month",
      status: "pending",
      matchScore: 88.3,
      appliedDate: "2025-01-20",
      skills: ["Python", "Machine Learning", "SQL"]
    },
  ];

  const availableSkills = [
    "Python", "JavaScript", "React", "Node.js", "MongoDB", "SQL", "C++", "Java", "HTML", "CSS", "TypeScript", "PHP",
    "Machine Learning", "Data Science", "Cybersecurity", "React Native", "Flutter", "UI/UX Design", "Product Management",
    "Agile", "Scrum", "DevOps", "Cloud Computing (AWS/Azure/GCP)", "Data Analysis", "Financial Modeling", "CAD",
    "Communication", "Teamwork", "Problem Solving", "Critical Thinking", "Adaptability", "Time Management", "Leadership",
    "Creativity", "Attention to Detail", "Negotiation", "Public Speaking", "Writing", "Research", "Project Management"
  ];
  const [skills, setSkills] = useState(currentProfile ? currentProfile.skills : []);
  const [newSkill, setNewSkill] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);


  useEffect(() => {
    setProfiles(sampleProfiles);
    fetch("http://localhost:8000/industry/internships")
      .then((res) => res.json())
      .then((data) => setInternships(data))
      .catch((err) => console.error("Error fetching internships:", err));
  }, []);
  
  useEffect(() => {
    if (newSkill.trim() !== '') {
      setFilteredSkills(availableSkills.filter(skill =>
        skill.toLowerCase().includes(newSkill.toLowerCase()) && !skills.includes(skill)
      ));
    } else {
      setFilteredSkills([]);
    }
  }, [newSkill, skills]);
  
  useEffect(() => {
    if (currentProfile) {
      setSkills(currentProfile.skills);
      setIsEditing(false);
    }
  }, [currentProfile]);


  const handleCreateProfile = () => {
    if (newProfileData.name && newProfileData.email) {
      const newId = `P${profiles.length + 1}`;
      const newFullProfile = { ...newProfileData, id: newId, skills: newProfileData.skills.map(s => s.trim()) };
      setProfiles([...profiles, newFullProfile]);
      setCurrentProfile(newFullProfile);
      setNewProfileData({
        name: '', email: '', phone: '', college: '', department: '', year: '1st Year', cgpa: '', location: '', skills: [], profilePicture: null
      });
      setIsLoggedIn(true);
      setIsCreatingProfile(false);
      // Change made here: Redirect to 'home' instead of 'profile'
      setActiveTab('home'); 
    } else {
      alert("Please fill in at least Name and Email.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentProfile(null);
    setActiveTab('home');
  };

  const handleLogin = (profileId) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setCurrentProfile(profile);
      setIsLoggedIn(true);
      setActiveTab('profile');
      setIsCreatingProfile(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setCurrentProfile({
      ...currentProfile,
      [name]: value
    });
  };
  
  const addSkill = (skillToAdd) => {
    if (!skills.includes(skillToAdd)) {
      setSkills([...skills, skillToAdd]);
      setNewSkill('');
    }
  };
  
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleSaveProfile = () => {
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, skills: skills };
      const updatedProfiles = profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p);
      setProfiles(updatedProfiles);
      setCurrentProfile(updatedProfile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      alert('Resume uploaded successfully!');
    } else {
      setResume(null);
      alert('Please upload a valid PDF file.');
    }
  };



  const handleApply = async (internshipId) => {
    if (!currentProfile) {
      alert("Please log in or create a profile to apply.");
      return;
    }
    try {
      await fetch("http://127.0.0.1:8000/student/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: currentProfile.id, student_skill: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()), internship_id: internshipId }),
      });
      alert(`Applied to internship ${internshipId} ✅`);
    } catch (err) {
      console.error("Error applying:", err);
    }
  };

  const Header = () => (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Student Internship Portal</h1>
              <p className="text-blue-200">Government of India - Skill Development Initiative</p>
            </div>
          </div>
          {isLoggedIn && currentProfile && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-blue-200">Welcome back,</p>
                <p className="font-medium">{currentProfile.name}</p>
              </div>
              <div className="bg-blue-700 p-2 rounded-full">
                <User className="h-6 w-6" />
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );

  const Navigation = () => {
    const navItems = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'profile', label: 'My Profile', icon: User, requiresLogin: true },
      { id: 'applications', label: 'My Applications', icon: FileText, requiresLogin: true },
      { id: 'browse', label: 'Browse Internships', icon: Search },
      { id: 'status', label: 'Application Status', icon: Clock, requiresLogin: true },
      { id: 'allocation', label: 'Check Allocation', icon: Award, requiresLogin: true },
    ];
  
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map(tab => {
              const IconComponent = tab.icon;
              if (tab.requiresLogin && !isLoggedIn) return null;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    );
  };
  
  const HomePage = () => (
    <div className="bg-white rounded-lg shadow p-8 text-center space-y-4">
      <GraduationCap className="h-16 w-16 mx-auto text-blue-500" />
      <h2 className="text-2xl font-bold text-gray-900">Welcome to the Student Internship Portal</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        This is a government initiative to connect students with valuable internship opportunities across various public and private sector organizations.
      </p>
      <div className="flex justify-center space-x-4">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => setActiveTab('profile')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              View My Profile
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg hover:bg-gray-300 transition-colors"
            >
              Browse Internships
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsCreatingProfile(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              Create New Profile
            </button>
            <div className="mt-4">
              <label htmlFor="profile-select" className="text-sm font-medium text-gray-700">Or Select an existing profile:</label>
              <select
                id="profile-select"
                onChange={(e) => handleLogin(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">-- Select Profile --</option>
                {profiles.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
  const ProfileSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(currentProfile).filter(([key]) => ['name', 'email', 'phone', 'college', 'department', 'year', 'cgpa', 'location'].includes(key)).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
  
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Skills & Expertise</h3>
          <p className="text-sm text-gray-600 mt-1">Add your technical and professional skills</p>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
          {isEditing && (
            <div className="relative">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Type to add a skill..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {filteredSkills.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto">
                  {filteredSkills.map((skill, index) => (
                    <li
                      key={index}
                      onClick={() => addSkill(skill)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* New Resume Upload Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Upload Resume</h3>
          <p className="text-sm text-gray-600 mt-1">Upload your latest resume in PDF format.</p>
        </div>
        <div className="p-6">
          <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-2">Resume File (.pdf)</label>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>{resume ? 'Change File' : 'Upload Resume'}</span>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
            {resume && (
              <span className="text-sm text-gray-600">
                <FileText className="h-4 w-4 inline-block mr-1" />
                {resume.name} ({Math.round(resume.size / 1024)} KB)
              </span>
            )}
          </div>
          {!resume && (
            <p className="text-xs text-red-500 mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              No resume uploaded.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const ApplicationsSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
          <p className="text-sm text-gray-600 mt-1">Track your internship application status</p>
        </div>
        <div className="divide-y">
          {applications.map(application => {
            let statusClass = 'bg-yellow-100 text-yellow-800';
            let StatusIcon = Clock;
            
            if (application.status === 'allocated') {
              statusClass = 'bg-green-100 text-green-800';
              StatusIcon = CheckCircle;
            } else if (application.status === 'under_review') {
              statusClass = 'bg-blue-100 text-blue-800';
              StatusIcon = Eye;
            }
            
            return (
              <div key={application.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{application.role}</h4>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Building2 className="h-4 w-4 mr-1" />
                      {application.company}
                    </p>
                    <p className="text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {application.location} • {application.duration} • {application.stipend}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusClass}`}>
                      <StatusIcon className="h-4 w-4 mr-1" />
                      {application.status.replace('_', ' ')}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">Match: {application.matchScore}%</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {application.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Applied: {application.appliedDate}</span>
                  {application.status === 'allocated' && (
                    <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>Download Offer Letter</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const BrowseSection = () => {
    const filteredInternships = internships.filter((internship) =>
      internship.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Available Internships</h3>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search internships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="border px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>
          <div className="divide-y">
            {filteredInternships.map((internship) => (
              <div key={internship.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{internship.title}</h4>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Building2 className="h-4 w-4 mr-1" />
                      {internship.company || "Unknown Company"}
                    </p>
                    <p className="text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {internship.location || "Remote"} • {internship.duration || "N/A"} •{" "}
                      {internship.stipend || "Unpaid"}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{internship.description || "No description provided."}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{internship.matchScore || 0}% match</span>
                    </div>
                    <button
                      onClick={() => handleApply(internship.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(internship.skills || internship.req_skills?.split(";") || []).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Deadline: {internship.deadline || "N/A"}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const StatusSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Application Timeline</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {[
              { step: 'Profile Submission', status: 'completed', date: '2025-01-10', description: 'Profile and documents uploaded successfully' },
              { step: 'AI Matching', status: 'completed', date: '2025-01-12', description: 'Skills matched with available internships' },
              { step: 'Application Review', status: 'in-progress', date: '2025-01-20', description: 'Applications under review by companies' },
              { step: 'Interview Process', status: 'pending', date: 'TBD', description: 'Selected candidates will be notified' },
              { step: 'Final Allocation', status: 'pending', date: 'TBD', description: 'Final internship assignments' }
            ].map((item, index) => {
              let statusClass = 'bg-gray-100 text-gray-400';
              let StatusIcon = Clock;
              
              if (item.status === 'completed') {
                statusClass = 'bg-green-100 text-green-600';
                StatusIcon = CheckCircle;
              } else if (item.status === 'in-progress') {
                statusClass = 'bg-blue-100 text-blue-600';
                StatusIcon = TrendingUp;
              }
              
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusClass}`}>
                    <StatusIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{item.step}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <span className="text-sm text-gray-400">{item.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

    const AllocationSection = () => {
    // Get allocated applications from the applications data
    const allocatedApplications = applications.filter(app => app.status === 'allocated');

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="border-b pb-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Allocated Internships</h3>
            <p className="text-sm text-gray-600 mt-1">Congratulations on your internship allocation!</p>
          </div>
          
          {allocatedApplications.length > 0 ? (
            <div className="space-y-6">
              {allocatedApplications.map(application => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">{application.role}</h4>
                      <p className="text-gray-700 font-medium mb-2">{application.company}</p>
                      <p className="text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        {application.location} • {application.duration} • {application.stipend}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {application.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Applied on: {application.appliedDate}</span>
                        <span className="flex items-center text-green-600 font-medium">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Allocation Confirmed
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right ml-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-3">
                        <span className="text-blue-800 font-semibold text-lg">{application.matchScore}%</span>
                        <p className="text-blue-600 text-sm">Match Score</p>
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Download Offer Letter</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h4 className="text-lg font-semibold text-gray-600 mb-2">No Allocated Internships</h4>
              <p className="text-gray-500">Your allocated internships will appear here once they are assigned.</p>
              <p className="text-sm text-gray-400 mt-1">Check your application status for updates.</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  const renderContent = () => {
    if (isCreatingProfile) {
      // Pass the state and handlers as props to the external component
      return (
        <CreateProfileSection
          newProfileData={newProfileData}
          setNewProfileData={setNewProfileData}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          handleCreateProfile={handleCreateProfile}
          availableSkills={availableSkills}
        />
      );
    }
    
    if (!isLoggedIn) {
      return <HomePage />;
    }
    
    switch(activeTab) {
      case 'home':
        return <HomePage />;
      case 'profile': 
        return currentProfile ? <ProfileSection /> : <HomePage />;
      case 'applications': 
        return <ApplicationsSection />;
      case 'browse': 
        return <BrowseSection />;
      case 'status': 
        return <StatusSection />;
      case 'allocation': 
        return <AllocationSection />;
      default: 
        return (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Resources Coming Soon</h3>
            <p className="text-gray-600">Study materials and career guidance will be available here.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2025 Government of India - Skill Development Initiative. All rights reserved.</p>
        </div>
      </footer>
    </div>
);}
