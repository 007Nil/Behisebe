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

import {FlatlistStyles as styles} from "./FlatlsitStyles";

import { updateFundDetailsService } from "../services/FundDetailsServices";

import { FundDetailsModel } from "../model";

type AddFundFlatListProps = {
  data: FundDetailsModel[];
};


const AddFundCustomFlatList = ({ data }: AddFundFlatListProps) => {
  const [flatListData, setFlatListData] = useState<FundDetailsModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [formId, setFromId] = useState<number>(0);
  const [formEditType, setFormEditType] = useState<string>("");
  const [editAmount, setEditAmount] = useState<number>(0);
  const [accountState, setAccountState] = useState(false);
  const [flatListIndex, setFlatListIndex] = useState<number>(-1);

  const toggleSwitch = () => setAccountState((previousState) => !previousState);

  const handleModal = () => {
    updateFormData();
    setIsModalVisible(() => !isModalVisible);
    alert("Data Updated");
  };

  useEffect(() => {
    setFlatListData(data);
  }, [data]);

  const updateFormData = () => {

    let tmpArray = flatListData;
    let newflatListObj: FundDetailsModel;
    const updatedArray = tmpArray.filter(function (ele) {
      return ele.fund_id !== formId;
    }
    );

    newflatListObj = {
      fund_id: formId,
      fund_name: editName,
      fund_type: formEditType,
      balance: editAmount,
      is_active: accountState,
    }
    updateFundDetailsService(newflatListObj);

    // } else if (flatLisyType === "expenseReasonDetails") {
    //   newflatListObj = {
    //     _id: formId,
    //     expense_reason: editName,
    //     expense_category: editType,
    //   };
    //   updateExpenseReason(newflatListObj);
    // } else if (flatLisyType === "creditReasonDetails") {
    //   newflatListObj = {
    //     _id: formId,
    //     credit_reason: editName,
    //     credit_category: editType,
    //   };
    //   updateCreditReasonService(newflatListObj);
    // }else if (flatLisyType === "personDetails") {
    //   newflatListObj = {
    //     _id: formId,
    //     person_name: editName
    //   };
    //   updatePersonDetails(newflatListObj);
    // }
    updatedArray.splice(flatListIndex, 0, newflatListObj);
    setFlatListData(updatedArray);
  };

  const editForm = (item: FundDetailsModel) => {
    setIsModalVisible(true);
    // console.log(item);


    setFromId(item.fund_id);
    setEditName(item.fund_name);
    setFormEditType(item.fund_type);
    if (item.is_active) {
      setAccountState(true);
    }
    setEditAmount(item.balance);

    // } else if (flatLisyType === "expenseReasonDetails") {
    //   setEditName(item.expense_reason);
    //   setEditType(item.expense_category);
    // } else if (flatLisyType === "creditReasonDetails") {
    //   setEditName(item.credit_reason);
    //   setEditType(item.credit_category);
    // }else if (flatLisyType === "personDetails") {
    //   setEditName(item.person_name);
    // }
    setFlatListIndex(flatListData.indexOf(item));

  };

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
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity onPress={() => editForm(item)}>
                  <Text style={styles.amount}>{"Edit"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
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
                  <Text style={styles.bankAccount}>{"Amount / Limit"}</Text>
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
          <TouchableOpacity style={styles.confirmPayNow} onPress={handleModal}>
            <Text style={styles.title}>{"Update Details"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AddFundCustomFlatList;

