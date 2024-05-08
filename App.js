import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { scale, verticalScale } from "react-native-size-matters";

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      <View style={[styles.bottomNav]}>
        <View style={styles.bottomNav2}>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(0);
            }}
          >
            <View
              style={[
                styles.tabIconBg,
                { backgroundColor: selectedTab == 0 ? "purple" : "#bdbdbd" },
              ]}
            >
              <Image
                source={require("./src/images/smart.png")}
                style={styles.tabIcon}
              />
            </View>
            <Text style={{ color: selectedTab == 0 ? "purple" : "#bdbdbd" }}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(1);
            }}
          >
            <View
              style={[
                styles.tabIconBg,
                { backgroundColor: selectedTab == 1 ? "purple" : "#bdbdbd" },
              ]}
            >
              <Image
                source={require("./src/images/store.png")}
                style={styles.tabIcon}
              />
            </View>
            <Text style={{ color: selectedTab == 1 ? "purple" : "#bdbdbd" }}>
              Stores
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(2);
            }}
          >
            <View
              style={[
                styles.tabIconBg,
                { backgroundColor: selectedTab == 2 ? "purple" : "#9e9e9e" },
              ]}
            >
              <Image
                source={require("./src/images/insurance.png")}
                style={styles.tabIcon}
              />
            </View>
            <Text style={{ color: selectedTab == 2 ? "purple" : "#bdbdbd" }}>
              Insurance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(3);
            }}
          >
            <View
              style={[
                styles.tabIconBg,
                { backgroundColor: selectedTab == 3 ? "purple" : "#9e9e9e" },
              ]}
            >
              <Image
                source={require("./src/images/rupee.png")}
                style={styles.tabIcon}
              />
            </View>
            <Text style={{ color: selectedTab == 3 ? "purple" : "#bdbdbd" }}>
              Wealth
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(4);
            }}
          >
            <View
              style={[
                styles.tabIconBg,
                { backgroundColor: selectedTab == 4 ? "purple" : "#9e9e9e" },
              ]}
            >
              <Image
                source={require("./src/images/transaction.png")}
                style={styles.tabIcon}
              />
            </View>
            <Text style={{ color: selectedTab == 4 ? "purple" : "#bdbdbd" }}>
              Histoy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bottomNav: {
    width: "100%",
    height: verticalScale(60),
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },
  bottomNav2: {
    width: "100%",
    height: verticalScale(55),
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomTab: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: "white",
  },
  tabIconBg: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    justifyContent: "center",
    alignItems: "center",
  },
});
