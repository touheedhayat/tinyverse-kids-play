import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const deliveryCharge = cartTotal >= 2000 ? 0 : 200;
  const grandTotal = cartTotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items yet.
            </p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
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
          Shopping Cart ({items.length} items)
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-4 shadow-card flex gap-4"
              >
                {/* Image */}
                <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                      {item.product.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    Size: {item.selectedSize} | Color: {item.selectedColor}
                  </p>

                  {/* Price */}
                  <div className="mt-2">
                    {item.product.salePrice ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-coral">
                          Rs. {item.product.salePrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          Rs. {item.product.price.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold">
                        Rs. {item.product.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="hidden md:block text-right">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="font-bold">
                    Rs.{" "}
                    {(
                      (item.product.salePrice || item.product.price) *
                      item.quantity
                    ).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button variant="ghost" className="text-destructive" onClick={clearCart}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-[180px]">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
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
                {deliveryCharge > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add Rs. {(2000 - cartTotal).toLocaleString()} more for free
                    delivery
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rs. {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="my-4">
                <TrustBadges variant="compact" />
              </div>

              {/* Checkout Button */}
              <Link to="/checkout" className="block">
                <Button size="lg" className="w-full gap-2 rounded-xl">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              {/* Continue Shopping */}
              <Link to="/" className="block mt-3">
                <Button variant="outline" className="w-full rounded-xl">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
