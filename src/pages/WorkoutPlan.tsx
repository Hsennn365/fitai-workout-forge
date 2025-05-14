
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Weight, Info, Play } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { WorkoutPlan as WorkoutPlanType } from "@/types";
import { mockWorkoutPlans } from "@/mockData";

const WorkoutPlan = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<WorkoutPlanType | null>(null);
  const [selectedWeek, setSelectedWeek] = useState("1");
  
  useEffect(() => {
    try {
      // Try to load from localStorage first
      const storedPlans = localStorage.getItem("workoutPlans");
      const parsedPlans = storedPlans ? JSON.parse(storedPlans) : [];
      
      // Find the workout plan by ID
      let foundPlan = parsedPlans.find((plan: WorkoutPlanType) => plan.id === planId);
      
      // If not found in localStorage, try mock data
      if (!foundPlan) {
        foundPlan = mockWorkoutPlans.find(plan => plan.id === planId);
      }
      
      if (foundPlan) {
        setWorkout(foundPlan);
      } else {
        console.error(`Workout plan with ID ${planId} not found`);
        // Navigate back to history if plan not found
        navigate('/workout-history');
      }
    } catch (error) {
      console.error("Error loading workout plan:", error);
    }
  }, [planId, navigate]);

  if (!workout) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Loading workout plan...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/workout-history')}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to History
          </Button>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{workout.name}</h1>
              <p className="text-muted-foreground">
                Generated on {format(new Date(workout.generatedOn), "PPP")}
              </p>
            </div>
            <Button onClick={() => navigate('/workout-generator')}>
              Create New Plan
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="1" value={selectedWeek} onValueChange={setSelectedWeek} className="mb-8">
          <TabsList className="grid grid-cols-4">
            {workout.weeks.map(week => (
              <TabsTrigger key={week.weekNumber} value={week.weekNumber.toString()}>
                Week {week.weekNumber}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {workout.weeks.map(week => (
            <TabsContent key={week.weekNumber} value={week.weekNumber.toString()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {week.days.map(day => (
                  <Card key={day.dayNumber} className="workout-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{day.name}</CardTitle>
                      <CardDescription>Day {day.dayNumber}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {day.exercises.length > 0 ? (
                        <div className="space-y-4">
                          {day.exercises.map((exercise, index) => (
                            <div key={index} className="exercise-card">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{exercise.name}</h4>
                                  <Badge variant="outline" className="mt-1">
                                    {exercise.muscleGroup}
                                  </Badge>
                                </div>
                                
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost" className="h-8 w-8">
                                      <Info className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>{exercise.name}</DialogTitle>
                                      <DialogDescription>
                                        {exercise.muscleGroup}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 mt-4">
                                      <p>
                                        This exercise targets the {exercise.muscleGroup.toLowerCase()} muscle group.
                                      </p>
                                      
                                      {/* We need to fix the demoVideoUrl reference here */}
                                      <div className="flex items-center">
                                        {/* Instead of checking for demoVideoUrl, which doesn't exist in WorkoutExercise,
                                            we'll use notes as a condition to display the demo link */}
                                        {exercise.notes && (
                                          <a 
                                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name)}+exercise+tutorial`}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center text-primary hover:underline"
                                          >
                                            <Play className="mr-1 h-4 w-4" />
                                            Search Demo
                                          </a>
                                        )}
                                      </div>
                                      
                                      {exercise.notes && (
                                        <div className="mt-4">
                                          <h5 className="font-medium mb-1">Notes:</h5>
                                          <p className="text-sm text-muted-foreground">{exercise.notes}</p>
                                        </div>
                                      )}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              
                              <Separator className="my-2" />
                              
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div className="flex items-center gap-1">
                                  <span className="text-muted-foreground">Sets:</span>
                                  <span className="font-medium">{exercise.sets}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-muted-foreground">Reps:</span>
                                  <span className="font-medium">{exercise.reps}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-muted-foreground" />
                                  <span className="font-medium">{exercise.restSeconds}s</span>
                                </div>
                              </div>
                              
                              {exercise.weightOrIntensity && (
                                <div className="mt-2 flex items-center text-sm">
                                  <Weight className="h-3 w-3 mr-1 text-muted-foreground" />
                                  <span>{exercise.weightOrIntensity}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-6 text-center text-muted-foreground">
                          <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Rest Day</p>
                        </div>
                      )}
                    </CardContent>
                    {day.exercises.length > 0 && (
                      <CardFooter>
                        <Button variant="outline" className="w-full">Start Workout</Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkoutPlan;
