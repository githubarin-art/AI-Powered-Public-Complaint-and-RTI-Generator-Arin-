import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Copy, ArrowRight, Building2, Zap, Droplets, MapPin, Shield, HeartPulse, GraduationCap, Train } from 'lucide-react';
import { toast } from 'react-toastify';
import './Templates.css';

// Sample templates organized by department
const SAMPLE_TEMPLATES = [
  {
    id: 'rti-pwd-roads',
    category: 'RTI',
    department: 'Public Works Department (PWD)',
    icon: MapPin,
    title: 'Road Construction Expenditure',
    description: 'Request details about road construction costs, contractor information, and project timelines.',
    sampleText: `I want to know the complete details of the road construction/repair work carried out in [YOUR AREA] during [TIME PERIOD]. Please provide:

1. Total budget sanctioned for the project
2. Name and address of the contractor awarded the work
3. Date of commencement and completion of work
4. Itemized expenditure details
5. Quality inspection reports, if any
6. Copies of work completion certificates`,
    tags: ['roads', 'construction', 'budget', 'contractor']
  },
  {
    id: 'rti-electricity-bills',
    category: 'RTI',
    department: 'Electricity Department',
    icon: Zap,
    title: 'Electricity Connection & Bills',
    description: 'Request information about electricity connections, meter readings, and billing details.',
    sampleText: `I request the following information regarding electricity supply in [YOUR AREA/CONSUMER NUMBER]:

1. Details of electricity tariff applicable to domestic/commercial consumers
2. Criteria for load sanctioning and connection approval
3. Details of power outages in the last 6 months with reasons
4. Subsidy amount, if any, provided to consumers
5. Procedure for filing complaints and average resolution time`,
    tags: ['electricity', 'bills', 'power', 'tariff']
  },
  {
    id: 'rti-water-supply',
    category: 'RTI',
    department: 'Water Supply Department',
    icon: Droplets,
    title: 'Water Supply & Quality',
    description: 'Request information about water supply schedules, quality reports, and infrastructure.',
    sampleText: `I request the following information regarding water supply in [YOUR LOCALITY]:

1. Daily water supply schedule and duration
2. Water quality test reports for the last 12 months
3. Details of water treatment plants serving this area
4. Number of complaints received and resolved in the last year
5. Future plans for improving water supply infrastructure
6. Per capita water availability as per government norms`,
    tags: ['water', 'supply', 'quality', 'municipal']
  },
  {
    id: 'complaint-police',
    category: 'Complaint',
    department: 'Police Department',
    icon: Shield,
    title: 'Law & Order Issue',
    description: 'File a complaint about law and order issues, nuisance, or security concerns.',
    sampleText: `I wish to bring to your notice a serious law and order issue in [YOUR AREA]:

Nature of Problem:
[Describe the issue - e.g., illegal parking, noise pollution, suspicious activities, eve-teasing, etc.]

Location: [Exact address/landmark]
Time of Occurrence: [When does this usually happen]
Duration: This has been going on since [DATE]

Impact:
- [How it affects you and the community]
- [Any safety concerns]

I request immediate patrolling and necessary action to resolve this issue. I am willing to provide any additional information required.`,
    tags: ['police', 'security', 'law', 'complaint']
  },
  {
    id: 'complaint-hospital',
    category: 'Complaint',
    department: 'Health Department',
    icon: HeartPulse,
    title: 'Government Hospital Services',
    description: 'File a complaint about hospital services, staff behavior, or medical facilities.',
    sampleText: `I wish to file a complaint regarding the services at [HOSPITAL NAME]:

Date of Visit: [DATE]
OPD/Ward Number: [IF APPLICABLE]

Issues Faced:
1. [Describe issue - e.g., long waiting time, unavailability of medicines, staff behavior]
2. [Any other issues]

Details:
[Provide specific details of the incident including names of staff if known]

Expected Resolution:
- Improvement in services
- Disciplinary action against concerned staff (if applicable)
- Written explanation

I request your immediate intervention to ensure patients receive proper care and treatment.`,
    tags: ['hospital', 'health', 'medical', 'services']
  },
  {
    id: 'rti-education',
    category: 'RTI',
    department: 'Education Department',
    icon: GraduationCap,
    title: 'School Infrastructure & Funds',
    description: 'Request information about school funds, teacher appointments, and infrastructure.',
    sampleText: `I request the following information regarding [SCHOOL NAME / DISTRICT SCHOOLS]:

1. Total funds allocated under Sarva Shiksha Abhiyan / Samagra Shiksha for the year [YEAR]
2. Number of sanctioned vs. working teachers
3. Details of Mid-Day Meal scheme implementation and funds utilized
4. Infrastructure development works undertaken in the last 2 years
5. Student enrollment and dropout rates for the last 3 years
6. Availability of basic amenities (toilets, drinking water, library)`,
    tags: ['education', 'school', 'teachers', 'funds']
  },
  {
    id: 'complaint-municipal',
    category: 'Complaint',
    department: 'Municipal Corporation',
    icon: Building2,
    title: 'Garbage & Sanitation',
    description: 'File a complaint about garbage collection, drainage, or sanitation issues.',
    sampleText: `I wish to bring to your urgent attention a sanitation issue in [YOUR LOCALITY]:

Problem: [Irregular garbage collection / Overflowing drain / Open dumping]

Location: [Complete address with landmarks]

Details:
- Garbage has not been collected since [DATE/DAYS]
- [Describe the current condition]
- [Health hazards being faced]

Impact on Residents:
- Foul smell making it difficult to live
- Breeding of mosquitoes and flies
- Risk of diseases

I request immediate action to:
1. Clear the accumulated garbage/unclog the drain
2. Ensure regular collection/maintenance going forward
3. Take action against those responsible for the lapse`,
    tags: ['garbage', 'sanitation', 'municipal', 'drainage']
  },
  {
    id: 'rti-railway',
    category: 'RTI',
    department: 'Indian Railways',
    icon: Train,
    title: 'Railway Services & Projects',
    description: 'Request information about railway projects, services, and facilities.',
    sampleText: `I request the following information regarding [STATION NAME / RAILWAY ZONE]:

1. Details of pending railway projects in the region with expected completion dates
2. Revenue generated from [STATION] in the last financial year
3. Number of complaints received regarding cleanliness/services and action taken
4. Plans for new trains or increased frequency on [ROUTE]
5. Details of passenger amenities available and planned improvements
6. Criteria for ticket reservation quota allocation`,
    tags: ['railway', 'trains', 'station', 'transport']
  }
];

