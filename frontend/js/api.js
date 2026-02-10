// Auto-detect environment: use localhost for local dev, /api for production
const isLocalDevelopment = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.port === '8000';

const API_CONFIG = {
    baseURL: isLocalDevelopment ? 'http://localhost:3000' : '',
    endpoints: {
        bfhl: '/api/bfhl',
        health: '/api/health'
    },
    timeout: 10000
};

async function makeRequest(endpoint, method = 'GET', body = null) {
    const url = `${API_CONFIG.baseURL}${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        return {
            success: true,
            data
        };
    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            return {
                success: false,
                error: 'Request timeout. Please try again.'
            };
        }

        if (error instanceof TypeError) {
            return {
                success: false,
                error: 'Network error. Please check if the server is running.'
            };
        }

        return {
            success: false,
            error: error.message || 'An unexpected error occurred'
        };
    }
}

export async function submitBFHLRequest(operation, value) {
    const body = {
        [operation]: value
    };

    return await makeRequest(API_CONFIG.endpoints.bfhl, 'POST', body);
}

export async function checkHealth() {
    return await makeRequest(API_CONFIG.endpoints.health, 'GET');
}
