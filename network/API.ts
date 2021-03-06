import { apiClient } from '@network/ApiInstance'
import Endpoints from '@network/Endpoint'

const { get, post, put } = apiClient

export const productList = (
  search: string,
  sort: string,
  categoryId?: string,
  page?: number,
  record?: number
) =>
  get(
    `${Endpoints.PRODUCT}?search=${search}&sort=${sort}&categoryId=${categoryId}&page=${page}&record=${record}`
  )
export const productDetail = (productId: string) =>
  get(`${Endpoints.PRODUCT_DETAIL}?id=${productId}`)
export const productDetailSlug = (slug: string) =>
  get(`${Endpoints.PRODUCT_DETAIL}/slug?slug=${slug}`)

export const orderSubmit = (params: {}) => post(Endpoints.ORDER, params)
export const orderDetail = (id: string) =>
  get(`${Endpoints.ORDER}/detail?id=${id}`)
export const getListOrder = () => get(Endpoints.ORDER);
export const getListCustomerOrder = (customerId:string) => get(`${Endpoints.ORDER}?customerId=${customerId}`);
export const customerSignUp = (params: {}) =>
  post(Endpoints.CUSTOMER_SIGNUP, params)
export const customerLogIn = (params: {}) =>
  post(Endpoints.CUSTOMER_LOGIN, params)

export const categoryList = (
  search: string,
  sort: string,
  page: number,
  record: number
) =>
  get(
    `${Endpoints.CATEGORY}?search=${search}&sort=${sort}&page=${page}&record=${record}`
  )
