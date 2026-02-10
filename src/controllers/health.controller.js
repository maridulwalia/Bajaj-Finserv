const { HTTP_STATUS } = require('../constants/response.constants');

const handleHealth = (req, res) => {
    return res.status(HTTP_STATUS.OK).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
    });
};

module.exports = {
    handleHealth,
};
