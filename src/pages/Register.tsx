
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

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})
.refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  
  // Redireccionar si ya hay una sesión
  React.useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const { error } = await signUp(data.email, data.password);
    
    if (error) {
      toast.error("Error al registrarte", {
        description: error.message || "No se pudo completar el registro",
      });
    } else {
      toast.success("Registro completado", {
        description: "Hemos enviado un correo de verificación. Por favor, verifica tu correo.",
      });
      navigate("/login");
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
            Regístrate para comenzar tu transformación
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
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} className="backdrop-blur-sm bg-white/50 border-purple-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-dark/70">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-purple-600 hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
