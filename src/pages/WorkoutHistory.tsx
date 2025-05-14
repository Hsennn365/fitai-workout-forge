
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutPlan } from "@/types";
import { mockWorkoutPlans } from "@/mockData";
import WorkoutCard from "@/components/WorkoutCard";

const WorkoutHistory = () => {
  const navigate = useNavigate();
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);

  // Load workout plans from localStorage or use mock data
  useEffect(() => {
    try {
      const storedPlans = localStorage.getItem("workoutPlans");
      if (storedPlans) {
        setWorkoutPlans(JSON.parse(storedPlans));
      } else {
        setWorkoutPlans(mockWorkoutPlans);
      }
    } catch (error) {
      console.error("Error loading workout plans:", error);
      setWorkoutPlans(mockWorkoutPlans);
    }
  }, []);

  const handleViewWorkout = (workout: WorkoutPlan) => {
    navigate(`/workout-plan/${workout.id}`);
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
        
        {workoutPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutPlans.map((plan) => (
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
