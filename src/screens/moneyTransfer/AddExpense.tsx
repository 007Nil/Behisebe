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
  scale
} from "react-native-size-matters";
import Modal from "react-native-modal";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import { type StackNavigation } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

import Dropdown from "../../component/Dropdown";
import PaymentCommonHeader from "../../common/PaymentCommonHeader";
// Services
import { getFundBalanceService, getValidFundDetailsService } from "../../services/FundDetailsServices";
import { getValidExpenseReasonDetailsService, saveExpenseDetailsService } from "../../services/ExpenseDetailsServices";
import { getAllPersonDetailsService } from "../../services/PersonDetailsServices";
import { ExpenseModel, ExpenseReasonModel, FundDetailsModel, PersonModel } from "../../model";

const AddExpense = () => {
  const { navigate } = useNavigation<StackNavigation>();
  const isFocused = useIsFocused();
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [fundAmount, setFundAmount] = useState(Number);
  const [dbExpenseReason, setDbExpenseReason] = useState<ExpenseReasonModel[]>([]);
  const [dbFundDetails, setDbFundDetails] = useState<FundDetailsModel[]>([]);
  const [dbPersonDetails, setDbPersonDetails] = useState<PersonModel[]>([]);
  //
  const [expenseReason, setExpenseReason] = useState<ExpenseReasonModel>();
  const [fundDetails, setFundDetails] = useState<FundDetailsModel>(
    {
      fund_id: 0,
      fund_name: "",
      fund_type: "",
      balance: 0
    }
  );
  const [personDetails, setPersonDetails] = useState<PersonModel>(
    {
      person_id: 0,
      person_name: ""
    }
  );

  useEffect(() => {
    if (isFocused) {
      // reset state
      setIsSubmit(false);
      setMessage("");
      setAmount("");
    }
  }, [isFocused]);
  useEffect(() => {
    getAllPersonDetailsService().then((data) => setDbPersonDetails(data));
    getValidExpenseReasonDetailsService().then((data) => {
      data  = data.filter( obj => obj.expense_reason_name !== "Repay Borrowed Money");
      setDbExpenseReason(data)});
    getValidFundDetailsService().then((data) => setDbFundDetails(data));
  }, []);


  const getExpenseReason = (expenseReason: ExpenseReasonModel) => {
    setExpenseReason(expenseReason);
  };

  const getFundDetails = async (fundDetails: FundDetailsModel) => {
    setFundDetails(fundDetails);
    setFundAmount(await getFundBalanceService(fundDetails.fund_id));
  };

  const getPersonDetails = (personDetails: PersonModel) => {
    setPersonDetails(personDetails);
  };

  const checkExpenseForm = () => {
    let isValidFrom = true;
    if (!expenseReason) {
      alert("Please select expense reason");
      isValidFrom = false;
    } else {
      if (expenseReason.expense_reason_name === "Lend Money") {
        console.log(personDetails)
        if (!personDetails.person_id) {
          alert("Please select person name");
          isValidFrom = false;
        }
      }
    }
    if (!fundDetails) {
      alert("Please select a fund");
      isValidFrom = false;
    }
    if (amount === "") {
      alert("Please enter amount");
      isValidFrom = false;
    }
    if (Number(amount) > fundDetails.balance) {
      alert("Insufficient amount");
      isValidFrom = false;
    }
    return isValidFrom;
  };

  const saveExpenseDetails = () => {
    let expenseObject: ExpenseModel = {
      fund_id_fk: fundDetails.fund_id,
      expense_reason_id_fk: expenseReason.expense_reason_id,
      person_id_fk: personDetails.person_id > 0 ? personDetails.person_id : null,
      amount: Number(amount),
      message: message.length > 0 ? message : ""
    };
    //
    saveExpenseDetailsService(expenseObject);
    setIsSubmit(true);
    navigate("TransferSuccessful");
  };

  return (
    <View style={styles.container}>
      <PaymentCommonHeader headerTitle={"Save Expense"} />
      <View style={styles.cardView}>
        <View style={styles.topView}>
          <View style={styles.leftView}>
            <Text style={{ paddingRight: 10 }}>{"Fund Balance: "}</Text>
            <TextInput
              style={styles.Checkedinput}
              value={"" + fundDetails.balance == "undefined" ? "0" :
                "" + fundAmount}
              editable={false}
            />
          </View>
        </View>
        {/* Actual form */}
        {!isSubmit ? (
          <View style={[styles.amountView]}>
            <Dropdown
              dropDownValues={dbFundDetails}
              dropDownType={"fundDetails"}
              getFundDetails={getFundDetails}
              fundValuetype="getFundDetails"
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
        {"" + expenseReason === "undefined" ? null : expenseReason.expense_reason_name === "Lend Money" ? (
          <View style={[styles.amountView]}>
            <Dropdown
              dropDownValues={dbPersonDetails}
              dropDownType={"personDetails"}
              getPersonDetails={getPersonDetails}
            />
          </View>
        ) : null}
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
                  <Text>{modalOpen ? fundDetails.fund_name : ""}</Text>
                </View>
                <Text style={styles.bankAccount}>
                  {modalOpen ? fundDetails.fund_type : ""}
                </Text>
              </View>
            </View>
          </View>
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
                  <Text>{modalOpen ? expenseReason.expense_reason_name : ""}</Text>
                </View>
                <Text style={styles.bankAccount}>{modalOpen ? expenseReason.expense_reason_catagory : ""}</Text>
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
          {modalOpen ? expenseReason.expense_reason_name === "Lend Money" ? (
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
                  <Text>{personDetails.person_name}</Text>
                </View>
              </View>
            </View>
          ) : (
            ""
          ) : ""}
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