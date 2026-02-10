const OPERATION_CONFIGS = {
    fibonacci: {
        label: 'Number of terms',
        placeholder: 'e.g., 7',
        hint: 'Enter a positive integer',
        type: 'number'
    },
    prime: {
        label: 'Numbers to filter',
        placeholder: 'e.g., 2, 4, 7, 9, 11',
        hint: 'Enter comma-separated integers',
        type: 'array'
    },
    lcm: {
        label: 'Numbers for LCM',
        placeholder: 'e.g., 12, 18, 24',
        hint: 'Enter comma-separated integers',
        type: 'array'
    },
    hcf: {
        label: 'Numbers for HCF',
        placeholder: 'e.g., 24, 36, 60',
        hint: 'Enter comma-separated integers',
        type: 'array'
    },
    AI: {
        label: 'Your question',
        placeholder: 'e.g., What is the capital of Maharashtra?',
        hint: 'Enter any question',
        type: 'string'
    }
};

export function validateInput(operation, value) {
    if (!operation) {
        return {
            valid: false,
            error: 'Please select an operation first'
        };
    }

    if (!value || value.trim() === '') {
        return {
            valid: false,
            error: 'Input cannot be empty'
        };
    }

    const config = OPERATION_CONFIGS[operation];

    if (config.type === 'number') {
        return validateNumber(value);
    } else if (config.type === 'array') {
        return validateNumberArray(value);
    } else if (config.type === 'string') {
        return validateString(value);
    }

    return { valid: true, error: null };
}

function validateNumber(value) {
    const trimmed = value.trim();
    const num = Number(trimmed);

    if (isNaN(num)) {
        return {
            valid: false,
            error: 'Please enter a valid number'
        };
    }

    if (!Number.isInteger(num)) {
        return {
            valid: false,
            error: 'Please enter an integer (whole number)'
        };
    }

    if (num < 0) {
        return {
            valid: false,
            error: 'Please enter a positive number'
        };
    }

    return {
        valid: true,
        error: null,
        value: num
    };
}

function validateNumberArray(value) {
    const trimmed = value.trim();

    if (!trimmed) {
        return {
            valid: false,
            error: 'Please enter at least one number'
        };
    }

    const parts = trimmed.split(',').map(s => s.trim()).filter(s => s !== '');

    if (parts.length === 0) {
        return {
            valid: false,
            error: 'Please enter at least one number'
        };
    }

    const numbers = [];
    for (let i = 0; i < parts.length; i++) {
        const num = Number(parts[i]);

        if (isNaN(num)) {
            return {
                valid: false,
                error: `"${parts[i]}" is not a valid number`
            };
        }

        if (!Number.isInteger(num)) {
            return {
                valid: false,
                error: `"${parts[i]}" is not an integer`
            };
        }

        numbers.push(num);
    }

    return {
        valid: true,
        error: null,
        value: numbers
    };
}

function validateString(value) {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
        return {
            valid: false,
            error: 'Please enter a question'
        };
    }

    if (trimmed.length < 3) {
        return {
            valid: false,
            error: 'Question is too short'
        };
    }

    return {
        valid: true,
        error: null,
        value: trimmed
    };
}

export function getOperationConfig(operation) {
    return OPERATION_CONFIGS[operation] || null;
}
