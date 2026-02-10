import { setOperation, setInputValue, setLoading, setResult } from './state.js';
import { validateInput, getOperationConfig } from './validators.js';
import { submitBFHLRequest } from './api.js';

const elements = {
    operationRadios: null,
    inputField: null,
    inputLabel: null,
    inputHint: null,
    inputError: null,
    submitBtn: null,
    resultContent: null
};

export function initializeElements() {
    elements.operationRadios = document.querySelectorAll('input[name="operation"]');
    elements.inputField = document.getElementById('user-input');
    elements.inputLabel = document.getElementById('input-label');
    elements.inputHint = document.getElementById('input-hint');
    elements.inputError = document.getElementById('input-error');
    elements.submitBtn = document.getElementById('submit-btn');
    elements.resultContent = document.getElementById('result-content');
}

export function handleOperationChange(event) {
    const operation = event.target.value;
    setOperation(operation);

    const config = getOperationConfig(operation);

    if (config) {
        elements.inputField.disabled = false;
        elements.inputField.placeholder = config.placeholder;
        elements.inputLabel.textContent = config.label;
        elements.inputHint.textContent = config.hint;
        elements.inputError.textContent = '';
        elements.inputField.classList.remove('error');
        elements.inputField.value = '';
        elements.inputField.focus();
        elements.submitBtn.disabled = false;
    }
}

export function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
    elements.inputError.textContent = '';
    elements.inputField.classList.remove('error');
}

export async function handleSubmit(event, currentState) {
    event.preventDefault();

    const { selectedOperation, inputValue } = currentState;

    const validation = validateInput(selectedOperation, inputValue);

    if (!validation.valid) {
        elements.inputError.textContent = validation.error;
        elements.inputField.classList.add('error');
        elements.inputField.focus();
        return;
    }

    setLoading(true);
    elements.submitBtn.classList.add('loading');
    elements.submitBtn.disabled = true;
    elements.inputError.textContent = '';

    try {
        const result = await submitBFHLRequest(selectedOperation, validation.value);

        setResult(result);
        displayResult(result);
    } catch (error) {
        const errorResult = {
            success: false,
            error: 'An unexpected error occurred'
        };
        setResult(errorResult);
        displayResult(errorResult);
    } finally {
        setLoading(false);
        elements.submitBtn.classList.remove('loading');
        elements.submitBtn.disabled = false;
    }
}

function displayResult(result) {
    elements.resultContent.innerHTML = '';

    if (result.success) {
        const successDiv = document.createElement('div');
        successDiv.className = 'result-success';

        const label = document.createElement('div');
        label.className = 'result-label';
        label.textContent = '✓ Success';
        successDiv.appendChild(label);

        const dataDiv = document.createElement('div');
        dataDiv.className = 'result-data';

        if (result.data && result.data.data !== undefined) {
            const responseData = result.data.data;

            if (Array.isArray(responseData)) {
                if (responseData.length === 0) {
                    dataDiv.textContent = 'Empty result';
                } else {
                    const arrayContainer = document.createElement('div');
                    arrayContainer.className = 'result-array';

                    responseData.forEach(item => {
                        const itemSpan = document.createElement('span');
                        itemSpan.className = 'array-item';
                        itemSpan.textContent = item;
                        arrayContainer.appendChild(itemSpan);
                    });

                    dataDiv.appendChild(arrayContainer);
                }
            } else {
                dataDiv.textContent = responseData;
            }
        } else {
            dataDiv.textContent = JSON.stringify(result.data, null, 2);
        }

        successDiv.appendChild(dataDiv);

        if (result.data && result.data.official_email) {
            const meta = document.createElement('div');
            meta.className = 'result-meta';
            meta.textContent = `Email: ${result.data.official_email}`;
            successDiv.appendChild(meta);
        }

        elements.resultContent.appendChild(successDiv);
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'result-error';

        const label = document.createElement('div');
        label.className = 'result-label';
        label.textContent = '✗ Error';
        errorDiv.appendChild(label);

        const dataDiv = document.createElement('div');
        dataDiv.className = 'result-data';
        dataDiv.textContent = result.error || 'An error occurred';
        errorDiv.appendChild(dataDiv);

        elements.resultContent.appendChild(errorDiv);
    }

    elements.resultContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function attachEventListeners(getState) {
    elements.operationRadios.forEach(radio => {
        radio.addEventListener('change', handleOperationChange);
    });

    elements.inputField.addEventListener('input', handleInputChange);

    elements.submitBtn.addEventListener('click', (event) => {
        handleSubmit(event, getState());
    });

    elements.inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event, getState());
        }
    });
}
