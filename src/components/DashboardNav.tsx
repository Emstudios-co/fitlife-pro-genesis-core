
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Activity, Apple, UserCircle, Dumbbell } from "lucide-react";

const DashboardNav = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      name: "Rutinas",
      path: "/workouts",
      icon: <Dumbbell className="w-5 h-5" />,
    },
    {
      name: "Nutrición",
      path: "/nutrition",
      icon: <Apple className="w-5 h-5" />,
    },
    {
      name: "Perfil",
      path: "/profile",
      icon: <UserCircle className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-white border-b border-neutral-light sticky top-0 z-30">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="font-bold text-primary text-xl flex items-center">
              <span className="text-accent">Fit</span>Life Pro
            </Link>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-neutral-dark hover:bg-neutral-light"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm text-neutral-dark">
              {user?.email}
            </span>
            <Button
              variant="outline"
              onClick={() => signOut()}
              className="text-neutral-dark"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-light z-40">
        <div className="grid grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-3 ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-neutral-dark"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
