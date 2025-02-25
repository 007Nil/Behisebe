import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect } from "react";
import CommonHeader from "../../common/CommonHeader";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

import Modal from "react-native-modal";
import { AddCreditCustomFlatList, CustomButton } from "../../component";

import { CreditReasonModel } from "../../model";

import { getAllCreditReasonDetailsService, addCreditReasonService } from "../../services/CreditDetailsServices";


import styles from "./styles";

const CreditReasons = () => {
  const [creditData, setCreditData] = useState<CreditReasonModel[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [creditReason, setCreditReason] = useState<string>("");
  const [creditCatagory, setCreditCatagory] = useState<string>("");

  useEffect(() => {
    
    getAllCreditReasonDetailsService().then((data) => setCreditData(data));
  }, []);
  const getModalopen = (modelState: boolean) => {
    setModalOpen(modelState);
  };
  const resetState = () => {
    setCreditReason("");
    setCreditCatagory("");
    setModalOpen(false);
    alert("Credit Reason Data Saved!")
  };
  const addCreditReason = () => {
    if (creditReason === "") {
      alert("Please Add Credir Reason");
      return;
    }
    if (creditCatagory === "") {
      alert("Please Add Credit Catagory");
      return;
    }
    let creditReasonObj = {
      credit_reason_name: creditReason,
      credit_reason_catagory: creditCatagory,
    };
    addCreditReasonService(creditReasonObj);
    let newCreditReasonDetails = [...creditData, creditReasonObj];
    setCreditData(newCreditReasonDetails);
    resetState();
  };
  return (
    <View style={styles.container}>
      <CommonHeader title={"Credit Reason Settings"} />
      <View style={styles.searchBox}>
        <Image
          source={require("../../images/search.png")}
          style={styles.search}
        />
        <Text style={styles.searchText}>Search by Credit Reason Name</Text>
      </View>
      <View style={styles.card}>
        <AddCreditCustomFlatList
          data={creditData}
        />
      </View>
      <CustomButton pressEvent={"addCredit"} getModalopen={getModalopen} />
      <Modal
        isVisible={modalOpen}
        backdropOpacity={0.2}
        style={styles.modaView}
      >
        <View style={styles.mainView}>
          <View style={styles.modalTopView}>
            <Text style={styles.payable}>Credit Details</Text>
            <View style={styles.modalTopRightView}>
              <TouchableOpacity
                onPress={() => {
                  setModalOpen(false);
                }}
              >
                <Image
                  source={require("../../images/close.png")}
                  style={[
                    styles.backIcon,
                    { tintColor: "black", width: scale(16) },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Reason Name"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(reason) => setCreditReason(reason)}
                  value={creditReason}
                />
              </View>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Reason Catagory"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(catagory) => setCreditCatagory(catagory)}
                  value={creditCatagory}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.confirmPayNow}
            onPress={addCreditReason}
          >
            <Text style={styles.title}>{"Add Credit"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CreditReasons;