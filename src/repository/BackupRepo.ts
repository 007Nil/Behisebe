import { openDBConnection } from './OpenSqllite';
import BackupModel from '../model/BackupModel';

async function getBackupCount(): Promise<number> {
    const db = await openDBConnection();
    const count = await db.getFirstAsync('SELECT count(*) FROM backup_details')

    return count["count(*)"];
}

async function addBackupFolderId(backupDirId: string) {
    const db = await openDBConnection();
    await db.runAsync('INSERT INTO backup_details (backup_dir_id) VALUES ( ? )',
        backupDirId);
}

async function addBackupFileId(backupFileId: string) {
    const db = await openDBConnection();
    await db.runAsync('UPDATE backup_details SET backup_file_id = ? WHERE backup_id = 1',
        backupFileId);
}

async function getBackupInfo(): Promise<BackupModel> {
    const db = await openDBConnection();
    const backupObj: BackupModel = await db.getFirstAsync('SELECT * FROM backup_details WHERE backup_id = 1');
    return backupObj;
}

async function updateTimeStamp(date: string) {
    // (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')
    const db = await openDBConnection();
    await db.runAsync("UPDATE backup_details SET timestamp = ? WHERE backup_id = 1", date)

}

async function restoreBackupInfo(backupObj: BackupModel) {
    const db = await openDBConnection();
    await db.runAsync('INSERT INTO backup_details (backup_file_id,backup_dir_id,timestamp) VALUES ( ?,?,? )',
        backupObj.backup_file_id, backupObj.backup_dir_id, backupObj.timestamp);
}

export {
    getBackupCount,
    addBackupFolderId,
    addBackupFileId,
    getBackupInfo,
    updateTimeStamp,
    restoreBackupInfo
}