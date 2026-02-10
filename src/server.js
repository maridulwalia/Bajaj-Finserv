const app = require('./app');
const config = require('./config/env');

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📍 BFHL endpoint: http://localhost:${PORT}/bfhl`);
});
