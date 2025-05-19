
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
    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      toast.error("Error al iniciar sesión", {
        description: error.message || "Credenciales inválidas",
      });
    } else {
      toast.success("Sesión iniciada correctamente");
      navigate("/dashboard");
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-6">
          <Link to="/" className="font-bold text-3xl inline-flex items-center">
            <span className="text-gradient">FitLife Pro</span>
          </Link>
          <p className="mt-2 text-neutral-dark/70">
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} className="backdrop-blur-sm bg-white/50 border-purple-200" />
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
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} className="backdrop-blur-sm bg-white/50 border-purple-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            
            {/* Usuario de prueba */}
            <div className="text-center mt-4 text-sm">
              <p>Usuario de prueba:</p>
              <p className="font-mono bg-black/5 p-1 rounded">Email: test@example.com</p>
              <p className="font-mono bg-black/5 p-1 rounded">Contraseña: 123456</p>
            </div>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-dark/70">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-purple-600 hover:underline font-medium">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
