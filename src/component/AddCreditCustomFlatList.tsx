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
  scale
} from "react-native-size-matters";
import Modal from "react-native-modal";

import { FlatlistStyles as styles } from "./FlatlsitStyles";

import { updateCreditReasonService } from "../services/CreditDetailsServices";

import { CreditReasonModel } from "../model";

interface CreditReasonCustomFlatListProps {
  data: CreditReasonModel[];
};


const AddCreditCustomFlatList = ({ data }: CreditReasonCustomFlatListProps) => {
  const [flatListData, setFlatListData] = useState<CreditReasonModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [editType, setEditType] = useState<string>("");
  const [formId, setFromId] = useState<number>(0);
  const [flatListIndex, setFlatListIndex] = useState<number>(-1);

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
    let newflatListObj: CreditReasonModel;
    const updatedArray = tmpArray.filter(function (ele) {
      return ele.credit_reason_id !== formId;
    });

    newflatListObj = {
      credit_reason_id: formId,
      credit_reason_name: editName,
      credit_reason_catagory: editType,
    };
    // console.log(newflatListObj);
    updateCreditReasonService(newflatListObj)
    updatedArray.splice(flatListIndex, 0, newflatListObj);
    setFlatListData(updatedArray);
  };

  const editForm = (item: CreditReasonModel) => {
    setIsModalVisible(true);
    setFromId(item.credit_reason_id);
    setEditName(item.credit_reason_name);
    setEditType(item.credit_reason_catagory);

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
                      <Text style={styles.paidTo}>{item.credit_reason_name}</Text>
                      <Text style={styles.paidTo}>{item.credit_reason_catagory}</Text>
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
                    {"credit Name"}
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
                    {("credit Reason Type")}
                  </Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  value={editType}
                  onChangeText={(type) => setEditType(type)}
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

export default AddCreditCustomFlatList;
