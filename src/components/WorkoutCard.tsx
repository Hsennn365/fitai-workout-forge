
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { WorkoutPlan } from "@/types";

interface WorkoutCardProps {
  workout: WorkoutPlan;
  onView: (workout: WorkoutPlan) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onView }) => {
  if (!workout || !workout.weeks || !workout.weeks[0]) {
    console.error("Invalid workout plan:", workout);
    return null;
  }

  const totalExercises = workout.weeks.reduce((total, week) => {
    return total + week.days.reduce((dayTotal, day) => {
      return dayTotal + day.exercises.length;
    }, 0);
  }, 0);

  const daysPerWeek = new Set<string>();
  workout.weeks[0].days.forEach(day => {
    if (day.exercises.length > 0) {
      daysPerWeek.add(day.name);
    }
  });

  return (
    <Card className="workout-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{workout.name}</CardTitle>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(workout.generatedOn), { addSuffix: true })}
          </span>
        </div>
        <CardDescription>
          {workout.weeks.length} week plan
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center text-sm">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
            <span>{daysPerWeek.size} days per week</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="mr-2 h-4 w-4 opacity-70" />
            <span>{totalExercises} exercises total</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 opacity-70" />
            <span>~60 minutes per session</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onView(workout)}
        >
          View Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
