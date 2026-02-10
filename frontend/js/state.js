const state = {
    selectedOperation: null,
    inputValue: '',
    isLoading: false,
    lastResult: null
};

const listeners = new Set();

export function getState() {
    return { ...state };
}

export function setState(updates) {
    Object.assign(state, updates);
    notifyListeners();
}

export function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function notifyListeners() {
    listeners.forEach(listener => listener(getState()));
}

export function setOperation(operation) {
    setState({
        selectedOperation: operation,
        inputValue: '',
        lastResult: null
    });
}

export function setInputValue(value) {
    setState({ inputValue: value });
}

export function setLoading(isLoading) {
    setState({ isLoading });
}

export function setResult(result) {
    setState({ lastResult: result });
}

export function resetState() {
    setState({
        selectedOperation: null,
        inputValue: '',
        isLoading: false,
        lastResult: null
    });
}
