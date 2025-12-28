export const useIndianCurrency = () => {
    const formatCurrency = (value: number) => {
        if (value === undefined || value === null) return '₹0';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = (value: number) => {
        if (value === undefined || value === null) return '0';
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(value);
    }

    return { formatCurrency, formatNumber };
};
