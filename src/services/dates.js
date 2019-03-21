export function getDate(dd) {
    const year = dd.getFullYear();
    const month = dd.getMonth() + 1;
    const day = dd.getDate();
    return year + '-' + (month.toString().length === 1 ? '0' + month.toString() : month.toString()) + '-' + (day.toString().length === 1 ? '0' + day.toString() : day.toString());
}

export function getToday() {
    const dd = new Date();
    return getDate(dd);
}

export function getNextDay(date) {
    const ms = date.getTime() + (1000*60*60*24);
    const dd = new Date(ms);
    return getDate(dd);
}