import { openDBConnection } from './OpenSqllite';
import { SQLiteRunResult } from "expo-sqlite";
import UserModel from '../model/UserModel';

async function getUserCount(): Promise<number> {
    const db = await openDBConnection();
    const count = await db.getFirstAsync('SELECT count(*) FROM user');
    return count["count(*)"];
}

async function saveUserData(userObj: UserModel) {
    const db = await openDBConnection();
    await db.runAsync('INSERT INTO user (user_name, passwd) VALUES (?,?)',
        userObj.username, userObj.passwd);
}

export {
    getUserCount,
    saveUserData
}