import { PersonModel } from "../model";
import { openDBConnection } from './OpenSqllite';
import { SQLiteRunResult } from "expo-sqlite";

async function getAllPersonDetails(): Promise<PersonModel[]> {
    const db = await openDBConnection();
    const allRows: PersonModel[] = await db.getAllAsync('SELECT * FROM persons');

    return allRows;
}

async function addPersonDetails(personObj: PersonModel): Promise<SQLiteRunResult> {
    const db = await openDBConnection();
    let sqlResult = await db.runAsync('INSERT INTO persons (person_name) VALUES (?)',
        personObj.person_name
    );
    return sqlResult

}

async function updatePersonDetails(personObj: PersonModel): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('UPDATE persons SET person_name = ?  WHERE person_id  = ?',
        personObj.person_name, personObj.person_id
    );

}

export {
    getAllPersonDetails,
    addPersonDetails,
    updatePersonDetails
}