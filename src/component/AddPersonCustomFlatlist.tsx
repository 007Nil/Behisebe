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
  
  import { updatePersonService } from "../services/PersonDetailsServices";
  
  import { PersonModel } from "../model";
  
  interface PersonCustomFlatListProps {
    data: PersonModel[];
  };
  
  
  const AddPersonCustomFlatList = ({ data }: PersonCustomFlatListProps) => {
    const [flatListData, setFlatListData] = useState<PersonModel[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>("");
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
      let newflatListObj: PersonModel;
      const updatedArray = tmpArray.filter(function (ele) {
        return ele.person_id !== formId;
      });
  
      newflatListObj = {
        person_id: formId,
        person_name: editName
      };
      updatePersonService(newflatListObj)
      updatedArray.splice(flatListIndex, 0, newflatListObj);
      setFlatListData(updatedArray);
    };
  
    const editForm = (item: PersonModel) => {
      setIsModalVisible(true);
      setFromId(item.person_id);
      setEditName(item.person_name);
  
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
                        <Text style={styles.paidTo}>{item.person_name}</Text>
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
            <TouchableOpacity style={styles.confirmPayNow} onPress={handleModal}>
              <Text style={styles.title}>{"Update Details"}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default AddPersonCustomFlatList;
  