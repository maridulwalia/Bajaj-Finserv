const { HTTP_STATUS } = require('../constants/response.constants');

const handleHealth = (req, res) => {
    return res.status(HTTP_STATUS.OK).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        official_mailId: 'maridul1897.be23@chitkara.edu.in',
        message: "Success"
        
    });
};

module.exports = {
    handleHealth,
};
