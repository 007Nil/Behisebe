import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
  } from 'react-native';
  import React from 'react';
  import {
    moderateScale,
    moderateVerticalScale,
    scale,
    verticalScale,
  } from 'react-native-size-matters';
  import { useNavigation } from '@react-navigation/native';
  
  const QrCodeScanner = () => {
    const navigation=useNavigation()
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <TouchableOpacity style={styles.backBtn}>
              <Image
                source={require('../images/left.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Scan & Pay</Text>
            <TouchableOpacity style={styles.backBtn}>
              <Image
                source={require('../images/help.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.options}>
          <Image
            source={require('../images/photo.png')}
            style={styles.backIcon}
          />
          <Image
            source={require('../images/no-flash.png')}
            style={[styles.backIcon, {marginLeft: 30}]}
          />
        </View>
        <View style={styles.recentList}>
          <Text
            style={[
              styles.title,
              {marginLeft: moderateScale(20), fontWeight: '600'},
            ]}>
            Recents
          </Text>
          <View>
            <FlatList
             horizontal
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{marginBottom:moderateVerticalScale(20),marginTop:moderateVerticalScale(20)}}
              data={[1, 1, , 1, 1, 1]}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.recentItem}>
                    <TouchableOpacity style={styles.nameView} onPress={()=>{
  navigation.navigate("PayNow")
                    }}>
                      <Text style={styles.nameChar}>{index==0?"A":index==1?"B":"C"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.name}>{"Ankit"}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  
  export default QrCodeScanner;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,.5)',
    },
    header: {
      width: '100%',
      height: verticalScale(85),
      backgroundColor: 'purple',
      justifyContent: 'flex-end',
    },
    subHeader: {
      width: '100%',
      height: verticalScale(50),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: moderateScale(10),
      paddingRight: moderateScale(15),
    },
    backBtn: {
      width: scale(50),
      height: scale(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    backIcon: {
      width: scale(24),
      height: scale(24),
      tintColor: 'white',
    },
    title: {
      color: 'white',
      fontSize: moderateScale(20),
    },
    options: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: moderateVerticalScale(30),
    },
    recentList: {
      position: 'absolute',
      bottom: 10,
    },
    nameView: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(25),
      backgroundColor: 'yellow',
      justifyContent:'center',
      alignItems:'center'
    },
    recentItem:{
      marginLeft:moderateScale(20),
      alignItems:'center'
    },
    nameChar:{
      fontSize:30,
      fontWeight:'600',
      color:'black',
      
    },
    name:{
      marginTop:moderateVerticalScale(5),
      color:'white',
      fontWeight:'600',
      fontSize:18
    }
  });