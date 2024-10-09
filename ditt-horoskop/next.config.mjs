import { withPayload } from '@payloadcms/next/withPayload'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(withPayload(nextConfig))
