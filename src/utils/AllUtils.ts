function dateConvert(date: string){
    let dateSlice = date.split("/");
    return dateSlice[2]+"-"+dateSlice[0]+"-"+dateSlice[1];
}

export {
    dateConvert
}