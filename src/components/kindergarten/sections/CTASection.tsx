import { Button } from "@/components/ui/button";
import { Phone, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-400/50 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-400 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>آمادگی امروز، آینده‌ای روشن برای فرزندتان</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            شروع مسیر پیش‌یک و پیش‌دو در کودکستان روما
          </h2>

          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            در روما، کودکان ۳ تا ۷ سال در محیطی امن، شاد و استاندارد، مهارت‌های
            تحصیلی، اجتماعی و زندگی را در قالب بازی، پروژه‌های خلاق و کلاس‌های
            تخصصی می‌آموزند. اگر برای سال تحصیلی جدید برنامه‌ریزی می‌کنید، اکنون
            بهترین زمان برای پیش‌ثبت‌نام است.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/kindergarten/register">
              <Button
                size="lg"
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 text-lg px-10 py-6 gap-2 font-bold shadow-lg shadow-amber-400/30 transition-all hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                درخواست پیش‌ثبت‌نام
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-10 py-6 gap-2 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              تماس: ۰۹۱۵۵۱۰۹۲۶۹ / ۰۵۱۳۸۹۲۴۵۲۴
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-slate-300 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">۳–۷</span>
              <span>پذیرش کودکان ۳ تا ۷ سال (مختلط)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">۲</span>
              <span>دوره‌های پیش‌یک و پیش‌دو با رویکرد استاندارد</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">۸+</span>
              <span>کلاس‌های مهارتی و آموزشی تخصصی</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
