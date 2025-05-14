
import { useState, useEffect } from 'react';
import { WorkoutPlan, UserProfile, Exercise } from '@/types';
import { exercises } from '@/data/exercisesData';
import { workoutTemplates, getTemplateByDaysPerWeek, getTemplateById } from '@/data/workoutTemplates';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

interface WorkoutProgress {
  id: string;
  planId: string;
  date: string;
  completed: boolean;
  notes?: string;
  calories?: number;
}

export function useWorkoutData() {
  const [userPlans, setUserPlans] = useState<WorkoutPlan[]>([]);
  const [workoutProgress, setWorkoutProgress] = useState<WorkoutProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data from localStorage on mount
  useEffect(() => {
    try {
      setIsLoading(true);
      
      // Load user plans
      const storedPlans = localStorage.getItem('workoutPlans');
      if (storedPlans) {
        setUserPlans(JSON.parse(storedPlans));
      }
      
      // Load workout progress
      const storedProgress = localStorage.getItem('workoutProgress');
      if (storedProgress) {
        setWorkoutProgress(JSON.parse(storedProgress));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading workout data:', error);
      toast.error('Failed to load workout data');
      setIsLoading(false);
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('workoutPlans', JSON.stringify(userPlans));
    }
  }, [userPlans, isLoading]);
  
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('workoutProgress', JSON.stringify(workoutProgress));
    }
  }, [workoutProgress, isLoading]);
  
  // Get all exercises
  const getAllExercises = (): Exercise[] => {
    return exercises;
  };
  
  // Get all workout templates
  const getAllTemplates = (): WorkoutPlan[] => {
    return workoutTemplates;
  };
  
  // Generate a new workout plan based on user profile and days per week
  const generateWorkoutPlan = (userProfile: UserProfile, daysPerWeek: number): WorkoutPlan => {
    try {
      // Get appropriate template based on days per week
      const template = getTemplateByDaysPerWeek(daysPerWeek);
      
      if (!template) {
        throw new Error('No suitable workout template found');
      }
      
      // Create a new plan based on the template
      const newPlan: WorkoutPlan = {
        id: uuidv4(),
        userId: userProfile.id,
        generatedOn: new Date().toISOString(),
        name: `${daysPerWeek}-Day ${template.name} for ${userProfile.name}`,
        weeks: JSON.parse(JSON.stringify(template.weeks)) // Deep copy
      };
      
      // Customize plan based on user profile
      // (In a real app, this would use AI to generate personalized workouts)
      
      // Add the new plan to user plans
      setUserPlans(prevPlans => [newPlan, ...prevPlans]);
      
      toast.success('New workout plan generated successfully!');
      return newPlan;
    } catch (error) {
      console.error('Error generating workout plan:', error);
      toast.error('Failed to generate workout plan');
      throw error;
    }
  };
  
  // Get a workout plan by ID
  const getWorkoutPlanById = (planId: string): WorkoutPlan | undefined => {
    // First look in user plans
    const userPlan = userPlans.find(plan => plan.id === planId);
    if (userPlan) {
      return userPlan;
    }
    
    // If not found, look in templates
    return getTemplateById(planId);
  };
  
  // Log a completed workout
  const logWorkoutProgress = (planId: string, notes?: string, calories?: number): void => {
    const newProgress: WorkoutProgress = {
      id: uuidv4(),
      planId,
      date: new Date().toISOString(),
      completed: true,
      notes,
      calories
    };
    
    setWorkoutProgress(prev => [newProgress, ...prev]);
    toast.success('Workout logged successfully!');
  };
  
  // Get all progress for a specific plan
  const getProgressForPlan = (planId: string): WorkoutProgress[] => {
    return workoutProgress.filter(progress => progress.planId === planId);
  };
  
  // Get total stats
  const getWorkoutStats = () => {
    const totalWorkouts = workoutProgress.length;
    const totalCalories = workoutProgress.reduce((total, workout) => 
      total + (workout.calories || 0), 0);
      
    return {
      totalWorkouts,
      totalCalories,
      workoutsThisWeek: workoutProgress.filter(w => {
        const workoutDate = new Date(w.date);
        const today = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        return workoutDate >= weekAgo;
      }).length
    };
  };
  
  return {
    userPlans,
    workoutProgress,
    isLoading,
    getAllExercises,
    getAllTemplates,
    generateWorkoutPlan,
    getWorkoutPlanById,
    logWorkoutProgress,
    getProgressForPlan,
    getWorkoutStats
  };
}
