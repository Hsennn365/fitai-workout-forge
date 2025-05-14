
import { WorkoutPlan } from '@/types';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// TypeScript workaround for jsPDF-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    internal: {
      events: any;
      scaleFactor: number;
      pageSize: {
        width: number;
        getWidth: () => number;
        height: number;
        getHeight: () => number;
      };
      pages: number[]; // Changed from any[] to number[] to match expected type
      getEncryptor(objectId: number): (data: string) => string;
    };
  }
}

export const exportWorkoutToPDF = (workout: WorkoutPlan): void => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add title and date
    doc.setFontSize(20);
    doc.text(workout.name, 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${format(new Date(workout.generatedOn), 'PPP')}`, 14, 32);
    
    doc.setTextColor(0);
    doc.text('Weekly Workout Schedule:', 14, 42);
    
    // For each week in the workout plan
    workout.weeks.forEach((week, weekIndex) => {
      const weekTitle = `Week ${week.weekNumber}`;
      const startY = 52 + weekIndex * 10;
      
      doc.setFontSize(14);
      doc.text(weekTitle, 14, startY);
      
      // Add daily workouts in a table
      const tableData = week.days.map(day => {
        return [
          `Day ${day.dayNumber}`,
          day.name,
          day.exercises.length > 0 
            ? day.exercises.map(e => `${e.name} (${e.sets}×${e.reps})`).join('\n') 
            : 'Rest Day'
        ];
      });
      
      doc.autoTable({
        startY: startY + 5,
        head: [['Day', 'Workout', 'Exercises']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [123, 104, 238] }, // Purple color
        margin: { top: 10 }
      });
      
      // Detailed exercises for each day
      week.days.forEach((day, dayIndex) => {
        if (day.exercises.length > 0) {
          // Add a page break if needed - use a safer check
          if ((doc.internal.pages.length > 1) ||
              (weekIndex > 0 && dayIndex > 2)) {
            doc.addPage();
          }
          
          doc.setFontSize(14);
          doc.text(`Week ${week.weekNumber} - ${day.name} (Day ${day.dayNumber})`, 14, 20);
          
          const exerciseData = day.exercises.map(exercise => {
            return [
              exercise.name,
              exercise.muscleGroup,
              `${exercise.sets} × ${exercise.reps}`,
              `${exercise.restSeconds} sec`,
              exercise.weightOrIntensity || 'N/A',
              exercise.notes || ''
            ];
          });
          
          doc.autoTable({
            startY: 30,
            head: [['Exercise', 'Muscle Group', 'Sets × Reps', 'Rest', 'Weight/Intensity', 'Notes']],
            body: exerciseData,
            theme: 'striped',
            headStyles: { fillColor: [123, 104, 238] } // Purple color
          });
        }
      });
    });
    
    // Add footer
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(
        'FitAI Workout Forge - Your Personalized Workout Plan',
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }
    
    // Save the PDF
    doc.save(`${workout.name.replace(/\s+/g, '_')}.pdf`);
  } catch (error) {
    console.error('Error exporting workout to PDF:', error);
    throw error;
  }
};
