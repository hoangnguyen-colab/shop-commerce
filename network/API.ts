import { apiClient } from '@network/ApiInstance'
import Endpoints from '@network/Endpoint'

const { get, post, put } = apiClient

export const login = (loginInfo: {}) => post(Endpoints.LOGIN, loginInfo)
export const signup = (signupInfo: {}) => post(Endpoints.SIGNUP, signupInfo)
export const productList = (page: number, record: number) =>
get(`${Endpoints.PRODUCT}?page=${page}&record=${record}`)
export const productDetail = (productId: string) =>
get(`${Endpoints.PRODUCT_DETAIL}?id=${productId}`)
export const productDetailSlug = (slug: string) =>
get(`${Endpoints.PRODUCT_DETAIL}/slug?slug=${slug}`)

export const orderSubmit = (params: {}) => post(Endpoints.ORDER, params)
