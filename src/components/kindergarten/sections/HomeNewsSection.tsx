import { Button } from "@/components/ui/button";
import { ArrowLeft, Newspaper, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { formatJalaliDate } from "@/lib/jalali-date";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
}

interface HomeNewsSectionProps {
  news: NewsItem[];
  loading: boolean;
}

export default function HomeNewsSection({ news, loading }: HomeNewsSectionProps) {
  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <Skeleton className="h-8 w-40 rounded-full mb-4" />
              <Skeleton className="h-10 w-56" />
            </div>
            <Skeleton className="h-10 w-36" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no news
  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              <Newspaper className="w-4 h-4" />
              اخبار و اطلاعیه‌ها
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              آخرین <span className="text-amber-500">رویدادها</span>
            </h2>
          </div>
          <Link to="/kindergarten/news">
            <Button variant="outline" className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-100 self-start md:self-auto">
              مشاهده همه اخبار
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {item.image_url ? (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                  <Newspaper className="w-16 h-16 text-amber-300" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatJalaliDate(item.published_at)}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3">
                  {item.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
