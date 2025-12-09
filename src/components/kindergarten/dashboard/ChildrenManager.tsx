import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  Plus,
  Edit2,
  Trash2,
  Baby,
  FileText,
  Search,
  Calendar,
  User,
  Loader2,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { formatJalaliDate, isoToJalali, jalaliToIso } from "@/lib/jalali-date";

interface Child {
  id: string;
  name: string;
  birth_date: string | null;
  avatar_url: string | null;
  class_name: string | null;
  notes: string | null;
  parent_id: string;
  parent_email?: string;
}

interface Parent {
  id: string;
  email: string;
  full_name: string | null;
}

export default function ChildrenManager() {
  const { toast } = useToast();
  const [children, setChildren] = useState<Child[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [saving, setSaving] = useState(false);
  const [isParentSelectorOpen, setIsParentSelectorOpen] = useState(false);

  // Form states
  const [childForm, setChildForm] = useState({
    name: "",
    birth_date: "",
    birth_date_jalali: "",
    class_name: "",
    parent_id: "",
    notes: "",
  });

  const [reportForm, setReportForm] = useState({
    date: isoToJalali(new Date().toISOString().split("T")[0]) || "",
    mood: "",
    food_intake: "",
    sleep_quality: "",
    activity: "",
    teacher_note: "",
  });

  useEffect(() => {
    fetchChildren();
    fetchParents();
  }, []);

  const fetchChildren = async () => {
    try {
      const { data, error } = await supabase
        .from("children")
        .select("*")
        .order("name");

      if (error) throw error;
      setChildren(data || []);
    } catch (error) {
      console.error("Error fetching children:", error);
      toast({
        title: "خطا",
        description: "خطا در دریافت لیست کودکان",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // نسخه اصلاح‌شده برای جدول profiles بدون ستون ایمیل
  const fetchParents = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name")
      .eq("role", "parent");

    if (error) {
      console.error("Error fetching parents:", error);
      return;
    }

    if (data) {
      const formattedParents: Parent[] = data.map((p: any) => ({
        id: p.id,
        full_name: p.full_name,
        // چون ایمیل نداریم، نام را جایگزین می‌کنیم تا در لیست نمایش داده شود
        email: p.full_name ?? "",
      }));

      setParents(formattedParents);
    }
  };

  const handleAddChild = async () => {
    if (!childForm.name || !childForm.parent_id) {
      toast({
        title: "خطا",
        description: "نام کودک و والد الزامی است",
        variant: "destructive",
      });
      return;
    }

    const isoBirthDate = childForm.birth_date_jalali
      ? jalaliToIso(childForm.birth_date_jalali)
      : childForm.birth_date || null;

    if (childForm.birth_date_jalali && !isoBirthDate) {
      toast({
        title: "OrOúO",
        description:
          "O¦U^U,O_ O®O\"O¦ O3OO1O¦ OYOU+ OU+O¦OrOO O¦U^U,O_ O¦U^U3UOO_ OYOU+.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("children").insert({
        name: childForm.name,
        birth_date: isoBirthDate,
        class_name: childForm.class_name || null,
        parent_id: childForm.parent_id,
        notes: childForm.notes || null,
      });

      if (error) throw error;

      toast({
        title: "موفق",
        description: "کودک با موفقیت اضافه شد",
      });

      setIsAddDialogOpen(false);
      setChildForm({
        name: "",
        birth_date: "",
        birth_date_jalali: "",
        class_name: "",
        parent_id: "",
        notes: "",
      });
      fetchChildren();
    } catch (error) {
      console.error("Error adding child:", error);
      toast({
        title: "خطا",
        description: "خطا در ثبت کودک",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteChild = async (id: string) => {
    if (!confirm("آیا از حذف این کودک اطمینان دارید؟")) return;

    try {
      const { error } = await supabase.from("children").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "موفق",
        description: "کودک حذف شد",
      });

      fetchChildren();
    } catch (error) {
      console.error("Error deleting child:", error);
      toast({
        title: "خطا",
        description: "خطا در حذف کودک",
        variant: "destructive",
      });
    }
  };

  const handleAddReport = async () => {
    if (!selectedChild) return;

    const isoDate = jalaliToIso(reportForm.date);
    if (!isoDate) {
      toast({
        title: "خطا",
        description: "تاریخ را به‌صورت ۱۴۰۳/۰۹/۲۰ وارد کنید.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("daily_reports").insert({
        child_id: selectedChild.id,
        date: isoDate,
        mood: reportForm.mood || null,
        food_intake: reportForm.food_intake || null,
        sleep_quality: reportForm.sleep_quality || null,
        activity: reportForm.activity || null,
        teacher_note: reportForm.teacher_note || null,
        created_by: user?.id,
      });

      if (error) throw error;

      toast({
        title: "موفق",
        description: "گزارش روزانه ثبت شد",
      });

      setIsReportDialogOpen(false);
      setSelectedChild(null);
      setReportForm({
        date: isoToJalali(new Date().toISOString().split("T")[0]) || "",
        mood: "",
        food_intake: "",
        sleep_quality: "",
        activity: "",
        teacher_note: "",
      });
    } catch (error) {
      console.error("Error adding report:", error);
      toast({
        title: "خطا",
        description: "خطا در ثبت گزارش",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="جستجوی کودک..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600 gap-2">
              <Plus className="w-4 h-4" />
              افزودن کودک
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-amber-500" />
                ثبت کودک جدید
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>نام کامل کودک *</Label>
                <Input
                  value={childForm.name}
                  onChange={(e) =>
                    setChildForm({ ...childForm, name: e.target.value })
                  }
                  placeholder="نام و نام خانوادگی"
                />
              </div>

              <div className="space-y-2">
                <Label>تاریخ تولد</Label>
                <Input
                  type="text"
                  dir="ltr"
                  placeholder="مثال: ۱۴۰۰/۰۱/۰۱"
                  value={childForm.birth_date_jalali}
                  onChange={(e) =>
                    setChildForm({
                      ...childForm,
                      birth_date_jalali: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>کلاس</Label>
                <Input
                  value={childForm.class_name}
                  onChange={(e) =>
                    setChildForm({ ...childForm, class_name: e.target.value })
                  }
                  placeholder="مثلاً: پروانه‌ها"
                />
              </div>

              <div className="space-y-2">
                <Label>والد *</Label>
                <Select
                  value={childForm.parent_id}
                  onValueChange={(value) =>
                    setChildForm({ ...childForm, parent_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب والد" />
                  </SelectTrigger>
                  <SelectContent>
                    {parents.map((parent) => (
                      <SelectItem key={parent.id} value={parent.id}>
                        {parent.full_name || "بدون نام"} 
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500">
                  توجه: والد باید قبلاً در سیستم ثبت‌نام کرده باشد
                </p>
              </div>

              <div className="space-y-2">
                <Label>یادداشت</Label>
                <Textarea
                  value={childForm.notes}
                  onChange={(e) =>
                    setChildForm({ ...childForm, notes: e.target.value })
                  }
                  placeholder="توضیحات اضافی..."
                  rows={3}
                />
              </div>

              <Button
                onClick={handleAddChild}
                disabled={saving}
                className="w-full bg-amber-500 hover:bg-amber-600"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "ثبت کودک"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Children Grid */}
      {filteredChildren.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Baby className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-2">
              کودکی ثبت نشده است
            </h3>
            <p className="text-slate-500 text-center">
              برای شروع، اولین کودک را ثبت کنید.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChildren.map((child) => (
            <Card
              key={child.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                    {child.avatar_url ? (
                      <img
                        src={child.avatar_url}
                        alt={child.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">👶</span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    {child.class_name && (
                      <p className="text-sm text-slate-600">
                        کلاس: {child.class_name}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {child.birth_date && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      تولد:{" "}
                      {formatJalaliDate(child.birth_date)}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="w-4 h-4" />
                  <span>والد ثبت شده</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => {
                      setSelectedChild(child);
                      setIsReportDialogOpen(true);
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    گزارش روزانه
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteChild(child.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Report Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              ثبت گزارش روزانه
              {selectedChild && (
                <span className="text-amber-500">
                  - {selectedChild.name}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>تاریخ</Label>
              <Input
                type="text"
                dir="ltr"
                inputMode="numeric"
                placeholder="١٤٠٣/٠٩/٢٠"
                value={reportForm.date}
                onChange={(e) =>
                  setReportForm({ ...reportForm, date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>حالت روحی</Label>
              <Select
                value={reportForm.mood}
                onValueChange={(value) =>
                  setReportForm({ ...reportForm, mood: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">😊 خوشحال</SelectItem>
                  <SelectItem value="calm">😌 آرام</SelectItem>
                  <SelectItem value="sleepy">😴 خواب‌آلود</SelectItem>
                  <SelectItem value="crying">😢 گریان</SelectItem>
                  <SelectItem value="playful">😜 شیطون</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>وضعیت غذا</Label>
              <Select
                value={reportForm.food_intake}
                onValueChange={(value) =>
                  setReportForm({ ...reportForm, food_intake: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">🍽️ کامل خورد</SelectItem>
                  <SelectItem value="good">👍 خوب خورد</SelectItem>
                  <SelectItem value="half">🥄 نصفه خورد</SelectItem>
                  <SelectItem value="none">🚫 نخورد</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>کیفیت خواب</Label>
              <Select
                value={reportForm.sleep_quality}
                onValueChange={(value) =>
                  setReportForm({ ...reportForm, sleep_quality: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">😴 خوب خوابید</SelectItem>
                  <SelectItem value="fair">😐 متوسط</SelectItem>
                  <SelectItem value="poor">😵 بد خوابید</SelectItem>
                  <SelectItem value="none">👀 نخوابید</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>فعالیت امروز</Label>
              <Textarea
                value={reportForm.activity}
                onChange={(e) =>
                  setReportForm({ ...reportForm, activity: e.target.value })
                }
                placeholder="توضیح فعالیت‌های انجام شده..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>پیام مربی</Label>
              <Textarea
                value={reportForm.teacher_note}
                onChange={(e) =>
                  setReportForm({ ...reportForm, teacher_note: e.target.value })
                }
                placeholder="پیام خاص برای والدین..."
                rows={2}
              />
            </div>

            <Button
              onClick={handleAddReport}
              disabled={saving}
              className="w-full bg-amber-500 hover:bg-amber-600"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "ثبت گزارش"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}