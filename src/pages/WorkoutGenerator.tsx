
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { ActivityLevel, UserProfile, WorkoutPlan } from "@/types";
import { CalendarIcon, Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { mockUser } from "@/mockData";
import { generateWorkoutPlan } from "@/services/aiService";
import { toast } from "sonner";

const formSchema = z.object({
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
  dateOfBirth: z.date({
    required_error: "Please select a date of birth.",
  }),
  heightCm: z.number().min(100, {
    message: "Height must be at least 100 cm.",
  }).max(250, {
    message: "Height must be less than 250 cm.",
  }),
  weightKg: z.number().min(30, {
    message: "Weight must be at least 30 kg.",
  }).max(250, {
    message: "Weight must be less than 250 kg.",
  }),
  bodyFatPct: z.number().min(3, {
    message: "Body fat must be at least 3%.",
  }).max(50, {
    message: "Body fat must be less than 50%.",
  }).optional(),
  restingHR: z.number().min(40, {
    message: "Resting heart rate must be at least 40 bpm.",
  }).max(200, {
    message: "Resting heart rate must be less than 200 bpm.",
  }).optional(),
  activityLevel: z.nativeEnum(ActivityLevel, {
    required_error: "Please select an activity level.",
  }),
  goals: z.string().min(10, {
    message: "Please describe your goals in at least 10 characters.",
  }),
  injuryHistory: z.string().optional(),
});

const WorkoutGenerator = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [user] = useState<UserProfile>(mockUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: user.gender,
      dateOfBirth: new Date(user.dateOfBirth),
      heightCm: user.heightCm,
      weightKg: user.weightKg,
      bodyFatPct: user.bodyFatPct,
      restingHR: user.restingHR,
      activityLevel: user.activityLevel,
      goals: user.goals,
      injuryHistory: user.injuryHistory,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsGenerating(true);
      
      // Create a profile object from form values
      const profile: UserProfile = {
        ...user,
        ...values,
        name: user.name,
        email: user.email,
        dateOfBirth: format(values.dateOfBirth, "yyyy-MM-dd"),
      };
      
      // Generate workout plan
      const plan = await generateWorkoutPlan(profile);
      
      // Store the plan in localStorage (in a real app, this would go to a backend)
      const existingPlans = JSON.parse(localStorage.getItem('workoutPlans') || '[]');
      localStorage.setItem('workoutPlans', JSON.stringify([plan, ...existingPlans]));
      
      // Show success message and redirect
      toast.success("Workout plan generated successfully!");
      navigate('/workout-history');
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate workout plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <PageHeader 
          title="Generate Workout Plan" 
          description="Enter your biometric data and fitness goals to create a personalized plan" 
        />
        
        <Card className="max-w-2xl mx-auto p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="heightCm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weightKg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bodyFatPct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body Fat % (optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value) || undefined)}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="restingHR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resting Heart Rate (bpm, optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value) || undefined)}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Level</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ActivityLevel.Sedentary}>
                            Sedentary (little or no exercise)
                          </SelectItem>
                          <SelectItem value={ActivityLevel.LightlyActive}>
                            Lightly Active (light exercise 1-3 days/week)
                          </SelectItem>
                          <SelectItem value={ActivityLevel.ModeratelyActive}>
                            Moderately Active (moderate exercise 3-5 days/week)
                          </SelectItem>
                          <SelectItem value={ActivityLevel.VeryActive}>
                            Very Active (hard exercise 6-7 days/week)
                          </SelectItem>
                          <SelectItem value={ActivityLevel.ExtremelyActive}>
                            Extremely Active (very hard exercise, physical job or training twice a day)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Goals</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your fitness goals in detail" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      E.g., "Build muscle mass, improve endurance, lose weight"
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="injuryHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Injury History (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List any injuries or conditions that might affect your workout" 
                        className="resize-none" 
                        {...field} 
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-fitai-indigo to-fitai-purple hover:opacity-90" 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  "Generate Workout Plan"
                )}
              </Button>
            </form>
          </Form>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkoutGenerator;
