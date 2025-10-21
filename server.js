const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./configs/swaggerCofigs');
const logger = require('./utils/logger');
const uploadRoutes = require('./routes/uploadRoutes');
const appConfigs = require('./configs/appConfigs');

const app = express();
const PORT = appConfigs.port;

// ✅ Middleware to handle JSON & URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS middleware (allow all origins + preflight)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    // handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// ✅ You can also keep cors() here (Express handles both safely)
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// ✅ Static file route (for uploaded files)
app.use('/api/uploads', express.static('uploads'));

// ✅ Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Main API routes
app.use('/api', uploadRoutes);

// ✅ Start server
if (!module.parent) {
    app.listen(PORT, () => {
        logger.info(`Server running at http://localhost:${PORT}`);
    });
}

exports.default = app;
