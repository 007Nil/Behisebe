import * as SQLite from 'expo-sqlite';

async function openDBConnection(){
const db = await SQLite.openDatabaseAsync('behisebe.db');
return db;
}

export {openDBConnection};