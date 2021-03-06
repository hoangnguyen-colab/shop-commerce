import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@lib/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import ProductTag from '../ProductTag'
import { formatNormalPrice } from '@lib/use-price'
import { baseCurrencyCode } from '@utils/CurrencyCode'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}
const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  // const { price } = usePrice({
  //   amount: product.Price,
  //   baseAmount: product.price.retailPrice,
  //   currencyCode: product.price.currencyCode!,
  // })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <Link href={`/product/${product.Slug}`}>
      <a className={rootClassName}>
        {variant === 'slim' && (
          <>
            <div className={s.header}>
              <span>{product.Title.length > 30 ? product.Title.slice(0, 30) + '...' : product.Title}</span>
            </div>
            {product?.ProductImage ? (
              <Image
                quality="85"
                src={product.ProductImage || placeholderImg}
                alt={product.Title || 'Product Image'}
                height={320}
                width={320}
                layout="fixed"
                {...imgProps}
              />
            ) : (
              <Image
                quality="85"
                src={
                  'https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/116/512/Men-Jacket-Front-Black__15466.1603283963.png'
                }
                alt={product.Title || 'Product Image'}
                height={320}
                width={320}
                layout="fixed"
                {...imgProps}
              />
            )}
          </>
        )}

        {variant === 'simple' && (
          <>
            {!noNameTag && (
              <div className={s.header}>
                <h3 className={s.name}>
              <span>{product.Title.length > 30 ? product.Title.slice(0, 30) + '...' : product.Title}</span>
                </h3>
                <div className={s.price}>
                  {`${formatNormalPrice(product.Price)} ${baseCurrencyCode}`}
                </div>
              </div>
            )}
            <div className={s.imageContainer}>
              {product?.ProductImage ? (
                <Image
                  alt={product.Title || 'Product Image'}
                  className={s.productImage}
                  src={product.ProductImage || placeholderImg}
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                  {...imgProps}
                />
              ) : (
                <Image
                  alt={product.Title || 'Product Image'}
                  className={s.productImage}
                  src={
                    'https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/116/512/Men-Jacket-Front-Black__15466.1603283963.png'
                  }
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                  {...imgProps}
                />
              )}
            </div>
          </>
        )}

        {variant === 'default' && (
          <>
            <ProductTag
              name={product.Title}
              price={`${formatNormalPrice(product.Price)} ${baseCurrencyCode}`}
            />
            <div className={s.imageContainer}>
              {product?.ProductImage ? (
                <Image
                  alt={product.Title || 'Product Image'}
                  className={s.productImage}
                  src={product.ProductImage || placeholderImg}
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                  {...imgProps}
                />
              ) : (
                <Image
                  alt={product.Title || 'Product Image'}
                  className={s.productImage}
                  src={
                    'https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/116/512/Men-Jacket-Front-Black__15466.1603283963.png'
                  }
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                  {...imgProps}
                />
              )}
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
