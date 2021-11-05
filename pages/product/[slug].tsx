import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { useRouter } from 'next/router'
import { ProductView } from '@components/product'
import { data } from '@lib/data/product'
import { productDetail } from '@network/API'

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ slug: string }>) {
  // const { products: relatedProducts } = await allProductsPromise
  // const product = data.products.find((item: { slug: any }) => item.slug === params!.slug);

  let product = null

  const resp = await productDetail(params!.slug);
  const data = resp.data!.Data?.product
  if (data) {
    product = data;
  }
  
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
    },
  }
}
export default function Slug({
  product,
}: // relatedProducts,
InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    // <ProductView product={product} relatedProducts={relatedProducts} />
    <ProductView product={product} />
  )
}

// Slug.Layout = Layout
