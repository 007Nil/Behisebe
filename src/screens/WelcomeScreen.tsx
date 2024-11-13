import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
// import {IMAGES} from '../imag';
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from './LoginScreen';

const sliders = [
  {
    key: 'one',
    title: 'Welcome to Behisebi',
    text: 'Description.\nThis is a simple application that will help \n you to manage your buget \n more Efficiently',
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Let\'s be Hisebi',
    text: 'If you are new user please click on "check sign" to Register. \n This is a one time activity\n (All info is stored in your phone storage)',
    backgroundColor: '#febe29',
  },
];

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        {item.key === "one" ?
          <Image style={styles.image} source={require("../../src/images/2.jpg")} />
          :
          <Image style={styles.image} source={require("../../src/images/3.jpg")} />}
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  _isDone = () => {
    this.setState({
      showRealApp: true,
    });
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  render() {
    if (this.state.showRealApp) {
      return (
        <LoginScreen />
      );
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          data={sliders}
          onDone={this._isDone}
          renderNextButton={this._renderNextButton}
          renderDoneButton={this._renderDoneButton}
        />
      );
    }
  }

}

export default WelcomeScreen

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hsla(0, 100%, 50%, 0.1);',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});