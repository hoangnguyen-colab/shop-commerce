const commerce = require('./commerce.config.json')
const {
  withCommerceConfig,
  getProviderName,
} = require('./framework/commerce/config')

const provider = commerce.provider || getProviderName()
const isBC = provider === 'bigcommerce'

module.exports = withCommerceConfig({
  images: {
    domains: ['cdn11.bigcommerce.com'],
  },
  commerce,
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
  },
  rewrites() {
    return [
      (isBC) && {
        source: '/checkout',
        destination: '/api/checkout',
      },
      // The logout is also an action so this route is not required, but it's also another way
      // you can allow a logout!
      isBC && {
        source: '/logout',
        destination: '/api/logout?redirect_to=/',
      },
    ].filter(Boolean)
  },
})

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
