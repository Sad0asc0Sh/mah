import { corsHeaders } from "@shared/cors.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ZARINPAL_SANDBOX_URL = "https://sandbox.zarinpal.com/pg/v4/payment/request.json";
const ZARINPAL_SANDBOX_STARTPAY = "https://sandbox.zarinpal.com/pg/StartPay/";
const ZARINPAL_VERIFY_URL = "https://sandbox.zarinpal.com/pg/v4/payment/verify.json";

const MELLAT_PAYMENT_URL = "https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl";
const MELLAT_STARTPAY_URL = "https://bpm.shaparak.ir/pgwchannel/startpay.mellat";

type PaymentGateway = "zarinpal" | "mellat";

interface PaymentRequest {
  amount: number;
  description: string;
  user_id: string;
  callback_url: string;
  gateway: PaymentGateway;
}

interface VerifyRequest {
  authority: string;
  status: string;
  gateway: PaymentGateway;
  RefId?: string;
  ResCode?: string;
  SaleOrderId?: string;
  SaleReferenceId?: string;
}

const createMellatSoapRequest = (action: string, params: Record<string, string>) => {
  const paramXml = Object.entries(params)
    .map(([key, value]) => `<${key}>${value}</${key}>`)
    .join("");
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.core.sw.bps.com/">
  <soapenv:Header/>
  <soapenv:Body>
    <int:${action}>
      ${paramXml}
    </int:${action}>
  </soapenv:Body>
</soapenv:Envelope>`;
};

const parseMellatResponse = (xml: string, tagName: string): string => {
  const regex = new RegExp(`<return>([^<]*)</return>`);
  const match = xml.match(regex);
  return match ? match[1] : "";
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const zarinpalMerchantId = Deno.env.get("ZARINPAL_MERCHANT_ID") || "";
    const mellatTerminalId = Deno.env.get("MELLAT_TERMINAL_ID") || "";
    const mellatUsername = Deno.env.get("MELLAT_USERNAME") || "";
    const mellatPassword = Deno.env.get("MELLAT_PASSWORD") || "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "request";

    if (action === "request") {
      const body: PaymentRequest = await req.json();
      const { amount, description, user_id, callback_url, gateway = "zarinpal" } = body;

      if (!amount || !user_id || !callback_url) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }

      if (gateway === "mellat") {
        const orderId = Date.now().toString();
        const localDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const localTime = new Date().toTimeString().slice(0, 8).replace(/:/g, "");

        const soapRequest = createMellatSoapRequest("bpPayRequest", {
          terminalId: mellatTerminalId,
          userName: mellatUsername,
          userPassword: mellatPassword,
          orderId: orderId,
          amount: (amount * 10).toString(),
          localDate: localDate,
          localTime: localTime,
          additionalData: description || "پرداخت شهریه",
          callBackUrl: callback_url,
          payerId: "0",
        });

        const mellatResponse = await fetch(MELLAT_PAYMENT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/xml;charset=UTF-8",
            "SOAPAction": "",
          },
          body: soapRequest,
        });

        const mellatXml = await mellatResponse.text();
        const result = parseMellatResponse(mellatXml, "return");
        const resultParts = result.split(",");

        if (resultParts[0] === "0" && resultParts[1]) {
          const refId = resultParts[1];

          const { error: dbError } = await supabase.from("payments").insert({
            user_id,
            amount,
            description,
            authority: `mellat_${orderId}_${refId}`,
            status: "pending",
          });

          if (dbError) {
            console.error("Database error:", dbError);
            return new Response(
              JSON.stringify({ error: "خطا در ذخیره اطلاعات پرداخت" }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
            );
          }

          return new Response(
            JSON.stringify({
              success: true,
              authority: `mellat_${orderId}_${refId}`,
              refId: refId,
              payment_url: `${MELLAT_STARTPAY_URL}?RefId=${refId}`,
              gateway: "mellat",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        } else {
          return new Response(
            JSON.stringify({ error: "خطا در اتصال به درگاه بانک ملت", code: resultParts[0] }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }
      } else {
        const zarinpalResponse = await fetch(ZARINPAL_SANDBOX_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            merchant_id: zarinpalMerchantId,
            amount: amount * 10,
            description: description || "پرداخت شهریه",
            callback_url: callback_url,
          }),
        });

        const zarinpalData = await zarinpalResponse.json();

        if (zarinpalData.data?.code === 100) {
          const authority = zarinpalData.data.authority;

          const { error: dbError } = await supabase.from("payments").insert({
            user_id,
            amount,
            description,
            authority,
            status: "pending",
          });

          if (dbError) {
            console.error("Database error:", dbError);
            return new Response(
              JSON.stringify({ error: "خطا در ذخیره اطلاعات پرداخت" }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
            );
          }

          return new Response(
            JSON.stringify({
              success: true,
              authority,
              payment_url: `${ZARINPAL_SANDBOX_STARTPAY}${authority}`,
              gateway: "zarinpal",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        } else {
          return new Response(
            JSON.stringify({ error: "خطا در اتصال به درگاه پرداخت", details: zarinpalData }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }
      }
    } else if (action === "verify") {
      const body: VerifyRequest = await req.json();
      const { authority, status, gateway = "zarinpal", SaleOrderId, SaleReferenceId, RefId, ResCode } = body;

      if (gateway === "mellat") {
        if (ResCode !== "0") {
          await supabase
            .from("payments")
            .update({ status: "failed", updated_at: new Date().toISOString() })
            .like("authority", `mellat_%`);

          return new Response(
            JSON.stringify({ success: false, message: "پرداخت لغو شد" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        }

        const soapVerify = createMellatSoapRequest("bpVerifyRequest", {
          terminalId: mellatTerminalId,
          userName: mellatUsername,
          userPassword: mellatPassword,
          orderId: SaleOrderId || "",
          saleOrderId: SaleOrderId || "",
          saleReferenceId: SaleReferenceId || "",
        });

        const verifyResponse = await fetch(MELLAT_PAYMENT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/xml;charset=UTF-8",
            "SOAPAction": "",
          },
          body: soapVerify,
        });

        const verifyXml = await verifyResponse.text();
        const verifyResult = parseMellatResponse(verifyXml, "return");

        if (verifyResult === "0") {
          const soapSettle = createMellatSoapRequest("bpSettleRequest", {
            terminalId: mellatTerminalId,
            userName: mellatUsername,
            userPassword: mellatPassword,
            orderId: SaleOrderId || "",
            saleOrderId: SaleOrderId || "",
            saleReferenceId: SaleReferenceId || "",
          });

          await fetch(MELLAT_PAYMENT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "text/xml;charset=UTF-8",
              "SOAPAction": "",
            },
            body: soapSettle,
          });

          await supabase
            .from("payments")
            .update({
              status: "success",
              ref_id: SaleReferenceId,
              updated_at: new Date().toISOString(),
            })
            .like("authority", `mellat_${SaleOrderId}%`);

          return new Response(
            JSON.stringify({
              success: true,
              ref_id: SaleReferenceId,
              message: "پرداخت با موفقیت انجام شد",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        } else {
          await supabase
            .from("payments")
            .update({ status: "failed", updated_at: new Date().toISOString() })
            .like("authority", `mellat_${SaleOrderId}%`);

          return new Response(
            JSON.stringify({ success: false, message: "تایید پرداخت ناموفق بود" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        }
      } else {
        if (status !== "OK") {
          await supabase
            .from("payments")
            .update({ status: "failed", updated_at: new Date().toISOString() })
            .eq("authority", authority);

          return new Response(
            JSON.stringify({ success: false, message: "پرداخت لغو شد" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        }

        const { data: payment } = await supabase
          .from("payments")
          .select("*")
          .eq("authority", authority)
          .single();

        if (!payment) {
          return new Response(
            JSON.stringify({ error: "پرداخت یافت نشد" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
          );
        }

        const verifyResponse = await fetch(ZARINPAL_VERIFY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            merchant_id: zarinpalMerchantId,
            amount: payment.amount * 10,
            authority,
          }),
        });

        const verifyData = await verifyResponse.json();

        if (verifyData.data?.code === 100 || verifyData.data?.code === 101) {
          await supabase
            .from("payments")
            .update({
              status: "success",
              ref_id: verifyData.data.ref_id?.toString(),
              updated_at: new Date().toISOString(),
            })
            .eq("authority", authority);

          return new Response(
            JSON.stringify({
              success: true,
              ref_id: verifyData.data.ref_id,
              message: "پرداخت با موفقیت انجام شد",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        } else {
          await supabase
            .from("payments")
            .update({ status: "failed", updated_at: new Date().toISOString() })
            .eq("authority", authority);

          return new Response(
            JSON.stringify({ success: false, message: "تایید پرداخت ناموفق بود" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        }
      }
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
