const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
    MISSING_BODY: 'Request body is required',
    MULTIPLE_KEYS: 'Request must contain exactly one operation key',
    INVALID_KEY: 'Invalid operation key. Allowed: fibonacci, prime, lcm, hcf, AI',
    INVALID_TYPE: 'Invalid data type for the operation',
    EMPTY_ARRAY: 'Array cannot be empty',
    NOT_INTEGER: 'All array elements must be integers',
    NOT_INTEGER_SINGLE: 'Value must be an integer',
    NOT_STRING: 'Value must be a string',
    AI_SERVICE_ERROR: 'AI service temporarily unavailable',
};

const buildSuccessResponse = (email, data) => ({
    is_success: true,
    official_email: email,
    data,
});

const buildErrorResponse = (message) => ({
    is_success: false,
    error: message,
});

module.exports = {
    HTTP_STATUS,
    ERROR_MESSAGES,
    buildSuccessResponse,
    buildErrorResponse,
};
