import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DashboardNav from "../components/DashboardNav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { Apple, Droplet, Activity, Coffee, Pizza } from "lucide-react";

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  image?: string;
}

interface DailyNutrition {
  caloriesGoal: number;
  caloriesConsumed: number;
  waterGoal: number;
  waterConsumed: number;
  proteinGoal: number;
  proteinConsumed: number;
  carbsGoal: number;
  carbsConsumed: number;
  fatGoal: number;
  fatConsumed: number;
}

const Nutrition = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [nutrition, setNutrition] = useState<DailyNutrition>({
    caloriesGoal: 2200,
    caloriesConsumed: 1450,
    waterGoal: 2500,
    waterConsumed: 1600,
    proteinGoal: 120,
    proteinConsumed: 78,
    carbsGoal: 275,
    carbsConsumed: 180,
    fatGoal: 73,
    fatConsumed: 48,
  });
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Simulamos la carga de datos de nutrición desde Supabase
    const mockMeals: Meal[] = [
      {
        id: 1,
        name: "Desayuno saludable",
        calories: 420,
        protein: 25,
        carbs: 45,
        fat: 15,
        time: "08:00",
        image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=300&q=80",
      },
      {
        id: 2,
        name: "Snack de media mañana",
        calories: 180,
        protein: 8,
        carbs: 20,
        fat: 6,
        time: "11:00",
        image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=300&q=80",
      },
      {
        id: 3,
        name: "Almuerzo proteico",
        calories: 550,
        protein: 35,
        carbs: 60,
        fat: 18,
        time: "14:00",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80",
      },
      {
        id: 4,
        name: "Snack de tarde",
        calories: 150,
        protein: 5,
        carbs: 15,
        fat: 6,
        time: "17:00",
        image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=300&q=80",
      },
      {
        id: 5,
        name: "Cena ligera",
        calories: 380,
        protein: 22,
        carbs: 40,
        fat: 10,
        time: "20:00",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
      },
    ];

    setMeals(mockMeals);
  }, []);

  const addWater = () => {
    if (nutrition.waterConsumed < nutrition.waterGoal) {
      setNutrition({
        ...nutrition,
        waterConsumed: Math.min(nutrition.waterConsumed + 250, nutrition.waterGoal),
      });
      toast.success("¡250ml de agua registrados!");
    } else {
      toast.success("¡Has alcanzado tu meta diaria de agua!");
    }
  };

  const logMeal = () => {
    toast.info("Próximamente", { description: "Esta función estará disponible pronto" });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getProgressColorClass = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage < 50) return "bg-primary";
    if (percentage < 80) return "bg-secondary";
    return "bg-accent";
  };

  return (
    <div className="bg-neutral-light min-h-screen pb-20 md:pb-0">
      <DashboardNav />
      
      <div className="container-custom py-6">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Nutrición</h1>
          <p className="text-neutral-dark/70">
            Controla tu alimentación y mantente hidratado
          </p>
        </header>

        <Tabs defaultValue="today">
          <TabsList className="mb-6">
            <TabsTrigger value="today">Hoy</TabsTrigger>
            <TabsTrigger value="mealplan">Plan de comidas</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Calorías
                  </CardTitle>
                  <CardDescription>
                    Meta diaria: {nutrition.caloriesGoal} kcal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span>{nutrition.caloriesConsumed} kcal consumidas</span>
                        <span>{Math.round((nutrition.caloriesConsumed / nutrition.caloriesGoal) * 100)}%</span>
                      </div>
                      <Progress
                        value={(nutrition.caloriesConsumed / nutrition.caloriesGoal) * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-neutral-light rounded-md">
                        <p className="text-xs text-neutral-dark/70">Proteínas</p>
                        <p className="font-semibold">
                          {nutrition.proteinConsumed}g
                          <span className="text-xs text-neutral-dark/50">/{nutrition.proteinGoal}g</span>
                        </p>
                      </div>
                      <div className="p-2 bg-neutral-light rounded-md">
                        <p className="text-xs text-neutral-dark/70">Carbos</p>
                        <p className="font-semibold">
                          {nutrition.carbsConsumed}g
                          <span className="text-xs text-neutral-dark/50">/{nutrition.carbsGoal}g</span>
                        </p>
                      </div>
                      <div className="p-2 bg-neutral-light rounded-md">
                        <p className="text-xs text-neutral-dark/70">Grasas</p>
                        <p className="font-semibold">
                          {nutrition.fatConsumed}g
                          <span className="text-xs text-neutral-dark/50">/{nutrition.fatGoal}g</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    Hidratación
                  </CardTitle>
                  <CardDescription>
                    Meta diaria: {nutrition.waterGoal} ml
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span>{nutrition.waterConsumed} ml consumidos</span>
                        <span>{Math.round((nutrition.waterConsumed / nutrition.waterGoal) * 100)}%</span>
                      </div>
                      <Progress
                        value={(nutrition.waterConsumed / nutrition.waterGoal) * 100}
                        className="h-2 bg-blue-100"
                      />
                    </div>
                    <Button onClick={addWater} className="w-full">
                      <Droplet className="h-4 w-4 mr-2" />
                      Registrar 250ml
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-secondary" />
                    Acciones rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button onClick={logMeal} className="w-full">
                      <Pizza className="h-4 w-4 mr-2" />
                      Registrar comida
                    </Button>
                    <Button variant="outline" onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })} className="w-full">
                      <Apple className="h-4 w-4 mr-2" />
                      Ver recetas recomendadas
                    </Button>
                    <Button variant="outline" onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })} className="w-full">
                      <Activity className="h-4 w-4 mr-2" />
                      Ajustar metas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Plan de comidas para hoy</CardTitle>
                <CardDescription>
                  Un plan equilibrado para alcanzar tus metas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {meals.map((meal) => (
                    <div key={meal.id} className="flex items-start gap-4">
                      {meal.image && (
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{meal.name}</h3>
                            <p className="text-sm text-neutral-dark/70">{meal.time}</p>
                          </div>
                          <span className="text-sm font-medium">{meal.calories} kcal</span>
                        </div>
                        <div className="flex gap-4 mt-2">
                          <span className="text-xs px-2 py-1 bg-neutral-light rounded-full">
                            P: {meal.protein}g
                          </span>
                          <span className="text-xs px-2 py-1 bg-neutral-light rounded-full">
                            C: {meal.carbs}g
                          </span>
                          <span className="text-xs px-2 py-1 bg-neutral-light rounded-full">
                            G: {meal.fat}g
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mealplan">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-secondary" />
                  Plan de comidas personalizado
                </CardTitle>
                <CardDescription>
                  Basado en tus preferencias y objetivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="mb-6 text-neutral-dark/70">
                    Nuestra IA puede crear un plan de comidas personalizado basado en tus preferencias,
                    restricciones alimentarias y objetivos de fitness.
                  </p>
                  <Button onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}>
                    Crear plan personalizado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historial nutricional</CardTitle>
                <CardDescription>
                  Revisa tu progreso y hábitos alimenticios
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Activity className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Análisis en desarrollo</h3>
                <p className="text-neutral-dark/70 mb-6 max-w-md mx-auto">
                  Pronto podrás ver estadísticas detalladas de tu nutrición, patrones y recomendaciones personalizadas.
                </p>
                <Button variant="outline" onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}>
                  Próximamente
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Nutrition;
