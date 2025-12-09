import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Baby,
  Calendar,
  Utensils,
  Moon,
  Activity,
  MessageSquare,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { formatJalaliDate } from "@/lib/jalali-date";

interface Child {
  id: string;
  name: string;
  birth_date: string | null;
  avatar_url: string | null;
  class_name: string | null;
}

interface DailyReport {
  id: string;
  date: string;
  mood: string | null;
  food_intake: string | null;
  sleep_quality: string | null;
  activity: string | null;
  teacher_note: string | null;
}

const moodLabels: Record<string, { label: string; emoji: string; color: string }> = {
  happy: { label: "خوشحال", emoji: "😊", color: "text-green-600 bg-green-100" },
  calm: { label: "آرام", emoji: "😌", color: "text-blue-600 bg-blue-100" },
  sleepy: { label: "خواب‌آلود", emoji: "😴", color: "text-purple-600 bg-purple-100" },
  crying: { label: "گریان", emoji: "😢", color: "text-red-600 bg-red-100" },
  playful: { label: "شیطون", emoji: "😜", color: "text-amber-600 bg-amber-100" },
};

const foodLabels: Record<string, { label: string; emoji: string; color: string }> = {
  full: { label: "کامل خورد", emoji: "🍽️", color: "text-green-600 bg-green-100" },
  half: { label: "نصفه خورد", emoji: "🥄", color: "text-amber-600 bg-amber-100" },
  none: { label: "نخورد", emoji: "🚫", color: "text-red-600 bg-red-100" },
  good: { label: "خوب خورد", emoji: "👍", color: "text-green-600 bg-green-100" },
};

const sleepLabels: Record<string, { label: string; emoji: string; color: string }> = {
  good: { label: "خواب خوب", emoji: "😴", color: "text-green-600 bg-green-100" },
  fair: { label: "متوسط", emoji: "😐", color: "text-amber-600 bg-amber-100" },
  poor: { label: "بد خوابید", emoji: "😵", color: "text-red-600 bg-red-100" },
  none: { label: "نخوابید", emoji: "👀", color: "text-purple-600 bg-purple-100" },
};

export default function ParentOverview() {
  const [children, setChildren] = useState<Child[]>([]);
  const [reports, setReports] = useState<Record<string, DailyReport | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildrenAndReports();
  }, []);

  const fetchChildrenAndReports = async () => {
    try {
      const { data: childrenData, error: childrenError } = await supabase
        .from("children")
        .select("*")
        .order("name");

      if (childrenError) throw childrenError;

      setChildren(childrenData || []);

      // Fetch today's reports for each child
      const today = new Date().toISOString().split("T")[0];
      const reportsMap: Record<string, DailyReport | null> = {};

      for (const child of childrenData || []) {
        const { data: reportData } = await supabase
          .from("daily_reports")
          .select("*")
          .eq("child_id", child.id)
          .eq("date", today)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        reportsMap[child.id] = reportData;
      }

      setReports(reportsMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (years === 0) {
      return `${months} ماهه`;
    }
    return `${years} سال${months > 0 ? ` و ${months} ماه` : ""}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <Baby className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          هنوز فرزندی ثبت نشده است
        </h3>
        <p className="text-slate-500 text-center max-w-md">
          لطفاً با مدیریت مهدکودک تماس بگیرید تا فرزند شما به حساب کاربری‌تان اضافه شود.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {children.map((child) => {
        const report = reports[child.id];
        const today = formatJalaliDate(new Date(), {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <div key={child.id} className="space-y-6">
            {/* Child Profile Card */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 p-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm border-4 border-white/30 overflow-hidden flex items-center justify-center">
                    {child.avatar_url ? (
                      <img
                        src={child.avatar_url}
                        alt={child.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl">👶</span>
                    )}
                  </div>
                  <div className="text-white">
                    <h2 className="text-2xl font-bold mb-1">{child.name}</h2>
                    {child.birth_date && (
                      <p className="text-white/80 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {calculateAge(child.birth_date)}
                      </p>
                    )}
                    {child.class_name && (
                      <p className="text-white/80 mt-1 text-sm">
                        کلاس: {child.class_name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Today's Report */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-800">گزارش امروز</h3>
                <span className="text-sm text-slate-500">({today})</span>
              </div>

              {report ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Mood */}
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                        <span className="text-lg">😊</span> حالت روحی
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {report.mood ? (
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${moodLabels[report.mood]?.color || "bg-slate-100"}`}>
                          <span className="text-2xl">{moodLabels[report.mood]?.emoji || "😊"}</span>
                          <span className="font-bold">{moodLabels[report.mood]?.label || report.mood}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">ثبت نشده</span>
                      )}
                    </CardContent>
                  </Card>

                  {/* Food */}
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                        <Utensils className="w-4 h-4" /> وضعیت غذا
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {report.food_intake ? (
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${foodLabels[report.food_intake]?.color || "bg-slate-100"}`}>
                          <span className="text-2xl">{foodLabels[report.food_intake]?.emoji || "🍽️"}</span>
                          <span className="font-bold">{foodLabels[report.food_intake]?.label || report.food_intake}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">ثبت نشده</span>
                      )}
                    </CardContent>
                  </Card>

                  {/* Sleep */}
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                        <Moon className="w-4 h-4" /> کیفیت خواب
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {report.sleep_quality ? (
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${sleepLabels[report.sleep_quality]?.color || "bg-slate-100"}`}>
                          <span className="text-2xl">{sleepLabels[report.sleep_quality]?.emoji || "😴"}</span>
                          <span className="font-bold">{sleepLabels[report.sleep_quality]?.label || report.sleep_quality}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">ثبت نشده</span>
                      )}
                    </CardContent>
                  </Card>

                  {/* Activity */}
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> فعالیت
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {report.activity ? (
                        <p className="text-slate-700 text-sm line-clamp-2">{report.activity}</p>
                      ) : (
                        <span className="text-slate-400">ثبت نشده</span>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-0 shadow-md bg-slate-50">
                  <CardContent className="flex flex-col items-center py-8">
                    <AlertCircle className="w-12 h-12 text-slate-300 mb-4" />
                    <p className="text-slate-500 text-center">
                      هنوز گزارشی برای امروز ثبت نشده است.
                      <br />
                      <span className="text-sm">گزارش روزانه معمولاً بعد از ساعت ۱۴ ثبت می‌شود.</span>
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Teacher's Note */}
            {report?.teacher_note && (
              <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-sky-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-600 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> پیام مربی
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">{report.teacher_note}</p>
                </CardContent>
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
}
