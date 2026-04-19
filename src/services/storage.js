import { templates, companies, fixedTemplates } from '../data/mockData';
import { db } from '../lib/firebase';
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, orderBy
} from 'firebase/firestore';

const STORAGE_KEYS = {
  SIMULATIONS: 'careerz_simulations',
  SUBMISSIONS: 'careerz_submissions',
  PROGRESS: 'careerz_progress',
  CERTIFICATE_REQUESTS: 'careerz_certificate_requests',
  NOTIFICATIONS: 'careerz_notifications',
  INITIALIZED: 'careerz_initialized'
};

// Demo data initialization removed - using Firebase database

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

export const getCompanyById = (id) => {
  return companies.find(c => c.id === id);
};

export const getCompanyByIdFromDB = async (id) => {
  if (!db) return getCompanyById(id);

  try {
    const snap = await getDoc(doc(db, 'profiles', id));
    if (!snap.exists()) return getCompanyById(id);
    const data = snap.data();
    if (data.role !== 'company') return getCompanyById(id);
    return {
      id,
      name: data.company_name || data.full_name || 'Unknown Company',
      industry: data.industry || '',
    };
  } catch (err) {
    console.error('Error fetching company profile:', err);
    return getCompanyById(id);
  }
};

// Certificate Request Management
export const requestCertificate = (simId, studentId, submissionId, companyId = null) => {
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
  const resolvedCompanyId = companyId || getSimulationById(simId)?.companyId;
  createNotification({
    type: 'certificate_request',
    companyId: resolvedCompanyId,
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
    } else if (userType === 'user') {
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

// ── Firestore helpers ──

const mapSimDoc = (docSnap) => {
  const d = docSnap.data();
  return {
    id: docSnap.id,
    companyId: d.company_id,
    title: d.title,
    description: d.description,
    tags: d.tags || [],
    difficulty: d.difficulty,
    duration: d.duration,
    status: d.status,
    stages: d.stages || [],
    version: d.version || 1,
    templateLevel: d.template_level || null,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    publishedAt: d.published_at,
  };
};

const mapSubDoc = (docSnap) => {
  const d = docSnap.data();
  return {
    id: docSnap.id,
    simId: d.sim_id,
    studentId: d.student_id,
    submissionData: d.submission_data || {},
    submittedAt: d.submitted_at,
    status: d.status,
  };
};

export const getSimulationsFromDB = async (filters = {}) => {
  if (!db) return getSimulations(filters);
  try {
    const constraints = [];
    if (filters.status) constraints.push(where('status', '==', filters.status));
    if (filters.companyId) constraints.push(where('company_id', '==', filters.companyId));
    constraints.push(orderBy('created_at', 'desc'));

    const q = query(collection(db, 'simulations'), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(mapSimDoc);
  } catch (err) {
    console.error('Error loading simulations:', err);
    return getSimulations(filters);
  }
};

export const getSimulationByIdFromDB = async (id) => {
  if (!db) return getSimulationById(id);
  try {
    const snap = await getDoc(doc(db, 'simulations', id));
    if (!snap.exists()) return getSimulationById(id);
    return mapSimDoc(snap);
  } catch (err) {
    console.error('Error loading simulation by id:', err);
    return getSimulationById(id);
  }
};

export const createBlankSimulationInDB = async (companyId) => {
  if (!db) return createBlankSimulation(companyId);

  const now = new Date().toISOString();
  const simId = `sim-${Date.now()}`;
  const payload = {
    company_id: companyId,
    title: 'New Simulation',
    description: 'Add a description for your simulation',
    tags: [],
    difficulty: 'Beginner',
    duration: '30-45 mins',
    status: 'draft',
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
              content: '<h2>Welcome to Your New Simulation</h2><p>Start building your simulation by adding blocks using the buttons on the right.</p>',
            },
          },
        ],
      },
    ],
    template_level: null,
    created_at: now,
    updated_at: now,
    published_at: null,
  };

  await setDoc(doc(db, 'simulations', simId), payload);
  return { id: simId, companyId, ...payload, tags: payload.tags, stages: payload.stages, templateLevel: null, createdAt: now, updatedAt: now, publishedAt: null };
};

