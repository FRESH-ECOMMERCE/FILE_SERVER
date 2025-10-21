const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'File Upload API',
            version: '1.0.0',
            description: 'Simple Express File Upload with JWT Auth',
        },
        servers: [
            {
                url: '', // ✅ Leave empty to allow manual input in Swagger UI
                description: 'Enter your API base URL manually here',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                },
            },
        },
        security: [
            {
                ApiKeyAuth: [],
            },
        ],
    },
    apis: ['./docs/*.js'],
};

module.exports = swaggerJsdoc(options);
