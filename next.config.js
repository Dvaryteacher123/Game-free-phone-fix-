/** @type {import('next').NextConfig} */
const nextConfig = {
  // "output: export" inafanya Next.js itengeneze static HTML/CSS/JS
  // ndani ya folder "out" - hii ndiyo inayohitajika kwa Render Static Site
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
