import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";

const CustomFlatList = (props) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
        // keyExtractor={ item}
        data={props.data}
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
                    ) : 
                      ""
                    }
                  </View>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity>
                  <Text style={styles.amount}>{"Edit"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
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
  }
});
