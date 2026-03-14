import { templates, companies } from '../data/templates';
import { fixedTemplates } from '../data/fixedTemplates';

const STORAGE_VERSION = `v2-${templates.length}-${templates.map(t => t.id).join(',')}`;

const STORAGE_KEYS = {
  SIMULATIONS: 'careerz_simulations',
  SUBMISSIONS: 'careerz_submissions',
  PROGRESS: 'careerz_progress',
  CERTIFICATE_REQUESTS: 'careerz_certificate_requests',
  NOTIFICATIONS: 'careerz_notifications',
  INITIALIZED: 'careerz_initialized'
};

export const resetStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.SIMULATIONS);
  localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  initializeStorage();
};

export const initializeStorage = () => {
  const storedVersion = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (storedVersion === STORAGE_VERSION) {
    return;
  }

  const publishedSimulations = templates.map((template, index) => ({
    ...template,
    id: `sim-${index + 1}`,
    status: 'published',
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    publishedAt: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString()
  }));

  localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(publishedSimulations));
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify({}));
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, STORAGE_VERSION);
};

export const getSimulations = (filters = {}) => {
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  
  let filtered = simulations;
  
  if (filters.status) {
    filtered = filtered.filter(sim => sim.status === filters.status);
  }
  
  if (filters.companyId) {
    filtered = filtered.filter(sim => sim.companyId === filters.companyId);
  }
  
  return filtered;
};

export const getSimulationById = (id) => {
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  return simulations.find(sim => sim.id === id);
};

export const createSimulationFromTemplate = (templateId, companyId) => {
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  const template = simulations.find(sim => sim.id === templateId);
  
  if (!template) {
    throw new Error('Template not found');
  }
  
  const newSimulation = {
    ...JSON.parse(JSON.stringify(template)),
    id: `sim-${Date.now()}`,
    companyId,
    status: 'draft',
    createdAt: new Date().toISOString(),
    version: 1
  };
  
  simulations.push(newSimulation);
  localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(simulations));
  
  return newSimulation;
};

export const createBlankSimulation = (companyId) => {
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  
  const newSimulation = {
    id: `sim-${Date.now()}`,
    companyId,
    title: 'New Simulation',
    description: 'Add a description for your simulation',
    tags: [],
    difficulty: 'Beginner',
    duration: '30-45 mins',
    status: 'draft',
    createdAt: new Date().toISOString(),
    version: 1,
    stages: [
      {
        id: `stage-${Date.now()}`,
        title: 'Introduction',
        blocks: [
          {
            id: `block-${Date.now()}`,
            type: 'richText',
            data: {
              content: '<h2>Welcome to Your New Simulation</h2><p>Start building your simulation by adding blocks using the buttons on the right. You can add:</p><ul><li>Rich text content</li><li>Multiple choice questions</li><li>Text inputs</li><li>File uploads</li><li>And more!</li></ul><p>Click the + buttons to add new blocks and stages.</p>'
            }
          }
        ]
      }
    ]
  };
  
  simulations.push(newSimulation);
  localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(simulations));
  
  return newSimulation;
};

export const createSimulationFromFixedTemplate = (templateId, companyId) => {
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  const template = fixedTemplates.find(t => t.id === templateId);
  
  if (!template) {
    throw new Error('Template not found');
  }
  
  const newSimulation = {
    ...JSON.parse(JSON.stringify(template)),
    id: `sim-${Date.now()}`,
    companyId,
    status: 'draft',
    createdAt: new Date().toISOString(),
    templateLevel: template.level,
    version: 1
  };
  
  simulations.push(newSimulation);
  localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(simulations));
  
  return newSimulation;
};

export const updateSimulation = (simulation) => {
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  const index = simulations.findIndex(sim => sim.id === simulation.id);
  
  if (index === -1) {
    throw new Error('Simulation not found');
  }
  
  simulations[index] = {
    ...simulation,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(simulations));
  return simulations[index];
};

export const publishSimulation = (id) => {
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  const index = simulations.findIndex(sim => sim.id === id);
  
  if (index === -1) {
    throw new Error('Simulation not found');
  }
  
  simulations[index] = {
    ...simulations[index],
    status: 'published',
    publishedAt: new Date().toISOString(),
    version: simulations[index].version + 1
  };
  
  localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(simulations));
  return simulations[index];
};

export const deleteSimulation = (id) => {
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  const filtered = simulations.filter(sim => sim.id !== id);
  localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(filtered));
};

export const saveSubmission = (simId, studentId, submissionData) => {
  const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
  
  const submission = {
    id: `sub-${Date.now()}`,
    simId,
    studentId,
    submissionData,
    submittedAt: new Date().toISOString(),
    status: 'submitted'
  };
  
  submissions.push(submission);
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  
  const progressKey = `${simId}_${studentId}`;
  const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || '{}');
  if (allProgress[progressKey]) {
    allProgress[progressKey].completed = true;
    allProgress[progressKey].completedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
  }
  
  return submission;
};

