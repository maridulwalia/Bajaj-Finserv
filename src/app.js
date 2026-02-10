const express = require('express');
const bfhlRoutes = require('./routes/bfhl.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Use both /api prefixed routes (for Vercel) and non-prefixed (fallback)
app.use(['/api/bfhl', '/bfhl'], bfhlRoutes);
app.use(['/api/health', '/health'], healthRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'University Qualifier Exam API',
        endpoints: {
            health: 'GET /api/health',
            bfhl: 'POST /api/bfhl',
        },
    });
});

app.use((req, res) => {
    res.status(404).json({
        is_success: false,
        error: 'Endpoint not found',
    });
});

app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
        is_success: false,
        error: 'Internal server error',
    });
});

module.exports = app;
