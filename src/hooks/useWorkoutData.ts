
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
        const parsed = JSON.parse(storedPlans);
        console.log("Loaded plans from localStorage:", parsed);
        setUserPlans(parsed);
      } else {
        console.log("No workout plans found in localStorage");
      }
      
      // Load workout progress
      const storedProgress = localStorage.getItem('workoutProgress');
      if (storedProgress) {
        setWorkoutProgress(JSON.parse(storedProgress));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading workout data:', error);
      toast.error("Failed to load workout data");
      setIsLoading(false);
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('workoutPlans', JSON.stringify(userPlans));
        console.log("Saving userPlans to localStorage:", userPlans);
      } catch (error) {
        console.error("Error saving plans to localStorage:", error);
      }
    }
  }, [userPlans, isLoading]);
  
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('workoutProgress', JSON.stringify(workoutProgress));
      } catch (error) {
        console.error("Error saving progress to localStorage:", error);
      }
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
      const newId = uuidv4();
      console.log("Generated new plan ID:", newId);
      
      const newPlan: WorkoutPlan = {
        id: newId,
        userId: userProfile.id,
        generatedOn: new Date().toISOString(),
        name: `${daysPerWeek}-Day ${template.name} for ${userProfile.name}`,
        weeks: JSON.parse(JSON.stringify(template.weeks)) // Deep copy
      };
      
      // Add the new plan to user plans
      const updatedPlans = [...userPlans, newPlan];
      setUserPlans(updatedPlans);
      
      console.log("Generated new plan:", newPlan);
      console.log("Updated userPlans:", updatedPlans);
      
      toast.success("New workout plan generated successfully!");
      
      return newPlan;
    } catch (error) {
      console.error('Error generating workout plan:', error);
      toast.error("Failed to generate workout plan");
      throw error;
    }
  };
  
  // Get a workout plan by ID
  const getWorkoutPlanById = (planId: string): WorkoutPlan | undefined => {
    console.log("Looking for plan with ID:", planId);
    console.log("Available user plans:", userPlans);
    
    if (!planId) {
      console.error("No plan ID provided");
      return undefined;
    }
    
    // First look in user plans
    const userPlan = userPlans.find(plan => plan.id === planId);
    if (userPlan) {
      console.log("Found plan in user plans:", userPlan);
      return userPlan;
    }
    
    // If not found, look in templates
    const templatePlan = getTemplateById(planId);
    if (templatePlan) {
      console.log("Found plan in templates:", templatePlan);
      return templatePlan;
    }
    
    console.log("Plan not found in user plans or templates");
    return undefined;
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
    toast.success("Workout logged successfully!");
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
