import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "parent";
}

export interface UserProfile {
  id: string;
  full_name: string | null;
  role: "admin" | "parent";
  email?: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const location = useLocation();

  useEffect(() => {
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Fetch user profile to get role
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", session.user.id)
        .single();

      if (error) {
        // If profile doesn't exist, create one with default role
        if (error.code === 'PGRST116') {
          const { data: newProfile } = await supabase
            .from("profiles")
            .insert({
              id: session.user.id,
              full_name: session.user.email?.split('@')[0] || 'کاربر',
              role: 'admin'
            })
            .select()
            .single();
          
          if (newProfile) {
            setUserProfile({ ...newProfile, email: session.user.email });
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }
        }
        throw error;
      }

      setUserProfile({ ...profile, email: session.user.email });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900" dir="rtl">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-3xl">🌻</span>
          </div>
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300">در حال بررسی دسترسی...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/kindergarten/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && userProfile?.role !== requiredRole && userProfile?.role !== "admin") {
    return <Navigate to="/kindergarten/dashboard" replace />;
  }

  return <>{children}</>;
}

// Export hook for accessing user profile in dashboard
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, role")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
}
