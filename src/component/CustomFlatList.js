import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  TextInput
} from "react-native";
import { React, useState, useEffect } from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import Modal from "react-native-modal";

const CustomFlatList = (props) => {
  const [flatListData, setFlatListData] = useState(props.data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  useEffect(() => {
    setFlatListData(props.data);
  }, [props.data]);

  const editForm = (item) => {
    setIsModalVisible(true)
    // flatListData.forEach((element) => {
    //   if (element._id == item._id) {
    //     let tmpArray = flatListData;
    //     const updatedArray = tmpArray.filter(function (ele) {
    //       return ele._id !== item._id;
    //     });

    //     newflatListObj = {
    //       _id: item._id,
    //       fund_name: "adadadad",
    //       fund_type: "adadadad",
    //       balance: "5000",
    //       is_active: true,
    //     };
    //     updatedArray.splice(tmpArray.indexOf(item), 0, newflatListObj);
    //     setFlatListData(updatedArray);
    //   }
    // });
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
        // keyExtractor={ item}
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
                        <Text style={styles.paidTo}>Type: {item.category}</Text>
                      </View>
                    ) : (
                      ""
                    )}
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
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
                  <Text style={styles.bankAccount}>{"Fund Name"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
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
                 
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmPayNow}>
            <Text style={styles.title}>{"Add Fund"}</Text>
          </TouchableOpacity>
        </View>
          <Button title="Hide modal" onPress={handleModal} />
          </View>
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
});
