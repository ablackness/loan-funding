var months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];

function monthNumToName(monthnum) {
    return months[monthnum - 1] || '';
}

export default monthNumToName;