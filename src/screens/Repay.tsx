import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native'
import HomeCommonHeader from "../common/HomeCommonHeader";
import { type StackNavigation } from "../navigation/AppNavigator";
import { ExpenseModel, FundDetailsModel, MoneyRepayModel } from '../model';
import { getMoneyRepayDetailsService, updateLendMoneyDetailsService } from '../services/MoneyReplayServices';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import Modal from "react-native-modal";
import usePrevious from '../utils/usePrevious';
import { getValidFundDetailsService } from '../services/FundDetailsServices';
import { Dropdown } from '../component';
const Repay = () => {
  const { navigate } = useNavigation<StackNavigation>();

  const [btnPressValue, setBtnPressValue] = useState<string>("");
  const [dbMoneyReplayDetails, setDbMoneyReplayDetails] = useState<MoneyRepayModel[]>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [personName, setPersonName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [fundName, setFundName] = useState<string>("");
  const [lendOnDate, setLendOnDate] = useState<string>("");
  const [alreadyPaid, setAlreadyPaid] = useState<number>(0);
  const [payNow, setPayNow] = useState<number>(0);
  const [expenseId, setExpenseId] = useState<number>(0);
  const [creditId, setCreditId] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [formId, setFromId] = useState<number>(0);
  const [flatListIndex, setFlatListIndex] = useState<number>(-1);
  const [dbFundDetails, setDbFundDetails] = useState<FundDetailsModel[]>();
  const [fundetails, setFundDetails] = useState<FundDetailsModel>();

  const prevAlreadyPay: number = usePrevious(alreadyPaid);


  useEffect(() => {
    getValidFundDetailsService().then((data) => setDbFundDetails(data));
  }, []);

  const getBorrowMoneyInfo = () => {
    setBtnPressValue("getBorrowInfo");
  }

  const getMoneyLendInfo = async () => {
    setBtnPressValue("getLendInfo");
    setDbMoneyReplayDetails(await getMoneyRepayDetailsService("getLendInfo"))
  }

  const viewDetails = (item: MoneyRepayModel) => {
  }
  const updateData = (item: MoneyRepayModel) => {
    setFromId(btnPressValue === "getLendInfo" ? item.expense_id : 0);
    setPersonName(item.personName);
    setAmount(item.amount);
    setFundName(item.fundName);
    setLendOnDate(item.date);
    setAlreadyPaid(item.paid_amount);
    setExpenseId(item.expense_id);
    setCreditId(item.credit_id);
    setMessage(item.message);
    setFlatListIndex(dbMoneyReplayDetails.indexOf(item));
    setIsModalVisible(true);


  }

  const handleModal = () => {
    updateFormData();
    setIsModalVisible(() => !isModalVisible);
    alert("Data Updated");
  }

  const getFundDetails = async (fundDetails: FundDetailsModel) => {
    setFundDetails(fundDetails);
  };

  const updateFormData = async () => {
    let tmpFlatlistData = dbMoneyReplayDetails;
    const updatedArray = tmpFlatlistData.filter(function (ele) {
      return btnPressValue === "getLendInfo" ? ele.expense_id !== formId : [];
    }
    );
    let newRepayDate: MoneyRepayModel = {
      expense_id: expenseId,
      credit_id: creditId,
      amount: amount,
      paid_amount: prevAlreadyPay + payNow,
      date: btnPressValue === "getLendInfo" ? lendOnDate : "",
      fundName: fundName,
      personName: personName,
      message: message,
      transaction_fund_id: fundetails.fund_id
    }
    await updateLendMoneyDetailsService(newRepayDate);
    updatedArray.splice(flatListIndex, 0, newRepayDate);
    setDbMoneyReplayDetails(updatedArray);
  }

  return (
    <View style={styles.container}>
      <HomeCommonHeader title={"Replay"} />
      <View style={styles.container}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ padding: 10 }}>
            <Button onPress={getBorrowMoneyInfo} title="Borrow Money Details" />
          </View>
          <View style={{ padding: 10 }}>
            <Button onPress={getMoneyLendInfo} title="Lend Money Details" />
          </View>
        </View>
        <View style={styles.card}>
          <View style={{ height: '80%' }}>
            <FlatList
              contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
              data={dbMoneyReplayDetails}
              renderItem={({ item }) => {
                return (
                  <View style={styles.transactionItem}>
                    <View>
                      <View style={styles.topLeftView}>
                        <View style={{ marginLeft: moderateScale(10) }}>
                          <View>
                            <Text style={styles.paidTo}>{"Money Lend To"}</Text>
                            <Text style={styles.paidTo}>{item.personName}</Text>
                            <Text style={styles.paidTo}>{"Amount"}</Text>
                            <Text style={styles.paidTo}>{item.amount}</Text>
                            <Text style={styles.paidTo}>{"Date"}</Text>
                            <Text style={styles.paidTo}>{item.date}</Text>
                            <Text style={styles.paidTo}>{"Already paid"}</Text>
                            <Text style={styles.paidTo}>{item.paid_amount}</Text>
                            {item.message !== "" ?
                              <View>
                                <Text style={styles.paidTo}>{"Message"}</Text>
                                <Text style={styles.paidTo}>{item.message}</Text>
                              </View> : null
                            }

                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{ alignItems: "flex-end", padding: 10 }}>
                      <TouchableOpacity onPress={() => viewDetails(item)}>
                        <Text style={styles.amount}>{"View Details"}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => updateData(item)}>
                        <Text style={styles.amount}>{"Update Data"}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          <Modal isVisible={isModalVisible} backdropOpacity={0.2}>
            <View style={styles.mainView}>
              <View style={styles.modalTopView}>
                <Text style={styles.payable}>Edit Details</Text>
                <View style={styles.modalTopRightView}>
                  <TouchableOpacity onPress={handleModal}>
                    <Image
                      source={require("../images/close.png")}
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
                      <Text style={styles.bankAccount}>
                        {"Person Name"}
                      </Text>
                    </View>
                    <TextInput
                      style={styles.bankAccount}
                      value={personName}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.bankView}>
                <View style={styles.bankLeftView}>
                  <View style={{ marginLeft: moderateScale(15) }}>
                    <View style={styles.upi_view}>
                      <Text style={styles.bankAccount}>
                        {"Lend Amount"}
                      </Text>
                    </View>
                    <TextInput
                      style={styles.bankAccount}
                      value={amount.toString()}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.bankView}>
                <View style={styles.bankLeftView}>
                  <View style={{ marginLeft: moderateScale(15) }}>
                    <View style={styles.upi_view}>
                      <Text style={styles.bankAccount}>
                        {"Fund Name"}
                      </Text>
                    </View>
                    <TextInput
                      style={styles.bankAccount}
                      value={fundName}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.bankView}>
                <View style={styles.bankLeftView}>
                  <View style={{ marginLeft: moderateScale(15) }}>
                    <View style={styles.upi_view}>
                      <Text style={styles.bankAccount}>
                        {"Lend On Date"}
                      </Text>
                    </View>
                    <TextInput
                      style={styles.bankAccount}
                      value={lendOnDate}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.bankView}>
                <View style={styles.bankLeftView}>
                  <View style={{ marginLeft: moderateScale(15) }}>
                    <View style={styles.upi_view}>
                      <Text style={styles.bankAccount}>
                        {"Already Paid"}
                      </Text>
                    </View>
                    <TextInput
                      style={styles.bankAccount}
                      value={alreadyPaid.toString()}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.bankView}>
                <View style={styles.bankLeftView}>
                  <View style={{ marginLeft: moderateScale(15) }}>
                    <View style={styles.upi_view}>
                      <Text style={styles.bankAccount}>
                        {"Select Fund"}
                      </Text>
                    </View>
                    <Dropdown
                      dropDownValues={dbFundDetails}
                      dropDownType={"fundDetails"}
                      getFundDetails={getFundDetails}
                      fundValuetype="getFundDetails" />
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
                      // value={editAmount.toString()}
                      onChangeText={(amount) => setPayNow(Number(amount))}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.confirmPayNow} onPress={handleModal}>
                <Text style={styles.title}>{"Update Details"}</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  )
}

export default Repay