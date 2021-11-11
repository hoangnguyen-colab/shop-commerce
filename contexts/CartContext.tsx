import { ReactNode, createContext, useState, useContext, useEffect } from 'react'
import type { CartItemBody } from '@lib/types/cart'

interface ContextProviderProps {
  children: ReactNode
}

interface ContextProps {
  cartItems: CartItemBody[]
  addProduct: (item: CartItemBody) => void
  removeProduct: (id: string) => void
  changeQuantity: (id: string, quantity: number) => void
}

export const CartContext = createContext<ContextProps | undefined>(undefined)

export const CartProvider = ({ children }: ContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItemBody[]>([])

  useEffect(() => {
    const cartLocal = localStorage.getItem('@cnw/cart');
    if (cartLocal && typeof cartLocal === 'string') {
      try {
        const cartData = JSON.parse(cartLocal);
        setCartItems(cartData);
      } catch (e) {
      }
    }
    // setCartItems([]);
  }, [])

  useEffect(() => {
    localStorage.setItem('@cnw/cart', JSON.stringify(cartItems));
  }, [cartItems])

  const addProduct = (item: CartItemBody) => {
    const cart = [...cartItems]
    var index = findCartItem(item.productId)
    if (index >= 0) {
      cart[index].quantity += item.quantity
      setCartItems(cart)
      return
    }
    setCartItems((cart) => [...cart, item])
  }

  const removeProduct = (id: string) => {
    setCartItems(cartItems.filter((item) => item.productId !== id))
  }

  const changeQuantity = (id: string, quantity: number) => {
    const cart = [...cartItems]
    var index = findCartItem(id)
    if (index >= 0) {
      cart[index].quantity = quantity
      setCartItems(cart)
    }
  }

  const findCartItem = (id: string): number => {
    const cart = [...cartItems]
    const index = cart.findIndex((cartItem) => cartItem.productId === id)

    return index
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addProduct, removeProduct, changeQuantity }}
    >
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
