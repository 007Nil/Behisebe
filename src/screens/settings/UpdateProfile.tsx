import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommonHeader from '../../common/CommonHeader';
import styles from "./styles";
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '@ant-design/react-native';

import { populateBackup } from '../../services/BackupServices';
import { setupSignIn } from '../../services/AuthServices';
import BackupModel from '../../model/BackupModel';
import { getBackupInfo } from '../../repository/BackupRepo';

const UpdateProfile = () => {
  const [backuptime, setBackupTime] = useState<string>("");

  useEffect(() => {
    getBackupInfo().then((data) => setBackupTime(data.timestamp));
  }, []);
  const triggerBackup = async () => {
    const accessToken: string = await setupSignIn();
    if (accessToken !== "") {
      const backupState: boolean = await populateBackup(accessToken);
      if (backupState) {
        await getLastBackupTime()
        Alert.alert("Backup Done")
      } else {
        Alert.alert("Error")
      }

    }

  };

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
            onPress={triggerBackup}>
            <Text style={styles.appButtonText}>Backup Data</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'flex-start' }}>
        <View style={styles.topLeftView}>
          <Text style={styles.appButtonContainer}>Last Backup time: {backuptime}</Text>
        </View>
      </View>
    </View>
  )
}

export default UpdateProfile;