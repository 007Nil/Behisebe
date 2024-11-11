import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface CommonHeaderProps {
  title: string
}


const CommonHeader = ({title}: CommonHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.header2}>
        <View style={styles.headerLeftView}>
          <TouchableOpacity>
            <View>
 
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: moderateScale(10) }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.home}>{title}</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRightView}>
          <Image source={require("../images/help.png")} style={styles.icons} />
        </View>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
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
  home: {
    fontSize: moderateScale(18),
    color: "white",
    fontWeight: "600",
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
