import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  TextInput,
} from "react-native";
import { React, useState, useEffect } from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import Modal from "react-native-modal";
// import {
//   getFundDetailsById,
//   updateFundDetails,
// } from "../repositories/FundRepo";

// import { updateExpenseReason } from "../services/ExpenseReasonService";
// import { updateCreditReasonService } from "../services/CreditReasonServices";
// import { updatePersonDetails } from "../repositories/PersonRepo";

const CustomFlatList = (props) => {
  const [flatListData, setFlatListData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formId, setFormId] = useState("");
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [accountState, setAccountState] = useState(false);
  const [flatListIndex, setFlatListIndex] = useState(-1);

  const toggleSwitch = () => setAccountState((previousState) => !previousState);

  const handleModal = () => {
    updateFormData();
    setIsModalVisible(() => !isModalVisible);
    alert("Data Updated")
  };

  useEffect(() => {
    setFlatListData(props.data);
  }, [props.data]);

  const updateFormData = () => {
    // let tmpArray = flatListData;
    // const updatedArray = tmpArray.filter(function (ele) {
    //   return ele._id !== formId;
    // });
    // if (props.flatLisyType === "fundDetails") {
    //   newflatListObj = {
    //     _id: formId,
    //     fund_name: editName,
    //     fund_type: editType,
    //     balance: editAmount,
    //     is_active: accountState,
    //   };
    //   updateFundDetails(newflatListObj);
    // } else if (props.flatLisyType === "expenseReasonDetails") {
    //   newflatListObj = {
    //     _id: formId,
    //     expense_reason: editName,
    //     expense_category: editType,
    //   };
    //   updateExpenseReason(newflatListObj);
    // } else if (props.flatLisyType === "creditReasonDetails") {
    //   newflatListObj = {
    //     _id: formId,
    //     credit_reason: editName,
    //     credit_category: editType,
    //   };
    //   updateCreditReasonService(newflatListObj);
    // }else if (props.flatLisyType === "personDetails") {
    //   newflatListObj = {
    //     _id: formId,
    //     person_name: editName
    //   };
    //   updatePersonDetails(newflatListObj);
    // }
    // updatedArray.splice(flatListIndex, 0, newflatListObj);
    // setFlatListData(updatedArray);
  };

  const editForm = (item) => {
    // setIsModalVisible(true);
    // flatListData.forEach(async (element) => {
    //   if (element._id == item._id) {
    //     setFormId(item._id);
    //     if (props.flatLisyType === "fundDetails") {
    //       setEditName(item.fund_name);
    //       setEditType(item.fund_type);
    //       setAccountState(item.is_active);
    //       let fund_details = await getFundDetailsById(item._id);
    //       setEditAmount(fund_details.balance.toString());
    //     } else if (props.flatLisyType === "expenseReasonDetails") {
    //       setEditName(item.expense_reason);
    //       setEditType(item.expense_category);
    //     } else if (props.flatLisyType === "creditReasonDetails") {
    //       setEditName(item.credit_reason);
    //       setEditType(item.credit_category);
    //     }else if (props.flatLisyType === "personDetails") {
    //       setEditName(item.person_name);
    //     }
    //     setFlatListIndex(flatListData.indexOf(item));
    //   }
    // });
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
        data={flatListData}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.transactionItem}>
              <View>
                <View style={styles.topLeftView}>
                  <View style={{ marginLeft: moderateScale(10) }}>
                    {props.flatLisyType === "fundDetails" ? (
                      <View>
                        <Text style={styles.paidTo}>{item.fund_name}</Text>
                        <Text style={styles.paidTo}>{item.fund_type}</Text>
                        <Text style={styles.paidTo}>
                          {item.is_active ? "Active" : "Not Active"}
                        </Text>
                      </View>
                    ) : null}

                    {props.flatLisyType === "expenseReasonDetails" ? (
                      <View>
                        <Text style={styles.paidTo}>
                          Name: {item.expense_reason}
                        </Text>
                        <Text style={styles.paidTo}>
                          Type: {item.expense_category}
                        </Text>
                      </View>
                    ) : null}

                    {props.flatLisyType === "creditReasonDetails" ? (
                      <View>
                        <Text style={styles.paidTo}>
                          Name: {item.credit_reason}
                        </Text>
                        <Text style={styles.paidTo}>
                          Type: {item.credit_category}
                        </Text>
                      </View>
                    ) : null}

                    {props.flatLisyType === "personDetails" ? (
                      <View>
                        <Text style={styles.paidTo}>
                          Name: {item.person_name}
                        </Text>
                      </View>
                    ) : null}
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
          {props.edit_type == "Fund" || props.edit_type == "Expense Reason" || props.edit_type == "Credit Reason" || props.edit_type == "Person"  ? (
            <View style={styles.bankView}>
              <View style={styles.bankLeftView}>
                <View style={{ marginLeft: moderateScale(15) }}>
                  <View style={styles.upi_view}>
                    <Text style={styles.bankAccount}>
                      {props.edit_type.concat(" Name")}
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
          ) : (
           null
          )}
          {props.edit_type == "Fund" || props.edit_type == "Expense Reason" || props.edit_type == "Credit Reason" ? (
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>
                    {props.edit_type.concat(" Type")}
                  </Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  value={editType}
                  onChangeText={(type) => setEditType(type)}
                />
              </View>
            </View>
          </View>) : ( null)}

          {props.edit_type == "Fund" ? (
            <View style={styles.bankView}>
              <View style={styles.bankLeftView}>
                <View style={{ marginLeft: moderateScale(15) }}>
                  <View style={styles.upi_view}>
                    <Text style={styles.bankAccount}>{"Amount / Limit"}</Text>
                  </View>
                  <TextInput
                    style={styles.bankAccount}
                    keyboardType="number-pad"
                    value={editAmount}
                    onChangeText={(amount) => setEditAmount(amount)}
                  />
                </View>
              </View>
            </View>
          ) : (
            ""
          )}
          {props.edit_type == "Fund" ? (
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
          ) : (
            ""
          )}
          <TouchableOpacity style={styles.confirmPayNow} onPress={handleModal}>
            <Text style={styles.title}>{"Update Details"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CustomFlatList;

const styles = StyleSheet.create({
  filtersView: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateVerticalScale(15),
    flexDirection: "row",
    alignSelf: "center",
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
  paidTo: {
    color: "black",
    fontSize: moderateScale(16),
  },
  amount: {
    marginTop: scale(15),
    fontWeight: "400",
    fontSize: 15,
  },
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
    height: "70%",
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
  backIcon: {
    width: scale(24),
    height: scale(24),
    tintColor: "white",
  },
  title: {
    color: "white",
    fontSize: moderateScale(20),
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
  modaView: {
    margin: 0,
  },
  mainView: {
    backgroundColor: "white",
    width: "100%",
    position: "absolute",
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