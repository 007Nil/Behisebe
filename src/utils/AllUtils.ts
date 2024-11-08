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

export {
    dateConvert,
    getDayName
}