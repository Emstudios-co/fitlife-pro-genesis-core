import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import DashboardNav from "../components/DashboardNav";
import { Activity, Calendar, Dumbbell, Heart, Users, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";

interface WorkoutSummary {
  completed: number;
  streak: number;
  nextWorkout: string;
  progress: number;
}

interface NutritionSummary {
  caloriesGoal: number;
  caloriesConsumed: number;
  waterGoal: number;
  waterConsumed: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [workoutSummary, setWorkoutSummary] = useState<WorkoutSummary>({
    completed: 0,
    streak: 0,
    nextWorkout: "Hoy",
    progress: 0,
  });
  const [nutritionSummary, setNutritionSummary] = useState<NutritionSummary>({
    caloriesGoal: 2000,
    caloriesConsumed: 1450,
    waterGoal: 2000,
    waterConsumed: 1200,
  });
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      // Simular la carga de datos del usuario
      const loadUserData = async () => {
        try {
          // Aquí se realizarían las consultas reales a Supabase
          // Por ahora, usamos datos de ejemplo
          setWorkoutSummary({
            completed: 8,
            streak: 4,
            nextWorkout: "Hoy - Entrenamiento de piernas",
            progress: 65,
          });
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      };

      loadUserData();
    }
  }, [user]);

  const handleStartWorkout = () => {
    navigate("/workouts");
  };

  const handleCheckNutrition = () => {
    navigate("/nutrition");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light min-h-screen pb-20 md:pb-0">
      <DashboardNav />
      
      <div className="container-custom py-6">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            ¡Hola{user.first_name ? `, ${user.first_name}` : ""}!
          </h1>
          <p className="text-neutral-dark/70">
            Bienvenido a tu panel de FitLife Pro. ¡Sigue así!
          </p>
        </header>
        
        {/* Resumen de progreso */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="text-accent" />
                Progreso semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold">{workoutSummary.progress}%</span>
                <span className="text-neutral-dark/70 text-sm">Meta: 4 entrenamientos</span>
              </div>
              <Progress value={workoutSummary.progress} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Dumbbell className="text-primary" />
                Entrenamientos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-dark/70">Completados:</span>
                <span className="font-semibold">{workoutSummary.completed} esta semana</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-dark/70">Racha:</span>
                <span className="font-semibold">{workoutSummary.streak} días</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="text-secondary" />
                Nutrición
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-dark/70">Calorías:</span>
                <span className="font-semibold">{nutritionSummary.caloriesConsumed} / {nutritionSummary.caloriesGoal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-dark/70">Agua:</span>
                <span className="font-semibold">{nutritionSummary.waterConsumed}ml / {nutritionSummary.waterGoal}ml</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Próxima actividad */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Próxima actividad</CardTitle>
              <CardDescription>
                Mantén tu rutina y continúa con tu progreso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-primary h-5 w-5" />
                    <div>
                      <h3 className="font-medium">{workoutSummary.nextWorkout}</h3>
                      <p className="text-sm text-neutral-dark/70">Duración estimada: 45 minutos</p>
                    </div>
                  </div>
                  <Button onClick={handleStartWorkout}>
                    Comenzar entrenamiento
                  </Button>
                </div>
                
                <div className="border-t md:border-t-0 md:border-l border-neutral-light md:pl-4 pt-4 md:pt-0 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="text-secondary h-5 w-5" />
                    <div>
                      <h3 className="font-medium">Plan de comidas diario</h3>
                      <p className="text-sm text-neutral-dark/70">Ajustado a tus objetivos</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleCheckNutrition}>
                    Ver plan nutricional
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Estadísticas y comunidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Logros recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Racha de 4 días</h3>
                    <p className="text-xs text-neutral-dark/70">
                      ¡Sigue así para aumentar tu racha!
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                  +15 pts
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">5 entrenamientos completados</h3>
                    <p className="text-xs text-neutral-dark/70">
                      Esta semana has sido muy consistente
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  +30 pts
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Meta calórica alcanzada</h3>
                    <p className="text-xs text-neutral-dark/70">
                      Has cumplido tu meta por 3 días consecutivos
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                  +25 pts
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Comunidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-neutral-light rounded-lg bg-neutral-light/30">
                  <h3 className="font-medium mb-2">Actividad reciente</h3>
                  <div className="space-y-3">
                    <p className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>157 personas completaron su entrenamiento hoy</span>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>23 personas alcanzaron nuevos récords personales</span>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      <span>45 nuevos miembros se unieron esta semana</span>
                    </p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                >
                  Ver comunidad completa
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
