import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product } from '@lib/types/product'
import usePrice from '@lib/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
import { baseCurrencyCode } from '@utils/CurrencyCode'
interface ProductViewProps {
  product: Product
  relatedProducts?: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  // const { price } = usePrice({
  //   amount: product.price.value,
  //   baseAmount: product.price.retailPrice,
  //   currencyCode: product.price.currencyCode!,
  // })

  return (
    <>
      <Container className="max-w-none w-full" clean>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
            <ProductTag
              name={product.Title}
              price={`${product.Price} ${baseCurrencyCode}`}
              fontSize={32}
            />
            {/* <div className={s.sliderContainer}>
              <ProductSlider key={product.ProductId}>
                {product.images.map((image, i) => (
                  <div key={image.url} className={s.imageContainer}>
                    <Image
                      className={s.img}
                      src={image.url!}
                      alt={image.alt || 'Product Image'}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"
                    />
                  </div>
                ))}
              </ProductSlider>
            </div> */}
            {/* {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )} */}
          </div>

          <ProductSidebar product={product} className={s.sidebar} />
        </div>
        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">Related Products</Text>
          <div className={s.relatedProductsGrid}>
            {relatedProducts &&
              relatedProducts.map((p) => (
                <div
                  key={p.Path}
                  className="animated fadeIn bg-accent-0 border border-accent-2"
                >
                  <ProductCard
                    noNameTag
                    product={p}
                    key={p.Path}
                    variant="simple"
                    className="animated fadeIn"
                    imgProps={{
                      width: 300,
                      height: 300,
                    }}
                  />
                </div>
              ))}
          </div>
        </section>
      </Container>
      <NextSeo
        title={product.Title}
        description={product.Summary}
        openGraph={{
          type: 'website',
          title: product.Title,
          description: product.Summary,
        }}
      />
    </>
  )
}

export default ProductView
