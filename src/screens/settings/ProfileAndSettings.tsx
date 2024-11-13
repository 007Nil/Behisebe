import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  scale,
  verticalScale,
  moderateVerticalScale,
} from "react-native-size-matters";

import { useNavigation } from "@react-navigation/native";

import CommonHeader from "../../common/CommonHeader";
import { type StackNavigation } from "../../navigation/AppNavigator";
import { getUserName } from "../../repository/UsersRepo";
const ProfileAndSettings = () => {

  const [userName, setUserName] = useState<string>("");

  useEffect(() =>{
    getUserName().then((data) => setUserName(data))
  });

  const { navigate } = useNavigation<StackNavigation>();

  return (
    <View style={styles.container}>
      <CommonHeader title={"Profile and Settings"} />

      <ScrollView>
        <View
          style={[
            styles.userInfoCard,
            {
              marginBottom: moderateVerticalScale(10),
              marginTop: moderateVerticalScale(20),
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={require("../../images/man.png")}
                style={styles.user}
              />
            </View>
            <View
              style={{
                marginLeft: moderateScale(20),
                marginTop: moderateScale(35),
              }}
            >
              <View>
                <Text style={styles.userDetails}>{userName}</Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: moderateScale(120),
                marginTop: moderateScale(35),
                justifyContent: "space-between",
              }}
            >
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigate("UpdateProfile");
                  }}>
                  <Image
                    source={require("../../images/next.png")}
                    style={{ height: scale(30), width: scale(30) }}

                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Settings area */}
        <View
          style={[
            styles.settingsArea,
            { marginBottom: moderateVerticalScale(10) },
          ]}
        >
          <Text>Settings</Text>
          <View style={styles.transferView}>
            <TouchableOpacity
              style={styles.transferTab}
              onPress={() => {
                navigate("Funds");
              }}
            >
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../../images/mobile.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Funds"}</Text>
            </TouchableOpacity>
            {/* Fund Types */}
            <TouchableOpacity
              style={styles.transferTab}
              onPress={() => {
                navigate("FundType");
              }}
            >
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../../images/mobile.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Fund Type"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.transferTab}
              onPress={() => {
                navigate("ExpesneReasons");
              }}
            >
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../../images/satellite-dish.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Expense Reason"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.transferTab}
              onPress={() => {
                navigate("CreditReasons");
              }}
            >
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../../images/bulb.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Credit Reason"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.transferTab}
              onPress={() => {
                navigate("Persons");
              }}
            >
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../../images/credit-card.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Persons"}</Text>
            </TouchableOpacity>
          </View>


        </View>
        <View
          style={[
            styles.settingsArea,
            { marginBottom: moderateVerticalScale(10) },
          ]}
        >
          <Text>Money Transfer</Text>
          <View style={styles.transferView}>
            <TouchableOpacity
              style={styles.transferTab}
              onPress={() => {
                navigate("AllCredit");
              }}
            >
              <View style={[{ backgroundColor: "white" }]}>
                <Image
                  source={require("../../images/mobile.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"All Credit"}</Text>
            </TouchableOpacity>
            {/* Fund Types */}
            <TouchableOpacity
              style={styles.transferTab}
              onPress={() => {
                navigate("AllExpense");
              }}
            >
              <View style={[{ backgroundColor: "white" }]}>
                <Image
                  source={require("../../images/mobile.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"All Expense"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileAndSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  tranferText: {
    marginTop: moderateScale(5),
    textAlign: "center",
  },
  transferTab: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  transferView: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: moderateScale(20),
  },
  settingsArea: {
    backgroundColor: "white",
    borderRadius: moderateScale(5),
    marginTop: moderateVerticalScale(10),
    alignSelf: "center",
    height: verticalScale(140),
    width: "94%",
  },
  userInfoCard: {
    width: "94%",
    height: verticalScale(95),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: moderateVerticalScale(10),
    borderRadius: moderateScale(10),
  },
  header: {
    width: "100%",
    height: verticalScale(80),
    backgroundColor: "purple",
    justifyContent: "flex-end",
  },
  header2: {
    width: "100%",
    height: verticalScale(50),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
  },
  headerLeftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  user: {
    width: scale(60),
    height: scale(60),
    marginLeft: 20,
    marginTop: 20,
  },
  flag: {
    width: scale(20),
    height: scale(20),
    position: "absolute",
    right: -moderateScale(3),
    bottom: moderateScale(0),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: "white",
  },
  userDetails: {
    color: "black",
    fontWeight: "600",
    fontSize: moderateScale(18),
  },
  dropdown: {
    width: scale(16),
    height: scale(16),
    tintColor: "white",
    marginLeft: moderateScale(5),
  },
  address: {
    color: "white",
    fontSize: moderateScale(12),
    marginTop: moderateScale(2),
  },
  icons: {
    width: scale(22),
    height: scale(22),
    tintColor: "white",
  },
});
