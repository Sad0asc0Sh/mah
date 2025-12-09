import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Loader2, Trash2, Check, Image as ImageIcon, X } from "lucide-react";

interface GalleryItem {
  id: string;
  caption: string | null;
  url: string;
  category: string;
  created_at: string;
}

const categories = [
  { value: "general", label: "عمومی" },
  { value: "events", label: "رویدادها" },
  { value: "classes", label: "کلاس‌ها" },
  { value: "activities", label: "فعالیت‌ها" },
  { value: "facilities", label: "امکانات" },
];

export default function GalleryManager() {
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("حداکثر حجم فایل ۵ مگابایت است");
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("لطفاً یک تصویر انتخاب کنید");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("kindergarten")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("kindergarten")
        .getPublicUrl(filePath);

      // Insert record in gallery table
      const { error: insertError } = await supabase
        .from("gallery")
        .insert({
          caption: caption || null,
          url: publicUrl,
          category,
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setCaption("");
      setFile(null);
      setPreview(null);
      setCategory("general");
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Refresh gallery
      fetchGallery();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "خطا در آپلود تصویر");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm("آیا از حذف این تصویر مطمئن هستید؟")) return;

    setDeleting(item.id);

    try {
      // Extract file path from URL
      const urlParts = item.url.split("/");
      const filePath = `gallery/${urlParts[urlParts.length - 1]}`;

      // Delete from storage
      await supabase.storage
        .from("kindergarten")
        .remove([filePath]);

      // Delete from database
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      // Refresh gallery
      fetchGallery();
    } catch (err: any) {
      setError(err.message || "خطا در حذف تصویر");
    } finally {
      setDeleting(null);
    }
  };

  const clearPreview = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-amber-500" />
            آپلود تصویر جدید
          </CardTitle>
          <CardDescription>
            تصاویر جدید را به گالری مهدکودک اضافه کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-5">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="bg-green-50 text-green-700 border-green-200">
                <Check className="w-4 h-4" />
                <AlertDescription>تصویر با موفقیت آپلود شد</AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="caption">عنوان تصویر (اختیاری)</Label>
                <Input
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="مثال: جشن روز کودک"
                  className="border-slate-200 focus:border-amber-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-slate-200 focus:border-amber-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>انتخاب تصویر</Label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-amber-300 transition-colors">
                {preview ? (
                  <div className="relative inline-block">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-48 rounded-lg mx-auto"
                    />
                    <button
                      type="button"
                      onClick={clearPreview}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageIcon className="w-16 h-16 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500">
                      تصویر را بکشید و رها کنید یا کلیک کنید
                    </p>
                    <p className="text-xs text-slate-400">حداکثر حجم: ۵ مگابایت</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {!preview && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    انتخاب فایل
                  </Button>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={uploading || !file}
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold"
            >
              {uploading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  در حال آپلود...
                </>
              ) : (
                <>
                  <Upload className="ml-2 h-4 w-4" />
                  آپلود تصویر
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>تصاویر گالری</CardTitle>
          <CardDescription>
            {galleryItems.length} تصویر در گالری
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingGallery ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl">
              <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">هنوز تصویری در گالری وجود ندارد</p>
              <p className="text-sm text-slate-400 mt-1">اولین تصویر را آپلود کنید!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={item.url}
                    alt={item.caption || ""}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(item)}
                      disabled={deleting === item.id}
                    >
                      {deleting === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-sm truncate">{item.caption}</p>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs bg-white/90 rounded-full text-slate-700">
                      {categories.find(c => c.value === item.category)?.label || item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
