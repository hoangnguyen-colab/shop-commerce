
// import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
// import { getServerSideProps } from './product/[slug]'
import { data } from '@lib/data/product'

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push('/shop');
  }),
    [];
  return <div />;
}

export default Index;

// export async function getStaticProps({
//   preview,
//   locale,
//   locales,
// }: GetServerSidePropsContext) {

//   const products = data.products;

//   return {
//     props: {
//       products,
//     },
//     revalidate: 60,
//   }
// }

// export default function Home({
//   products,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <>
//       <Grid variant="filled">
//         {products.slice(0, 3).map((product: any, i: number) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             imgProps={{
//               width: i === 0 ? 1080 : 540,
//               height: i === 0 ? 1080 : 540,
//             }}
//           />
//         ))}
//       </Grid>
//       <Marquee variant="secondary">
//         {products.slice(0, 3).map((product: any, i: number) => (
//           <ProductCard key={product.id} product={product} variant="slim" />
//         ))}
//       </Marquee>
//       <Hero
//         headline=" Dessert dragée halvah croissant."
//         description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
//       />
//       <Grid layout="B" variant="filled">
//         {products.slice(0, 3).map((product: any, i: number) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             imgProps={{
//               width: i === 0 ? 1080 : 540,
//               height: i === 0 ? 1080 : 540,
//             }}
//           />
//         ))}
//       </Grid>
//       <Marquee>
//         {products.slice(3).map((product: any, i: number) => (
//           <ProductCard key={product.id} product={product} variant="slim" />
//         ))}
//       </Marquee>
//       {/* <HomeAllProductsGrid
//         newestProducts={products}
//         categories={categories}
//         brands={brands}
//       /> */}
//     </>
//   )
// }

// Home.Layout = Layout
