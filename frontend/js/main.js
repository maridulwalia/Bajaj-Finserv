import { getState } from './state.js';
import { initializeElements, attachEventListeners } from './handlers.js';

function init() {
    initializeElements();
    attachEventListeners(getState);

    console.log('BFHL Frontend initialized successfully');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