export const getStudentProgress = (simId, studentId) => {
  const progressKey = `${simId}_${studentId}`;
  const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || '{}');
  return allProgress[progressKey] || null;
};

export const saveProgress = (simId, studentId, progressData) => {
  const progressKey = `${simId}_${studentId}`;
  const allProgress = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || '{}');
  
  allProgress[progressKey] = {
    ...progressData,
    simId,
    studentId,
    lastSaved: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
  return allProgress[progressKey];
};

export const getCompanyByName = (name) => {
  return companies.find(c => c.name === name);
};

export const getCompanyById = (id) => {
  return companies.find(c => c.id === id);
};

// Certificate Request Management
export const requestCertificate = (simId, studentId, submissionId) => {
  const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATE_REQUESTS) || '[]');
  
  const existingRequest = requests.find(r => r.simId === simId && r.studentId === studentId);
  if (existingRequest) {
    throw new Error('Certificate request already exists for this simulation');
  }
  
  const request = {
    id: `cert-req-${Date.now()}`,
    simId,
    studentId,
    submissionId,
    status: 'pending', // pending, approved, rejected
    requestedAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null,
    reviewNotes: ''
  };
  
  requests.push(request);
  localStorage.setItem(STORAGE_KEYS.CERTIFICATE_REQUESTS, JSON.stringify(requests));
  
  // Create notification for company
  createNotification({
    type: 'certificate_request',
    companyId: getSimulationById(simId)?.companyId,
    title: 'New Certificate Request',
    message: `Student ${studentId} has requested a certificate for simulation ${simId}`,
    data: { requestId: request.id, simId, studentId },
    read: false
  });
  
  return request;
};

export const getCertificateRequest = (simId, studentId) => {
  const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATE_REQUESTS) || '[]');
  return requests.find(r => r.simId === simId && r.studentId === studentId);
};

export const getCertificateRequestsByCompany = (companyId) => {
  const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATE_REQUESTS) || '[]');
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  
  return requests.filter(request => {
    const sim = simulations.find(s => s.id === request.simId);
    return sim?.companyId === companyId;
  }).map(request => {
    const sim = simulations.find(s => s.id === request.simId);
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
    const submission = submissions.find(s => s.id === request.submissionId);
    
    return {
      ...request,
      simulationTitle: sim?.title,
      submission
    };
  });
};

export const reviewCertificateRequest = (requestId, status, reviewerId, notes = '') => {
  const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATE_REQUESTS) || '[]');
  const index = requests.findIndex(r => r.id === requestId);
  
  if (index === -1) {
    throw new Error('Certificate request not found');
  }
  
  requests[index] = {
    ...requests[index],
    status,
    reviewedAt: new Date().toISOString(),
    reviewedBy: reviewerId,
    reviewNotes: notes
  };
  
  localStorage.setItem(STORAGE_KEYS.CERTIFICATE_REQUESTS, JSON.stringify(requests));
  
  // Create notification for student
  createNotification({
    type: 'certificate_reviewed',
    studentId: requests[index].studentId,
    title: status === 'approved' ? 'Certificate Approved!' : 'Certificate Request Update',
    message: status === 'approved' 
      ? 'Your certificate request has been approved. You can now download your certificate.'
      : `Your certificate request has been ${status}. ${notes}`,
    data: { requestId, status },
    read: false
  });
  
  return requests[index];
};

// Notification Management
export const createNotification = (notification) => {
  const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  
  const newNotification = {
    id: `notif-${Date.now()}`,
    ...notification,
    createdAt: new Date().toISOString()
  };
  
  notifications.push(newNotification);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  
  return newNotification;
};

export const getNotifications = (userId, userType) => {
  const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  
  return notifications.filter(n => {
    if (userType === 'company') {
      return n.companyId === userId;
    } else if (userType === 'student') {
      return n.studentId === userId;
    }
    return false;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const markNotificationAsRead = (notificationId) => {
  const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
  const index = notifications.findIndex(n => n.id === notificationId);
  
  if (index !== -1) {
    notifications[index].read = true;
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }
};

export const getUnreadNotificationCount = (userId, userType) => {
  const notifications = getNotifications(userId, userType);
  return notifications.filter(n => !n.read).length;
};

// Get submissions by company
export const getSubmissionsByCompany = (companyId) => {
  const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
  const simulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIMULATIONS) || '[]');
  
  return submissions.filter(submission => {
    const sim = simulations.find(s => s.id === submission.simId);
    return sim?.companyId === companyId;
  }).map(submission => {
    const sim = simulations.find(s => s.id === submission.simId);
    return {
      ...submission,
      simulationTitle: sim?.title,
      simulationDifficulty: sim?.difficulty
    };
  });
};

export const getAllCompanies = () => {
  return companies;
};
