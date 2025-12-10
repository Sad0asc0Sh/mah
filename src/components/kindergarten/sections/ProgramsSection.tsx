import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  GraduationCap,
  Palette,
  Globe,
  FlaskConical,
  Cpu,
  BookOpen,
  HeartHandshake,
  Calculator,
  Mic2,
} from "lucide-react";

const programs = [
  {
    icon: GraduationCap,
    title: "دوره‌های پیش‌یک و پیش‌دو",
    description:
      "آماده‌سازی علمی و مهارتی کودکان برای ورود به دبستان با تمرکز بر زبان، ریاضی، تقویت تمرکز و مهارت‌های اجتماعی در فضایی شاد و بازی‌محور.",
    age: "ویژه نوآموزان ۳ تا ۷ سال (پایه‌های پیش‌یک و پیش‌دو)",
    color: "from-amber-400 to-amber-500",
    bgColor: "bg-amber-50",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80",
  },
  {
    icon: Globe,
    title: "زبان انگلیسی",
    description:
      "آموزش واژگان، مکالمه‌های ساده و آشنایی با زبان از طریق بازی، آهنگ، شعر و فلش‌کارت تا کودک بدون فشار، زبان دوم را تجربه کند.",
    age: "۳ تا ۷ سال | بازی‌محور و تعاملی",
    color: "from-sky-500 to-sky-600",
    bgColor: "bg-sky-50",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&q=80",
  },
  {
    icon: FlaskConical,
    title: "علوم و آزمایشگاه کودک",
    description:
      "آزمایش‌های ساده، مشاهده پدیده‌ها و کشف قوانین علمی به زبان کودکانه برای تقویت حس کنجکاوی و علاقه به کشف دنیای اطراف.",
    age: "۳ تا ۷ سال | کارگاه‌های جذاب و عملی",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&q=80",
  },
  {
    icon: Cpu,
    title: "رباتیک",
    description:
      "آموزش مفاهیم اولیه رباتیک، ساخت سازه‌های ساده و آشنایی با منطق برنامه‌ریزی برای تقویت تفکر منطقی و مهارت حل مسئله.",
    age: "۴ تا ۷ سال | پروژه‌محور و بازی‌محور",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&q=80",
  },
  {
    icon: BookOpen,
    title: "قرآن و مفاهیم اخلاقی",
    description:
      "آشنایی کودک با مفاهیم اخلاقی و انسانی، قصه‌های قرآنی و آموزه‌های ساده دینی به شیوه‌ای شعرگونه، شاد و قابل‌فهم برای کودکان.",
    age: "۳ تا ۷ سال | قصه، شعر و بازی",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
  },
  {
    icon: HeartHandshake,
    title: "مهارت‌های زندگی",
    description:
      "آموزش مهارت‌هایی مانند همکاری، مسئولیت‌پذیری، مدیریت احساسات، حل تعارض و مهارت‌های ارتباطی برای تقویت رشد شخصیتی و اجتماعی کودکان.",
    age: "۳ تا ۷ سال | تعامل با همسالان",
    color: "from-rose-400 to-rose-500",
    bgColor: "bg-rose-50",
    image:
      "https://images.unsplash.com/photo-1589929460218-da4ba9f483b3?w=400&q=80",
  },
  {
    icon: Palette,
    title: "نقاشی و خلاقیت",
    description:
      "تقویت تخیل، هماهنگی چشم و دست و جرأت ابراز احساسات از طریق کار با رنگ، خمیر، کلاژ و تکنیک‌های متنوع هنری.",
    age: "۳ تا ۷ سال | کارگاه‌های هنری و خلاق",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
  },
  {
    icon: Calculator,
    title: "آی‌مث (i-Math)",
    description:
      "آموزش مفاهیم پایه‌ای ریاضی با روش‌های استاندارد جهانی، بازی‌های فکری و فعالیت‌های جذاب برای تقویت منطق، دقت و تمرکز.",
    age: "۴ تا ۷ سال | برنامه تخصصی ریاضی",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&q=80",
  },
  {
    icon: Mic2,
    title: "قصه‌گویی و نمایش خلاق",
    description:
      "افزایش تمرکز، تقویت دایره واژگان، پرورش تخیل و بیان احساسات از طریق قصه‌گویی تعاملی، نمایش خلاق و بازی‌های نمایشی.",
    age: "۳ تا ۷ سال | تقویت زبان و تخیل",
    color: "from-orange-400 to-orange-500",
    bgColor: "bg-orange-50",
    image:
      "https://images.unsplash.com/photo-1590490359854-dfba19688d70?w=400&q=80",
  },
];

export default function ProgramsSection() {
  return (
    <section
      id="programs"
      className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
            لیست کلاس‌های آموزشی روما
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            کلاس‌های آموزشی و مهارتی{" "}
            <span className="text-amber-500">کودکستان روما</span>
          </h2>
          <p className="text-gray-600">
            برنامه آموزشی روما طوری طراحی شده که در کنار تقویت پایه‌های تحصیلی،
            مهارت‌های فردی، اجتماعی و خلاقیت کودکان نیز رشد کند.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-40`}
                    />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 p-6 ${program.bgColor}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-xl bg-gradient-to-br ${program.color} text-white`}
                      >
                        <program.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500 bg-white/50 px-2 py-1 rounded-full">
                        {program.age}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {program.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-medium text-sky-600 hover:text-sky-700 group/btn"
                    >
                      اطلاعات بیشتر از مشاور آموزشی
                      <ArrowLeft className="w-4 h-4 mr-1 group-hover/btn:-translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-sky-300 text-sky-600 hover:bg-sky-50"
          >
            هماهنگی برای مشاوره و انتخاب کلاس‌های مناسب
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
