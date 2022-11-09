const { DateTime } = require("luxon");

const DateToday = () =>
{
    const datefull = DateTime.now();
    return  (datefull.setLocale('de').toLocaleString(DateTime.DATE_FULL))
}

export default DateToday;