export const createSimulationFromFixedTemplateInDB = async (templateId, companyId) => {
  if (!db) return createSimulationFromFixedTemplate(templateId, companyId);

  const template = fixedTemplates.find((t) => t.id === templateId);
  if (!template) throw new Error('Template not found');

  const now = new Date().toISOString();
  const simId = `sim-${Date.now()}`;
  const payload = {
    company_id: companyId,
    title: template.title,
    description: template.description,
    tags: template.tags || [],
    difficulty: template.difficulty || 'Beginner',
    duration: template.duration || '30-45 mins',
    status: 'draft',
    version: 1,
    stages: template.stages || [],
    template_level: template.level || null,
    created_at: now,
    updated_at: now,
    published_at: null,
  };

  await setDoc(doc(db, 'simulations', simId), payload);
  return { id: simId, companyId, title: payload.title, description: payload.description, tags: payload.tags, difficulty: payload.difficulty, duration: payload.duration, status: 'draft', stages: payload.stages, version: 1, templateLevel: payload.template_level, createdAt: now, updatedAt: now, publishedAt: null };
};

export const updateSimulationInDB = async (simulation) => {
  if (!db) return updateSimulation(simulation);

  const payload = {
    company_id: simulation.companyId,
    title: simulation.title,
    description: simulation.description,
    tags: simulation.tags || [],
    difficulty: simulation.difficulty,
    duration: simulation.duration,
    status: simulation.status,
    stages: simulation.stages || [],
    version: simulation.version || 1,
    template_level: simulation.templateLevel || null,
    updated_at: new Date().toISOString(),
    published_at: simulation.publishedAt || null,
  };

  await updateDoc(doc(db, 'simulations', simulation.id), payload);
  return { ...simulation, updatedAt: payload.updated_at };
};

export const publishSimulationInDB = async (id) => {
  if (!db) return publishSimulation(id);

  const now = new Date().toISOString();
  await updateDoc(doc(db, 'simulations', id), {
    status: 'published',
    published_at: now,
    updated_at: now,
  });

  const snap = await getDoc(doc(db, 'simulations', id));
  return mapSimDoc(snap);
};

export const deleteSimulationInDB = async (id) => {
  if (!db) { deleteSimulation(id); return; }
  await deleteDoc(doc(db, 'simulations', id));
};

export const saveSubmissionInDB = async (simId, studentId, submissionData) => {
  if (!db) return saveSubmission(simId, studentId, submissionData);

  const subId = `sub-${Date.now()}`;
  const payload = {
    sim_id: simId,
    student_id: studentId,
    submission_data: submissionData,
    status: 'submitted',
    submitted_at: new Date().toISOString(),
  };

  await setDoc(doc(db, 'simulation_submissions', subId), payload);
  return { id: subId, simId, studentId, submissionData, submittedAt: payload.submitted_at, status: 'submitted' };
};

export const getSubmissionsByCompanyFromDB = async (companyId) => {
  if (!db) return getSubmissionsByCompany(companyId);

  try {
    const simulations = await getSimulationsFromDB({ companyId });
    const simulationMap = new Map(simulations.map((sim) => [sim.id, sim]));
    const simIds = simulations.map((sim) => sim.id);
    if (simIds.length === 0) return [];

    // Firestore 'in' queries support max 30 items
    const results = [];
    for (let i = 0; i < simIds.length; i += 30) {
      const batch = simIds.slice(i, i + 30);
      const q = query(collection(db, 'simulation_submissions'), where('sim_id', 'in', batch), orderBy('submitted_at', 'desc'));
      const snap = await getDocs(q);
      snap.docs.forEach((d) => {
        const sub = mapSubDoc(d);
        results.push({
          ...sub,
          simulationTitle: simulationMap.get(sub.simId)?.title,
          simulationDifficulty: simulationMap.get(sub.simId)?.difficulty,
        });
      });
    }
    return results;
  } catch (err) {
    console.error('Error loading submissions by company:', err);
    return getSubmissionsByCompany(companyId);
  }
};
