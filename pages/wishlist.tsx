import type { GetStaticPropsContext } from 'next'
import { Heart } from '@components/icons'
// import { Layout } from '@components/common'
import { Text, Container } from '@components/ui'
import { WishlistCard } from '@components/wishlist'

export default function Wishlist() {
  const data = null;
  // @ts-ignore Shopify - Fix this types

  const isLoading = true;
  const isEmpty = true;

  return (
    <Container>
      <div className="mt-3 mb-20">
        <Text variant="pageHeading">My Wishlist</Text>
        <div className="group flex flex-col">
          {isLoading || isEmpty ? (
            <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
                <Heart className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                Your wishlist is empty
              </h2>
              <p className="text-accent-6 px-10 text-center pt-2">
                Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
              </p>
            </div>
          ) : (
            data &&
            // @ts-ignore Shopify - Fix this types
            data.items?.map((item) => (
              <WishlistCard key={item.id} product={item.product! as any} />
            ))
          )}
        </div>
      </div>
    </Container>
  )
}

// Wishlist.Layout = Layout
