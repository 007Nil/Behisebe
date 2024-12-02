import { CreditModel, CreditReasonModel, ExpenseModel, ExpenseReasonModel, FundDetailsModel, FundTypeModel, LendMoneyModel, MoneyBorrowModel, MoneyRepayModel, PersonModel, UserModel } from "../model"
import { getAllCreditReasonDetails, getCreditDetails } from "../repository/CreditDetailsRepo";
import { getAllExpenseReasonDetails, getExpenseDetails } from "../repository/ExpenseDetailsRepo";
import { getAllFundDetails, getAllFundTypes } from "../repository/FundDetailsRepo";
import { getAllLendMoney } from "../repository/LendMoneyRepo";
import { getAllBorrowMoney } from "../repository/MoneyBorrowRepo";
import { getAllPersonDetails } from "../repository/PersonDetailsRepo";
import { getAllusers, getUserPasswd } from "../repository/UsersRepo"
import axios from 'axios';

import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';
import { convertToMD5 } from "../utils/AllUtils";
import { INFINITE_TIMEOUT, GDrive } from '@robinbobin/react-native-google-drive-api-wrapper'
import { statusCodes } from "@react-native-google-signin/google-signin";
import { err } from "react-native-svg";
import { addBackupFileId, addBackupFolderId, getBackupCount, getBackupInfo, updateTimeStamp } from "../repository/BackupRepo";
import BackupModel from "../model/BackupModel";
import moment from "moment";

async function populateBackup(accessToken: string) : Promise<boolean> {

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
            money_borrows: allBorrowMoneyDetails
        };

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
            await updateToGoogleDrive(savedDBFilePath, accessToken,backupDetails.backup_dir_id, backupDetails.backup_file_id);
            await updateTimeStamp(moment().format("DD/MM/YYYY HH:mm:ss"))
        }

        await deleteBackupFile(savedDBFilePath);
        return true;
    } catch (error) {
        return false;
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

        console.log(fileId);
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
        // console.log(jsonString)

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

    // const decryptObj : any = decryptData(jsonString, "8474");

    // console.log(decryptObj["credit_reasons"])

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
    const encryptedData: string = CryptoJS.AES.encrypt(JSON.stringify(jsonObj), secretKey).toString();;
    return encryptedData;
}

function decryptData(encryptedData: string, userPin: string): any {
    const secretKey = convertToMD5(userPin);
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);

}
export { populateBackup }