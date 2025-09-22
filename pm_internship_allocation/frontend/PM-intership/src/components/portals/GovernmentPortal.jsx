import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Brain, 
  Filter, 
  BarChart3, 
  Download, 
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  Search,
  User,
  MapPin,
  Briefcase,
  Target,
  Activity,
  TrendingUp,
  Award
} from 'lucide-react';

export default function GovernmentInternshipSystem() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);

  const stats = {
    totalApplicants: 2847,
    totalInternships: 156,
    successfulMatches: 2341,
    pendingReview: 89,
    availableSeats: 423,
    filledSeats: 2341
  };

  const recentAllocations = [
    { id: 1, applicant: "Priya Sharma", role: "Software Developer", company: "Tech Ministry", score: 95.2, status: "allocated" },
    { id: 2, applicant: "Rahul Kumar", role: "Data Analyst", company: "Statistics Dept", score: 92.8, status: "allocated" },
    { id: 3, applicant: "Anita Singh", role: "UI/UX Designer", company: "Digital India", score: 89.5, status: "pending" },
    { id: 4, applicant: "Vikash Patel", role: "Cybersecurity", company: "CERT-In", score: 96.1, status: "allocated" }
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setMatchingProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            return 0;
          }
          return prev + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

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
            <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>
      </div>
    );
  };

  const Header = () => (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-lg">
              <Award className="h-8 w-8 text-blue-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Government Internship Allocation System</h1>
              <p className="text-blue-200">Ministry of Skill Development & Entrepreneurship</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-blue-200">Administrator Portal</p>
              <p className="font-medium">Dr. A.K. Verma</p>
            </div>
            <div className="bg-blue-800 p-2 rounded-full">
              <User className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const Navigation = () => {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'applicants', label: 'Applicant Management', icon: Users },
      { id: 'internships', label: 'Internship Catalog', icon: Building2 },
      { id: 'matching', label: 'AI Matching Engine', icon: Brain },
      { id: 'allocation', label: 'Allocation Results', icon: Target },
      { id: 'reports', label: 'Reports & Analytics', icon: FileText }
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
          title="Total Applicants" 
          value={stats.totalApplicants} 
          subtitle="Registered students"
          icon={Users} 
        />
        <StatsCard 
          title="Available Internships" 
          value={stats.totalInternships} 
          subtitle="Active positions"
          icon={Briefcase} 
          color="green"
        />
        <StatsCard 
          title="Successful Matches" 
          value={stats.successfulMatches} 
          subtitle="82.2% allocation rate"
          icon={CheckCircle} 
          color="emerald"
        />
        <StatsCard 
          title="Pending Review" 
          value={stats.pendingReview} 
          subtitle="Awaiting approval"
          icon={Clock} 
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">System Workflow Status</h3>
          </div>
          <div className="p-6 space-y-6">
            {[
              { step: 'Data Collection', status: 'completed', description: '2,847 applications received' },
              { step: 'Skill Normalization', status: 'completed', description: 'RapidFuzz + SBERT processing complete' },
              { step: 'AI Matching', status: 'completed', description: 'Semantic similarity computed' },
              { step: 'Constraint Application', status: 'completed', description: 'Rules and filters applied' },
              { step: 'Optimization', status: 'in-progress', description: 'OR-Tools allocation running' },
              { step: 'Final Review', status: 'pending', description: 'Administrator approval required' }
            ].map((item, index) => {
              let statusClass = 'bg-gray-100 text-gray-400';
              let StatusIcon = Clock;
              
              if (item.status === 'completed') {
                statusClass = 'bg-green-100 text-green-600';
                StatusIcon = CheckCircle;
              } else if (item.status === 'in-progress') {
                statusClass = 'bg-blue-100 text-blue-600';
                StatusIcon = Activity;
              }
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusClass}`}>
                    <StatusIcon className={`h-5 w-5 ${item.status === 'in-progress' ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.step}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Allocations</h3>
          </div>
          <div className="divide-y">
            {recentAllocations.map(allocation => (
              <div key={allocation.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{allocation.applicant}</p>
                    <p className="text-sm text-gray-500">{allocation.role}</p>
                    <p className="text-xs text-gray-400">{allocation.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{allocation.score}%</p>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      allocation.status === 'allocated' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {allocation.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AIMatchingEngine = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">AI Matching Engine Control Panel</h3>
          <p className="text-sm text-gray-600 mt-1">Configure and monitor the automated matching process</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Preprocessing Status</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Skill Normalization (RapidFuzz)</span>
                  <span className="text-sm font-medium text-green-600">Complete</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Semantic Analysis (SBERT)</span>
                  <span className="text-sm font-medium text-green-600">Complete</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Data Cleaning</span>
                  <span className="text-sm font-medium text-green-600">Complete</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Matching Parameters</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Similarity Threshold</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Location Weight</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Skills Weight</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Run Matching Algorithm</h4>
              <button
                onClick={() => setIsProcessing(true)}
                disabled={isProcessing}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <Brain className="h-4 w-4" />
                <span>{isProcessing ? 'Processing...' : 'Start Matching'}</span>
              </button>
            </div>
            
            {isProcessing && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Processing Progress</span>
                  <span className="text-sm font-medium text-gray-700">{matchingProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${matchingProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ApplicantManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Applicant Database</h3>
            <div className="flex space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Import Data</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applicants..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
                <option>All Departments</option>
                <option>Computer Science</option>
                <option>Electronics</option>
                <option>Mechanical</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing 1-50 of {stats.totalApplicants} applicants
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: 'Aarav Singh', email: 'aarav.singh@email.com', skills: 'Python, Django, SQL', location: 'Delhi', status: 'allocated', score: 92.5 },
                  { name: 'Priya Patel', email: 'priya.patel@email.com', skills: 'React, Node.js, MongoDB', location: 'Mumbai', status: 'pending', score: 88.3 },
                  { name: 'Vikash Kumar', email: 'vikash.kumar@email.com', skills: 'Java, Spring Boot, AWS', location: 'Bangalore', status: 'allocated', score: 95.1 },
                  { name: 'Anita Sharma', email: 'anita.sharma@email.com', skills: 'UI/UX, Figma, CSS', location: 'Chennai', status: 'review', score: 87.9 }
                ].map((applicant, index) => {
                  let statusClass = 'bg-blue-100 text-blue-800';
                  if (applicant.status === 'allocated') {
                    statusClass = 'bg-green-100 text-green-800';
                  } else if (applicant.status === 'pending') {
                    statusClass = 'bg-yellow-100 text-yellow-800';
                  }
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                          <div className="text-sm text-gray-500">{applicant.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{applicant.skills}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {applicant.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusClass}`}>
                          {applicant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {applicant.score}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const ReportsAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h3>
          <div className="space-y-4">
            <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Allocation Summary</span>
              </div>
              <Download className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>Skills Analytics</span>
              </div>
              <Download className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>Performance Metrics</span>
              </div>
              <Download className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98.5%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">2.1s</div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">94.2%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">99.1%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Export Options</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <div className="font-medium">CSV Export</div>
                <div className="text-sm text-gray-500">Download allocation data</div>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <div className="font-medium">Excel Export</div>
                <div className="text-sm text-gray-500">Detailed spreadsheet</div>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <div className="font-medium">Visual Report</div>
                <div className="text-sm text-gray-500">Charts and graphs</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': 
        return <Dashboard />;
      case 'applicants': 
        return <ApplicantManagement />;
      case 'matching': 
        return <AIMatchingEngine />;
      case 'reports': 
        return <ReportsAnalytics />;
      default: 
        return (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Settings className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature In Development</h3>
            <p className="text-gray-600">This section is currently being developed and will be available soon.</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Government Internship Portal</h3>
              <p className="text-gray-300">Empowering students through strategic internship allocation using AI-driven matching.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="text-gray-300 space-y-2">
                <p>Email: support@msde.gov.in</p>
                <p>Phone: +91 11 2345 6789</p>
                <p>Address: Shram Shakti Bhawan, New Delhi</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Ministry of Skill Development & Entrepreneurship, Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}