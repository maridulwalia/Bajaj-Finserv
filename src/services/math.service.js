const isPrime = (num) => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
};

const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

const lcm = (a, b) => {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
};

const generateFibonacci = (n) => {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const series = [0, 1];
    for (let i = 2; i < n; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }
    return series;
};

const filterPrimes = (numbers) => {
    return numbers.filter(isPrime);
};

const calculateLCM = (numbers) => {
    if (numbers.length === 0) return 0;
    return numbers.reduce((acc, num) => lcm(acc, num));
};

const calculateHCF = (numbers) => {
    if (numbers.length === 0) return 0;
    return numbers.reduce((acc, num) => gcd(acc, num));
};

module.exports = {
    generateFibonacci,
    filterPrimes,
    calculateLCM,
    calculateHCF,
};
