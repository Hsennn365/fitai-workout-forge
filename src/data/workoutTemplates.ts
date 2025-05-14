
import { WorkoutPlan, Week, Day, WorkoutExercise } from "@/types";
import { exercises } from "./exercisesData";

// Helper function to find exercise by ID
const findExercise = (id: string) => {
  const exercise = exercises.find(ex => ex.id === id);
  if (!exercise) {
    throw new Error(`Exercise with ID ${id} not found`);
  }
  return exercise;
};

// Helper function to create a workout exercise
const createWorkoutExercise = (
  exerciseId: string, 
  sets: number, 
  reps: number, 
  restSeconds: number,
  weightOrIntensity?: string,
  notes?: string
): WorkoutExercise => {
  const exercise = findExercise(exerciseId);
  
  return {
    exerciseId: exercise.id,
    name: exercise.name,
    muscleGroup: exercise.muscleGroup,
    sets,
    reps,
    restSeconds,
    weightOrIntensity,
    notes
  };
};

// Template 1: Full Body Workout (3 days per week)
export const fullBodyTemplate: WorkoutPlan = {
  id: "template-full-body",
  generatedOn: new Date().toISOString(),
  name: "Full Body Workout Plan",
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          dayNumber: 1,
          name: "Full Body A",
          exercises: [
            createWorkoutExercise("ex001", 3, 10, 90, "Moderate weight", "Focus on form"),
            createWorkoutExercise("ex002", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex003", 3, 8, 120, "Moderate weight", "Keep back straight"),
            createWorkoutExercise("ex008", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex017", 3, 30, 60, "Hold for 30 seconds")
          ]
        },
        {
          dayNumber: 2,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 3,
          name: "Full Body B",
          exercises: [
            createWorkoutExercise("ex004", 3, 8, 90, "Bodyweight"),
            createWorkoutExercise("ex005", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex007", 3, 12, 90, "Moderate weight"),
            createWorkoutExercise("ex009", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex018", 3, 15, 60, "Each side")
          ]
        },
        {
          dayNumber: 4,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 5,
          name: "Full Body C",
          exercises: [
            createWorkoutExercise("ex006", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex013", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex011", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex010", 3, 15, 60, "Light weight"),
            createWorkoutExercise("ex019", 3, 15, 60, "Bodyweight")
          ]
        },
        {
          dayNumber: 6,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 7,
          name: "Rest Day",
          exercises: []
        }
      ]
    }
  ]
};

// Template 2: Upper/Lower Split (4 days per week)
export const upperLowerTemplate: WorkoutPlan = {
  id: "template-upper-lower",
  generatedOn: new Date().toISOString(),
  name: "Upper/Lower Split",
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          dayNumber: 1,
          name: "Upper Body A",
          exercises: [
            createWorkoutExercise("ex002", 4, 8, 90, "Moderate to heavy weight"),
            createWorkoutExercise("ex004", 4, 8, 90, "Bodyweight"),
            createWorkoutExercise("ex005", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex008", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex009", 3, 12, 60, "Light to moderate weight")
          ]
        },
        {
          dayNumber: 2,
          name: "Lower Body A",
          exercises: [
            createWorkoutExercise("ex001", 4, 8, 120, "Moderate to heavy weight"),
            createWorkoutExercise("ex011", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex007", 3, 12, 90, "Moderate to heavy weight"),
            createWorkoutExercise("ex015", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex012", 4, 15, 60, "Moderate weight")
          ]
        },
        {
          dayNumber: 3,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 4,
          name: "Upper Body B",
          exercises: [
            createWorkoutExercise("ex013", 4, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex006", 4, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex014", 3, 15, 60, "Light to moderate weight"),
            createWorkoutExercise("ex016", 3, 10, 60, "Moderate weight"),
            createWorkoutExercise("ex010", 3, 15, 60, "Light weight")
          ]
        },
        {
          dayNumber: 5,
          name: "Lower Body B",
          exercises: [
            createWorkoutExercise("ex003", 4, 8, 120, "Moderate to heavy weight"),
            createWorkoutExercise("ex020", 3, 10, 90, "Moderate weight", "Each leg"),
            createWorkoutExercise("ex007", 3, 12, 90, "Different foot position from day 2"),
            createWorkoutExercise("ex012", 4, 15, 60, "Moderate weight"),
            createWorkoutExercise("ex017", 3, 30, 60, "Hold for 30 seconds")
          ]
        },
        {
          dayNumber: 6,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 7,
          name: "Rest Day",
          exercises: []
        }
      ]
    }
  ]
};

