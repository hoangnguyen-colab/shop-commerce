import cn from 'classnames'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Pagination } from 'antd';
// import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import type { Product } from '@lib/types/product'
import { Container, Skeleton } from '@components/ui'
import { productList, categoryList } from '@network/API'
import getSlug from '@lib/get-slug'
import rangeMap from '@lib/range-map'
// import 'antd/dist/antd.css';

const SORT = [
  {
    id: 1,
    query: 'CreateDate+desc',
    label: 'Mới nhất',
  },
  {
    id: 2,
    query: 'Price+asc',
    label: 'Giá: Thấp đến cao',
  },
  {
    id: 3,
    query: 'Price+desc',
    label: 'Giá: Cao đến thấp',
  },
]

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'

interface ProductData {
  products: Product[]
}

export default function Search() {
  const router = useRouter()
  const { asPath, locale } = router
  const { q } = router.query

  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [record] = useState<number>(20)
  const [search, setSearch] = useState<string>(typeof q === 'string' ? q : '')
  const [slctdCateId, setSlctdCateId] = useState<string>('')
  const [sort, setSort] = useState<string>(SORT[1].query)
  const [productData, setProductData] = useState<Product[] | null>([])
  const [categories, setCategories] = useState([])
  const [totalRecord, setTotalRecord] = useState<number>(0);

  const query = filterQuery({ sort })

  useEffect(() => {
    setSearch(typeof q === 'string' ? q : '')
  }, [q])

  const { pathname, category, brand } = useSearchMeta(asPath)

  useEffect(() => {
    getCategoryList()
  }, [])

  useEffect(() => {
    getProductList()
  }, [page, sort, slctdCateId])

  const getCategoryList = () => {
    categoryList('', 'Title+asc', 1, 20)
      .then((resp) => {
        if (resp.data?.Data) {
          setCategories(resp.data?.Data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getProductList = () => {
    setLoading(true)
    productList(search, sort, slctdCateId, page, record)
      .then((resp) => {
        if (resp.data?.Data) {
          setTotalRecord(resp.data?.TotalRecord);
          setProductData(resp.data?.Data);
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleClick = (event: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  }

  const handleSetSort = (item: any) => {
    setPage(1);
    setSort(item)
  }

  const handleSetCategory = (item: any) => {
    setPage(1);
    setSlctdCateId(item)
  }

  const CategoryView = () => {
    return (
      <div className="relative inline-block w-full">
        <div className="lg:hidden">
          <span className="rounded-md shadow-sm">
            <button
              type="button"
              onClick={(e) => handleClick(e, 'categories')}
              className="flex justify-between w-full rounded-sm border border-accent-3 px-4 py-3 bg-accent-0 text-sm leading-5 font-medium text-accent-4 hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8 transition ease-in-out duration-150"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              {/* {activeCategory?.name
                    ? `Category: ${activeCategory?.name}`
                    : 'All Categories'} */}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>
        <div
          className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${activeFilter !== 'categories' || toggleFilter !== true
            ? 'hidden'
            : ''
            }`}
        >
          <div className="rounded-sm bg-accent-0 shadow-xs lg:bg-none lg:shadow-none">
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <ul>
                <li
                  className={cn(
                    'block text-sm leading-5 text-accent-4 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                    {
                      // underline: !activeCategory?.name,
                    }
                  )}
                >
                  <a
                    onClick={() => handleSetCategory('')}
                    className={
                      'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                    }
                  >
                    Phân loại
                  </a>
                </li>
                {categories &&
                  categories.map((cat: any) => (
                    <li
                      key={cat.path}
                      className={cn(
                        'block text-sm leading-5 text-accent-4 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8'
                        // {
                        //   underline: activeCategory?.id === cat.id,
                        // }
                      )}
                    >
                      <a
                        onClick={() => handleSetCategory(cat.CategoryId)}
                        className={
                          'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                        }
                      >
                        {cat.Title}
                      </a>
                    </li>
                  ))}
                {/* {categories && categories.map((cat: any) => (
                      <li
                        key={cat.path}
                        className={cn(
                          'block text-sm leading-5 text-accent-4 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                          // {
                          //   underline: activeCategory?.id === cat.id,
                          // }
                        )}
                      >
                        <Link
                          href={{
                            pathname: getCategoryPath(cat.path, brand),
                            query,
                          }}
                        >
                          <a
                            onClick={(e) => handleClick(e, 'categories')}
                            className={
                              'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                            }
                          >
                            {cat.Title}
                          </a>
                        </Link>
                      </li>
                    ))} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const SortView = () => {
    return (
      <div className="col-span-8 lg:col-span-2 order-2 lg:order-none">
        <div className="relative inline-block w-full">
          <div className="lg:hidden">
            <span className="rounded-md shadow-sm">
              <button
                type="button"
                onClick={(e) => handleClick(e, 'sort')}
                className="flex justify-between w-full rounded-sm border border-accent-3 px-4 py-3 bg-accent-0 text-sm leading-5 font-medium text-accent-4 hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8 transition ease-in-out duration-150"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                {sort ? SORT[sort as keyof typeof SORT] : 'Sắp xếp'}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>
          <div
            className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${activeFilter !== 'sort' || toggleFilter !== true ? 'hidden' : ''
              }`}
          >
            <div className="rounded-sm bg-accent-0 shadow-xs lg:bg-none lg:shadow-none">
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <ul>
                  <li
                    className={cn(
                      'block text-sm leading-5 text-accent-4 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                      {
                        underline: !sort,
                      }
                    )}
                  >
                    <a
                      onClick={() => handleSetSort(SORT[1].query)}
                      className={
                        'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                      }
                    >
                      Sắp Xếp
                    </a>
                  </li>
                  {SORT.map((item: any) => (
                    <li
                      key={item.id}
                      className={cn(
                        'block text-sm leading-5 text-accent-4 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                        {
                          underline: sort === item.query,
                        }
                      )}
                    >
                      <a
                        onClick={() => handleSetSort(item.query)}
                        className={
                          'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ProductView = () => {
    return (
      <div className="col-span-8 order-3 lg:order-none">
        {/* {(q || activeCategory || activeBrand) && (
            <div className="mb-12 transition ease-in duration-75">
              {data ? (
                <>
                  <span
                    className={cn('animated', {
                      fadeIn: data.found,
                      hidden: !data.found,
                    })}
                  >
                    Showing {data.products.length} results{' '}
                    {q && (
                      <>
                        for "<strong>{q}</strong>"
                      </>
                    )}
                  </span>
                  <span
                    className={cn('animated', {
                      fadeIn: !data.found,
                      hidden: data.found,
                    })}
                  >
                    {q ? (
                      <>
                        There are no products that match "<strong>{q}</strong>"
                      </>
                    ) : (
                      <>
                        There are no products that match the selected category.
                      </>
                    )}
                  </span>
                </>
              ) : q ? (
                <>
                  Searching for: "<strong>{q}</strong>"
                </>
              ) : (
                <>Searching...</>
              )}
            </div>
          )} */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rangeMap(12, (i) => (
              <Skeleton key={i}>
                <div className="w-60 h-60" />
              </Skeleton>
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productData &&
                productData.map((product: Product, index) => (
                  <ProductCard
                    variant="simple"
                    key={index.toString() + product?.ProductCode}
                    className="animated fadeIn"
                    product={product}
                    imgProps={{
                      width: 480,
                      height: 480,
                    }}
                  />
                ))}
            </div>

            <Pagination defaultCurrent={page}
              onChange={(page: number) => setPage(page)}
              current={page} total={totalRecord} />
          </div>
        )}
      </div>
    )
  }


  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 mb-20">
        <div className="col-span-8 lg:col-span-2 order-1 lg:order-none">
          {/* Categories */}
          <CategoryView />

          {/* Designs */}
          <div className="relative inline-block w-full">
            <div className="lg:hidden mt-3">
              <span className="rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={(e) => handleClick(e, 'brands')}
                  className="flex justify-between w-full rounded-sm border border-accent-3 px-4 py-3 bg-accent-0 text-sm leading-5 font-medium text-accent-8 hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8 transition ease-in-out duration-150"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {/* {activeBrand?.name
                    ? `Design: ${activeBrand?.name}`
                    : 'All Designs'} */}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div
              className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${activeFilter !== 'brands' || toggleFilter !== true
                ? 'hidden'
                : ''
                }`}
            >
              <div className="rounded-sm bg-accent-0 shadow-xs lg:bg-none lg:shadow-none">
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <ul>
                    <li
                      className={cn(
                        'block text-sm leading-5 text-accent-4 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                        {
                          // underline: !activeBrand?.name,
                        }
                      )}
                    >
                      <Link
                        href={{
                          pathname: getDesignerPath('', category),
                          query,
                        }}
                      >
                        <a
                          onClick={(e) => handleClick(e, 'brands')}
                          className={
                            'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                          }
                        >
                          {/* All Designers */}
                        </a>
                      </Link>
                    </li>
                    {/* {brands.flatMap(({ node }: { node: any }) => (
                      <li
                        key={node.path}
                        className={cn(
                          'block text-sm leading-5 text-accent-4 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                          {
                            // @ts-ignore Shopify - Fix this types
                            underline: activeBrand?.entityId === node.entityId,
                          }
                        )}
                      >
                        <Link
                          href={{
                            pathname: getDesignerPath(node.path, category),
                            query,
                          }}
                        >
                          <a
                            onClick={(e) => handleClick(e, 'brands')}
                            className={
                              'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                            }
                          >
                            {node.name}
                          </a>
                        </Link>
                      </li>
                    ))} */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <ProductView />

        {/* Sort */}
        <SortView />
      </div>
    </Container>
  )
}

// Search.Layout = Layout
