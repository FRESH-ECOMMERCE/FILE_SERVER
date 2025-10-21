const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./configs/swaggerCofigs');
const logger = require('./utils/logger');
const uploadRoutes = require('./routes/uploadRoutes');
const appConfigs = require('./configs/appConfigs');

const app = express();
const PORT = appConfigs.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ['https://fresh-admin.web.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    })
);

app.use('/api/uploads', express.static('uploads'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', uploadRoutes);

if (!module.parent) {
    app.listen(PORT, () => {
        logger.info(`Server running at http://localhost:${PORT}`);
    });
}

exports.default = app;
