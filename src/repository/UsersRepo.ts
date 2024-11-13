import { openDBConnection } from './OpenSqllite';
import { SQLiteRunResult } from "expo-sqlite";
import UserModel from '../model/UserModel';

async function getUserCount(): Promise<number> {
    const db = await openDBConnection();
    const count = await db.getFirstAsync('SELECT count(*) FROM user');
    return count["count(*)"];
}

export {
    getUserCount
}