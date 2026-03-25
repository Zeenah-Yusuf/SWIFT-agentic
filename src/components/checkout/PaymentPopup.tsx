import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CreditCard, Building, Smartphone, CheckCircle2 } from "lucide-react";

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
  total: number;
  onComplete: () => void;
}

const mobileOptions = [
  { name: "OPay", color: "bg-green-500" },
  { name: "Kuda", color: "bg-purple-500" },
  { name: "Moniepoint", color: "bg-blue-500" },
];

const bankOptions = ["Access Bank", "First Bank", "GTBank", "UBA", "Zenith Bank"];

export function PaymentPopup({ open, onClose, total, onComplete }: PaymentPopupProps) {
  const [method, setMethod] = useState<"mobile" | "bank" | "card" | null>(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      setTimeout(() => {
        onComplete();
        setDone(false);
        setMethod(null);
      }, 1500);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Payment — ${total.toFixed(2)}</DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <p className="mt-4 font-display text-lg font-semibold text-foreground">Payment Successful!</p>
          </div>
        ) : !method ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Choose payment method</p>
            <Button variant="outline" className="w-full justify-start gap-3" onClick={() => setMethod("mobile")}>
              <Smartphone className="h-5 w-5 text-primary" /> Mobile Transfer
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" onClick={() => setMethod("bank")}>
              <Building className="h-5 w-5 text-primary" /> Bank Transfer
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" onClick={() => setMethod("card")}>
              <CreditCard className="h-5 w-5 text-primary" /> Card Payment
            </Button>
          </div>
        ) : method === "mobile" ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Select mobile payment provider</p>
            {mobileOptions.map((opt) => (
              <Button key={opt.name} variant="outline" className="w-full justify-start gap-3" onClick={handlePay} disabled={processing}>
                <span className={`h-3 w-3 rounded-full ${opt.color}`} />
                {opt.name}
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setMethod(null)}>← Back</Button>
          </div>
        ) : method === "bank" ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Select your bank</p>
            {bankOptions.map((bank) => (
              <Button key={bank} variant="outline" className="w-full justify-start" onClick={handlePay} disabled={processing}>
                {bank}
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setMethod(null)}>← Back</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input placeholder="Card number" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="MM/YY" />
              <Input placeholder="CVV" />
            </div>
            <Input placeholder="Cardholder name" />
            <Button className="w-full" onClick={handlePay} disabled={processing}>
              {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setMethod(null)}>← Back</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
