import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate("/kindergarten/dashboard");
      }
    } catch (err: any) {
      setError(err.message === "Invalid login credentials" 
        ? "ایمیل یا رمز عبور اشتباه است" 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-amber-400 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/kindergarten" className="inline-block">
            <div className="h-20 w-20 rounded-2xl bg-amber-400 flex items-center justify-center shadow-xl shadow-amber-400/30 mx-auto">
              <span className="text-5xl">🌻</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mt-6">مهدکودک آفتاب</h1>
          <p className="text-slate-400 mt-2">پورتال مدیریت</p>
        </div>

        <Card className="border-slate-800 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <CardTitle className="text-xl text-white">ورود به پورتال مدیریت</CardTitle>
            <CardDescription className="text-slate-400">
              برای مدیریت محتوای سایت وارد شوید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">ایمیل</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">رمز عبور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400"
                    dir="ltr"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-6 text-lg shadow-lg shadow-amber-400/30 transition-all hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    در حال ورود...
                  </>
                ) : (
                  "ورود به پورتال مدیریت"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/kindergarten" className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
                ← بازگشت به صفحه اصلی
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
