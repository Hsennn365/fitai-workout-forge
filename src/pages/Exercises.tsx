
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Exercise } from "@/types";
import { mockExercises } from "@/mockData";
import { Dumbbell, Filter, Play, Search, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  
  // Get unique muscle groups and equipment from exercises
  const muscleGroups = Array.from(new Set(mockExercises.map(ex => ex.muscleGroup)));
  const equipmentTypes = Array.from(
    new Set(mockExercises.flatMap(ex => ex.equipmentNeeded))
  );
  
  // Filter exercises based on search, muscle group, and equipment
  const filteredExercises = mockExercises.filter(exercise => {
    const matchesSearch = searchQuery === "" || 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMuscleGroup = selectedMuscleGroup === null || 
      exercise.muscleGroup === selectedMuscleGroup;
    
    const matchesEquipment = selectedEquipment === null || 
      exercise.equipmentNeeded.includes(selectedEquipment);
    
    return matchesSearch && matchesMuscleGroup && matchesEquipment;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <PageHeader 
          title="Exercise Database" 
          description="Browse and search for exercises to include in your workout" 
        />
        
        <div className="mb-8">
          {/* Search and filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Filters */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-4 w-4" />
                <h3 className="text-sm font-medium">Muscle Group</h3>
                {selectedMuscleGroup && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs ml-auto"
                    onClick={() => setSelectedMuscleGroup(null)}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Tabs
                value={selectedMuscleGroup || "all"}
                onValueChange={(value) => setSelectedMuscleGroup(value === "all" ? null : value)}
                className="w-full"
              >
                <TabsList className="w-full h-auto flex flex-wrap">
                  <TabsTrigger value="all" className="flex-grow text-xs py-1">
                    All
                  </TabsTrigger>
                  {muscleGroups.map((group) => (
                    <TabsTrigger key={group} value={group} className="flex-grow text-xs py-1">
                      {group}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="h-4 w-4" />
                <h3 className="text-sm font-medium">Equipment</h3>
                {selectedEquipment && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs ml-auto"
                    onClick={() => setSelectedEquipment(null)}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Tabs
                value={selectedEquipment || "all"}
                onValueChange={(value) => setSelectedEquipment(value === "all" ? null : value)}
                className="w-full"
              >
                <TabsList className="w-full h-auto flex flex-wrap">
                  <TabsTrigger value="all" className="flex-grow text-xs py-1">
                    All
                  </TabsTrigger>
                  {equipmentTypes.map((equipment) => (
                    <TabsTrigger key={equipment} value={equipment} className="flex-grow text-xs py-1">
                      {equipment}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
        
        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-muted-foreground">No exercises found</h3>
            <p className="mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{exercise.name}</CardTitle>
            <CardDescription className="mt-1">
              <Badge variant="outline">{exercise.muscleGroup}</Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {exercise.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {exercise.equipmentNeeded.map((equipment, index) => (
            <Badge key={index} variant="secondary">
              {equipment}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{exercise.name}</DialogTitle>
              <DialogDescription>
                {exercise.muscleGroup}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p>{exercise.description}</p>
              
              <div>
                <h4 className="font-medium mb-2">Equipment Needed:</h4>
                <div className="flex flex-wrap gap-2">
                  {exercise.equipmentNeeded.map((equipment, index) => (
                    <Badge key={index} variant="secondary">
                      {equipment}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {exercise.demoVideoUrl && (
                <div className="mt-4">
                  <a 
                    href={exercise.demoVideoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <Play className="mr-1 h-4 w-4" />
                    Watch Demo Video
                  </a>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        
        {exercise.demoVideoUrl && (
          <a 
            href={exercise.demoVideoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center"
          >
            <Play className="mr-1 h-4 w-4" />
            Demo
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default Exercises;
