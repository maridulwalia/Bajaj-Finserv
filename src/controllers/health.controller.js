const { HTTP_STATUS } = require('../constants/response.constants');

const config = require('../config/env');

const handleHealth = (req, res) => {
    return res.status(HTTP_STATUS.OK).json({
        is_success: true,
        official_email: config.OFFICIAL_EMAIL || 'maridul1897.be23@chitkara.edu.in'
    });
};

module.exports = {
    handleHealth,
};
