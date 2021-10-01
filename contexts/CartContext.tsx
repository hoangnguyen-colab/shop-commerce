import { ReactNode, createContext, useState, useContext } from 'react'
import type { LineItem } from '@lib/types/cart'

interface ContextProviderProps {
  children: ReactNode
}

interface ContextProps {
  cartItems: LineItem[]
  addProduct: (val: LineItem) => void
  removeProduct: (id: number) => void
}

export const CartContext = createContext<ContextProps | undefined>(undefined)

export const CartProvider = ({ children }: ContextProviderProps) => {
  const [cartItems, setCartItems] = useState<LineItem[]>([])

  const addProduct = (val: LineItem) => {}

  const removeProduct = (id: number) => {}

  return (
    <CartContext.Provider value={{ cartItems, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// export function useIsAuthenticated() {
//   const context = useAuth()
//   return context?.isAuthenticated
// }
