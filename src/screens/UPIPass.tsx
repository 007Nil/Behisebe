import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import {
    moderateScale,
    moderateVerticalScale,
    scale,
    verticalScale,
} from 'react-native-size-matters';

type upiPassProps = {
    getAuthPin(pin : string): void
}

const UPIPass = ({getAuthPin}: upiPassProps) => {

    const [pin, setPin] = useState<string>('');

    const getPin = () => {
        if (pin.length < 4) {
            alert("Pin is atleast 4 digit long");
            return;
        } else {
            getAuthPin(pin);
        }

    }
    return (
        <View style={styles.contauiner}>

            <View style={styles.secondView}>
                <View>

                </View>
                <View style={styles.secondRightView}>

                </View>
            </View>


            <Text style={styles.title}>ENTER 4-DIGIT UPI PIN</Text>
            <View style={styles.pinView}>
                <View
                    style={{
                        width: scale(14),
                        height: scale(14),
                        borderRadius: scale(7),
                        borderWidth: 0.5,
                        backgroundColor: pin.length == 1 || pin.length == 2 || pin.length == 3 || pin.length == 4 ? 'black' : 'white',
                    }}></View>
                <View
                    style={{
                        width: scale(14),
                        height: scale(14),
                        borderRadius: scale(7),
                        borderWidth: 0.5,
                        marginLeft: moderateScale(20),
                        backgroundColor: pin.length == 2 || pin.length == 3 || pin.length == 4 ? 'black' : 'white',
                    }}></View>
                <View
                    style={{
                        width: scale(14),
                        height: scale(14),
                        borderRadius: scale(7),
                        borderWidth: 0.5,
                        marginLeft: moderateScale(20),
                        backgroundColor: pin.length == 3 || pin.length == 4 ? 'black' : 'white',
                    }}></View>
                <View
                    style={{
                        width: scale(14),
                        height: scale(14),
                        borderRadius: scale(7),
                        borderWidth: 0.5,
                        marginLeft: moderateScale(20),
                        backgroundColor: pin.length == 4 ? 'black' : 'white',
                    }}></View>
            </View>
            <View style={styles.numberPad}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '1');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '2');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '3');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '4');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '5');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '6');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '7');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '8');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '9');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity activeOpacity={1} style={styles.numberPadBtn}
                        onPress={() => {
                            let newPin = pin.substring(0, pin.length - 1)
                            setPin(newPin)
                        }}>
                        <Image
                            source={require('../images/clear.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.numberPadBtn}
                        onPress={() => {
                            if (pin.length < 4) {
                                setPin(pin + '0');
                            }
                        }}>
                        <Text style={{ color: 'black', fontSize: moderateScale(25) }}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.numberPadBtn} onPress={getPin}>
                        <Text style={{ color: 'black', fontSize: moderateScale(16) }}>
                            SUBMIT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default UPIPass;
const styles = StyleSheet.create({
    contauiner: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: verticalScale(80),
        justifyContent: 'flex-end',
    },
    subHeader: {
        width: '100%',
        height: verticalScale(60),
        justifyContent: 'center',
        borderBottomWidth: 0.4,
        borderBottomColor: '#929292',
    },
    numberPad: {
        width: '100%',
        position: 'absolute',
        bottom: moderateVerticalScale(30),
    },
    icon: {
        width: scale(22),
        height: scale(22),
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: moderateScale(20),
        paddingRight: moderateScale(20),
        marginTop: moderateVerticalScale(20),
    },
    bankName: {
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    account: {
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
    logo: {
        width: scale(60),
        height: scale(50),
        resizeMode: 'contain',
    },
    secondView: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    secondRightView: {
        alignItems: 'flex-end',
    },
    title: {
        alignSelf: 'center',
        marginTop: moderateVerticalScale(70),
        fontSize: 18,
        fontWeight: '600',
    },
    pinView: {
        marginTop: moderateScale(30),
        alignSelf: 'center',
        flexDirection: 'row',
    },
    numberPadBtn: {
        width: '33%',
        height: verticalScale(45),
        borderWidth: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
