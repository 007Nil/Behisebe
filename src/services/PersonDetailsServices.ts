import { PersonModel } from "../model";
import { addPersonDetails, getAllPersonDetails, getPersonDetailsById, updatePersonDetails } from '../repository/PersonDetailsRepo';
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

async function getPersonDetailsByIdService(personId:number): Promise<PersonModel> {
    return await getPersonDetailsById(personId);
}

export {
    getAllPersonDetailsService,
    addPersonService,
    updatePersonService,
    getPersonDetailsByIdService
}