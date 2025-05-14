
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutPlan } from "@/types";
import WorkoutCard from "@/components/WorkoutCard";
import { useWorkoutData } from "@/hooks/useWorkoutData";

const WorkoutHistory = () => {
  const navigate = useNavigate();
  const { userPlans, isLoading } = useWorkoutData();
  
  console.log("Rendered WorkoutHistory with userPlans:", userPlans);

  const handleViewWorkout = (workout: WorkoutPlan) => {
    if (workout.id) {
      console.log("Navigating to workout plan:", workout.id);
      navigate(`/workout-plan/${workout.id}`);
    } else {
      console.error("Workout plan has no ID:", workout);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <PageHeader 
            title="Workout History" 
            description="View and manage your generated workout plans" 
          />
          
          <Button 
            onClick={() => navigate("/workout-generator")} 
            className="mt-4 md:mt-0 bg-gradient-to-r from-fitai-indigo to-fitai-purple hover:opacity-90"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Plan
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <p>Loading workout plans...</p>
          </div>
        ) : userPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPlans.map((plan) => (
              <WorkoutCard 
                key={plan.id} 
                workout={plan} 
                onView={handleViewWorkout} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-muted-foreground">No workout plans yet</h3>
            <p className="mt-2 mb-6">Generate your first personalized workout plan</p>
            <Button 
              onClick={() => navigate("/workout-generator")}
              className="bg-gradient-to-r from-fitai-indigo to-fitai-purple hover:opacity-90"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Workout Plan
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkoutHistory;
