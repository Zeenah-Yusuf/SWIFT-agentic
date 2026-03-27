import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    webpayCheckout: (req: any) => void;
  }
}

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
  total: number;
  onComplete: (txnRef: string) => void;
  customerId: string;
}

export function PaymentPopup({ open, onClose, total, onComplete }: PaymentPopupProps) {
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");

  const handlePay = () => {
    const txnRef = `txn_${Date.now()}`;

    const paymentRequest = {
      merchant_code: import.meta.env.VITE_INTERSWITCH_MERCHANT_CODE,
      pay_item_id: import.meta.env.VITE_INTERSWITCH_PAY_ITEM_ID,
      txn_ref: txnRef,
      site_redirect_url: "https://yourdomain.com/payment-response",
      amount: total * 100, // amount in kobo
      currency: 566,       // NGN ISO code
      onComplete: (response: any) => {
        console.log("Payment response:", response);
        if (response.ResponseCode === "00") {
          setDone(true);
          setMessage("Payment successful!");
          setTimeout(() => {
            onComplete(txnRef);
            setDone(false);
          }, 1500);
        } else {
          setMessage(`Payment failed: ${response.ResponseDescription}`);
        }
      },
      mode: "TEST"
    };

    window.webpayCheckout(paymentRequest);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Payment — ₦{total.toFixed(2)}</DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <p className="mt-4 font-display text-lg font-semibold text-foreground">Payment Successful!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Button className="w-full" onClick={handlePay}>
              Pay ₦{total.toFixed(2)} with Interswitch (Test)
            </Button>
            {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
