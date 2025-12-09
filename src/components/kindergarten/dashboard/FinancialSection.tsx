import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Receipt,
  ChevronDown,
  Building2,
  Wallet,
} from "lucide-react";
import { formatJalaliDate } from "@/lib/jalali-date";

type PaymentGateway = "zarinpal" | "mellat";

interface Payment {
  id: string;
  created_at: string;
  amount: number;
  status: "pending" | "success" | "failed";
  authority: string | null;
  ref_id: string | null;
  description: string | null;
}

interface FinancialSectionProps {
  userId: string;
}

const TUITION_ITEMS = [
  { id: 1, title: "شهریه مهر ماه", amount: 3000000, dueDate: "۱۴۰۳/۰۷/۱۰" },
  { id: 2, title: "شهریه آبان ماه", amount: 3000000, dueDate: "۱۴۰۳/۰۸/۱۰" },
  { id: 3, title: "هزینه سرویس", amount: 1500000, dueDate: "۱۴۰۳/۰۷/۱۵" },
];

const GATEWAYS: { id: PaymentGateway; name: string; icon: typeof Wallet }[] = [
  { id: "zarinpal", name: "زرین‌پال", icon: Wallet },
  { id: "mellat", name: "بانک ملت", icon: Building2 },
];

export default function FinancialSection({ userId }: FinancialSectionProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<number | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>("zarinpal");
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
    handlePaymentCallback();
  }, [userId]);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Zarinpal callback
    const authority = urlParams.get("Authority");
    const status = urlParams.get("Status");
    
    // Mellat callback
    const RefId = urlParams.get("RefId");
    const ResCode = urlParams.get("ResCode");
    const SaleOrderId = urlParams.get("SaleOrderId");
    const SaleReferenceId = urlParams.get("SaleReferenceId");

    if (authority && status) {
      // Zarinpal verification
      try {
        const { data, error } = await supabase.functions.invoke(
          "supabase-functions-payment-gateway?action=verify",
          {
            body: { authority, status, gateway: "zarinpal" },
            headers: { "Content-Type": "application/json" },
          }
        );

        if (error) throw error;

        if (data.success) {
          toast({
            title: "پرداخت موفق",
            description: `کد پیگیری: ${data.ref_id}`,
          });
        } else {
          toast({
            title: "پرداخت ناموفق",
            description: data.message,
            variant: "destructive",
          });
        }

        window.history.replaceState({}, document.title, window.location.pathname);
        fetchPayments();
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    } else if (RefId || ResCode) {
      // Mellat verification
      try {
        const { data, error } = await supabase.functions.invoke(
          "supabase-functions-payment-gateway?action=verify",
          {
            body: { 
              gateway: "mellat",
              RefId,
              ResCode,
              SaleOrderId,
              SaleReferenceId,
            },
            headers: { "Content-Type": "application/json" },
          }
        );

        if (error) throw error;

        if (data.success) {
          toast({
            title: "پرداخت موفق",
            description: `کد پیگیری: ${data.ref_id}`,
          });
        } else {
          toast({
            title: "پرداخت ناموفق",
            description: data.message,
            variant: "destructive",
          });
        }

        window.history.replaceState({}, document.title, window.location.pathname);
        fetchPayments();
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    }
  };

  const handlePayment = async (item: typeof TUITION_ITEMS[0]) => {
    setPayingId(item.id);
    try {
      const callbackUrl = `${window.location.origin}/kindergarten/dashboard?tab=financial`;

      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-payment-gateway",
        {
          body: {
            amount: item.amount,
            description: item.title,
            user_id: userId,
            callback_url: callbackUrl,
            gateway: selectedGateway,
          },
        }
      );

      if (error) throw error;

      if (data.success && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast({
          title: "خطا",
          description: data.error || "خطا در اتصال به درگاه پرداخت",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "خطا",
        description: "خطا در برقراری ارتباط با سرور",
        variant: "destructive",
      });
    } finally {
      setPayingId(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 ml-1" />
            موفق
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 ml-1" />
            ناموفق
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 ml-1" />
            در انتظار
          </Badge>
        );
    }
  };

  const totalDebt = TUITION_ITEMS.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = payments
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700">کل بدهی</p>
                <p className="text-2xl font-bold text-amber-900">
                  {formatPrice(totalDebt)} <span className="text-sm">تومان</span>
                </p>
              </div>
              <Receipt className="w-10 h-10 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">مبلغ پرداخت شده</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatPrice(totalPaid)} <span className="text-sm">تومان</span>
                </p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">باقیمانده</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatPrice(Math.max(0, totalDebt - totalPaid))}{" "}
                  <span className="text-sm">تومان</span>
                </p>
              </div>
              <CreditCard className="w-10 h-10 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tuition Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-600" />
              صورتحساب‌ها
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">درگاه پرداخت:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-w-[140px]">
                    {GATEWAYS.find(g => g.id === selectedGateway)?.name}
                    <ChevronDown className="w-4 h-4 mr-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {GATEWAYS.map((gateway) => (
                    <DropdownMenuItem
                      key={gateway.id}
                      onClick={() => setSelectedGateway(gateway.id)}
                      className="flex items-center gap-2"
                    >
                      <gateway.icon className="w-4 h-4" />
                      {gateway.name}
                      {selectedGateway === gateway.id && (
                        <CheckCircle2 className="w-4 h-4 mr-auto text-green-500" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {TUITION_ITEMS.map((item) => {
              const isPaid = payments.some(
                (p) => p.description === item.title && p.status === "success"
              );

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500">سررسید: {item.dueDate}</p>
                  </div>
                  <div className="text-left ml-4">
                    <p className="font-bold text-slate-800">
                      {formatPrice(item.amount)} تومان
                    </p>
                  </div>
                  {isPaid ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle2 className="w-3 h-3 ml-1" />
                      پرداخت شده
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => handlePayment(item)}
                      disabled={payingId === item.id}
                      className="bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      {payingId === item.id ? (
                        <>
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                          در حال اتصال...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 ml-2" />
                          پرداخت آنلاین
                        </>
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            تاریخچه پرداخت‌ها
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
          ) : payments.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <CreditCard className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>هنوز پرداختی انجام نشده است</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">
                      {payment.description || "پرداخت"}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {formatJalaliDate(payment.created_at)}
                    </p>
                    {payment.ref_id && (
                      <p className="text-xs text-slate-400">
                        کد پیگیری: {payment.ref_id}
                      </p>
                    )}
                  </div>
                  <div className="text-left ml-4">
                    <p className="font-bold text-slate-800">
                      {formatPrice(payment.amount)} تومان
                    </p>
                  </div>
                  {getStatusBadge(payment.status)}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
