import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import Modal from "react-native-modal";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import moment from "moment";
import Dropdown from "../../component/Dropdown";

import PaymentCommonHeader from "../../common/PaymentCommonHeader";
// Services

// import { saveExpenseData } from "../../services";

// import { getExpenseReason as getExpenseReasonService } from "../../services/ExpenseReasonService";
// import { getFundDetails as getFundDetailsService } from "../../services/FundServices";
// import { getAllPersonsService } from "../../services/PersonService";

const AddExpense = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      // reset state
      setIsSubmit(false);
      setFundIsChecked(true);
      setCashIsChecked(false);
      setMessage("");
      setAmount("");
    }
  }, [isFocused]);
  // useEffect(() => {
  //   getAllPersonsService().then((data) => setDbPersonDetails(data));
  //   getExpenseReasonService().then((data) => setDbExpenseReason(data));
  //   getFundDetailsService().then((data) => setDbFundDetails(data));
  // }, []);

  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isFundChecked, setFundIsChecked] = useState(true);
  const [isCashChecked, setCashIsChecked] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  
  const [dbExpenseReason, setDbExpenseReason] = useState([]);
  const [dbFundDetails, setDbFundDetails] = useState([]);
  const [dbPersonDetails, setDbPersonDetails] = useState([]);
  //
  const [expenseReason, setExpenseReason] = useState("");
  const [fundDetails, setFundDetails] = useState("");
  const [personDetails, setPersonDetails] = useState("");


  const toggleFundCheckbox = () => {
    if (!isFundChecked) {
      setCashIsChecked(isFundChecked);
      setFundIsChecked(!isFundChecked);
    }
  };

  const toggleCashCheckbox = () => {
    if (!isCashChecked) {
      setFundIsChecked(isCashChecked);
      setCashIsChecked(!isCashChecked);
    }
  };

  const getExpenseReason = (expenseReason) => {
    setExpenseReason(expenseReason);
  };

  const getFundDetails = (fundDetails) => {
    setFundDetails(fundDetails);
  };

  const getPersonDetails = (personDetails) => {
    setPersonDetails(personDetails);
  };

  const checkExpenseForm = () => {
    let isValidFrom = true;
    if (!expenseReason) {
      alert("Please select expense reason");
      isValidFrom = false;
    } else {
      // if (expenseReason.expense_reason === "Lend Money") {
      //   if (!personDetails) {
      //     alert("Please select person name");
      //     isValidFrom = false;
      //   }
      // }
    }
    if (isFundChecked && !fundDetails) {
      alert("Please select a fund");
      isValidFrom = false;
    }
    if (amount === "") {
      alert("Please enter amount");
      isValidFrom = false;
    }

    return isValidFrom;
  };

  const saveExpenseDetails = () => {
    let expenseObject = {
      // fundId: isCashChecked ? null : fundDetails._id,
      // isByCash: isCashChecked ? 1 : 0,
      // expenseReason: expenseReason._id,
      // amount: amount,
      // message: message,
    };
    //
    //saveExpenseData();
    setIsSubmit(true);
    // navigation.navigate("TransferSuccessful");
  };

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <View style={styles.container}>
      <PaymentCommonHeader headerTitle={"Save Expense"} />
      <View style={styles.cardView}>
        <View style={styles.topView}>
          <View style={styles.leftView}>
            {/* For non-cash Payment 
            e.g. Bank, Credit Card, etc*/}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleFundCheckbox}
            >
              <Text style={{ paddingRight: 10 }}>By Fund</Text>
              <View
                style={[styles.checkbox, isFundChecked ? styles.checked : null]}
              />
              <TextInput
                style={styles.Checkedinput}
                // placeholder={
                //   isFundChecked
                //     ? fundDetails.balance
                //       ? "Balance: " + fundDetails.balance
                //       : fundDetails.limit
                //       ? "Available Limit: " + fundDetails.limit
                //       : ""
                //     : ""
                // }
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* For Cash Payment */}
        <View style={styles.topView}>
          <View style={styles.leftView}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleCashCheckbox}
            >
              <Text style={{ paddingRight: 10 }}>By Cash</Text>
              <View
                style={[styles.checkbox, isCashChecked ? styles.checked : null]}
              />
              <TextInput
                style={styles.Checkedinput}
                placeholder={isCashChecked ? "Balance: 12000" : ""}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Actual form */}
        {!isCashChecked && !isSubmit ? (
          <View style={[styles.amountView]}>
            <Dropdown
              dropDownValues={dbFundDetails}
              dropDownType={"fundDetails"}
              getFundDetails={getFundDetails}
            />
          </View>
        ) : null}
        <View style={styles.amountView}>
          <Image
            source={require("../../images/rupee.png")}
            style={[styles.backIcon, { tintColor: "black" }]}
          />
          <TextInput
            placeholderTextColor={"#929292"}
            placeholder="Enter Amount"
            style={styles.input}
            keyboardType="number-pad"
            value={amount}
            autoFocus={true}
            onChangeText={(txt) => setAmount(txt)}
          />
        </View>
        {/* Reason for expense */}
        {!isSubmit ? (
          <View style={[styles.amountView]}>
            <Dropdown
              dropDownValues={dbExpenseReason}
              dropDownType={"expenseReasonDetails"}
              getExpenseReason={getExpenseReason}
            />
          </View>
        ) : null}

        {/* Money Lend */}
        {/* {expenseReason.expense_reason === "Lend Money" ? (
          <View style={[styles.amountView]}>
            <Dropdown
              dropDownValues={dbPersonDetails}
              dropDownType={"personDetails"}
              getPersonDetails={getPersonDetails}
            />
          </View>
        ) : null} */}
        <View
          style={[
            styles.amountView,
            { marginBottom: moderateVerticalScale(20) },
          ]}
        >
          <TextInput
            placeholderTextColor={"#929292"}
            placeholder="Add a Message(optional)"
            style={[styles.input, { fontSize: moderateScale(14) }]}
            keyboardType="default"
            onChangeText={(txt) => setMessage(txt)}
            value={message}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.proceedToPay,
          { backgroundColor: amount != "" ? "purple" : "#929292" },
        ]}
        onPress={() => {
          setModalOpen(checkExpenseForm());
        }}
      >
        <Text style={styles.payNowText}>Save Expense</Text>
      </TouchableOpacity>
      <Modal
        isVisible={modalOpen}
        backdropOpacity={0.2}
        style={styles.modaView}
      >
        <View style={styles.mainView}>
          <View style={styles.modalTopView}>
            <Text style={styles.payable}>Total Payable</Text>
            <View style={styles.modalTopRightView}>
              <Text style={styles.confirmAmount}>{"₹ " + amount}</Text>
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
          {!isCashChecked ? (
            <View style={styles.bankView}>
              <View style={styles.bankLeftView}>
                <View style={{ marginLeft: moderateScale(15) }}>
                  <View style={styles.upi_view}>
                    <Text>Fund Name</Text>
                  </View>
                </View>
              </View>
              <View style={styles.bankRightView}>
                <View style={{ marginLeft: moderateScale(15) }}>
                  <View style={styles.upi_view}>
                    {/* <Text>{fundDetails.fund_name}</Text> */}
                  </View>
                  <Text style={styles.bankAccount}>
                    {/* {fundDetails.fund_type} */}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text>Expense Reason</Text>
                </View>
              </View>
            </View>
            <View style={styles.bankRightView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  {/* <Text>{expenseReason.expense_reason}</Text> */}
                </View>
                {/* <Text style={styles.bankAccount}>{expenseReason.category}</Text> */}
              </View>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text>Date</Text>
                </View>
              </View>
            </View>
            <View style={styles.bankRightView}>
              <View style={styles.upi_view}>
                <Text>{moment().format("DD/MM/YYYY HH:mm:ss")}</Text>
              </View>
            </View>
          </View>
          {/* {expenseReason.expense_reason === "Lend Money" ? (
            <View style={styles.bankView}>
              <View style={styles.bankLeftView}>
                <View style={{ marginLeft: moderateScale(15) }}>
                  <View style={styles.upi_view}>
                    <Text>Lend To</Text>
                  </View>
                </View>
              </View>
              <View style={styles.bankRightView}>
                <View style={styles.upi_view}>
                  <Text>{personDetails.name}</Text>
                </View>
              </View>
            </View>
          ) : (
            ""
          )} */}
          <TouchableOpacity
            style={styles.confirmPayNow}
            onPress={() => {
              setModalOpen(false);
              saveExpenseDetails();
            }}
          >
            <Text style={styles.title}>{"Pay " + "₹ " + amount}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AddExpense;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    opacity: 0.5, // Optional: you can adjust opacity to visually indicate that the input is disabled
  },
  Checkedinput: {
    width: "100%",
    paddingHorizontal: 10,
    opacity: 1,
  },
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
    paddingLeft: moderateScale(15),
  },
  leftView: {
    flexDirection: "row",
    alignItems: "center",
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
  proceedToPay: {
    width: "100%",
    height: verticalScale(60),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
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
