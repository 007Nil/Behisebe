import { PersonModel } from "../model";
import { addPersonDetails, getAllPersonDetails, updatePersonDetails } from '../repository/PersonDetailsRepo';
import { SQLiteRunResult } from "expo-sqlite";

async function getAllPersonDetailsService(): Promise<PersonModel[]> {
    return await getAllPersonDetails();
}

async function addPersonService(personObj: PersonModel) {
    let sqlResult: SQLiteRunResult = await addPersonDetails(personObj);
    console.log(sqlResult)
}

async function updatePersonService(personObj: PersonModel) {
    await updatePersonDetails(personObj);
}

export {
    getAllPersonDetailsService,
    addPersonService,
    updatePersonService
}