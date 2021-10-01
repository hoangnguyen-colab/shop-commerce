import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
// import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import { data } from '@lib/data/product'

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ slug: string }>) {
  // const { products: relatedProducts } = await allProductsPromise
  const product = data.products.find((item: { slug: any }) => item.slug === params!.slug);

  if (!product) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
      // relatedProducts,
    },
  }
}
export default function Slug({
  product,
  // relatedProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    // <ProductView product={product} relatedProducts={relatedProducts} />
    <ProductView product={product} />
  )
}

// Slug.Layout = Layout
