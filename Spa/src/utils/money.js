const formatVND = (amount) => {
    const number = Number(amount);
    if (isNaN(number)) {
        return '0 đ';
    }

    const formattedNumber = new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);

    return `${formattedNumber} đ`;
};

export default formatVND;
