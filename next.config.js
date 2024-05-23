

const withImages = require('next-images');
module.exports = withImages({
    experimental: {
        api: {
            externalResolver: true,
            bodyParser: false,
            runtime: 'edge', // Utilisation du runtime "edge"
        },
    },

    async headers() {
        return [
            {
                source: '/api/:path*',
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
});
