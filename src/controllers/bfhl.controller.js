const config = require('../config/env');
const {
    HTTP_STATUS,
    ERROR_MESSAGES,
    buildSuccessResponse,
    buildErrorResponse,
} = require('../constants/response.constants');
const {
    validateSingleKey,
    validateInteger,
    validateIntegerArray,
    validateString,
} = require('../utils/validators');
const {
    generateFibonacci,
    filterPrimes,
    calculateLCM,
    calculateHCF,
} = require('../services/math.service');
const { getAIAnswer } = require('../services/ai.service');

const handleBFHL = async (req, res) => {
    try {
        const { valid, error, key } = validateSingleKey(req.body);
        if (!valid) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(buildErrorResponse(error));
        }

        const value = req.body[key];
        let result;

        switch (key) {
            case 'fibonacci': {
                const validation = validateInteger(value);
                if (!validation.valid) {
                    return res.status(HTTP_STATUS.BAD_REQUEST).json(buildErrorResponse(validation.error));
                }
                result = generateFibonacci(value);
                break;
            }

            case 'prime': {
                const validation = validateIntegerArray(value);
                if (!validation.valid) {
                    return res.status(HTTP_STATUS.BAD_REQUEST).json(buildErrorResponse(validation.error));
                }
                result = filterPrimes(value);
                break;
            }

            case 'lcm': {
                const validation = validateIntegerArray(value);
                if (!validation.valid) {
                    return res.status(HTTP_STATUS.BAD_REQUEST).json(buildErrorResponse(validation.error));
                }
                result = calculateLCM(value);
                break;
            }

            case 'hcf': {
                const validation = validateIntegerArray(value);
                if (!validation.valid) {
                    return res.status(HTTP_STATUS.BAD_REQUEST).json(buildErrorResponse(validation.error));
                }
                result = calculateHCF(value);
                break;
            }

            case 'AI': {
                const validation = validateString(value);
                if (!validation.valid) {
                    return res.status(HTTP_STATUS.BAD_REQUEST).json(buildErrorResponse(validation.error));
                }
                try {
                    result = await getAIAnswer(value);
                } catch (aiError) {
                    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                        buildErrorResponse(ERROR_MESSAGES.AI_SERVICE_ERROR)
                    );
                }
                break;
            }

            default:
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    buildErrorResponse(ERROR_MESSAGES.INVALID_KEY)
                );
        }

        return res.status(HTTP_STATUS.OK).json(
            buildSuccessResponse(config.OFFICIAL_EMAIL, result)
        );
    } catch (error) {
        console.error('BFHL Controller Error:', error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            buildErrorResponse('An unexpected error occurred')
        );
    }
};

module.exports = {
    handleBFHL,
};
