
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../contexts/AuthContext";
import DashboardNav from "../components/DashboardNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { UserCircle, Settings, Activity, ListChecks } from "lucide-react";

const profileSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Email no válido").optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  goal: z.string().optional(),
  activity_level: z.string().optional(),
});

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      weight: "",
      height: "",
      goal: "",
      activity_level: "",
    },
  });

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    
    if (user) {
      form.reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
    }
  }, [user, loading, navigate, form]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await updateProfile({
        first_name: data.first_name,
        last_name: data.last_name,
      });
      
      if (error) {
        toast.error("Error al actualizar el perfil", {
          description: error.message,
        });
      } else {
        toast.success("Perfil actualizado correctamente");
      }
    } catch (error) {
      toast.error("Error al actualizar el perfil", {
        description: "Ha ocurrido un error inesperado",
      });
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Mi perfil</h1>
          <p className="text-neutral-dark/70">
            Gestiona tu información personal y preferencias
          </p>
        </header>

        <Tabs defaultValue="info">
          <TabsList className="mb-6">
            <TabsTrigger value="info">
              <UserCircle className="h-4 w-4 mr-2" />
              Información personal
            </TabsTrigger>
            <TabsTrigger value="goals">
              <ListChecks className="h-4 w-4 mr-2" />
              Objetivos
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Datos personales</CardTitle>
                  <CardDescription>
                    Actualiza tu información personal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu nombre" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Apellidos</FormLabel>
                              <FormControl>
                                <Input placeholder="Tus apellidos" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="tu@email.com"
                                disabled
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              El email no se puede cambiar
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Peso (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="70" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Altura (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="175" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="activity_level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nivel de actividad</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona tu nivel de actividad" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sedentary">Sedentario</SelectItem>
                                <SelectItem value="lightly_active">Ligeramente activo</SelectItem>
                                <SelectItem value="moderately_active">Moderadamente activo</SelectItem>
                                <SelectItem value="very_active">Muy activo</SelectItem>
                                <SelectItem value="extra_active">Extremadamente activo</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Guardando..." : "Guardar cambios"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cuenta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                    >
                      Cambiar contraseña
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                    >
                      Eliminar cuenta
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Conectar dispositivos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                    >
                      <img 
                        src="https://www.apple.com/v/apple-watch/al/images/overview/health/apple_watch_health__dxz174dyiboa_large.jpg" 
                        alt="Apple Watch" 
                        className="w-6 h-6 mr-2"
                      />
                      Apple Watch
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                    >
                      <img 
                        src="https://static-00.iconduck.com/assets.00/fitbit-icon-256x256-lpy4tbk1.png" 
                        alt="Fitbit" 
                        className="w-6 h-6 mr-2"
                      />
                      Fitbit
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                    >
                      <img 
                        src="https://static.vecteezy.com/system/resources/previews/020/975/572/original/garmin-logo-garmin-icon-transparent-free-png.png" 
                        alt="Garmin" 
                        className="w-6 h-6 mr-2"
                      />
                      Garmin
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="goals">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Objetivos de fitness</CardTitle>
                  <CardDescription>
                    Establece tus metas para personalizar tu experiencia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Objetivo principal</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu objetivo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose_weight">Perder peso</SelectItem>
                          <SelectItem value="gain_muscle">Ganar músculo</SelectItem>
                          <SelectItem value="maintain">Mantener peso</SelectItem>
                          <SelectItem value="improve_fitness">Mejorar condición física</SelectItem>
                          <SelectItem value="athletic_performance">Rendimiento deportivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <FormLabel>Días de entrenamiento por semana</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona días" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 días</SelectItem>
                          <SelectItem value="3-4">3-4 días</SelectItem>
                          <SelectItem value="5-6">5-6 días</SelectItem>
                          <SelectItem value="7">Todos los días</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <FormLabel>Tiempo disponible por sesión</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tiempo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15-30">15-30 minutos</SelectItem>
                          <SelectItem value="30-45">30-45 minutos</SelectItem>
                          <SelectItem value="45-60">45-60 minutos</SelectItem>
                          <SelectItem value="60+">Más de 60 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                    >
                      Guardar objetivos
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Objetivos de nutrición</CardTitle>
                  <CardDescription>
                    Personaliza tus metas nutricionales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Preferencias alimentarias</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona preferencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Sin restricciones</SelectItem>
                          <SelectItem value="vegetarian">Vegetariano</SelectItem>
                          <SelectItem value="vegan">Vegano</SelectItem>
                          <SelectItem value="keto">Keto</SelectItem>
                          <SelectItem value="paleo">Paleo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <FormLabel>Alergias/Intolerancias</FormLabel>
                      <Input placeholder="Ej: lactosa, gluten, frutos secos" />
                    </div>
                    
                    <div>
                      <FormLabel>Proporción de macronutrientes</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona proporción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="balanced">Equilibrado (40/30/30)</SelectItem>
                          <SelectItem value="low_carb">Bajo en carbohidratos (20/40/40)</SelectItem>
                          <SelectItem value="high_protein">Alto en proteínas (30/50/20)</SelectItem>
                          <SelectItem value="high_carb">Alto en carbohidratos (50/20/30)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                    >
                      Guardar preferencias
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de la aplicación</CardTitle>
                <CardDescription>
                  Gestiona tus preferencias y notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notificaciones</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Recordatorios de entrenamiento</p>
                        <p className="text-sm text-neutral-dark/70">Recibe alertas de tus próximos entrenamientos</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Recordatorios de hidratación</p>
                        <p className="text-sm text-neutral-dark/70">Recibe alertas para mantenerte hidratado</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Actualizaciones de la comunidad</p>
                        <p className="text-sm text-neutral-dark/70">Mantente al día con novedades de la comunidad</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Idioma y región</h3>
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Idioma</FormLabel>
                      <Select defaultValue="es">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <FormLabel>Unidades</FormLabel>
                      <Select defaultValue="metric">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar sistema de unidades" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metric">Métrico (kg, cm)</SelectItem>
                          <SelectItem value="imperial">Imperial (lb, in)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}
                >
                  Guardar configuración
                </Button>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button variant="outline" className="w-full" onClick={() => toast.info("Próximamente", { description: "Esta función estará disponible pronto" })}>
                  Exportar mis datos
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
