import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product, ProductMeta } from '@lib/types/product'
import {formatNormalPrice} from '@lib/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
import { baseCurrencyCode } from '@utils/CurrencyCode'
interface ProductViewProps {
  product: Product | null
  relatedProducts?: Product[]
  productMeta: ProductMeta[] | null
}

const DefaultImgUrl = 'https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/116/512/Men-Jacket-Front-Black__15466.1603283963.png'; 

const ProductView: FC<ProductViewProps> = ({
  product,
  productMeta,
  relatedProducts,
}) => {
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
              name={product?.Title || "Product"}
              price={`${formatNormalPrice(product?.Price)} ${baseCurrencyCode}`}
              fontSize={32}
            />
            <div className={s.sliderContainer}>
              {productMeta && productMeta.length > 0 ? (
                <ProductSlider key={product?.ProductId}>
                  {productMeta.map((item: ProductMeta, index: number) => (
                    <div key={item.Url} className={s.imageContainer}>
                      <Image
                        className={s.img}
                        src={item.Url!}
                        alt={item.Content || 'Product Image'}
                        width={600}
                        height={600}
                        priority={index === 0}
                        quality="85"
                      />
                    </div>
                  ))}
                </ProductSlider>
              ) : (
                <div className={s.imageContainer}>
                  <Image
                    className={s.img}
                    src={product?.MetaTitle || DefaultImgUrl}
                    alt={product?.Summary || 'Product Image'}
                    width={600}
                    height={600}
                    priority={true}
                    quality="85"
                  />
                </div>
              )}
            </div>
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
        {/* <section className="py-12 px-6 mb-10">
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
        </section> */}
      </Container>
      <NextSeo
        title={product?.Title}
        description={product?.Summary}
        openGraph={{
          type: 'website',
          title: product?.Title,
          description: product?.Summary,
        }}
      />
    </>
  )
}

export default ProductView
