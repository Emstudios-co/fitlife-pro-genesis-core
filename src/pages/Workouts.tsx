
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DashboardNav from "../components/DashboardNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Dumbbell, Clock, Search, Activity } from "lucide-react";

interface Workout {
  id: number;
  name: string;
  description: string;
  duration: number;
  level: "Principiante" | "Intermedio" | "Avanzado";
  category: string;
  image: string;
}

const workoutCategories = [
  "Todos",
  "Principiante",
  "Intermedio",
  "Avanzado",
  "Cardio",
  "Fuerza",
  "Flexibilidad",
];

const Workouts = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Simulamos la carga de rutinas desde Supabase (esto sería reemplazado por tu consulta real)
    const mockWorkouts: Workout[] = [
      {
        id: 1,
        name: "Entrenamiento de fuerza para principiantes",
        description: "Un entrenamiento completo para desarrollar fuerza y resistencia muscular",
        duration: 30,
        level: "Principiante",
        category: "Fuerza",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80",
      },
      {
        id: 2,
        name: "Cardio HIIT intenso",
        description: "Entrenamiento de intervalos de alta intensidad para quemar grasa",
        duration: 25,
        level: "Intermedio",
        category: "Cardio",
        image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500&q=80",
      },
      {
        id: 3,
        name: "Yoga para flexibilidad",
        description: "Mejora tu flexibilidad y reduce el estrés con esta rutina de yoga",
        duration: 45,
        level: "Principiante",
        category: "Flexibilidad",
        image: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=500&q=80",
      },
      {
        id: 4,
        name: "Entrenamiento de cuerpo completo",
        description: "Rutina avanzada para trabajar todos los grupos musculares",
        duration: 60,
        level: "Avanzado",
        category: "Fuerza",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80",
      },
      {
        id: 5,
        name: "Pilates para core",
        description: "Fortalece tu núcleo con esta rutina de pilates",
        duration: 40,
        level: "Intermedio",
        category: "Flexibilidad",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80",
      },
      {
        id: 6,
        name: "Sprint intervals",
        description: "Mejora tu capacidad cardio con estos intervalos de sprint",
        duration: 20,
        level: "Avanzado",
        category: "Cardio",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&q=80",
      },
    ];
    
    setWorkouts(mockWorkouts);
    setFilteredWorkouts(mockWorkouts);
  }, []);

  useEffect(() => {
    // Filtrar rutinas por búsqueda y categoría
    let result = workouts;

    if (searchTerm) {
      result = result.filter(
        (workout) =>
          workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workout.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "Todos") {
      result = result.filter(
        (workout) =>
          workout.level === selectedCategory || workout.category === selectedCategory
      );
    }

    setFilteredWorkouts(result);
  }, [searchTerm, selectedCategory, workouts]);

  const startWorkout = (workout: Workout) => {
    toast.success(`¡Comenzando ${workout.name}!`, {
      description: "Esta funcionalidad estará completa pronto.",
    });
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
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Rutinas de entrenamiento</h1>
          <p className="text-neutral-dark/70">
            Descubre rutinas personalizadas para alcanzar tus objetivos
          </p>
        </header>

        <div className="mb-8">
          <Tabs defaultValue="browse">
            <TabsList className="mb-6">
              <TabsTrigger value="browse">Explorar rutinas</TabsTrigger>
              <TabsTrigger value="custom">Mi plan personalizado</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-dark/50" />
                  <Input
                    placeholder="Buscar rutinas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {workoutCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="whitespace-nowrap"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.length > 0 ? (
                  filteredWorkouts.map((workout) => (
                    <Card key={workout.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{workout.name}</CardTitle>
                            <CardDescription>{workout.description}</CardDescription>
                          </div>
                          <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                            {workout.level}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-neutral-dark/70">
                          <Clock className="h-4 w-4" />
                          <span>{workout.duration} minutos</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-dark/70">
                          <Dumbbell className="h-4 w-4" />
                          <span>{workout.category}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={() => startWorkout(workout)} className="w-full">
                          Comenzar rutina
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Activity className="mx-auto h-12 w-12 text-neutral-dark/30 mb-4" />
                    <h3 className="text-lg font-medium text-neutral-dark/70">No se encontraron rutinas</h3>
                    <p className="text-neutral-dark/50">
                      Intenta con otra búsqueda o categoría
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="custom">
              <div className="bg-white rounded-lg p-8 text-center shadow">
                <Dumbbell className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Plan de entrenamiento personalizado</h3>
                <p className="text-neutral-dark/70 mb-6 max-w-md mx-auto">
                  Nuestro sistema AI analizará tus objetivos, nivel de experiencia y preferencias
                  para crear un plan totalmente adaptado a ti.
                </p>
                <Button onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}>
                  Crear mi plan personalizado
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="bg-white rounded-lg p-8 text-center shadow">
                <Activity className="mx-auto h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-2">Historial de entrenamientos</h3>
                <p className="text-neutral-dark/70 mb-6 max-w-md mx-auto">
                  Aquí podrás ver todos tus entrenamientos completados, estadísticas y progreso.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                >
                  Próximamente
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
