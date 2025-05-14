
import { UserProfile, WorkoutPlan } from "@/types";
import { mockWorkoutPlans } from "@/mockData";
import { toast } from "@/components/ui/sonner";

// This is a mock AI service that would normally call the OpenAI API
export const generateWorkoutPlan = async (profile: UserProfile): Promise<WorkoutPlan> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  try {
    // In a real implementation, this would send a request to OpenAI API
    // and format the response into a WorkoutPlan object
    
    // For now, return a mock workout plan with customized name
    const mockPlan = { ...mockWorkoutPlans[0] };
    
    // Customize the plan name based on user goals
    mockPlan.id = `plan-${Date.now()}`;
    mockPlan.name = `${profile.goals.split(' ')[0]} Fitness Plan`;
    mockPlan.generatedOn = new Date().toISOString();
    mockPlan.userId = profile.id;
    
    return mockPlan;
  } catch (error) {
    console.error("Error generating workout plan:", error);
    toast.error("Failed to generate workout plan. Please try again.");
    throw new Error("Failed to generate workout plan");
  }
};
