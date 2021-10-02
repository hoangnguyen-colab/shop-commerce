
module.exports = {
  images: {
    domains: ['cdn11.bigcommerce.com'],
  },
  env: {
    COMMERCE_CART_ENABLED: true,
    COMMERCE_PRODUCT_OPTIONS_ENABLED: false,
    COMMERCE_WISHLIST_ENABLED: false,
    COMMERCE_CUSTOMCHECKOUT_ENABLED: false,
    COMMERCE_SEARCH_ENABLED: true,
  }
}

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
