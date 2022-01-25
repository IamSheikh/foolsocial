const withPwa = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = withPwa({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
  },
})

module.exports = nextConfig
