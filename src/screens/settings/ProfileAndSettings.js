import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import {
  moderateScale,
  scale,
  verticalScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const ProfileAndSettings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header2}>
          <View style={styles.headerLeftView}>
            <TouchableOpacity>
              <View>
                <Image
                  source={require("../../images/left.png")}
                  style={styles.leftIcon}
                />
              </View>
            </TouchableOpacity>
            <View style={{ marginLeft: moderateScale(10) }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.home}>Profile and Settings</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRightView}>
            <Image
              source={require("../../images/help.png")}
              style={styles.icons}
            />
          </View>
        </View>
      </View>
      {/* End of Header..... */}

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
                <Text style={styles.userDetails}>sagniks</Text>
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
                <TouchableOpacity>
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
            styles.rechargeAndBills,
            { marginBottom: moderateVerticalScale(10) },
          ]}
        >
          <Text style={styles.heading}>Recharge & Pay Bills</Text>
          <View style={styles.transferView}>
            <TouchableOpacity style={styles.transferTab}>
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
              <Text style={styles.tranferText}>{"Mobile Recharge"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
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
              <Text style={styles.tranferText}>{"DTH"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
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
              <Text style={styles.tranferText}>{"Electricity"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
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
              <Text style={styles.tranferText}>{"Credit Card\nPayment"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileAndSettings;

const styles = StyleSheet.create({
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
  rechargeAndBills: {
    backgroundColor: "white",
    borderRadius: moderateScale(5),
    marginTop: moderateVerticalScale(10),
    alignSelf: "center",
    height: verticalScale(200),
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
  leftIcon: {
    width: scale(30),
    height: scale(30),
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
  home: {
    fontSize: moderateScale(18),
    color: "white",
    fontWeight: "600",
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
  headerRightView: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    width: scale(22),
    height: scale(22),
    tintColor: "white",
  },
});
