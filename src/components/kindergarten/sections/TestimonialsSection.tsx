import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "سارا محمدی",
    role: "مادر آریا",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "از وقتی پسرم به این مهدکودک می‌رود، تغییرات شگفت‌انگیزی در رفتار و یادگیری‌اش دیده‌ام. مربیان بسیار مهربان و حرفه‌ای هستند.",
  },
  {
    id: 2,
    name: "علی رضایی",
    role: "پدر مهسا",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "محیط بسیار امن و تمیز است. دخترم هر روز با شوق به مهدکودک می‌رود و چیزهای جدید یاد می‌گیرد. واقعاً راضی هستیم.",
  },
  {
    id: 3,
    name: "مریم کریمی",
    role: "مادر کیان",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "بهترین تصمیمی که گرفتیم ثبت‌نام فرزندمان در این مهدکودک بود. برنامه‌های آموزشی عالی و غذای سالم از ویژگی‌های برجسته آن است.",
  },
  {
    id: 4,
    name: "احمد نوری",
    role: "پدر هانا و سینا",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    text: "هر دو فرزندم اینجا ثبت‌نام هستند. گزارش‌دهی روزانه و ارتباط نزدیک با والدین یکی از نقاط قوت این مجموعه است.",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 2;

  const next = () => {
    setCurrentIndex((prev) =>
      prev + visibleCount >= testimonials.length ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - visibleCount : prev - 1
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
            نظرات والدین
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            آنچه <span className="text-amber-500">والدین</span> درباره ما می‌گویند
          </h2>
          <p className="text-slate-600">
            رضایت والدین و خوشحالی کودکان، بزرگ‌ترین افتخار ماست
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {testimonials.slice(currentIndex, currentIndex + visibleCount).map((testimonial) => (
              <Card
                key={testimonial.id}
                className="flex-1 min-w-0 border border-slate-200 shadow-lg bg-white"
              >
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-amber-200 mb-4" />
                  <p className="text-slate-700 mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-amber-200"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-300 hover:bg-slate-100"
              onClick={prev}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-300 hover:bg-slate-100"
              onClick={next}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
