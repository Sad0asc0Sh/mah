import { Button } from "@/components/ui/button";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryItem {
  id: string;
  caption: string | null;
  url: string;
  category: string;
}

interface HomeGallerySectionProps {
  images: GalleryItem[];
  loading: boolean;
}

const categories: Record<string, string> = {
  classes: "کلاس‌ها",
  facilities: "امکانات",
  activities: "فعالیت‌ها",
  events: "رویدادها",
  general: "عمومی",
};

export default function HomeGallerySection({ images, loading }: HomeGallerySectionProps) {
  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <Skeleton className="h-8 w-32 rounded-full mb-4" />
              <Skeleton className="h-10 w-64" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
            <Skeleton className="col-span-2 row-span-2 rounded-2xl" />
            <Skeleton className="rounded-2xl" />
            <Skeleton className="rounded-2xl" />
            <Skeleton className="rounded-2xl" />
            <Skeleton className="rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
                <ImageIcon className="w-4 h-4" />
                گالری تصاویر
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                لحظات <span className="text-amber-500">شاد و به‌یادماندنی</span>
              </h2>
            </div>
          </div>
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">به زودی تصاویر بارگذاری می‌شود</h3>
            <p className="text-slate-500">گالری تصاویر مهدکودک در حال آماده‌سازی است.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              <ImageIcon className="w-4 h-4" />
              گالری تصاویر
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              لحظات <span className="text-amber-500">شاد و به‌یادماندنی</span>
            </h2>
          </div>
          <Link to="/kindergarten/gallery">
            <Button variant="outline" className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-100 self-start md:self-auto">
              مشاهده گالری کامل
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {images.map((item, index) => (
            <div
              key={item.id}
              className={`relative group rounded-2xl overflow-hidden cursor-pointer ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={item.url}
                alt={item.caption || "تصویر گالری"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-0 right-0 left-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-white font-bold">{item.caption}</h3>
                <span className="text-white/80 text-sm">
                  {categories[item.category] || item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
