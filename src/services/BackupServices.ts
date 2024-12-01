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

async function populateBackup(accessToken: string) {
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
    // Upload to google drive 
    // createGoogleDriveFolder(accessToken);
    await uploadToGoogleDrive(savedDBFilePath, accessToken);



}

async function createGoogleDriveFolder(accessToken: string) {
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
    } catch (error) {
        console.error('Error creating folder:', error.response?.data || error.message);
    }


}

async function uploadToGoogleDrive(filePath: string, accessToken: string) {

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
            'parents': ['1bWCQ-xnvq1GJlE045morOWjjcLd3xEjM']
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