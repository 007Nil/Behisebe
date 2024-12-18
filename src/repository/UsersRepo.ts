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
async function restoreUserData(userObj: UserModel) {
    const db = await openDBConnection();
    await db.runAsync('INSERT INTO user (user_name, passwd, timestamp) VALUES (?,?,?)',
        userObj.username, userObj.passwd, userObj.timestamp);
}

async function getUserPasswd(): Promise<string> {
    const db = await openDBConnection();
    const passwd : string = await db.getFirstAsync('SELECT passwd FROM user WHERE user_id = 1');
    return passwd["passwd"];
}

async function getUserName(): Promise<string> {
    const db = await openDBConnection();
    const username : string = await db.getFirstAsync('SELECT user_name FROM user WHERE user_id = 1');
    return username["user_name"];
}
// It should return one user
async function getAllusers() : Promise<UserModel[]> {
    const db = await openDBConnection();
    const allRows: UserModel[] = await db.getAllAsync('SELECT * FROM user');
    return allRows;
}

export {
    getUserCount,
    saveUserData,
    getUserPasswd,
    getUserName,
    getAllusers,
    restoreUserData
}