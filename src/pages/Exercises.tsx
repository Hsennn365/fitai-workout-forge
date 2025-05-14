
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dumbbell, Search, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { exercises } from "@/data/exercisesData";
import { Exercise } from "@/types";

// Get unique muscle groups for filtering
const muscleGroups = Array.from(new Set(exercises.map(ex => ex.muscleGroup)));

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("all_muscles");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all_equipment");
  
  // Get unique equipment types for filtering
  const equipmentTypes = Array.from(
    new Set(
      exercises.flatMap(ex => ex.equipmentNeeded)
        .filter(eq => eq !== "None")
    )
  );
  
  // Filter exercises based on search term and filters
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMuscleGroup = selectedMuscleGroup === "all_muscles" || 
                               exercise.muscleGroup === selectedMuscleGroup;
    
    const matchesEquipment = selectedEquipment === "all_equipment" || 
                             exercise.equipmentNeeded.includes(selectedEquipment);
    
    return matchesSearch && matchesMuscleGroup && matchesEquipment;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <PageHeader 
          title="Exercise Database" 
          description="Browse our comprehensive collection of exercises" 
        />
        
        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="all">All Exercises</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select 
                  value={selectedMuscleGroup} 
                  onValueChange={setSelectedMuscleGroup}
                >
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Muscle Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_muscles">All Muscles</SelectItem>
                    {muscleGroups.map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select 
                  value={selectedEquipment} 
                  onValueChange={setSelectedEquipment}
                >
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_equipment">All Equipment</SelectItem>
                    <SelectItem value="None">Bodyweight</SelectItem>
                    {equipmentTypes.map(eq => (
                      <SelectItem key={eq} value={eq}>{eq}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.length > 0 ? (
                  filteredExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <Dumbbell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-xl font-medium">No exercises found</h3>
                    <p className="mt-2 text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-0">
              <div className="py-12 text-center">
                <Dumbbell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                <h3 className="mt-4 text-xl font-medium">No favorites yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Add exercises to your favorites for quick access
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Exercise Card Component
const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{exercise.name}</CardTitle>
            <CardDescription>{exercise.muscleGroup}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {exercise.imageUrl && (
          <div className="mb-4 overflow-hidden rounded-md">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={exercise.imageUrl} 
                alt={exercise.name} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground mb-4">
          {exercise.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {exercise.equipmentNeeded.map((equipment) => (
            <Badge key={equipment} variant="outline">
              {equipment}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm">
          Add to Favorites
        </Button>
        
        {exercise.demoVideoUrl && (
          <a 
            href={exercise.demoVideoUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-primary hover:underline"
          >
            <Play className="mr-1 h-4 w-4" />
            Watch Demo
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default Exercises;
