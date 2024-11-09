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
} from "react-native-size-matters";
import styles from "./styles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import PaymentCommonHeader from "../../common/PaymentCommonHeader";
import Modal from "react-native-modal";
import moment from "moment";
import Dropdown from "../../component/Dropdown";
import { CreditModel, CreditReasonModel, FundDetailsModel, PersonModel } from "../../model";
import { getAllPersonDetailsService } from "../../services/PersonDetailsServices";
import { getFundBalanceService, getValidFundDetailsService } from "../../services/FundDetailsServices";
import { getValidCreditReasonDetailsService, saveCreditDetailsService } from "../../services/CreditDetailsServices";
import { type StackNavigation } from "../../navigation/AppNavigator";
import { CustomDatePicker } from "../../component";


const AddCredit = () => {
  const isFocused = useIsFocused();
  const { navigate } = useNavigation<StackNavigation>();

  const [dbCreditReason, setDbCreditReason] = useState<CreditReasonModel[]>([]);
  const [dbFundDetails, setDbFundDetails] = useState<FundDetailsModel[]>([]);
  const [dbPersonDetails, setDbPersonDetails] = useState<PersonModel[]>([]);
  const [updatedDate, setUpdatedDate] = useState<string>("");

  const navigation = useNavigation();

  const [creditReason, setCreditReason] = useState<CreditReasonModel>({
    credit_reason_catagory: "",
    credit_reason_name: ""
  });
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
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [fundAmount, setFundAmount] = useState(Number);

  useEffect(() => {
    getAllPersonDetailsService().then((data) => setDbPersonDetails(data));
    getValidCreditReasonDetailsService().then((data) => {
      data = data.filter(obj => obj.credit_reason_name !== "Pay Back");
      setDbCreditReason(data)
    });
    getValidFundDetailsService().then((data) => {
      // Remove Credit Card
      data = data.filter(obj => obj.fund_type !== "Credit Card");
      setDbFundDetails(data)
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      setIsSubmit(false);
      setMessage("");
      setAmount("");
      setUpdatedDate("");
    }
  }, [isFocused]);

  const getFundDetails = async (fundDetails: FundDetailsModel) => {
    setFundDetails(fundDetails);
    setFundAmount(await getFundBalanceService(fundDetails.fund_id));
  };
  const getPersonDetails = (personDetails: PersonModel) => {
    setPersonDetails(personDetails);
  };

  const getUpdatedDate = (date: string) => {
    setUpdatedDate(date);
  };

  const getCreditReason = (creditReason: CreditReasonModel) => {
    setCreditReason(creditReason);
  };

  const checkCreditForm = () => {
    let isValidFrom = true;
    if (!creditReason) {
      alert("Please select expense reason");
      return false;
    } else {
      if (creditReason.credit_reason_name === "Pay Of Debt") {
        if (!personDetails) {
          alert("Please select person name");
          return false;
        }
      }
    }
    if (!fundDetails) {
      alert("Please select a fund");
      return false;
    }
    if (amount === "") {
      alert("Please enter amount");
      return false;
    }

    return true;
  };

  const displayUpdatedDate = (date: string): string => {
    const dateTimeSplit : string[] = date.split(" ");
    const date1 :  string = dateTimeSplit[0];
    const time: string = dateTimeSplit[1];

    const dateSlice = date1.split("-");

    const year = dateSlice[0];
    const month = dateSlice[1];
    const day = dateSlice[2];

    const returnDate = day+"/"+month+"/"+year+" "+time
    return returnDate; 
  }
  const saveCreditDetails = () => {
    const creditObject: CreditModel = {
      fund_id_fk: fundDetails.fund_id,
      credit_reason_id_fk: creditReason.credit_reason_id,
      person_id_fk: personDetails.person_id > 0 ? personDetails.person_id : null,
      amount: Number(amount),
      message: message.length > 0 ? message : "",
      timestamp: updatedDate == "" ? null : updatedDate
    };
    saveCreditDetailsService(creditObject);
    setIsSubmit(true);
    navigate("CreditTransferSuccessful");
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <PaymentCommonHeader headerTitle={"Add Credit"} />
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
            onChangeText={(txt) => setAmount(txt)}
          />
        </View>
        {/* Reason for credit */}
        {!isSubmit ? (
          <View style={[styles.amountView]}>
            <Dropdown
              dropDownValues={dbCreditReason}
              dropDownType={"creditReason"}
              getCreditReason={getCreditReason}
            />
          </View>
        ) : null}

        {/* Borrow Money */}
        {"" + creditReason === "undefined" ? null : creditReason.credit_reason_name === "Borrow Money" ? (
          <View style={[styles.amountView]}>
            <Dropdown
              dropDownValues={dbPersonDetails}
              dropDownType={"personDetails"}
              getPersonDetails={getPersonDetails}
            />
          </View>
        ) : (
          null
        )}
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
          setModalOpen(checkCreditForm());
        }}
      >
        <Text style={styles.payNowText}>Save Credit</Text>
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
                  <Text>{modalOpen ? creditReason.credit_reason_name : ""}</Text>
                </View>
                <Text style={styles.bankAccount}>{modalOpen ? creditReason.credit_reason_catagory : ""}</Text>
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
                <Text>
                  {updatedDate === "" ? moment().format("DD/MM/YYYY HH:mm:ss"): displayUpdatedDate(updatedDate)}
                </Text>
                <CustomDatePicker
                getUpdatedDate={getUpdatedDate}/>
              </View>
            </View>
          </View>
          {modalOpen ? creditReason.credit_reason_name === "Borrow Money" ? (
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
              saveCreditDetails();
            }}
          >
            <Text style={styles.title}>{"Pay " + "₹ " + amount}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

  );
};

export default AddCredit;