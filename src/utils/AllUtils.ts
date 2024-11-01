function dateConvert(date: string){
    let dateSlice: string[] = date.split("/");
    let day: number = Number(dateSlice[1]);
    let dayString: string = "";
    if (day < 10){
        dayString = "0"+day;
    }
    return dateSlice[2]+"-"+dateSlice[0]+"-"+dayString;
}

export {
    dateConvert
}