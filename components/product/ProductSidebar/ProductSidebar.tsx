import s from './ProductSidebar.module.css'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@lib/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import { useCart } from '@contexts/CartContext'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const { addProduct } = useCart()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    // selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  // const variant = getProductVariant(product, selectedOptions)

  const addToCart = async () => {
    console.log({
      productId: product.ProductId,
      name: product.Title,
      image: product.images ? product.images[0]?.url : '',
      quantity: 1,
      path: product.Slug ? product.Slug : '',
      price: product.Price,
    });
    
    setLoading(true)
    try {
      addProduct({
        productId: product.ProductId,
        name: product.Title,
        image: product.images ? product.images[0]?.url : '',
        quantity: 1,
        path: product.Slug ? product.Slug : '',
        price: product.Price,
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      {/* {process.env.COMMERCE_PRODUCT_OPTIONS_ENABLED && (
        <ProductOptions
          options={product.options}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      )} */}
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.ContentHtml || product.Content}
      />
      <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div>
      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={false}
            // disabled={variant?.availableForSale === false}
          >
            {'Add To Cart'}
            {/* {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'} */}
          </Button>
        )}
      </div>
      <div className="mt-6">
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19.
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
