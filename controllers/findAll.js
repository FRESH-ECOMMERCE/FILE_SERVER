const { FileStorage } = require('../models');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

exports.findAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.size) || 10;
        const offset = page * limit;

        const totalItems = await FileStorage.count();

        const items = await FileStorage.findAll({
            where: {
                ...(Boolean(req.query.search) && {
                    [Op.or]: [{ name: { [Op.like]: `%${req.query.search}%` } }],
                }),
            },
            ...(req.query.pagination === 'true' && {
                limit: limit,
                offset: offset,
            }),
            order: [['createdAt', 'DESC']],
        });

        const totalPages = Math.ceil(totalItems / limit);

        const response = {
            request_param: req.originalUrl,
            status: 'success',
            error_message: null,
            data: {
                total_items: totalItems,
                items,
                total_pages: totalPages,
                current_page: page,
            },
            next: page + 1 < totalPages ? `${req.baseUrl}?page=${page + 1}&limit=${limit}` : '',
            version: {
                code: '1.0.0',
            },
        };

        res.json(response);
    } catch (error) {
        logger.error('Error fetching all images data:', error);

        res.status(500).json({
            request_param: req.originalUrl,
            status: 'failed',
            error_message: error.message,
            data: null,
            next: '',
            version: { code: '1.0.0' },
        });
    }
};
