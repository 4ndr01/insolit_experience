/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
        apiResolver: true,

    },
}

module.exports ={
    async headers() {
        return [
            {
                // Autoriser les requêtes depuis n'importe quel domaine
                source: '/api/:path*', // Remplacez `:path*` par le chemin de votre API
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'https://www.marv.lol', // Autoriser les requêtes depuis ce domaine
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS', // Méthodes HTTP autorisées
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-Requested-With, Content-Type, Authorization', // En-têtes autorisés
                    },
                ],
            },
        ];
    },


}
