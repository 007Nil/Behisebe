import { CreditModel, CreditReasonModel, ExpenseModel, ExpenseReasonModel, FundDetailsModel, FundTypeModel, LendMoneyModel, MoneyBorrowModel, MoneyRepayModel, PersonModel, UserModel } from "../model"
import { addCreditReasonDetails, getAllCreditReasonDetails, getCreditDetails } from "../repository/CreditDetailsRepo";
import { addExpenseDetails, addExpenseReasonDetails, getAllExpenseReasonDetails, getExpenseDetails } from "../repository/ExpenseDetailsRepo";
import { addFundDetails, getAllFundDetails, getAllFundTypes, restoreFundDetails, saveFundTypes } from "../repository/FundDetailsRepo";
import { getAllLendMoney } from "../repository/LendMoneyRepo";
import { getAllBorrowMoney } from "../repository/MoneyBorrowRepo";
import { getAllPersonDetails } from "../repository/PersonDetailsRepo";
import { getAllusers, getUserPasswd, restoreUserData } from "../repository/UsersRepo"
import axios from 'axios';

import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';
import { convertToMD5 } from "../utils/AllUtils";
import { addBackupFileId, addBackupFolderId, getBackupCount, getBackupInfo, updateTimeStamp } from "../repository/BackupRepo";
import BackupModel from "../model/BackupModel";
import moment from "moment";
import { err } from "react-native-svg";
import { dropAllData } from "../repository/common";
import { saveExpenseDetailsService } from "./ExpenseDetailsServices";

async function populateBackup(accessToken: string): Promise<boolean> {

    try {
        const userDetails: UserModel[] = await getAllusers();
        const fundTypedetails: FundTypeModel[] = await getAllFundTypes();
        const fundDetails: FundDetailsModel[] = await getAllFundDetails();
        const allExpenseReasonDetails: ExpenseReasonModel[] = await getAllExpenseReasonDetails();
        const allCreditReasonDetails: CreditReasonModel[] = await getAllCreditReasonDetails();
        const allPersonDetails: PersonModel[] = await getAllPersonDetails();

        const allMoneyLendDetails: LendMoneyModel[] = await getAllLendMoney();
        const allBorrowMoneyDetails: MoneyBorrowModel[] = await getAllBorrowMoney();
        const allExpenseDetails: ExpenseModel[] = await getExpenseDetails();
        const allCreditDetails: CreditModel[] = await getCreditDetails();
        const backupDetails : BackupModel = await getBackupInfo();

        const backupObj: any = {
            user: userDetails,
            fund_types: fundTypedetails,
            fund_details: fundDetails,
            expense_reasons: allExpenseReasonDetails,
            credit_reasons: allCreditReasonDetails,
            persons: allPersonDetails,
            expenses: allExpenseDetails,
            credits: allCreditDetails,
            money_lends: allMoneyLendDetails,
            money_borrows: allBorrowMoneyDetails,
            backup_details: backupDetails
        };

        console.log(backupObj)

        // Save this to json file and encript the files using userpassword md5
        const timestamp = Date.now();
        const savedDBFilePath: string = await saveBackupData(backupObj, "behisebi_backup_" + timestamp);

        const count: number = await getBackupCount();

        if (count == 0) {
            const dirId: string = await createGoogleDriveFolder(accessToken);
            await addBackupFolderId(dirId);
            const fileId: string = await uploadToGoogleDrive(savedDBFilePath, accessToken, dirId);
            await addBackupFileId(fileId);
        } else {
            const backupDetails: BackupModel = await getBackupInfo();
            // console.log(backupDetails);
            await updateToGoogleDrive(savedDBFilePath, accessToken, backupDetails.backup_dir_id, backupDetails.backup_file_id);
            await updateTimeStamp(moment().format("DD/MM/YYYY HH:mm:ss"))
        }

        await deleteBackupFile(savedDBFilePath);
        return true;
    } catch (error) {
        return false;
    }
}


