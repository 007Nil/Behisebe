import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { React, useState, useId } from "react";

import CommonHeader from "../../common/CommonHeader";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import Modal from "react-native-modal";

import { funds } from "../../dummy_data/index";

// Services
import { SaveFundDetails } from "../../services";

const Funds = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fundData, setFundData] = useState(funds);
  const [fundName, setFundName] = useState("");
  const [fundType, setFundType] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const resetState = () => {
    setFundName("");
    setFundType("");
    setFundAmount("");
    setModalOpen(false);
  };
  const validateForm = () => {
    let isValid = false;
    if (fundName === "") {
      alert("Fund Name cannot emply");
      return isValid;
    }
    if (fundType === "") {
      alert("Fund Type cannot emply");
      return isValid;
    }
    if (fundAmount === "") {
      alert("Amount cannot emply");
      return isValid;
    }
    return true;
  };
  const addFunds = () => {
    let id = (Math.random() + 1).toString(36).substring(7);
    let newFundDetails = [
      ...fundData,
      {
        _id: id,
        fund_name: fundName,
        fund_type: fundType,
        balance: fundAmount,
        is_active: true,
      },
    ];
    SaveFundDetails();
    setFundData(newFundDetails);
    resetState();
    alert("Fund Information Saved");
  };
  return (
    <View style={styles.container}>
      <CommonHeader title={"Fund Settings"} />

      <View style={styles.searchBox}>
        <Image
          source={require("../../images/search.png")}
          style={styles.search}
        />
        <Text style={styles.searchText}>Search by name ,number or UPI ID</Text>
      </View>
      <View style={styles.card}>
        <FlatList
          contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
          // keyExtractor={ item}
          data={fundData}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.transactionItem}>
                <View>
                  <View style={styles.topLeftView}>
                    <View style={{ marginLeft: moderateScale(10) }}>
                      <Text style={styles.paidTo}>{item.fund_name}</Text>
                      <Text style={styles.paidTo}>{item.fund_type}</Text>
                      <Text style={styles.paidTo}>
                        {item.is_active ? "Active" : "Not Active"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <TouchableOpacity>
                    <Text style={styles.amount}>{"Edit"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>

      <TouchableOpacity
        style={[styles.proceedToPay]}
        onPress={() => {
          setModalOpen(true);
        }}
      >
        <Text style={styles.payNowText}>{"Add Fund"}</Text>
      </TouchableOpacity>
      <Modal
        isVisible={modalOpen}
        backdropOpacity={0.2}
        style={styles.modaView}
      >
        <View style={styles.mainView}>
          <View style={styles.modalTopView}>
            <Text style={styles.payable}>Fund Details</Text>
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
          <View style={styles.divider}></View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Fund Name"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(name) => setFundName(name)}
                  value={fundName}
                />
              </View>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Fund Type"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(type) => setFundType(type)}
                  value={fundType}
                />
              </View>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Amount / Limit"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  keyboardType="number-pad"
                  onChangeText={(amount) => setFundAmount(amount)}
                  value={fundAmount}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.confirmPayNow}
            onPress={validateForm ? addFunds : null}
          >
            <Text style={styles.title}>{"Add Fund"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Funds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  searchBox: {
    width: "94%",
    height: verticalScale(40),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: moderateVerticalScale(10),
    borderRadius: moderateScale(10),
    borderWidth: 0.5,
    borderColor: "#929292",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: moderateScale(15),
  },
  search: {
    width: scale(15),
    height: scale(15),
  },
  searchText: {
    marginLeft: moderateScale(20),
    color: "#929292",
    fontSize: moderateScale(16),
  },
  card: {
    width: "94%",
    backgroundColor: "white",
    marginTop: moderateVerticalScale(15),

    alignSelf: "center",
    borderRadius: moderateScale(10),
    shadowOpacity: 0.1,
    shadowColor: "rgba(0,0,0,.5)",
    shadowOffset: {
      x: 1,
      y: 1,
    },
  },
  filtersView: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateVerticalScale(15),
    flexDirection: "row",
    alignSelf: "center",
  },
  dropdownView: {
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingBottom: moderateVerticalScale(5),
    paddingTop: moderateVerticalScale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: moderateScale(10),
    width: scale(8),
    height: scale(8),
  },
  transactionItem: {
    width: "94%",
    height: 100,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  topLeftView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(15),
  },
  iconView: {
    width: scale(36),
    height: scale(36),
    backgroundColor: "purple",
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  icon2: {
    width: scale(16),
    height: scale(16),
    tintColor: "white",
  },
  paidTo: {
    color: "black",
    fontSize: moderateScale(16),
  },
  name: {
    color: "#4f4f4f",
    fontSize: moderateScale(16),
  },
  time: {
    marginLeft: moderateScale(20),
    marginTop: moderateVerticalScale(20),
    color: "#929292",
  },
  amount: {
    marginTop: scale(15),
    fontWeight: "400",
    fontSize: 15,
  },
  bankView: {
    flexDirection: "row",
    marginTop: moderateVerticalScale(20),
  },
  logo: {
    width: scale(12),
    height: scale(12),
    marginLeft: moderateScale(15),
  },
  //   sdsafjkbsfgalfhsag
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  // input: {
  //   width: 200,
  //   height: 40,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   backgroundColor: '#f0f0f0',
  //   opacity: 0.5, // Optional: you can adjust opacity to visually indicate that the input is disabled
  // },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#000",
  },
  label: {
    fontSize: 16,
  },
  header: {
    width: "100%",
    height: verticalScale(85),
    backgroundColor: "purple",
    justifyContent: "flex-end",
  },
  subHeader: {
    width: "100%",
    height: verticalScale(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(15),
  },
  backBtn: {
    width: scale(50),
    height: scale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: scale(24),
    height: scale(24),
    tintColor: "white",
  },
  title: {
    color: "white",
    fontSize: moderateScale(20),
  },
  cardView: {
    width: "94%",

    alignSelf: "center",
    backgroundColor: "white",
    marginTop: moderateVerticalScale(10),
    borderRadius: moderateScale(5),
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(15),
  },
  leftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameView: {
    width: scale(40),
    height: scale(40),
    backgroundColor: "#929292",
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  nameChar: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  name: {
    fontSize: 18,
    color: "#000",
    marginLeft: moderateScale(10),
  },
  upi_id: {
    fontSize: 14,
    color: "#929292",
    marginLeft: moderateScale(10),
    marginTop: moderateScale(5),
  },
  viewHistory: {
    color: "purple",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  amountView: {
    width: "94%",
    height: verticalScale(45),
    borderWidth: 0.5,
    alignSelf: "center",
    borderColor: "#929292",
    borderRadius: moderateScale(5),
    flexDirection: "row",
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    alignItems: "center",
    marginTop: moderateVerticalScale(20),
  },
  input_2: {
    fontSize: 25,
    marginLeft: moderateScale(15),
    fontWeight: "600",
  },
  proceedToPay: {
    width: "100%",
    height: verticalScale(60),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "green",
    bottom: 0,
  },
  payNowText: {
    color: "white",
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  modaView: {
    margin: 0,
  },
  mainView: {
    backgroundColor: "white",
    width: "100%",

    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(10),
  },
  modalTopView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(10),
  },
  payable: {
    fontWeight: "700",
    color: "black",
    fontSize: moderateScale(16),
  },
  modalTopRightView: {
    flexDirection: "row",
    alignItems: "center",
  },
  confirmAmount: {
    fontSize: 30,
    fontWeight: "600",
    color: "black",
    marginRight: moderateScale(20),
  },
  divider: {
    width: "100%",
    height: verticalScale(0.5),
    backgroundColor: "#929292",
    marginTop: moderateVerticalScale(20),
    opacity: 0.4,
  },
  bankView: {
    width: "100%",
    height: verticalScale(50),
    backgroundColor: "#f2f2f2",
    alignSelf: "center",
    marginTop: moderateVerticalScale(15),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bankLeftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankRightView: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: scale(20),
    height: scale(20),
    resizeMode: "contain",
    marginLeft: moderateScale(10),
  },
  upi_view: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankAccount: {
    color: "#929292",
    fontSize: moderateScale(12),
  },
  confirmPayNow: {
    width: "94%",
    height: verticalScale(40),
    backgroundColor: "purple",
    borderRadius: moderateScale(30),
    alignSelf: "center",
    marginTop: moderateVerticalScale(20),
    marginBottom: moderateVerticalScale(40),
    justifyContent: "center",
    alignItems: "center",
  },
});
