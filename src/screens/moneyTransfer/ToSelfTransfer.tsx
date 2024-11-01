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
import { FundDetailsModel, SelfTransferModel } from "../../model";
import { getAllFundDetailsService } from "../../services/FundDetailsServices";
import { startSelfTransaction } from "../../services/SelfTransferService";


const ToSelfTransfer = () => {
  const { navigate } = useNavigation<StackNavigation>();
  const isFocused = useIsFocused();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [dbFundDetails, setDbFundDetails] = useState<FundDetailsModel[]>([]);
  const [tranferFromFundDetails, setTransferFromFundDetails] = useState<FundDetailsModel>();
  const [tranferToFundDetails, setTransferToFundDetails] = useState<FundDetailsModel>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getTransferToFundDetails = (data: FundDetailsModel) => {
    setTransferToFundDetails(data)
  }

  const getTransferFromFundDetails = (data: FundDetailsModel) => {
    setTransferFromFundDetails(data)
  }

  useEffect(() => {
    getAllFundDetailsService().then((data) => setDbFundDetails(data));
  }, []);

  useEffect(() => {
    if (isFocused) {
      setIsSubmit(false);
      setTransferAmount("");
    }
  }, [isFocused]);

  const checkSelfTransferForm = (): boolean => {
    if (!tranferFromFundDetails) {
      alert("Please select the Transfer From Fund");
      return false;
    }
    if (!tranferToFundDetails) {
      alert("Please select the Transfer To Fund");
      return false;
    }
    return true;
  }

  const startSelfTransfer = () => {
    let selfTransferObj: SelfTransferModel = {
      transferFromFundId: tranferFromFundDetails.fund_id,
      transferToFundId: tranferToFundDetails.fund_id,
      amount: Number(transferAmount),
      message: "Self Transfer of " + transferAmount + " from " + tranferFromFundDetails.fund_name + " to " + tranferToFundDetails.fund_name
    }
    startSelfTransaction(selfTransferObj);
    setIsSubmit(true);
    navigate("SelfTransferSuccessful");
  }

  return (
    <View style={styles.container}>
      <PaymentCommonHeader headerTitle={"Self Transfer"} />
      <View style={styles.cardView}>
        {/* Actual form */}
        {!isSubmit ? (
          <View style={[styles.amountView]}>
            <Dropdown
              dropDownValues={dbFundDetails}
              dropDownType={"fundDetails"}
              getTransferFromFundDetails={getTransferFromFundDetails}
              fundValuetype="transferFrom"
            />
          </View>
        ) : null}
        {!isSubmit ? (
          <View style={[styles.amountView]}>
            <Dropdown
              dropDownValues={dbFundDetails}
              dropDownType={"fundDetails"}
              getTransferToFundDetails={getTransferToFundDetails}
              fundValuetype="transferTo"
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
            value={transferAmount}
            autoFocus={true}
            onChangeText={(txt) => setTransferAmount(txt)}
          />
        </View>
        <View
          style={[
            { marginBottom: moderateVerticalScale(20) },
          ]}
        >
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.proceedToPay,
          { backgroundColor: transferAmount != "" ? "purple" : "#929292" },
        ]}
        onPress={() => {
          setModalOpen(checkSelfTransferForm());
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
              <Text style={styles.confirmAmount}>{"₹ " + transferAmount}</Text>
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
                  <Text>Transfer From</Text>
                </View>
              </View>
            </View>
            <View style={styles.bankRightView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text>{modalOpen ? tranferFromFundDetails.fund_name : ""}</Text>
                </View>
                <Text style={styles.bankAccount}>
                  {modalOpen ? tranferFromFundDetails.fund_type : ""}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text>Transfer To</Text>
                </View>
              </View>
            </View>
            <View style={styles.bankRightView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text>{modalOpen ? tranferToFundDetails.fund_name : ""}</Text>
                </View>
                <Text style={styles.bankAccount}>{modalOpen ? tranferToFundDetails.fund_type : ""}</Text>
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
          <TouchableOpacity
            style={styles.confirmPayNow}
            onPress={() => {
              setModalOpen(false);
              startSelfTransfer();
            }}
          >
            <Text style={styles.title}>{"Pay " + "₹ " + transferAmount}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default ToSelfTransfer