import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { React, useState, useEffect } from "react";
import { moderateScale, scale } from "react-native-size-matters";

const styles = require("./styles");

import CommonHeader from "../../common/CommonHeader";
import Modal from "react-native-modal";
import { CustomFlatList, CustomButton } from "../../component";

import {
  getAllPersonsService,
  savePersonDetailsService,
} from "../../services/PersonService";

const Persons = () => {
  const [personData, setPersonData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [personName, setPersonName] = useState("");
  const getModalopen = (modelState) => {
    setModalOpen(modelState);
  };
  useEffect(() => {
    getAllPersonsService().then((data) => setPersonData(data));
  }, []);
  const resetState = () => {
    setModalOpen("");
    setModalOpen(false);
  };
  const addPerson = () => {
    if (personName === "") {
      alert("Please Add Person Name");
      return;
    }
    let id = (Math.random() + 1).toString(36).substring(7);
    let personObj = {
      _id: id,
      person_name: personName,
    };
    savePersonDetailsService(personObj);
    let newPersonData = [...personData, personObj];
    setPersonData(newPersonData);
    resetState();
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={"Person Settings"} />
      <View style={styles.searchBox}>
        <Image
          source={require("../../images/search.png")}
          style={styles.search}
        />
        <Text style={styles.searchText}>Search by Person Name</Text>
      </View>
      <View style={styles.card}>
        <CustomFlatList
          data={personData}
          flatLisyType={"personDetails"}
          edit_type={"Person"}
        />
      </View>
      <CustomButton pressEvent={"addPerson"} getModalopen={getModalopen} />
      <Modal
        isVisible={modalOpen}
        backdropOpacity={0.2}
        style={styles.modaView}
      >
        <View style={styles.mainView}>
          <View style={styles.modalTopView}>
            <Text style={styles.payable}>Person Details</Text>
            <View style={styles.modalTopRightView}>
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
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Person Name"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(pName) => setPersonName(pName)}
                  value={personName}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.confirmPayNow} onPress={addPerson}>
            <Text style={styles.title}>{"Add Person"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Persons;
