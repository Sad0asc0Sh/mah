import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, Palette, Dumbbell, Globe } from "lucide-react";

const programs = [
  {
    icon: GraduationCap,
    title: "پیش‌دبستانی",
    description: "آماده‌سازی کامل کودکان برای ورود به دبستان با یادگیری مفاهیم پایه",
    age: "۵ تا ۶ سال",
    color: "from-sky-500 to-sky-600",
    bgColor: "bg-sky-50",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
  },
  {
    icon: Palette,
    title: "خلاقیت و هنر",
    description: "پرورش خلاقیت از طریق نقاشی، کاردستی، موسیقی و نمایش",
    age: "۳ تا ۶ سال",
    color: "from-amber-400 to-amber-500",
    bgColor: "bg-amber-50",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
  },
  {
    icon: Dumbbell,
    title: "ورزش و بازی",
    description: "تقویت مهارت‌های حرکتی و جسمانی از طریق بازی‌های گروهی",
    age: "۲ تا ۶ سال",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&q=80",
  },
  {
    icon: Globe,
    title: "زبان انگلیسی",
    description: "آموزش زبان انگلیسی با روش‌های بازی‌محور و سرگرم‌کننده",
    age: "۴ تا ۶ سال",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80",
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
            برنامه‌های آموزشی
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            برنامه‌های <span className="text-amber-500">متنوع و جذاب</span> ما
          </h2>
          <p className="text-gray-600">
            برای هر سنی، برنامه‌ای متناسب با نیازها و علایق کودکان طراحی شده است
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
                    <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-40`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 p-6 ${program.bgColor}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${program.color} text-white`}>
                        <program.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm text-gray-500 bg-white/50 px-2 py-1 rounded-full">
                        {program.age}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{program.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-medium text-sky-600 hover:text-sky-700 group/btn"
                    >
                      اطلاعات بیشتر
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
          <Button size="lg" variant="outline" className="gap-2 border-sky-300 text-sky-600 hover:bg-sky-50">
            مشاهده همه برنامه‌ها
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