const CATEGORIES = ['All', 'RTI', 'Complaint'];

const Templates = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedTemplate, setExpandedTemplate] = useState(null);

  const filteredTemplates = SAMPLE_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Template copied to clipboard!');
  };

  const handleUseTemplate = (template) => {
    // Navigate to appropriate mode with pre-filled data
    const route = template.category === 'RTI' ? '/assisted' : '/assisted';
    navigate(route, { 
      state: { 
        prefillDescription: template.sampleText,
        documentType: template.category === 'RTI' ? 'information_request' : 'grievance'
      } 
    });
  };

  return (
    <div className="container templates-page">
      <div className="templates-header">
        <h1>Sample Templates</h1>
        <p className="text-muted">Browse ready-to-use templates for common RTI and Complaint scenarios. Copy, customize, and submit.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="templates-toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by department, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="templates-grid">
        {filteredTemplates.map(template => {
          const Icon = template.icon;
          const isExpanded = expandedTemplate === template.id;

          return (
            <div key={template.id} className={`template-card ${isExpanded ? 'expanded' : ''}`}>
              <div className="template-card-header">
                <div className="template-icon">
                  <Icon size={20} />
                </div>
                <div className="template-meta">
                  <span className={`category-badge ${template.category.toLowerCase()}`}>
                    {template.category}
                  </span>
                  <span className="department-name">{template.department}</span>
                </div>
              </div>

              <h3 className="template-title">{template.title}</h3>
              <p className="template-description">{template.description}</p>

              <div className="template-tags">
                {template.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>

              {/* Expandable Sample Text */}
              <div className="template-preview">
                <button 
                  className="preview-toggle"
                  onClick={() => setExpandedTemplate(isExpanded ? null : template.id)}
                >
                  <FileText size={16} />
                  {isExpanded ? 'Hide Sample Text' : 'View Sample Text'}
                </button>

                {isExpanded && (
                  <div className="sample-text-container">
                    <pre className="sample-text">{template.sampleText}</pre>
                    <button 
                      className="copy-btn"
                      onClick={() => handleCopyText(template.sampleText)}
                    >
                      <Copy size={14} /> Copy Text
                    </button>
                  </div>
                )}
              </div>

              <div className="template-actions">
                <button 
                  className="btn btn-primary use-btn"
                  onClick={() => handleUseTemplate(template)}
                >
                  Use This Template <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="no-results">
          <FileText size={48} strokeWidth={1} />
          <h3>No templates found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Info Section */}
      <div className="templates-info">
        <h3>How to Use These Templates</h3>
        <ol>
          <li><strong>Browse:</strong> Find a template that matches your requirement.</li>
          <li><strong>View:</strong> Click "View Sample Text" to see the full template.</li>
          <li><strong>Customize:</strong> Replace the placeholders [IN BRACKETS] with your specific details.</li>
          <li><strong>Generate:</strong> Click "Use This Template" to auto-fill the drafting form.</li>
        </ol>
        <p className="disclaimer">
          <strong>Note:</strong> These are sample templates for guidance. Please customize them with accurate information relevant to your case.
        </p>
      </div>
    </div>
  );
};

export default Templates;
