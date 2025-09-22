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
  X
} from 'lucide-react';




export default function ApplicantPortal() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(['Python', 'JavaScript', 'React', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('pending');

  // For allocation check
  const [allocationSkills, setAllocationSkills] = useState('');
  const [allocations, setAllocations] = useState([]);
  const [allocError, setAllocError] = useState('');

  const [student, setStudent] = useState({ id: "s1", name: "Alice", skills: "Python, Pandas", past_participation: 0 });
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/industry/internships")
      .then((res) => res.json())
      .then((data) => setInternships(data));
  }, []);

  const handleApply = async (internshipId) => {
    await fetch("http://localhost:8000/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: student.id,
        internship_id: internshipId,
      }),
    });
    alert("Applied successfully ✅");
  };

  const applicantData = {
    name: "Priya Sharma",
    email: "priya.sharma@student.edu",
    phone: "+91 98765 43210",
    college: "Indian Institute of Technology, Delhi",
    department: "Computer Science Engineering",
    year: "3rd Year",
    cgpa: "8.7",
    location: "Delhi",
    preferredLocations: ["Delhi", "Mumbai", "Bangalore"],
    profilePicture: null
  };

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
    {
      id: 3,
      company: "ISRO - Space Applications Centre",
      role: "Software Engineering Intern",
      location: "Ahmedabad",
      duration: "4 months",
      stipend: "₹28,000/month",
      status: "under_review",
      matchScore: 85.7,
      appliedDate: "2025-01-18",
      skills: ["C++", "Python", "MATLAB"]
    }
  ];

  const availableInternships = [
    {
      id: 4,
      company: "Indian Railways - CRIS",
      role: "Mobile App Developer",
      location: "New Delhi",
      duration: "3 months",
      stipend: "₹22,000/month",
      deadline: "2025-02-28",
      matchScore: 91.2,
      skills: ["React Native", "Flutter", "JavaScript"],
      description: "Develop mobile applications for railway passenger services"
    },
    {
      id: 5,
      company: "DRDO - Defence Research",
      role: "Cybersecurity Analyst",
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹35,000/month",
      deadline: "2025-03-15",
      matchScore: 79.8,
      skills: ["Network Security", "Python", "Ethical Hacking"],
      description: "Work on cybersecurity solutions for defense systems"
    }
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleCheckAllocation = async () => {
    setAllocError('');
    setAllocations([]);
    try {
      const response = await fetch("http://localhost:8000/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicants: [{
            id: "A1",
            name: applicantData.name,
            skills: allocationSkills,
            applied_id: "I1",
            past_participation: 0
          }],
          internships: [],
          mode: "greedy",
          skip_prev: true,
        }),
      });
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setAllocations(data.allocations || []);
    } catch (err) {
      setAllocError('Could not fetch allocation. Please try again.');
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
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-blue-200">Welcome back,</p>
              <p className="font-medium">{applicantData.name}</p>
            </div>
            <div className="bg-blue-700 p-2 rounded-full">
              <User className="h-6 w-6" />
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const Navigation = () => {
    const navItems = [
      { id: 'profile', label: 'My Profile', icon: User },
      { id: 'applications', label: 'My Applications', icon: FileText },
      { id: 'browse', label: 'Browse Internships', icon: Search },
      { id: 'status', label: 'Application Status', icon: Clock },
      { id: 'allocation', label: 'Check Allocation', icon: Award }, // <-- new tab
      { id: 'resources', label: 'Resources', icon: BookOpen }
    ];

    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map(tab => {
              const IconComponent = tab.icon;
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

  const ProfileSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={applicantData.name}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={applicantData.email}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={applicantData.phone}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
              <input
                type="text"
                value={applicantData.college}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                value={applicantData.department}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Year</label>
              <select
                value={applicantData.year}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
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
                value={applicantData.cgpa}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
              <input
                type="text"
                value={applicantData.location}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
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
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add new skill..."
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <button
                onClick={addSkill}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>
      </div>


    </div>
  );


  // My Application page
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

  //< ----Browse section page ----- >
const BrowseSection = () => {
  const [availableInternships, setAvailableInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate logged-in student (replace with actual auth later)
  const student = { id: "S1", name: "Alice", skills: "Python, Pandas", past_participation: 0 };

  // Fetch internships from backend
  useEffect(() => {
    fetch("http://localhost:8000/industry/internships")
      .then((res) => res.json())
      .then((data) => setAvailableInternships(data))
      .catch((err) => console.error("Error fetching internships:", err));
  }, []);

  // Apply to internship
  const handleApply = async (internshipId) => {
    try {
      await fetch("http://127.0.0.1:8000/student/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: student.id, internship_id: internshipId }),
      });
      alert(`Applied to internship ${internshipId} ✅`);
    } catch (err) {
      console.error("Error applying:", err);
    }
  };
console.log(student);

  // Filter internships
  const filteredInternships = availableInternships.filter((internship) =>
    internship.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
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

        {/* Internship List */}
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

              {/* Skills */}
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

              {/* Footer */}
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

  const AllocationSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Check Allocation</h3>
        <input
          type="text"
          placeholder="Enter your skills (comma separated)"
          value={allocationSkills}
          onChange={e => setAllocationSkills(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleCheckAllocation}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          Check Allocation
        </button>
        {allocError && <p className="text-red-500 mt-2">{allocError}</p>}
        <ul className="mt-4 space-y-2">
          {allocations.map((alloc, i) => (
            <li key={i} className="p-3 border rounded bg-gray-50">
              {alloc.app_name} → {alloc.int_title} ({(alloc.score * 100).toFixed(1)}%)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'profile': 
        return <ProfileSection />;
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
  );
}