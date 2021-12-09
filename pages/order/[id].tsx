import { useRouter } from 'next/router'
import { OrderDetail } from '@components/order'
import { orderDetail } from '@network/API'
import { useEffect, useState } from 'react'
import type { Product, ProductMeta } from '@lib/types/product'

export default function Id() {
  const router = useRouter()
  const { id } = router.query // object destructuring

  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<any>(null)
  const [items, setItems] = useState<any>(null)
  const [status, setStatus] = useState<number>(0)
  
  useEffect(() => {
    getProductDetail()
  }, [])

  const getProductDetail = () => {
    orderDetail(id!.toString())
      .then((resp) => {
        const data = resp.data.Data
        if (data) {
          setLoading(false);
          setDetail(data);
          setItems(data.items);
          setStatus(data.Status);
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

  console.log(`detail`, detail)

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    // <ProductView product={product} relatedProducts={relatedProducts} />
    <OrderDetail detail={detail} items={items} status={status}/>
  )
}

// id.Layout = Layout
