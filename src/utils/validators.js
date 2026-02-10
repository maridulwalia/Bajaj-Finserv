const { ERROR_MESSAGES } = require('../constants/response.constants');

const validateSingleKey = (body) => {
    if (!body || typeof body !== 'object') {
        return { valid: false, error: ERROR_MESSAGES.MISSING_BODY, key: null };
    }

    const keys = Object.keys(body);
    const allowedKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];

    if (keys.length === 0) {
        return { valid: false, error: ERROR_MESSAGES.MISSING_BODY, key: null };
    }

    if (keys.length > 1) {
        return { valid: false, error: ERROR_MESSAGES.MULTIPLE_KEYS, key: null };
    }

    const key = keys[0];
    if (!allowedKeys.includes(key)) {
        return { valid: false, error: ERROR_MESSAGES.INVALID_KEY, key: null };
    }

    return { valid: true, error: null, key };
};

const isInteger = (value) => {
    return Number.isInteger(value);
};

const validateInteger = (value) => {
    if (!isInteger(value)) {
        return { valid: false, error: ERROR_MESSAGES.NOT_INTEGER_SINGLE };
    }
    return { valid: true, error: null };
};

const validateIntegerArray = (value) => {
    if (!Array.isArray(value)) {
        return { valid: false, error: ERROR_MESSAGES.INVALID_TYPE };
    }

    if (value.length === 0) {
        return { valid: false, error: ERROR_MESSAGES.EMPTY_ARRAY };
    }

    if (!value.every(isInteger)) {
        return { valid: false, error: ERROR_MESSAGES.NOT_INTEGER };
    }

    return { valid: true, error: null };
};

const validateString = (value) => {
    if (typeof value !== 'string' || value.trim().length === 0) {
        return { valid: false, error: ERROR_MESSAGES.NOT_STRING };
    }
    return { valid: true, error: null };
};

module.exports = {
    validateSingleKey,
    validateInteger,
    validateIntegerArray,
    validateString,
};
