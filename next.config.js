/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        apiResolver: true,
        images: {
            domains: ['media.routard.com'], // Ajoutez le domaine ici
        },
    },
}

module.exports = nextConfig
