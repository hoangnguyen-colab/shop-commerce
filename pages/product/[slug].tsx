import { useRouter } from 'next/router'
import { ProductView } from '@components/product'
import { productDetailSlug } from '@network/API'
import { useEffect, useState } from 'react'
import type { Product, ProductMeta } from '@lib/types/product'

export default function Slug() {
  const router = useRouter()
  const { slug } = router.query // object destructuring

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)
  const [productMeta, setProductMeta] = useState<ProductMeta[] | null>(null)

  useEffect(() => {
    getProductDetail()
  }, [])

  const getProductDetail = () => {
    productDetailSlug(slug!.toString())
      .then((resp) => {
        const data = resp.data.Data
        if (data) {
          setLoading(false);
          setProduct(data.product);
          setProductMeta(data.product_meta);
        } else {
          return {
            redirect: {
              destination: '/404',
              permanent: false,
            },
          }
        }
      })
      .catch((error) => {
        console.log(error)
        return {
          redirect: {
            destination: '/404',
            permanent: false,
          },
        }
      })
  }

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    // <ProductView product={product} relatedProducts={relatedProducts} />
    <ProductView product={product} productMeta={productMeta}/>
  )
}

// Slug.Layout = Layout
