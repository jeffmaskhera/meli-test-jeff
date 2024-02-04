export function switchCases(expression, cases) {
    return cases[expression] || (cases && cases['default']);
}


export function formatNumberPrice(number) {

    if (typeof number !== 'number' || number < 0) {
        console.log('El valor es negativo');
        return '';
    }

    const parts = number.toFixed(2).toString().split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const formattedDecimal = decimalPart.replace(/0+$/, '');

    const formattedNumber = formattedDecimal.length > 0 ? `${integerPart},${formattedDecimal}` : integerPart;
    return formattedNumber;
}


export const getDecimalCount = (number) => {
    if (typeof number === 'string' && !number.trim()) {
        return 0;
    }

    if (!Number.isFinite(Number(number))) {
        return 0;
    }

    const decimalString = number.toString().split('.')[1];
    if (!decimalString) {
        return 0;  // No hay parte decimal
    }
    return decimalString.length;
};