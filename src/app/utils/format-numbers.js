export const percentageConverter = (number, decimalPlaces = 2) => {
    const roundedPercentage = number.toFixed(decimalPlaces);
    return `${roundedPercentage}%`
}

export const formatNumber = (number) => {
    // Convert the number to a string and split it into integer and decimal parts
    const [integerPart, decimalPart] = String(number).split('.');

    // Format the integer part with dots for thousands separator
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Concatenate the formatted integer part with the decimal part (if any) and commas for decimal separator
    return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
}