
import { UserProfile, WorkoutPlan, Exercise, ActivityLevel } from "@/types";

// Sample user profile
export const mockUser: UserProfile = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  gender: "male",
  dateOfBirth: "1990-05-15",
  heightCm: 178,
  weightKg: 75,
  bodyFatPct: 18,
  restingHR: 65,
  activityLevel: ActivityLevel.ModeratelyActive,
  goals: "Build muscle and improve overall fitness",
  injuryHistory: "Minor lower back pain"
};

// Sample exercises
export const mockExercises: Exercise[] = [
  {
    id: "ex1",
    name: "Barbell Bench Press",
    muscleGroup: "Chest",
    equipmentNeeded: ["Barbell", "Bench"],
    description: "Lie on a bench with feet flat on the floor. Grasp the barbell with hands slightly wider than shoulder-width apart. Lower the bar to your chest, then push it back up.",
    demoVideoUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "ex2",
    name: "Barbell Squat",
    muscleGroup: "Legs",
    equipmentNeeded: ["Barbell", "Squat Rack"],
    description: "Stand with feet shoulder-width apart, barbell across upper back. Bend knees and lower body until thighs are parallel to floor, then return to starting position.",
    demoVideoUrl: "https://www.youtube.com/watch?v=ultWZbUMPL8",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "ex3",
    name: "Deadlift",
    muscleGroup: "Back",
    equipmentNeeded: ["Barbell"],
    description: "Stand with feet hip-width apart, barbell over feet. Bend at hips and knees, grasp bar. Keep back straight, lift bar by extending hips and knees.",
    demoVideoUrl: "https://www.youtube.com/watch?v=op9kVnSso6Q",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "ex4",
    name: "Pull-ups",
    muscleGroup: "Back",
    equipmentNeeded: ["Pull-up Bar"],
    description: "Hang from bar with palms facing away, hands shoulder-width apart. Pull body up until chin clears bar, then lower back to start.",
    demoVideoUrl: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "ex5",
    name: "Dumbbell Shoulder Press",
    muscleGroup: "Shoulders",
    equipmentNeeded: ["Dumbbells"],
    description: "Sit or stand with dumbbells at shoulder height, palms facing forward. Press weights overhead until arms are extended, then lower back to start.",
    demoVideoUrl: "https://www.youtube.com/watch?v=qEwKCR5JCog",
    imageUrl: "/placeholder.svg"
  },
];

// Sample workout plan
export const mockWorkoutPlans: WorkoutPlan[] = [
  {
    id: "plan1",
    userId: "user1",
    generatedOn: "2023-05-10T08:30:00Z",
    name: "Strength Building Program",
    weeks: [
      {
        weekNumber: 1,
        days: [
          {
            dayNumber: 1,
            name: "Monday",
            exercises: [
              {
                exerciseId: "ex1",
                name: "Barbell Bench Press",
                muscleGroup: "Chest",
                sets: 3,
                reps: 10,
                restSeconds: 90,
                weightOrIntensity: "70% 1RM"
              },
              {
                exerciseId: "ex5",
                name: "Dumbbell Shoulder Press",
                muscleGroup: "Shoulders",
                sets: 3,
                reps: 12,
                restSeconds: 60,
                weightOrIntensity: "Moderate"
              }
            ]
          },
          {
            dayNumber: 2,
            name: "Wednesday",
            exercises: [
              {
                exerciseId: "ex2",
                name: "Barbell Squat",
                muscleGroup: "Legs",
                sets: 4,
                reps: 8,
                restSeconds: 120,
                weightOrIntensity: "75% 1RM"
              }
            ]
          },
          {
            dayNumber: 3,
            name: "Friday",
            exercises: [
              {
                exerciseId: "ex3",
                name: "Deadlift",
                muscleGroup: "Back",
                sets: 3,
                reps: 6,
                restSeconds: 180,
                weightOrIntensity: "80% 1RM"
              },
              {
                exerciseId: "ex4",
                name: "Pull-ups",
                muscleGroup: "Back",
                sets: 3,
                reps: 8,
                restSeconds: 90,
                weightOrIntensity: "Bodyweight"
              }
            ]
          }
        ]
      },
      // Additional weeks would be included here
      {
        weekNumber: 2,
        days: [
          {
            dayNumber: 1,
            name: "Monday",
            exercises: [
              {
                exerciseId: "ex1",
                name: "Barbell Bench Press",
                muscleGroup: "Chest",
                sets: 4,
                reps: 8,
                restSeconds: 90,
                weightOrIntensity: "75% 1RM"
              },
              {
                exerciseId: "ex5",
                name: "Dumbbell Shoulder Press",
                muscleGroup: "Shoulders",
                sets: 3,
                reps: 12,
                restSeconds: 60,
                weightOrIntensity: "Moderate"
              }
            ]
          },
          {
            dayNumber: 2,
            name: "Wednesday",
            exercises: [
              {
                exerciseId: "ex2",
                name: "Barbell Squat",
                muscleGroup: "Legs",
                sets: 4,
                reps: 8,
                restSeconds: 120,
                weightOrIntensity: "80% 1RM"
              }
            ]
          },
          {
            dayNumber: 3,
            name: "Friday",
            exercises: [
              {
                exerciseId: "ex3",
                name: "Deadlift",
                muscleGroup: "Back",
                sets: 3,
                reps: 6,
                restSeconds: 180,
                weightOrIntensity: "85% 1RM"
              },
              {
                exerciseId: "ex4",
                name: "Pull-ups",
                muscleGroup: "Back",
                sets: 3,
                reps: 10,
                restSeconds: 90,
                weightOrIntensity: "Bodyweight"
              }
            ]
          }
        ]
      }
    ]
  }
];
