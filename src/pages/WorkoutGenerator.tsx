import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Dumbbell, Calendar, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { mockUser } from "@/mockData";
import { UserProfile } from "@/types";

const WorkoutGenerator = () => {
  const navigate = useNavigate();
  const { generateWorkoutPlan } = useWorkoutData();
  
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [generationType, setGenerationType] = useState<string>("ai");
  const [isGenerating, setIsGenerating] = useState(false);

  // Validate days per week selection
  const validateDaysPerWeek = (days: number): boolean => {
    return days >= 2 && days <= 7;
  };
  
  const handleGenerate = () => {
    try {
      // Validate input
      if (!validateDaysPerWeek(daysPerWeek)) {
        toast("Invalid Selection", {
          description: "Please select between 2 and 7 days per week",
          variant: "destructive"
        });
        return;
      }
      
      setIsGenerating(true);
      
      console.log("Generating workout plan with days per week:", daysPerWeek);
      
      // Generate workout plan using our hook
      const plan = generateWorkoutPlan(user, daysPerWeek);
      console.log("Plan generated:", plan);
      
      setTimeout(() => {
        // Navigate to the workout plan
        setIsGenerating(false);
        navigate(`/workout-plan/${plan.id}`);
      }, 1000);
      
    } catch (error) {
      console.error("Error generating workout:", error);
      toast("Error", {
        description: "Failed to generate workout plan",
        variant: "destructive"
      });
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <PageHeader 
          title="Workout Generator" 
          description="Create a personalized workout plan based on your goals and preferences" 
        />
        
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Generate Your Workout Plan</CardTitle>
            <CardDescription>
              Select your preferences and generate a personalized workout plan
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="preferences" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preferences" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Days Per Week Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="daysPerWeek">Days Per Week</Label>
                    <Select 
                      value={daysPerWeek.toString()} 
                      onValueChange={(value) => setDaysPerWeek(parseInt(value))}
                    >
                      <SelectTrigger id="daysPerWeek">
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        {[2, 3, 4, 5, 6, 7].map(days => (
                          <SelectItem key={days} value={days.toString()}>
                            {days} day{days !== 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex gap-2 mt-2">
                      {[2, 3, 4, 5, 6, 7].map(days => (
                        <Button
                          key={days}
                          type="button"
                          variant={days === daysPerWeek ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDaysPerWeek(days)}
                          className="flex-1"
                        >
                          {days}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Generation Type */}
                  <div className="space-y-2">
                    <Label htmlFor="generationType">Generation Type</Label>
                    <Select 
                      value={generationType} 
                      onValueChange={setGenerationType}
                    >
                      <SelectTrigger id="generationType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">AI Generated</SelectItem>
                        <SelectItem value="template">Use Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                
                  {/* Additional preferences can be added here */}
                  <div className="space-y-2">
                    <Label htmlFor="focus">Workout Focus</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger id="focus">
                        <SelectValue placeholder="Select focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
                        <SelectItem value="endurance">Endurance</SelectItem>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select defaultValue="intermediate">
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="equipment">Available Equipment</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Dumbbells", "Barbell", "Pull-up Bar", 
                      "Resistance Bands", "Gym Machine", "Bodyweight Only"
                    ].map(equipment => (
                      <Button
                        key={equipment}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="justify-start"
                      >
                        <input
                          type="checkbox"
                          id={equipment}
                          className="mr-2"
                        />
                        {equipment}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requests, limitations, or preferences..."
                    className="resize-none"
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating} 
                  className="w-full bg-gradient-to-r from-fitai-indigo to-fitai-purple hover:opacity-90"
                >
                  {isGenerating ? (
                    <>Generating Your Workout...</>
                  ) : (
                    <>
                      Generate Workout Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </TabsContent>
              
              <TabsContent value="templates" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      name: "Full Body Split",
                      days: 3,
                      icon: <Dumbbell className="h-10 w-10 mb-2 opacity-80" />,
                      description: "Train your entire body 3 times per week"
                    },
                    {
                      name: "Upper/Lower Split",
                      days: 4,
                      icon: <Dumbbell className="h-10 w-10 mb-2 opacity-80" />,
                      description: "Alternate between upper and lower body workouts"
                    },
                    {
                      name: "Push/Pull/Legs",
                      days: 6,
                      icon: <Calendar className="h-10 w-10 mb-2 opacity-80" />,
                      description: "Dedicated days for pushing, pulling, and legs"
                    },
                    {
                      name: "Body Part Split",
                      days: 5,
                      icon: <Calendar className="h-10 w-10 mb-2 opacity-80" />,
                      description: "Focus on different muscle groups each day"
                    },
                  ].map((template) => (
                    <Card 
                      key={template.name} 
                      className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      onClick={() => {
                        setDaysPerWeek(template.days);
                        setGenerationType("template");
                      }}
                    >
                      <CardContent className="p-6 text-center">
                        {template.icon}
                        <h3 className="text-lg font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </p>
                        <p className="text-xs mt-2 font-medium">
                          {template.days} days/week
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-fitai-indigo to-fitai-purple hover:opacity-90"
                >
                  {isGenerating ? (
                    <>Generating Your Workout...</>
                  ) : (
                    <>
                      Use Selected Template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkoutGenerator;
