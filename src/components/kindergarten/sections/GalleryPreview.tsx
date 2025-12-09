import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";

const galleryItems = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
    title: "کلاس هنر",
    span: "col-span-2 row-span-2",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?w=400&q=80",
    title: "یادگیری با بازی",
    span: "col-span-1",
  },
  {
    type: "video",
    src: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&q=80",
    title: "فعالیت‌های ورزشی",
    span: "col-span-1",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&q=80",
    title: "جشن‌ها و مراسم",
    span: "col-span-1",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    title: "کلاس پیش‌دبستانی",
    span: "col-span-1",
  },
];

export default function GalleryPreview() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-medium mb-4">
              گالری تصاویر
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              لحظات <span className="text-pink-500">شاد و به‌یادماندنی</span>
            </h2>
          </div>
          <Button variant="outline" className="gap-2 self-start md:self-auto">
            مشاهده گالری کامل
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`relative group rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary fill-primary mr-[-2px]" />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 right-0 left-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-white font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
