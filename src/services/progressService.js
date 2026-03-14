import { supabase } from '../lib/supabase';

export const loadProgress = async (userId, simId) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('simulation_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('simulation_id', simId)
    .single();
  if (error && error.code !== 'PGRST116') {
    console.error('Error loading progress:', error);
    return null;
  }
  return data || null;
};

export const saveProgress = async (userId, simId, progressData) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('simulation_progress')
    .upsert({
      user_id: userId,
      simulation_id: simId,
      current_stage_index: progressData.currentStageIndex,
      current_step_index: progressData.currentStepIndex,
      answers: progressData.answers || {},
      completed: false,
      last_saved: new Date().toISOString()
    }, { onConflict: 'user_id,simulation_id' })
    .select()
    .single();
  if (error) {
    console.error('Error saving progress:', error);
    return null;
  }
  return data;
};

export const markCompleted = async (userId, simId, answers) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('simulation_progress')
    .upsert({
      user_id: userId,
      simulation_id: simId,
      current_stage_index: 0,
      current_step_index: 0,
      answers: answers || {},
      completed: true,
      completed_at: new Date().toISOString(),
      last_saved: new Date().toISOString()
    }, { onConflict: 'user_id,simulation_id' })
    .select()
    .single();
  if (error) {
    console.error('Error marking completed:', error);
    return null;
  }
  return data;
};

export const getAllUserProgress = async (userId) => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('simulation_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_saved', { ascending: false });
  if (error) {
    console.error('Error loading all progress:', error);
    return [];
  }
  return data || [];
};
