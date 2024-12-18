import { View, Text, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommonHeader from '../../common/CommonHeader';
import styles from "./styles";
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { decryptData, getGoogleDriveFiles, populateBackup, restoreFromGoogleDrive } from '../../services/BackupServices';
import { setupSignIn } from '../../services/AuthServices';
import BackupModel from '../../model/BackupModel';
import { getBackupInfo } from '../../repository/BackupRepo';


const UpdateProfile = () => {
  const [backuptime, setBackupTime] = useState<string>("");

  useEffect(() => {
    getBackupInfo().then((data) => {
      if (!data) {
        setBackupTime("");
      } else {
        setBackupTime(data.timestamp)
      }
    });
  }, []);


  const triggerBackup = async (backupType: string) => {
    let accessToken: string = "";
    let backupState: boolean = false;
    let filePath: string = "";
    if (backupType === "gDrive") {
      accessToken = await setupSignIn();
    }
    if (accessToken !== "") {
      [backupState] = await populateBackup(accessToken, backupType);
    } else if (backupType === "local") {
      // [backupState, filePath] = await populateBackup("", backupType);
      Alert.prompt("It doet not work for the time")
    }
    if (backupState && backupType === "gDrive") {
      await getLastBackupTime();
      Alert.alert("Backup Done");
    } else if (backupType === "local" && filePath !== "" && backupState) {
    }
    else {
      Alert.alert("Error")
    }
  };



  const testFunc = async () => {
    const accessToken: string = await setupSignIn();
    ToastAndroid.show("Google Drive Authentication done", ToastAndroid.SHORT);
    // console.log(accessToken);
    const [backupData, listLength] = await getGoogleDriveFiles(accessToken);
    if (listLength > 0) {
      ToastAndroid.show("Behisebi Database found on G Drive", ToastAndroid.SHORT);
      const encriptedData: string = await restoreFromGoogleDrive(accessToken, backupData.backup_file_id);
      ToastAndroid.show("Decrypting Database", ToastAndroid.SHORT);
      const [decryptedData, result] = await decryptData(encriptedData, "8474");
    } else {
      ToastAndroid.show("Behisebi Database not found on G Drive", ToastAndroid.SHORT);
    }
  }

  const updateUserName = () => {

  };

  const updatePin = () => {

  };

  const getLastBackupTime = async () => {
    const backupInfo: BackupModel = await getBackupInfo()
    setBackupTime(backupInfo.timestamp);
  }



  return (
    <View style={styles.container}>
      <CommonHeader title={"User Settings"} />
      <View style={styles.transactionItem}>
        <View>
          <View style={styles.topLeftView}>
            <View style={{ margin: moderateScale(10) }}>
              <View>
                <Text style={styles.paidTo}>User Name</Text>
                <Text style={styles.paidTo}>PIN</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.topLeftView}>
            <View style={{ margin: moderateScale(10) }}>
              <View>
                <Text style={styles.paidTo}>User Name</Text>
                <Text style={styles.paidTo}>* * * *</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.topLeftView}>
          <TouchableOpacity style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Update Username</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topLeftView}>
          <TouchableOpacity style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Update PIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'flex-start' }}>
        <View style={styles.topLeftView}>
          <TouchableOpacity style={styles.appButtonContainer}
            onPress={() => {
              triggerBackup("gDrive")
            }}>
            <Text style={styles.appButtonText}>Backup Data to G Drive</Text>
          </TouchableOpacity>
          {/* <View style={styles.topLeftView}>
            <TouchableOpacity style={styles.appButtonContainer}
              onPress={() => {
                triggerBackup("local")
              }}>
              <Text style={styles.appButtonText}>Backup to File</Text>
            </TouchableOpacity>
          </View> */}
        </View>

      </View>
{/* 
      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'flex-start' }}>
        <View style={styles.topLeftView}>
          <TouchableOpacity style={styles.appButtonContainer}
            onPress={testFunc}>
            <Text style={styles.appButtonText}>Test Data</Text>
          </TouchableOpacity>
        </View>

      </View> */}

      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'flex-start' }}>
        <View style={styles.topLeftView}>
          <Text style={styles.appButtonContainer}>Last Backup time: {backuptime}</Text>
        </View>
      </View>
    </View>
  )
}

export default UpdateProfile;