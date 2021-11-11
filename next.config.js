
module.exports = {
  images: {
    domains: ['cdn11.bigcommerce.com', 'product.hstatic.net'],
  },
  env: {
    API_BASE_URL: "https://salemodel.somee.com/api/",
    API_LOCAL: "https://localhost:44335/api/",
    REALTIME_LOCAL: "http://localhost:5000",
    REALTIME_BASE_URL: "https://cnw-realtime.herokuapp.com",
    COMMERCE_CART_ENABLED: true,
    COMMERCE_PRODUCT_OPTIONS_ENABLED: false,
    COMMERCE_WISHLIST_ENABLED: false,
    COMMERCE_CUSTOMCHECKOUT_ENABLED: false,
    COMMERCE_SEARCH_ENABLED: true,
    COMMERCE_CURRENCY_CODE: "VND"
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
