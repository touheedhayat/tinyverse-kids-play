import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartCount: 0,
      cartTotal: 0,

      addToCart: (product, quantity, size, color) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor === color
        );

        let newItems: CartItem[];
        if (existingIndex > -1) {
          newItems = items.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [
            ...items,
            { product, quantity, selectedSize: size, selectedColor: color },
          ];
        }

        const cartCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const cartTotal = newItems.reduce(
          (sum, item) =>
            sum + (item.product.salePrice || item.product.price) * item.quantity,
          0
        );

        set({ items: newItems, cartCount, cartTotal });
      },

      removeFromCart: (productId, size, color) => {
        const items = get().items.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === color
            )
        );

        const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const cartTotal = items.reduce(
          (sum, item) =>
            sum + (item.product.salePrice || item.product.price) * item.quantity,
          0
        );

        set({ items, cartCount, cartTotal });
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size, color);
          return;
        }

        const items = get().items.map((item) =>
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity }
            : item
        );

        const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const cartTotal = items.reduce(
          (sum, item) =>
            sum + (item.product.salePrice || item.product.price) * item.quantity,
          0
        );

        set({ items, cartCount, cartTotal });
      },

      clearCart: () => set({ items: [], cartCount: 0, cartTotal: 0 }),
    }),
    {
      name: 'tinyverse-cart',
    }
  )
);
