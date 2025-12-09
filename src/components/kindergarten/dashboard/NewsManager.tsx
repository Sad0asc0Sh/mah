import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Loader2,
  Trash2,
  Edit,
  Check,
  Newspaper,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import { formatJalaliDate } from "@/lib/jalali-date";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  is_published: boolean;
  published_at: string;
}

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_updates")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageUrl("");
    setIsPublished(true);
    setEditingNews(null);
    setError(null);
    setSuccess(false);
  };

  const openEditDialog = (item: NewsItem) => {
    setEditingNews(item);
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.image_url || "");
    setIsPublished(item.is_published);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("عنوان و محتوا الزامی است");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editingNews) {
        // Update existing news
        const { error } = await supabase
          .from("news_updates")
          .update({
            title: title.trim(),
            content: content.trim(),
            image_url: imageUrl.trim() || null,
            is_published: isPublished,
          })
          .eq("id", editingNews.id);

        if (error) throw error;
      } else {
        // Create new news
        const { error } = await supabase
          .from("news_updates")
          .insert({
            title: title.trim(),
            content: content.trim(),
            image_url: imageUrl.trim() || null,
            is_published: isPublished,
          });

        if (error) throw error;
      }

      setSuccess(true);
      setDialogOpen(false);
      resetForm();
      fetchNews();
    } catch (err: any) {
      setError(err.message || "خطا در ذخیره خبر");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این خبر مطمئن هستید؟")) return;

    setDeleting(id);

    try {
      const { error } = await supabase
        .from("news_updates")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchNews();
    } catch (err: any) {
      alert(err.message || "خطا در حذف خبر");
    } finally {
      setDeleting(null);
    }
  };

  const togglePublish = async (item: NewsItem) => {
    try {
      const { error } = await supabase
        .from("news_updates")
        .update({ is_published: !item.is_published })
        .eq("id", item.id);

      if (error) throw error;
      fetchNews();
    } catch (err: any) {
      alert(err.message || "خطا در تغییر وضعیت");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">لیست اخبار</h3>
          <p className="text-sm text-slate-500">{news.length} خبر ثبت شده</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold">
              <Plus className="w-4 h-4" />
              خبر جدید
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg" dir="rtl">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? "ویرایش خبر" : "افزودن خبر جدید"}
              </DialogTitle>
              <DialogDescription>
                اطلاعات خبر را وارد کنید
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">عنوان خبر *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: جشن پایان سال تحصیلی"
                  className="border-slate-200 focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">متن خبر *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="متن کامل خبر را وارد کنید..."
                  rows={5}
                  className="border-slate-200 focus:border-amber-400 resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">لینک تصویر (اختیاری)</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  dir="ltr"
                  className="border-slate-200 focus:border-amber-400"
                />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="published"
                  checked={isPublished}
                  onCheckedChange={(checked) => setIsPublished(checked as boolean)}
                />
                <Label htmlFor="published" className="text-sm cursor-pointer">
                  انتشار فوری (در صفحه اصلی نمایش داده شود)
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold"
                >
                  {saving ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      در حال ذخیره...
                    </>
                  ) : (
                    <>
                      <Check className="ml-2 h-4 w-4" />
                      {editingNews ? "ذخیره تغییرات" : "ثبت خبر"}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  انصراف
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* News List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      ) : news.length === 0 ? (
        <Card className="border-slate-200">
          <CardContent className="py-12 text-center">
            <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">هنوز خبری منتشر نشده است</p>
            <p className="text-sm text-slate-400 mt-1">اولین خبر را ایجاد کنید!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <Card key={item.id} className={`border-slate-200 ${!item.is_published ? "opacity-60" : ""}`}>
              <CardContent className="p-5">
                <div className="flex gap-4">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-28 h-28 object-cover rounded-xl flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          {!item.is_published && (
                            <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full flex-shrink-0">
                              پیش‌نویس
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                          {item.content}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{formatJalaliDate(item.published_at)}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublish(item)}
                          title={item.is_published ? "پنهان کردن" : "انتشار"}
                          className="hover:bg-slate-100"
                        >
                          {item.is_published ? (
                            <Eye className="w-4 h-4 text-green-500" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(item)}
                          className="hover:bg-slate-100"
                        >
                          <Edit className="w-4 h-4 text-slate-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                          disabled={deleting === item.id}
                          className="hover:bg-red-50"
                        >
                          {deleting === item.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
