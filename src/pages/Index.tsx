
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dumbbell, Zap, BarChart3, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockWorkoutPlans } from '@/mockData';
import WorkoutCard from '@/components/WorkoutCard';

const Index = () => {
  const navigate = useNavigate();
  const [latestPlan] = useState(mockWorkoutPlans[0]);
  
  const features = [
    {
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: "AI-Powered Planning",
      description: "Our advanced AI engine creates personalized workout plans based on your unique biometrics and fitness goals."
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-primary" />,
      title: "Progress Tracking",
      description: "Monitor your fitness journey with comprehensive metrics and adjustable workouts that evolve with you."
    },
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: "Structured Programs",
      description: "Follow professionally designed 4-week progressive workout programs that adapt to your fitness level."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-fitai-indigo/10 via-fitai-purple/5 to-fitai-indigo/10 dark:from-fitai-indigo/20 dark:via-fitai-purple/10 dark:to-fitai-indigo/20">
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
            <Dumbbell className="h-16 w-16 text-primary mb-6 animate-pulse-slow" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">BioFitAI</span> Workout Planner
            </h1>
            <p className="text-xl max-w-2xl mb-10 text-muted-foreground">
              Personalized workout plans powered by AI, tailored to your body and fitness goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/workout-generator')}
                className="bg-gradient-to-r from-fitai-indigo to-fitai-purple hover:opacity-90"
              >
                Generate My Plan
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/profile')}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Latest plan section */}
        {latestPlan && (
          <section className="container mx-auto px-4 py-16 border-t">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Your Latest Plan</h2>
                <p className="text-muted-foreground">Continue your fitness journey where you left off</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/workout-history')}
                className="mt-4 md:mt-0"
              >
                View All Plans
              </Button>
            </div>
            <div className="max-w-md mx-auto">
              <WorkoutCard 
                workout={latestPlan} 
                onView={() => navigate('/workout-plan/plan1')} 
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
