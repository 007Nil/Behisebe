import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from 'react'
import { moderateScale, scale } from "react-native-size-matters";
import styles from "./styles";
import CommonHeader from "../../common/CommonHeader";
import Modal from "react-native-modal";
import { FundTypeModel } from "../../model";
import { AddFundTypeCustomFlatList, CustomButton } from "../../component";
import { getAllFundTypes, saveFundTypes } from "../../repository/FundDetailsRepo";
const FundTypes = () => {
  const [fundTypes, setFundTypes] = useState<FundTypeModel[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [fundTypeName, setfundTypeName] = useState<string>("");
  useEffect(() => {
    getAllFundTypes().then((data) => setFundTypes(data));
  }, []);
  const getModalopen = (modelState: boolean) => {
    setModalOpen(modelState);
  };
  const resetState = () => {
    setModalOpen(false);
    setfundTypeName("");
    alert("Fund Type Data Saved!")
  };
  const addFundType = async () => {
    if (fundTypeName === "") {
      alert("Please Add Fund Type Name");
      return;
    }

    let fundTypeObj: FundTypeModel = {
      fund_type_name: fundTypeName
    };
    await saveFundTypes(fundTypeObj);
    let newFundTypeDetail = [...fundTypes, fundTypeObj];
    setFundTypes(newFundTypeDetail);
    resetState();
  }
  return (
    <View style={styles.container}>
      <CommonHeader title={"Fund Type Settings"} />
      <View style={styles.searchBox}>
        <Image
          source={require("../../images/search.png")}
          style={styles.search}
        />
        <Text style={styles.searchText}>Search by Person Name</Text>
      </View>
      <View style={styles.card}>
        <AddFundTypeCustomFlatList
          data={fundTypes}
        />
      </View>
      <CustomButton pressEvent={"addFundType"} getModalopen={getModalopen} />
      <Modal
        isVisible={modalOpen}
        backdropOpacity={0.2}
        style={styles.modaView}
      >
        <View style={styles.mainView}>
          <View style={styles.modalTopView}>
            <Text style={styles.payable}>Fund Type Details</Text>
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
                  <Text style={styles.bankAccount}>{"Fund Type Name"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(fundType) => setfundTypeName(fundType)}
                  value={fundTypeName}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.confirmPayNow} onPress={addFundType}>
            <Text style={styles.title}>{"Add Fund Type"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default FundTypes