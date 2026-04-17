import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const progressDocId = (userId, simId) => `${userId}_${simId}`;

export const loadProgress = async (userId, simId) => {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, 'simulation_progress', progressDocId(userId, simId)));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error('Error loading progress:', err);
    return null;
  }
};

export const saveProgress = async (userId, simId, progressData) => {
  if (!db) return null;
  try {
    const docId = progressDocId(userId, simId);
    const payload = {
      user_id: userId,
      simulation_id: simId,
      current_stage_index: progressData.currentStageIndex,
      current_step_index: progressData.currentStepIndex,
      answers: progressData.answers || {},
      completed: false,
      last_saved: new Date().toISOString(),
    };
    await setDoc(doc(db, 'simulation_progress', docId), payload, { merge: true });
    return { id: docId, ...payload };
  } catch (err) {
    console.error('Error saving progress:', err);
    return null;
  }
};

export const markCompleted = async (userId, simId, answers) => {
  if (!db) return null;
  try {
    const docId = progressDocId(userId, simId);
    const now = new Date().toISOString();
    const payload = {
      user_id: userId,
      simulation_id: simId,
      current_stage_index: 0,
      current_step_index: 0,
      answers: answers || {},
      completed: true,
      completed_at: now,
      last_saved: now,
    };
    await setDoc(doc(db, 'simulation_progress', docId), payload, { merge: true });
    return { id: docId, ...payload };
  } catch (err) {
    console.error('Error marking completed:', err);
    return null;
  }
};

export const getAllUserProgress = async (userId) => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, 'simulation_progress'),
      where('user_id', '==', userId),
      orderBy('last_saved', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error loading all progress:', err);
    return [];
  }
};