async function getGoogleDriveFiles(accessToken: string): Promise<[BackupModel, number]> {
    try {
        const response = await axios.get(
            'https://www.googleapis.com/drive/v3/files?q: mimeType = "application/vnd.google-apps.folder" ',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const backupData: BackupModel = {};

        console.log(response.data["files"])

        const fileLength: number = response.data["files"].length;
        if (fileLength > 0) {
            for (const file of response.data["files"]) {
                if (file["mimeType"] === "text/plain") {
                    backupData.backup_file_id = file["id"];
                    continue;
                }
                if (file["mimeType"] === "application/vnd.google-apps.folder") {
                    backupData.backup_dir_id = file["id"];
                    continue;
                }
            }
        }

        // console.log(backupData);
        return [backupData, fileLength]

        // return response.data["id"];
    } catch (error) {
        console.error('Error creating folder:', error.response?.data || error.message);
        return [{}, 0];
    }
}

async function restoreFromGoogleDrive(accessToken: string, fileID: string): Promise<string> {
    try {
        const response = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileID}?alt=media`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("HIT")
        console.log(response)
        return response["data"];
    }
    catch (error) {
        console.error(error);
        return "";
    }

}

async function createGoogleDriveFolder(accessToken: string): Promise<string> {
    const folderName = 'Behisebi';
    try {
        const response = await axios.post(
            'https://www.googleapis.com/drive/v3/files',
            {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Folder created successfully:', response.data);

        return response.data["id"];
    } catch (error) {
        console.error('Error creating folder:', error.response?.data || error.message);
    }


}

async function uploadToGoogleDrive(filePath: string, accessToken: string, dirId: string): Promise<string> {

    const encryptedContent = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.UTF8,
    });
    try {
        const boundary = '---MyBoundary';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        var contentType = 'text/plain'
        var metadata = {
            'name': "behisebi.db",
            'mimeType': contentType,
            'parents': [dirId]
        };

        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n\r\n' +
            encryptedContent + '\r\n' +
            close_delim;


        const response = await axios.post(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
            multipartRequestBody,
            {
                'headers': {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/related; boundary=' + boundary + ''
                },
            }
        );
        console.log('File uploaded successfully:', response.data);
        return response.data["id"];
    } catch (error) {
        console.error('Error during upload:', error);
    }
}

async function updateToGoogleDrive(filePath: string, accessToken: string, dirId: string, fileId: string) {

    const encryptedContent = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.UTF8,
    });
    try {
        const boundary = '---MyBoundary';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        var contentType = 'text/plain'
        var metadata = {
            'name': "behisebi.db",
            'mimeType': contentType
        };

        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n\r\n' +
            encryptedContent + '\r\n' +
            close_delim;

        // console.log(fileId);
        const response = await axios.patch(
            'https://www.googleapis.com/upload/drive/v3/files/' + fileId + '?uploadType=multipart',
            multipartRequestBody,
            {
                'headers': {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/related; boundary=' + boundary + ''
                },
            }
        );
        console.log('File uploaded successfully:', response.data);

    } catch (error) {
        console.error('Error during upload:', error);
    }
}



async function saveBackupData(jsonObj: any, filename: string): Promise<string> {
    try {
        const directory = FileSystem.documentDirectory;
        const filePath = `${directory}${filename}`;
        const jsonString: string = await encryptData(jsonObj);

        // Write the file
        await FileSystem.writeAsStringAsync(filePath, jsonString, {
            encoding: FileSystem.EncodingType.UTF8,
        });

        console.log(`File saved successfully at ${filePath}`);
        return filePath;
    } catch (error) {
        console.error("Error saving JSON file:", error);
        return "";
    }
}

async function deleteBackupFile(filePath: string) {
    try {
        await FileSystem.deleteAsync(filePath);
        console.log(`${filePath} is deleted`);
    } catch (error) {
        console.error(`Error while deleting ${filePath}. Error: ${error}`)
    }

}

async function encryptData(jsonObj: any): Promise<string> {
    const secretKey: string = await getUserPasswd();
    console.log(jsonObj)
    const encryptedData: string = CryptoJS.AES.encrypt(JSON.stringify(jsonObj), secretKey).toString();
    return encryptedData;
}

function decryptData(encryptedData: string, userPin: string): [any, boolean] {
    try {
        const secretKey = convertToMD5(userPin);
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(encryptedData);
        // console.log(decryptedString.replace(',"backup_deta','}'))
        console.log(decryptedString)
        return [{}, true];
    } catch (error) {
        console.log(error)
        return [{}, false];
    }
}

async function restoreDatabase(databaseDumpObj: any) {
    // Need to emply all tables
    await dropAllData();

    // console.log(databaseDumpObj)
    // console.log("HIT")


    const userObj: UserModel = {
        username: databaseDumpObj["user"][0]["user_name"],
        passwd: databaseDumpObj["user"][0]["passwd"],
        timestamp: databaseDumpObj["user"][0]["timestamp"],
    }
    await restoreUserData(userObj);

    for (const eachFundType of databaseDumpObj["fund_types"]) {
        let fundType: FundTypeModel = {
            fund_type_name: eachFundType["fund_type_name"]
        }
        // Save to DB
        await saveFundTypes(fundType)
    }

    let sortedFunds = databaseDumpObj["fund_details"].sort(function(a, b){
        return a.fund_id - b.fund_id;
    });
    for (const eachFund of sortedFunds) {
        let eachFundDetails: FundDetailsModel = {
            fund_name: eachFund["fund_name"],
            fund_type: eachFund["fund_type"],
            credit_limit: eachFund["credit_limit"],
            is_active: eachFund["is_active"],
            balance: eachFund["balance"],
            notes: eachFund["notes"]
        }
        await restoreFundDetails(eachFundDetails);
    }

    let sortedExpenseReason = databaseDumpObj["expense_reasons"].sort(function(a, b){
        return a.expense_reason_id - b.expense_reason_id;
    });
    for (const eachExpenseReason of sortedExpenseReason) {
        let expenseReason : ExpenseReasonModel = {
            expense_reason_catagory: eachExpenseReason["expense_reason_catagory"],
            expense_reason_name: eachExpenseReason["expense_reason_name"]
        }
        await addExpenseReasonDetails(expenseReason);
    }

    let sortedCreditReason = databaseDumpObj["credit_reasons"].sort(function(a, b){
        return a.expense_reason_id - b.expense_reason_id;
    });

    for (const eachCreditReason of sortedCreditReason){
        let creditReason: CreditReasonModel = {
            credit_reason_name: eachCreditReason["credit_reason_name"],
            credit_reason_catagory: eachCreditReason["credit_reason_catagory"]
        }

        await addCreditReasonDetails(creditReason);
    }

    
    for(const eachExpense of databaseDumpObj["expenses"]){
        let expenseObj : ExpenseModel = {
            expense_reason_id_fk: eachExpense["expense_reason_id_fk"],
            fund_id_fk: eachExpense["fund_id_fk"],
            amount: eachExpense["amount"],
            timestamp: eachExpense["timestamp"],
            credit_id: eachExpense["credit_id"],
            message: eachExpense["message"],
            person_id_fk: eachExpense["person_id_fk"]
        }
        await addExpenseDetails(expenseObj);
    }

    for(const eachCredit of databaseDumpObj["credits"]){

    }

}

export { populateBackup, getGoogleDriveFiles, restoreFromGoogleDrive, decryptData,restoreDatabase }