// Template 3: Push/Pull/Legs Split (6 days per week)
export const pplTemplate: WorkoutPlan = {
  id: "template-push-pull-legs",
  generatedOn: new Date().toISOString(),
  name: "Push/Pull/Legs Split",
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          dayNumber: 1,
          name: "Push Day",
          exercises: [
            createWorkoutExercise("ex002", 4, 8, 90, "Moderate to heavy weight"),
            createWorkoutExercise("ex005", 4, 8, 90, "Moderate weight"),
            createWorkoutExercise("ex013", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex009", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex019", 3, 15, 60, "Bodyweight", "To failure")
          ]
        },
        {
          dayNumber: 2,
          name: "Pull Day",
          exercises: [
            createWorkoutExercise("ex003", 4, 8, 120, "Moderate to heavy weight"),
            createWorkoutExercise("ex004", 4, 8, 90, "Bodyweight"),
            createWorkoutExercise("ex006", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex008", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex014", 3, 15, 60, "Light weight")
          ]
        },
        {
          dayNumber: 3,
          name: "Legs Day",
          exercises: [
            createWorkoutExercise("ex001", 4, 8, 120, "Moderate to heavy weight"),
            createWorkoutExercise("ex007", 4, 10, 90, "Moderate to heavy weight"),
            createWorkoutExercise("ex011", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex015", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex012", 4, 15, 60, "Moderate weight")
          ]
        },
        {
          dayNumber: 4,
          name: "Push Day",
          exercises: [
            createWorkoutExercise("ex002", 4, 10, 90, "Moderate weight", "Different grip than day 1"),
            createWorkoutExercise("ex005", 4, 10, 90, "Moderate weight", "Different grip than day 1"),
            createWorkoutExercise("ex010", 3, 15, 60, "Light weight"),
            createWorkoutExercise("ex009", 3, 15, 60, "Light weight", "Different attachment than day 1"),
            createWorkoutExercise("ex019", 3, 12, 60, "Bodyweight with elevated feet")
          ]
        },
        {
          dayNumber: 5,
          name: "Pull Day",
          exercises: [
            createWorkoutExercise("ex016", 4, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex004", 4, 10, 90, "Bodyweight", "Different grip than day 2"),
            createWorkoutExercise("ex006", 3, 12, 90, "Moderate weight", "Different grip than day 2"),
            createWorkoutExercise("ex008", 3, 15, 60, "Light weight", "Different curl variation"),
            createWorkoutExercise("ex018", 3, 15, 60, "With weight plate")
          ]
        },
        {
          dayNumber: 6,
          name: "Legs Day",
          exercises: [
            createWorkoutExercise("ex020", 4, 10, 90, "Moderate weight", "Each leg"),
            createWorkoutExercise("ex007", 4, 12, 90, "Moderate weight", "Different foot position than day 3"),
            createWorkoutExercise("ex011", 3, 12, 90, "Moderate weight", "Single leg"),
            createWorkoutExercise("ex015", 3, 15, 60, "Light weight", "Single leg"),
            createWorkoutExercise("ex012", 4, 20, 60, "Moderate weight", "Single leg")
          ]
        },
        {
          dayNumber: 7,
          name: "Rest Day",
          exercises: []
        }
      ]
    }
  ]
};

