import MD5 from "crypto-js/md5";

function dateConvert(date: Date) {
    let dateString: string = date.toLocaleString("en-GB");
    let dateSlice: string[] = dateString.split(",")[0].split("/");
    let day: number = Number(dateSlice[1]);
    let dayString: string = "";
    if (day < 10) {
        dayString = "0" + day;
    } else {
        dayString = day.toString();
    }
    return dateSlice[2] + "-" + dayString + "-" + dateSlice[0];
}

function getDayName(date: string, locale = 'en-US'): string {

    var d = new Date(date);
    return d.toLocaleDateString(locale, { weekday: 'long' });

}

function convertToMD5(item: string): string {
    return MD5(item).toString();
}

function getFirstDayOfMonth(date: Date): string {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.toISOString().split('T')[0];
}

function fetchToday(date: Date): string {
    const today = new Date(date);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    return todayString;
}



export {
    dateConvert,
    getDayName,
    convertToMD5,
    getFirstDayOfMonth,
    fetchToday
}