import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MapPin, Phone, User, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const { items, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    landmark: "",
    notes: "",
  });

  const deliveryCharge = cartTotal >= 2000 ? 0 : 200;
  const grandTotal = cartTotal + deliveryCharge;

  const cities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  const handleWhatsAppOrder = () => {
    const itemsList = items
      .map(
        (item) =>
          `• ${item.product.title} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity} - Rs. ${(
            (item.product.salePrice || item.product.price) * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    const message = encodeURIComponent(
      `🛒 *New Order from TinyVerse*\n\n` +
        `*Customer Details:*\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `City: ${formData.city}\n` +
        `Address: ${formData.address}\n` +
        `${formData.landmark ? `Landmark: ${formData.landmark}\n` : ""}` +
        `${formData.notes ? `Notes: ${formData.notes}\n` : ""}\n` +
        `*Order Items:*\n${itemsList}\n\n` +
        `*Subtotal:* Rs. ${cartTotal.toLocaleString()}\n` +
        `*Delivery:* ${deliveryCharge === 0 ? "FREE" : `Rs. ${deliveryCharge}`}\n` +
        `*Total:* Rs. ${grandTotal.toLocaleString()}\n\n` +
        `✅ پہلے چیک کریں، پھر ادائیگی کریں`
    );

    window.open(`https://wa.me/923001234567?text=${message}`, "_blank");
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-trust rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-trust-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-trust mb-4">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-muted-foreground mb-4">
              Thank you for your order. We'll contact you shortly to confirm.
            </p>
            <div className="bg-trust/10 rounded-2xl p-4 mb-6">
              <p className="font-bold text-trust" dir="rtl">
                ✅ پہلے چیک کریں، پھر ادائیگی کریں
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Check your items when delivered, then pay!
              </p>
            </div>
            <Button onClick={() => (window.location.href = "/")}>
              Continue Shopping
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => (window.location.href = "/")}>
            Start Shopping
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-fredoka font-bold mb-8"
        >
          Checkout
        </motion.h1>

        {/* Trust Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-trust/10 border border-trust/30 rounded-2xl p-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-trust rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-trust-foreground" />
            </div>
            <div>
              <p className="font-bold text-trust" dir="rtl">
                پہلے چیک کریں، پھر ادائیگی کریں
              </p>
              <p className="text-sm text-muted-foreground">
                Cash on Delivery - Check your order before paying!
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Details
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03XX-XXXXXXX"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) =>
                        setFormData({ ...formData, city: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address">Complete Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House/Flat No., Street, Area"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="landmark">Nearby Landmark (Optional)</Label>
                    <Input
                      id="landmark"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="Near mosque, school, etc."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Order Notes (Optional)
                </h2>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions for your order..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 gap-2 rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order (COD)"}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="flex-1 bg-trust hover:bg-trust/90 gap-2 rounded-xl"
                  onClick={handleWhatsAppOrder}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order via WhatsApp
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-[120px]">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-3"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedSize} | {item.selectedColor} | x
                        {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        Rs.{" "}
                        {(
                          (item.product.salePrice || item.product.price) *
                          item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  {deliveryCharge === 0 ? (
                    <span className="text-trust font-semibold">FREE</span>
                  ) : (
                    <span>Rs. {deliveryCharge}</span>
                  )}
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rs. {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <TrustBadges variant="compact" />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
