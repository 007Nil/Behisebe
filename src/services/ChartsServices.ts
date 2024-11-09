import BarChartModel from "../model/BarChartModel";
import { getWeekExpense } from "../repository/ExpenseDetailsRepo";
import { getDayName } from "../utils/AllUtils";




async function generateWeeklyBarChartData(): Promise<BarChartModel[]> {
    const WeeklyBarChartData: BarChartModel[] = [];
    // Need a better logic
    let mondayAmount: number = 0;
    let tuesdayAmount: number = 0;
    let wednesdayAmount: number = 0;
    let thursdayAmount: number = 0;
    let fridayAmount: number = 0;
    let saturdayAmount: number = 0;
    let sundayAmount: number = 0;
    const weekExenseObj = await getWeekExpense();
    for (const eachExp of weekExenseObj) {

        const dayName: string = getDayName(eachExp.timestamp);

        if (dayName === "Monday") {
            mondayAmount = mondayAmount + eachExp.amount;
        } else if (dayName === "Tuesday") {
            tuesdayAmount = tuesdayAmount + eachExp.amount;
        } else if (dayName === "Wednesday") {
            wednesdayAmount = wednesdayAmount + eachExp.amount;
        } else if (dayName === "Thursday") {
            thursdayAmount = thursdayAmount + eachExp.amount;
        } else if (dayName === "Friday") {
            fridayAmount = fridayAmount + eachExp.amount;
        } else if (dayName === "Saturday") {
            saturdayAmount = saturdayAmount + eachExp.amount;
        } else if (dayName === "Sunday") {
            sundayAmount = sundayAmount + eachExp.amount;
        }
    }

    const mondayData: BarChartModel = { value: mondayAmount, label: "M", };
    const tuesdayData: BarChartModel = { value: tuesdayAmount, label: "T", frontColor: "#177AD5" };
    const wednesdayData: BarChartModel = { value: wednesdayAmount, label: "W", };
    const thursdayData: BarChartModel = { value: thursdayAmount, label: "T", frontColor: "#177AD5" };
    const fridayData: BarChartModel = { value: fridayAmount, label: "F", };
    const saturdayData: BarChartModel = { value: saturdayAmount, label: "S", frontColor: "#177AD5" };
    const sundayData: BarChartModel = { value: sundayAmount, label: "S", };

    WeeklyBarChartData.push(mondayData, tuesdayData,
        wednesdayData, thursdayData, fridayData,
        saturdayData, sundayData
    )
    return WeeklyBarChartData;
}

export {
    generateWeeklyBarChartData
}