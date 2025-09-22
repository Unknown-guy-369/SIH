import React, { useState, useEffect } from 'react';
import axios from "axios";
import { 
  Plus, Edit3, Eye, Trash2,User,FileText, Building2, BarChart3, Settings, Save, CheckCircle, Clock, AlertCircle, MapPin, Calendar, DollarSign, Target, Award, Filter, Search, Download, Upload, Star, TrendingUp, Activity, Mail, Phone, Globe, Briefcase, Code, Database
} from 'lucide-react';

const API_BASE = "http://127.0.0.1:8000"; // FastAPI backend

export default function IndustryPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCreatingInternship, setIsCreatingInternship] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const companyData = {
    name: "Digital India Corporation",
    type: "Government Enterprise",
    sector: "Information Technology",
    location: "New Delhi",
    website: "www.digitalindia.gov.in",
    email: "hr@digitalindia.gov.in",
    phone: "+91 ",
    contactPerson: "Ms. Anita Kumari",
    designation: "HR Manager"
  };

  const internshipStats = {
    totalPositions: 25,
    filledPositions: 18,
    pendingApplications: 47,
    activeListings: 5,
    completedInternships: 156,
    averageRating: 4.6
  };

  const internshipListings = [
    {
      id: 1,
      title: "Full Stack Developer Intern",
      department: "Software Development",
      positions: 5,
      filled: 3,
      applicants: 23,
      skills: ["React", "Node.js", "MongoDB", "Python"],
      location: "Delhi",
      duration: "3 months",
      stipend: "₹25,000",
      deadline: "2025-03-15",
      status: "active",
      description: "Work on government digital platforms and citizen services applications."
    },
    {
      id: 2,
      title: "Data Science Intern",
      department: "Analytics Division",
      positions: 3,
      filled: 2,
      applicants: 15,
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      location: "Delhi",
      duration: "6 months",
      stipend: "₹30,000",
      deadline: "2025-03-20",
      status: "active",
      description: "Analyze government data to derive insights for policy making."
    },
    {
      id: 3,
      title: "UI/UX Designer Intern",
      department: "Design Team",
      positions: 2,
      filled: 2,
      applicants: 18,
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      location: "Delhi",
      duration: "4 months",
      stipend: "₹22,000",
      deadline: "2025-02-28",
      status: "filled",
      description: "Design user interfaces for government digital services."
    }
  ];

  const applicants = [
    {
      id: 1,
      name: "Rahul Kumar",
      college: "IIT Delhi",
      branch: "Computer Science",
      year: "3rd Year",
      cgpa: "9.2",
      skills: ["React", "Node.js", "Python", "AWS"],
      appliedFor: "Full Stack Developer Intern",
      appliedDate: "2025-01-15",
      matchScore: 94.5,
      status: "shortlisted",
      resumeUrl: "#",
      portfolioUrl: "https://rahul-portfolio.com"
    },
    {
      id: 2,
      name: "Priya Sharma",
      college: "BITS Pilani",
      branch: "Information Technology",
      year: "4th Year",
      cgpa: "8.8",
      skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
      appliedFor: "Data Science Intern",
      appliedDate: "2025-01-18",
      matchScore: 92.3,
      status: "under_review",
      resumeUrl: "#",
      portfolioUrl: "https://priya-datascience.com"
    },
    {
      id: 3,
      name: "Vikash Patel",
      college: "NIT Trichy",
      branch: "Electronics Engineering",
      year: "3rd Year",
      cgpa: "8.5",
      skills: ["JavaScript", "React", "CSS", "Figma"],
      appliedFor: "UI/UX Designer Intern",
      appliedDate: "2025-01-20",
      matchScore: 88.7,
      status: "selected",
      resumeUrl: "#",
      portfolioUrl: "https://vikash-design.com"
    }
  ];

  const StatsCard = ({ title, value, subtitle, icon, color }) => {
    const IconComponent = icon;
    let bgClass = "bg-blue-100";
    let textClass = "text-blue-600";
    
    if (color === 'green') {
      bgClass = "bg-green-100";
      textClass = "text-green-600";
    } else if (color === 'emerald') {
      bgClass = "bg-emerald-100";
      textClass = "text-emerald-600";
    } else if (color === 'amber') {
      bgClass = "bg-amber-100";
      textClass = "text-amber-600";
    }
    
    return (
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <div className="flex items-center">
          <div className={`${bgClass} p-3 rounded-lg`}>
            <IconComponent className={`h-6 w-6 ${textClass}`} />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>
      </div>
    );
  };

  const Header = () => (
    <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-lg">
              <Building2 className="h-8 w-8 text-blue-800" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Industry Partnership Portal</h1>
              <p className="text-blue-200">Government Internship Program</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-blue-200">{companyData.name}</p>
              <p className="font-medium">{companyData.contactPerson}</p>
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
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'internships', label: 'Manage Internships', icon: Briefcase },
      { id: 'applicants', label: 'View Applicants', icon: User },
      { id: 'selected', label: 'Selected Candidates', icon: CheckCircle },
      { id: 'reports', label: 'Reports & Analytics', icon: FileText },
      { id: 'profile', label: 'Company Profile', icon: Building2 }
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

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Positions" 
          value={internshipStats.totalPositions} 
          subtitle="Available internships"
          icon={Briefcase} 
        />
        <StatsCard 
          title="Filled Positions" 
          value={internshipStats.filledPositions} 
          subtitle={`${Math.round((internshipStats.filledPositions/internshipStats.totalPositions)*100)}% filled`}
          icon={CheckCircle} 
          color="green"
        />
        <StatsCard 
          title="Pending Applications" 
          value={internshipStats.pendingApplications} 
          subtitle="Awaiting review"
          icon={Clock} 
          color="amber"
        />
        <StatsCard 
          title="Average Rating" 
          value={internshipStats.averageRating} 
          subtitle="Student feedback"
          icon={Star} 
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Active Internship Listings</h3>
          </div>
          <div className="divide-y">
            {internshipListings.filter(listing => listing.status === 'active').map(listing => (
              <div key={listing.id} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{listing.title}</h4>
                    <p className="text-sm text-gray-600">{listing.department}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {listing.positions} positions • {listing.filled} filled • {listing.applicants} applicants
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {listing.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {listing.skills.length > 3 && (
                    <span className="text-xs text-gray-500">+{listing.skills.length - 3} more</span>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{listing.stipend}/month • {listing.duration}</span>
                  <span>Deadline: {listing.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y">
            {[
              { type: 'application', message: 'New application from Rahul Kumar', time: '2 hours ago' },
              { type: 'shortlist', message: 'Priya Sharma shortlisted for Data Science role', time: '4 hours ago' },
              { type: 'selection', message: 'Vikash Patel selected for UI/UX position', time: '1 day ago' },
              { type: 'completion', message: 'Internship completed by Anita Singh', time: '2 days ago' }
            ].map((activity, index) => {
              let iconClass = 'text-blue-600';
              let ActivityIcon = Activity;
              
              if (activity.type === 'shortlist') {
                iconClass = 'text-yellow-600';
                ActivityIcon = Eye;
              } else if (activity.type === 'selection') {
                iconClass = 'text-green-600';
                ActivityIcon = CheckCircle;
              } else if (activity.type === 'completion') {
                iconClass = 'text-purple-600';
                ActivityIcon = Award;
              }
              
              return (
                <div key={index} className="p-4">
                  <div className="flex items-start space-x-3">
                    <ActivityIcon className={`h-5 w-5 ${iconClass} mt-0.5`} />
                    <div>
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
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



const InternshipsSection = () => {
  const [isCreatingInternship, setIsCreatingInternship] = useState(false);
  const [internshipListings, setInternshipListings] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    positions: 1,
    duration: 1,
    stipend: 0,
    deadline: "",
    skills: "",
    description: "",
    location: "Remote",
  });

  // Fetch internships from backend
  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await axios.get(`${API_BASE}/industry/internships`);
      setInternshipListings(res.data);
    } catch (err) {
      console.error("Error fetching internships:", err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new internship
  const handleCreateInternship = async () => {
    try {
      const payload = {
  title: formData.title,
  department: formData.department,
  positions: parseInt(formData.positions),
  duration: parseInt(formData.duration), // number only
  stipend: parseInt(formData.stipend),   // number only
  deadline: formData.deadline,           // string (ISO date) or Date
  skills: formData.skills.split(",").map((s) => s.trim()),
  description: formData.description,
  status: "active",
  location: formData.location,
  applicants: 0,
  filled: 0,
};

      await axios.post(`${API_BASE}/industry/internships`, payload);
      setIsCreatingInternship(false);
      fetchInternships(); // refresh list
    } catch (err) {
      console.error("Error creating internship:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Internship Management
          </h3>
          <button
            onClick={() => setIsCreatingInternship(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Internship</span>
          </button>
        </div>

        {/* Create Internship Form */}
        {isCreatingInternship && (
          <div className="p-6 border-b bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-4">
              Create New Internship Position
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Position Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                name="positions"
                placeholder="Number of Positions"
                value={formData.positions}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                name="duration"
                placeholder="Duration (months)"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                name="stipend"
                placeholder="Stipend (₹/month)"
                value={formData.stipend}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="skills"
                placeholder="Required Skills (comma-separated)"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg md:col-span-2"
              />
              <textarea
                name="description"
                rows="3"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg md:col-span-2"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsCreatingInternship(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInternship}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Position
              </button>
            </div>
          </div>
        )}

        {/* Internship Listings */}
        <div className="divide-y">
          {internshipListings.map((listing) => (
            <div key={listing.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{listing.title}</h4>
                  <p className="text-gray-600">{listing.department}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {listing.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 p-2">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 p-2">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800 p-2">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {listing.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  {listing.location} • {listing.duration}
                </span>
                <span>Deadline: {listing.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ApplicantsSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Applicant Pool</h3>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applicants..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
                <option>All Positions</option>
                <option>Full Stack Developer</option>
                <option>Data Science</option>
                <option>UI/UX Designer</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied For
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applicants.map(applicant => {
                let statusClass = 'bg-blue-100 text-blue-800';
                if (applicant.status === 'shortlisted') {
                  statusClass = 'bg-yellow-100 text-yellow-800';
                } else if (applicant.status === 'selected') {
                  statusClass = 'bg-green-100 text-green-800';
                }
                
                return (
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                        <div className="text-sm text-gray-500">{applicant.college}</div>
                        <div className="text-xs text-gray-400">{applicant.branch} • {applicant.year} • CGPA: {applicant.cgpa}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{applicant.appliedFor}</div>
                      <div className="text-xs text-gray-500">Applied: {applicant.appliedDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.slice(0, 2).map((skill, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {applicant.skills.length > 2 && (
                          <span className="text-xs text-gray-500">+{applicant.skills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{applicant.matchScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusClass}`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': 
        return <Dashboard />;
      case 'internships': 
        return <InternshipsSection />;
      case 'applicants': 
        return <ApplicantsSection />;
      default: 
        return (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Settings className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Section In Development</h3>
            <p className="text-gray-600">This feature is currently being developed and will be available soon.</p>
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
          <p className="text-gray-400">&copy; 2025 Government of India - Industry Partnership Program. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}