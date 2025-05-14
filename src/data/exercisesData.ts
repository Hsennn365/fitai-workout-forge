
import { Exercise } from "@/types";

// Comprehensive exercise database
export const exercises: Exercise[] = [
  {
    id: "ex001",
    name: "Barbell Back Squat",
    muscleGroup: "Quadriceps",
    equipmentNeeded: ["Barbell", "Squat Rack"],
    description: "A compound exercise that targets the quadriceps, hamstrings, and glutes. Position the barbell on your upper back, squat down until your thighs are parallel to the ground, then stand back up.",
    demoVideoUrl: "https://www.youtube.com/watch?v=bEv6CCg2BC8",
    imageUrl: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex002",
    name: "Bench Press",
    muscleGroup: "Chest",
    equipmentNeeded: ["Barbell", "Bench"],
    description: "Lie on a bench with your feet on the ground. Lower the barbell to your chest, then push it back up until your arms are extended.",
    demoVideoUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex003",
    name: "Deadlift",
    muscleGroup: "Back",
    equipmentNeeded: ["Barbell"],
    description: "A compound exercise that targets the back, hamstrings, and glutes. Bend at the hips and knees to lower your hands to the bar, then stand up straight while holding the bar.",
    demoVideoUrl: "https://www.youtube.com/watch?v=op9kVnSso6Q",
    imageUrl: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex004",
    name: "Pull-up",
    muscleGroup: "Back",
    equipmentNeeded: ["Pull-up Bar"],
    description: "Hang from a bar with your palms facing away from you. Pull yourself up until your chin is over the bar, then lower yourself back down.",
    demoVideoUrl: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    imageUrl: "https://images.unsplash.com/photo-1598971639058-a4575d867024?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"
  },
  {
    id: "ex005",
    name: "Overhead Press",
    muscleGroup: "Shoulders",
    equipmentNeeded: ["Barbell"],
    description: "Stand with your feet shoulder-width apart. Press the barbell from your shoulders until your arms are fully extended overhead.",
    demoVideoUrl: "https://www.youtube.com/watch?v=2yjwXTZQDDI",
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex006",
    name: "Barbell Row",
    muscleGroup: "Back",
    equipmentNeeded: ["Barbell"],
    description: "Bend over with a barbell in your hands. Pull the barbell up to your lower chest, then lower it back down.",
    demoVideoUrl: "https://www.youtube.com/watch?v=FWJR5Ve8bnQ",
    imageUrl: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex007",
    name: "Leg Press",
    muscleGroup: "Quadriceps",
    equipmentNeeded: ["Leg Press Machine"],
    description: "Sit on the leg press machine with your back against the pad. Push the platform away with your feet, then slowly lower it back down.",
    demoVideoUrl: "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex008",
    name: "Dumbbell Curl",
    muscleGroup: "Biceps",
    equipmentNeeded: ["Dumbbells"],
    description: "Hold a dumbbell in each hand with your arms extended. Curl the dumbbells up to your shoulders, then lower them back down.",
    demoVideoUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex009",
    name: "Tricep Pushdown",
    muscleGroup: "Triceps",
    equipmentNeeded: ["Cable Machine"],
    description: "Stand facing a cable machine with a rope attachment. Push the rope down until your arms are fully extended, then slowly raise it back up.",
    demoVideoUrl: "https://www.youtube.com/watch?v=2-LAMcpzODU",
    imageUrl: "https://images.unsplash.com/photo-1530822847156-5df684ec5ee3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex010",
    name: "Lateral Raise",
    muscleGroup: "Shoulders",
    equipmentNeeded: ["Dumbbells"],
    description: "Stand with a dumbbell in each hand. Raise the dumbbells to the sides until they reach shoulder height, then lower them back down.",
    demoVideoUrl: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80"
  },
  {
    id: "ex011",
    name: "Romanian Deadlift",
    muscleGroup: "Hamstrings",
    equipmentNeeded: ["Barbell"],
    description: "Hold a barbell at hip level. Keeping your back straight, bend at the hips to lower the bar, then return to the starting position.",
    demoVideoUrl: "https://www.youtube.com/watch?v=jEy_czb3RKA",
    imageUrl: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex012",
    name: "Calf Raise",
    muscleGroup: "Calves",
    equipmentNeeded: ["Smith Machine", "Block"],
    description: "Stand on a block with the balls of your feet. Raise your heels as high as possible, then lower them back down.",
    demoVideoUrl: "https://www.youtube.com/watch?v=gwLzBJYoWlI",
    imageUrl: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex013",
    name: "Cable Fly",
    muscleGroup: "Chest",
    equipmentNeeded: ["Cable Machine"],
    description: "Stand between two cable stations with the pulleys set at chest height. Pull the handles forward and together in a hugging motion.",
    demoVideoUrl: "https://www.youtube.com/watch?v=Iwe6AmxVf7o",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex014",
    name: "Face Pull",
    muscleGroup: "Shoulders",
    equipmentNeeded: ["Cable Machine", "Rope Attachment"],
    description: "Stand facing a cable machine with a rope attachment. Pull the rope towards your face while keeping your upper arms parallel to the ground.",
    demoVideoUrl: "https://www.youtube.com/watch?v=rep-qVOkqgk",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80"
  },
  {
    id: "ex015",
    name: "Leg Curl",
    muscleGroup: "Hamstrings",
    equipmentNeeded: ["Leg Curl Machine"],
    description: "Lie face down on a leg curl machine. Curl your legs up as far as possible, then lower them back down.",
    demoVideoUrl: "https://www.youtube.com/watch?v=1Tq3QdYUuHs",
    imageUrl: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex016",
    name: "Dumbbell Row",
    muscleGroup: "Back",
    equipmentNeeded: ["Dumbbell", "Bench"],
    description: "Place one knee and hand on a bench, with the other foot on the floor. Pull the dumbbell up to your hip, then lower it back down.",
    demoVideoUrl: "https://www.youtube.com/watch?v=roCP6wCXPqo",
    imageUrl: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex017",
    name: "Plank",
    muscleGroup: "Core",
    equipmentNeeded: ["None"],
    description: "Get into a push-up position, but rest on your forearms instead of your hands. Keep your body in a straight line from head to heels.",
    demoVideoUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
    imageUrl: "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex018",
    name: "Russian Twist",
    muscleGroup: "Core",
    equipmentNeeded: ["Weight Plate", "None"],
    description: "Sit on the floor with your knees bent and feet elevated. Twist your torso from side to side.",
    demoVideoUrl: "https://www.youtube.com/watch?v=wkD8rjkodUI",
    imageUrl: "https://images.unsplash.com/photo-1567598508481-65a7a5553012?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "ex019",
    name: "Push-up",
    muscleGroup: "Chest",
    equipmentNeeded: ["None"],
    description: "Start in a plank position with your hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push yourself back up.",
    demoVideoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
    imageUrl: "https://images.unsplash.com/photo-1598971639058-a4575d867024?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"
  },
  {
    id: "ex020",
    name: "Lunge",
    muscleGroup: "Quadriceps",
    equipmentNeeded: ["None", "Dumbbells"],
    description: "Step forward with one leg and lower your hips until both knees are bent at about 90 degrees. Return to the starting position and repeat with the other leg.",
    demoVideoUrl: "https://www.youtube.com/watch?v=QOVaHwm-Q6U",
    imageUrl: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
];

