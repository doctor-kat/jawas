const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: isProd ? "/jawas" : undefined,
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {protocol: "https", hostname: "cdn.starwarsunlimited.com"},
        ],
        unoptimized: true
    },
};

export default nextConfig;