// Template 4: Upper Body Focus (4 days per week)
export const upperBodyTemplate: WorkoutPlan = {
  id: "template-upper-body",
  generatedOn: new Date().toISOString(),
  name: "Upper Body Focus",
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          dayNumber: 1,
          name: "Chest & Triceps",
          exercises: [
            createWorkoutExercise("ex002", 4, 8, 90, "Moderate to heavy weight"),
            createWorkoutExercise("ex013", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex019", 3, 15, 60, "Bodyweight"),
            createWorkoutExercise("ex009", 4, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex017", 3, 30, 60, "Hold for 30 seconds")
          ]
        },
        {
          dayNumber: 2,
          name: "Back & Biceps",
          exercises: [
            createWorkoutExercise("ex004", 4, 8, 90, "Bodyweight"),
            createWorkoutExercise("ex006", 4, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex016", 3, 10, 60, "Moderate weight"),
            createWorkoutExercise("ex008", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex018", 3, 15, 60, "Each side")
          ]
        },
        {
          dayNumber: 3,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 4,
          name: "Shoulders & Arms",
          exercises: [
            createWorkoutExercise("ex005", 4, 8, 90, "Moderate weight"),
            createWorkoutExercise("ex010", 3, 15, 60, "Light weight"),
            createWorkoutExercise("ex014", 3, 15, 60, "Light to moderate weight"),
            createWorkoutExercise("ex008", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex009", 3, 12, 60, "Light to moderate weight")
          ]
        },
        {
          dayNumber: 5,
          name: "Lower Body",
          exercises: [
            createWorkoutExercise("ex001", 4, 8, 120, "Moderate to heavy weight"),
            createWorkoutExercise("ex011", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex015", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex020", 3, 10, 90, "Moderate weight", "Each leg"),
            createWorkoutExercise("ex012", 4, 15, 60, "Moderate weight")
          ]
        },
        {
          dayNumber: 6,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 7,
          name: "Rest Day",
          exercises: []
        }
      ]
    }
  ]
};

// Template 5: Core & Functional Training (3 days per week)
export const coreTemplate: WorkoutPlan = {
  id: "template-core-functional",
  generatedOn: new Date().toISOString(),
  name: "Core & Functional Training",
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          dayNumber: 1,
          name: "Functional Full Body",
          exercises: [
            createWorkoutExercise("ex001", 3, 12, 60, "Moderate weight"),
            createWorkoutExercise("ex019", 3, 15, 60, "Bodyweight"),
            createWorkoutExercise("ex017", 3, 30, 60, "Hold for 30 seconds"),
            createWorkoutExercise("ex020", 3, 12, 60, "Bodyweight", "Each leg"),
            createWorkoutExercise("ex018", 3, 15, 60, "Each side")
          ]
        },
        {
          dayNumber: 2,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 3,
          name: "Core Strength",
          exercises: [
            createWorkoutExercise("ex017", 4, 45, 60, "Hold for 45 seconds"),
            createWorkoutExercise("ex018", 4, 20, 60, "Each side"),
            createWorkoutExercise("ex004", 3, 8, 60, "Bodyweight"),
            createWorkoutExercise("ex003", 3, 10, 90, "Moderate weight"),
            createWorkoutExercise("ex019", 3, 15, 60, "Bodyweight")
          ]
        },
        {
          dayNumber: 4,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 5,
          name: "Functional Strength",
          exercises: [
            createWorkoutExercise("ex020", 3, 12, 60, "With dumbbells", "Each leg"),
            createWorkoutExercise("ex011", 3, 12, 60, "Light to moderate weight"),
            createWorkoutExercise("ex005", 3, 10, 60, "Moderate weight"),
            createWorkoutExercise("ex010", 3, 15, 60, "Light weight"),
            createWorkoutExercise("ex017", 3, 30, 30, "Three different plank variations")
          ]
        },
        {
          dayNumber: 6,
          name: "Rest Day",
          exercises: []
        },
        {
          dayNumber: 7,
          name: "Rest Day",
          exercises: []
        }
      ]
    }
  ]
};

// Export all templates
export const workoutTemplates: WorkoutPlan[] = [
  fullBodyTemplate,
  upperLowerTemplate,
  pplTemplate,
  upperBodyTemplate,
  coreTemplate
];

// Get template by ID
export const getTemplateById = (id: string): WorkoutPlan | undefined => {
  return workoutTemplates.find(template => template.id === id);
};

// Get template by days per week
export const getTemplateByDaysPerWeek = (days: number): WorkoutPlan | undefined => {
  switch (days) {
    case 2:
    case 3:
      return fullBodyTemplate; // 3 days
    case 4:
      return upperLowerTemplate; // 4 days
    case 5:
      return upperBodyTemplate; // 4+1 days
    case 6:
    case 7:
      return pplTemplate; // 6 days
    default:
      return fullBodyTemplate; // Default to 3 days
  }
};

