import { templates, companies } from '../data/templates';

const STORAGE_KEYS = {
  SIMULATIONS: 'careerz_simulations',
  SUBMISSIONS: 'careerz_submissions',
  PROGRESS: 'careerz_progress',
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
  if (localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
    return;
  }

  const publishedSimulations = templates.map((template, index) => ({
    ...template,
    id: `sim-${index + 1}`,
    status: 'published',
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    publishedAt: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString()
  }));

  localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify([...templates, ...publishedSimulations]));
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify({}));
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
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

export const getAllCompanies = () => {
  return companies;
};
