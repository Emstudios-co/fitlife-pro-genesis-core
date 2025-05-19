
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  
  // Redireccionar si ya hay una sesión
  React.useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        console.error("Login error:", error.message);
        toast.error("Error al iniciar sesión", {
          description: error.message || "Credenciales inválidas",
        });
      } else {
        toast.success("Sesión iniciada correctamente");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      toast.error("Error inesperado", {
        description: "Ha ocurrido un problema al intentar iniciar sesión",
      });
    }
  };
  
  const fillTestCredentials = () => {
    form.setValue("email", "test@example.com");
    form.setValue("password", "123456");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-800/20 to-fuchsia-500/20 animate-[kaleidoscopic-animate_20s_ease_infinite]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,40,180,0.2)_0%,transparent_70%)]"></div>
        <div className="absolute -inset-full top-0 z-10 h-full w-[300%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25"></div>
      </div>
      
      <div className="w-full max-w-md p-8 rounded-xl backdrop-blur-md bg-black/30 border border-white/10 shadow-xl z-10">
        <div className="text-center mb-6">
          <Link to="/" className="font-bold text-3xl inline-flex items-center">
            <span className="text-gradient bg-gradient-to-r from-secondary to-purple-500">FitLife Pro</span>
          </Link>
          <p className="mt-2 text-white/70">
            Inicia sesión para continuar con tu entrenamiento
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} className="backdrop-blur-sm bg-white/5 border-purple-500/20 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} className="backdrop-blur-sm bg-white/5 border-purple-500/20 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-gradient-to-r from-secondary to-purple-500 hover:from-secondary/90 hover:to-purple-500/90 transition-all duration-300" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            
            {/* Usuario de prueba */}
            <div className="bg-white/10 rounded-lg p-3 border border-white/10 mt-4">
              <p className="text-white/80 text-sm mb-2">Usuario de prueba:</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-mono text-xs bg-black/20 p-1 rounded text-white/90">test@example.com</p>
                  <p className="font-mono text-xs bg-black/20 p-1 rounded mt-1 text-white/90">123456</p>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={fillTestCredentials}
                  className="bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  Usar credenciales
                </Button>
              </div>
            </div>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-secondary hover:underline font-medium">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
