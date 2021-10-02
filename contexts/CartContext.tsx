import { ReactNode, createContext, useState, useContext } from 'react'
import type { CartItemBody } from '@lib/types/cart'

interface ContextProviderProps {
  children: ReactNode
}

interface ContextProps {
  cartItems: CartItemBody[]
  addProduct: (item: CartItemBody) => void
  removeProduct: (id: number) => void
}

export const CartContext = createContext<ContextProps | undefined>(undefined)

export const CartProvider = ({ children }: ContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItemBody[]>([])

  const addProduct = (item: CartItemBody) => {
    const cart = [...cartItems]

    var index = cart.findIndex((cartItem) => cartItem.productId === item.productId)
    if (index >= 0) {
      cart[index].quantity += item.quantity;
      setCartItems(cart);
      return;
    }
    setCartItems((cart) => [...cart, item])
  }

  const removeProduct = (id: number) => {
    console.log(id)
  }

  return (
    <CartContext.Provider value={{ cartItems, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useCartItems() {
  const context = useCart()
  return context?.cartItems
}
