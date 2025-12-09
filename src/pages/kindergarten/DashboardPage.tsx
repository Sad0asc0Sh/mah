import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { 
  LogOut, User, LayoutDashboard, Image, Newspaper, 
  ChevronLeft, Menu, X, Home, Baby, Users, Wallet
} from "lucide-react";
import GalleryManager from "@/components/kindergarten/dashboard/GalleryManager";
import NewsManager from "@/components/kindergarten/dashboard/NewsManager";
import ParentOverview from "@/components/kindergarten/dashboard/ParentOverview";
import ChildrenManager from "@/components/kindergarten/dashboard/ChildrenManager";
import FinancialSection from "@/components/kindergarten/dashboard/FinancialSection";

interface UserProfile {
  id: string;
  full_name: string | null;
  role: "admin" | "parent";
  email?: string;
}

type ActiveTab = "dashboard" | "gallery" | "news" | "children" | "financial";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const tab = searchParams.get("tab");
    return (tab as ActiveTab) || "dashboard";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/kindergarten/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", session.user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          const { data: newProfile } = await supabase
            .from("profiles")
            .insert({
              id: session.user.id,
              full_name: session.user.email?.split('@')[0] || 'مدیر',
              role: 'admin'
            })
            .select()
            .single();
          
          if (newProfile) {
            setProfile({ 
              ...newProfile, 
              email: session.user.email,
              role: (newProfile.role as "admin" | "parent") || "parent"
            });
            setLoading(false);
            return;
          }
        }
        throw error;
      }

      setProfile({ 
        ...data, 
        email: session.user.email,
        role: (data.role as "admin" | "parent") || "parent"
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/kindergarten");
  };

  const adminMenuItems = [
    { id: "dashboard" as ActiveTab, label: "پیشخوان", icon: LayoutDashboard },
    { id: "children" as ActiveTab, label: "مدیریت کودکان", icon: Baby },
    { id: "gallery" as ActiveTab, label: "مدیریت گالری", icon: Image },
    { id: "news" as ActiveTab, label: "مدیریت اخبار", icon: Newspaper },
  ];

  const parentMenuItems = [
    { id: "dashboard" as ActiveTab, label: "وضعیت فرزند", icon: Baby },
    { id: "financial" as ActiveTab, label: "امور مالی", icon: Wallet },
  ];

  const menuItems = profile?.role === "admin" ? adminMenuItems : parentMenuItems;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center animate-pulse">
          <span className="text-3xl">🌻</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex" dir="rtl">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-50
        w-72 bg-slate-900 flex flex-col
        transform transition-transform duration-300 lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center">
                <span className="text-2xl">🌻</span>
              </div>
              <div>
                <h1 className="font-bold text-white">مهدکودک رُما</h1>
                <p className="text-xs text-slate-400\">پنل {profile?.role === "admin" ? "مدیریت" : "والدین"}</p>
              </div>
            </div>
            <button 
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center">
              <User className="w-5 h-5 text-amber-400" />
            </div>
              <div>
                <p className="font-medium text-white truncate">{profile?.full_name || "کاربر"}</p>
                <p className="text-xs text-slate-400 truncate">{profile?.email}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                  profile?.role === "admin" 
                    ? "bg-amber-400/20 text-amber-300" 
                    : "bg-sky-400/20 text-sky-300"
                }`}>
                  {profile?.role === "admin" ? "مدیر" : "والد"}
                </span>
              </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${activeTab === item.id 
                  ? 'bg-amber-400 text-slate-900 font-bold shadow-lg shadow-amber-400/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {activeTab === item.id && <ChevronLeft className="w-4 h-4 mr-auto" />}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link to="/kindergarten">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Home className="w-5 h-5" />
              مشاهده سایت
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            خروج از حساب
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {activeTab === "dashboard" && (profile?.role === "admin" ? "پیشخوان" : "وضعیت فرزند")}
                  {activeTab === "children" && "مدیریت کودکان"}
                  {activeTab === "gallery" && "مدیریت گالری"}
                  {activeTab === "news" && "مدیریت اخبار"}
                  {activeTab === "financial" && "امور مالی"}
                </h2>
                <p className="text-sm text-slate-500">
                  {activeTab === "dashboard" && (profile?.role === "admin" ? "خلاصه وضعیت سایت" : "گزارش روزانه فرزند شما")}
                  {activeTab === "children" && "ثبت و مدیریت کودکان و گزارش‌ها"}
                  {activeTab === "gallery" && "آپلود و مدیریت تصاویر گالری"}
                  {activeTab === "news" && "مدیریت اخبار و اطلاعیه‌ها"}
                  {activeTab === "financial" && "پرداخت شهریه و مشاهده تراکنش‌ها"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {activeTab === "dashboard" && (
            profile?.role === "admin" ? <DashboardOverview /> : <ParentOverview />
          )}
          {activeTab === "children" && profile?.role === "admin" && <ChildrenManager />}
          {activeTab === "gallery" && profile?.role === "admin" && <GalleryManager />}
          {activeTab === "news" && profile?.role === "admin" && <NewsManager />}
          {activeTab === "financial" && profile?.role === "parent" && profile?.id && (
            <FinancialSection userId={profile.id} />
          )}
        </div>
      </main>
    </div>
  );
}

// Dashboard Overview Component
function DashboardOverview() {
  const [stats, setStats] = useState({
    galleryCount: 0,
    newsCount: 0,
    publishedNews: 0,
    childrenCount: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [galleryRes, newsRes, childrenRes] = await Promise.all([
        supabase.from("gallery").select("id", { count: 'exact', head: true }),
        supabase.from("news_updates").select("id, is_published"),
        supabase.from("children").select("id", { count: 'exact', head: true }),
      ]);

      setStats({
        galleryCount: galleryRes.count || 0,
        newsCount: newsRes.data?.length || 0,
        publishedNews: newsRes.data?.filter(n => n.is_published).length || 0,
        childrenCount: childrenRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-sky-100 flex items-center justify-center">
              <Baby className="w-7 h-7 text-sky-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{stats.childrenCount}</p>
              <p className="text-sm text-slate-500">کودک ثبت شده</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
              <Image className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{stats.galleryCount}</p>
              <p className="text-sm text-slate-500">تصویر در گالری</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <Newspaper className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{stats.newsCount}</p>
              <p className="text-sm text-slate-500">کل اخبار</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{stats.publishedNews}</p>
              <p className="text-sm text-slate-500">خبر منتشر شده</p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center">
            <span className="text-3xl">🌻</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">به پنل مدیریت خوش آمدید!</h3>
            <p className="text-slate-300 mt-1">
              از این پنل می‌توانید محتوای سایت مهدکودک آفتاب را مدیریت کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
