import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Switch,
  Image,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import Modal from "react-native-modal";

import { FlatlistStyles as styles } from "./FlatlsitStyles";

import { updateFundDetailsService } from "../services/FundDetailsServices";

import { FundDetailsModel } from "../model";
import { getFundDetailsById } from "../repository/FundDetailsRepo";
import UPIPass from "../screens/UPIPass";
import { convertToMD5 } from "../utils/AllUtils";
import { getUserPasswd } from "../repository/UsersRepo";

type AddFundFlatListProps = {
  data: FundDetailsModel[];
  screenName?: string
};


const AddFundCustomFlatList = ({ data, screenName }: AddFundFlatListProps) => {
  const [flatListData, setFlatListData] = useState<FundDetailsModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [formId, setFromId] = useState<number>(0);
  const [formEditType, setFormEditType] = useState<string>("");
  const [editAmount, setEditAmount] = useState<number>(0);
  const [accountState, setAccountState] = useState(false);
  const [creditLimit, setCreditLimit] = useState<number>(0);
  const [newCreditLimit, setNewCreditLimit] = useState<number>(0);
  const [flatListIndex, setFlatListIndex] = useState<number>(-1);
  const [upiModelVisable, setUpiModealVisable] = useState<boolean>(false);

  const [currentFundBalance, setCurrentFundBalance] = useState<number>(-1);

  const toggleSwitch = () => setAccountState((previousState) => !previousState);

  const handleModal = (clickType: string) => {
    if (clickType === "closeModal") {
      setIsModalVisible(() => !isModalVisible);
    } else {
      updateFormData();
      setIsModalVisible(() => !isModalVisible);
      alert("Data Updated");
    }
  };

  useEffect(() => {
    setFlatListData(data);
  }, [data]);

  const updateFormData = async () => {

    let tmpArray = flatListData;
    let newflatListObj: FundDetailsModel;
    const updatedArray = tmpArray.filter(function (ele) {
      return ele.fund_id !== formId;
    }
    );
    if (creditLimit) {
      const fundDetails: FundDetailsModel = await getFundDetailsById(formId);
      if (creditLimit < fundDetails.credit_limit) {
        alert("Credit Limit Can only Increase!!!");
        return;
      }
    }

    newflatListObj = {
      fund_id: formId,
      fund_name: editName,
      fund_type: formEditType,
      balance: editAmount,
      is_active: accountState,
      credit_limit: creditLimit
    };
    updateFundDetailsService(newflatListObj);
    updatedArray.splice(flatListIndex, 0, newflatListObj);
    setFlatListData(updatedArray);
  };

  const viewBalance = (item: FundDetailsModel) => {
    setCurrentFundBalance(item.balance);
    setUpiModealVisable(true);
  }
  const editForm = (item: FundDetailsModel) => {
    setIsModalVisible(true);
    setFromId(item.fund_id);
    setEditName(item.fund_name);
    setFormEditType(item.fund_type);
    setCreditLimit(item.credit_limit);
    if (item.is_active) {
      setAccountState(true);
    }
    setEditAmount(item.balance);
    setFlatListIndex(flatListData.indexOf(item));

  };

  const getPin = async (data: string) => {
    const passwdHash : string = convertToMD5(data);
    const dbPasswd : string = await getUserPasswd();
    if (passwdHash === dbPasswd){
      alert(currentFundBalance);
      setUpiModealVisable(false);
    }else{
      alert("PIN does not match");
    }


  }
  return (
    <View>
      <FlatList
        contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
        data={flatListData}
        renderItem={({ item }) => {
          return (
            <View style={styles.transactionItem}>
              <View>
                <View style={styles.topLeftView}>
                  <View style={{ marginLeft: moderateScale(10) }}>
                    <View>
                      <Text style={styles.paidTo}>{item.fund_name}</Text>
                      <Text style={styles.paidTo}>{item.fund_type}</Text>
                      <Text style={styles.paidTo}>
                        {item.is_active ? "Active" : "Inactive"}
                      </Text>
                      {screenName === "checkBalance" && item.fund_type === "Credit Card" ?
                        <Text style={styles.paidTo}>
                          {"Limit: " + item.credit_limit}
                        </Text>
                        : null}
                    </View>
                  </View>
                </View>
              </View>
              {screenName !== "checkBalance" ?
                <View style={{ alignItems: "flex-end" }}>
                  <TouchableOpacity onPress={() => editForm(item)}>
                    <Text style={styles.amount}>{"Edit"}</Text>
                  </TouchableOpacity>
                </View>
                :
                <View style={{ alignItems: "flex-end" }}>
                  <TouchableOpacity onPress={() => viewBalance(item)}>
                    <Text style={styles.amount}>{"View Balance"}</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          );
        }}
      />
      <Modal isVisible={upiModelVisable} backdropOpacity={0.2}>
        <View style={styles.mainView2}>
          <View style={styles.modalTopView}>
            <Text style={styles.payable}>Enter Pin</Text>
            <View style={styles.modalTopRightView}>
              <TouchableOpacity onPress={() => setUpiModealVisable(false)}>
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
          <UPIPass getAuthPin={getPin} />
        </View>
      </Modal>
      {screenName !== "checkBalance" ?
        <Modal isVisible={isModalVisible} backdropOpacity={0.2}>
          <View style={styles.mainView}>
            <View style={styles.modalTopView}>
              <Text style={styles.payable}>Edit Details</Text>
              <View style={styles.modalTopRightView}>
                <TouchableOpacity onPress={() => handleModal("closeModal")}>
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
                      {"Fund Name"}
                    </Text>
                  </View>
                  <TextInput
                    style={styles.bankAccount}
                    value={editName}
                    onChangeText={(name) => setEditName(name)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.bankView}>
              <View style={styles.bankLeftView}>
                <View style={{ marginLeft: moderateScale(15) }}>
                  <View style={styles.upi_view}>
                    <Text style={styles.bankAccount}>
                      {"Fund Type"}
                    </Text>
                  </View>
                  <TextInput
                    style={styles.bankAccount}
                    value={formEditType}
                    onChangeText={(type) => setFormEditType(type)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.bankView}>
              <View style={styles.bankLeftView}>
                <View style={{ marginLeft: moderateScale(15) }}>
                  <View style={styles.upi_view}>
                    <Text style={styles.bankAccount}>{"Amount"}</Text>
                  </View>
                  <TextInput
                    style={styles.bankAccount}
                    keyboardType="number-pad"
                    value={editAmount.toString()}
                    onChangeText={(amount) => setEditAmount(Number(amount))}
                  />
                </View>
              </View>
            </View>
            {creditLimit || formEditType === "Credit Card" ?
              <View style={styles.bankView}>
                <View style={styles.bankLeftView}>
                  <View style={{ marginLeft: moderateScale(15) }}>
                    <View style={styles.upi_view}>
                      <Text style={styles.bankAccount}>{"Limit"}</Text>
                    </View>
                    <TextInput
                      style={styles.bankAccount}
                      keyboardType="number-pad"
                      value={creditLimit.toString()}
                      onChangeText={(amount) => setCreditLimit(Number(amount))}
                    />
                  </View>
                </View>
              </View>
              : null}

            <View style={styles.bankView}>
              <View style={styles.bankLeftView}>
                <View style={{ marginLeft: moderateScale(15) }}>
                  <View style={styles.upi_view}>
                    <Text style={styles.bankAccount}>{"Fund Status"}</Text>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={accountState ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={accountState}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.confirmPayNow} onPress={() => handleModal("")}>
              <Text style={styles.title}>{"Update Details"}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        : null}
    </View>
  );
};

export default AddFundCustomFlatList;

