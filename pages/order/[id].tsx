import { useRouter } from 'next/router'
import { OrderDetail } from '@components/order'
import { orderDetail } from '@network/API'
import { useEffect, useState } from 'react'
import type { Product, ProductMeta } from '@lib/types/product'
import { Container } from '@components/ui'
import cn from 'classnames'
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
          setLoading(false)
          setDetail(data)
          setItems(data.items)
          setStatus(data.Status)
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
    <OrderDetail detail={detail} items={items} status={status}/>
    // <Container className="max-w-none w-full" clean>
    //   <div className="px-4 sm:px-6 flex-1">
    //     <div className="px-4 sm:px-6 flex-1">
    //       <h1 className="pt-1 pb-8 text-3xl font-semibold tracking-wide cursor-pointer inline-block">
    //         Đơn hàng của tôi
    //       </h1>
    //     </div>
    //     <div className="px-4 sm:px-6 flex-1">
    //       <h1 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
    //         Mã đơn hàng: {detail?.orderId}
    //       </h1>
    //     </div>

    //     <div></div>
    //   </div>
    //   <hr className="mt-7 border-accent-2" />
    // </Container>
  )
}

// id.Layout = Layout
