import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Header: React.FC = () => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('Home');
  };

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.textLogo1}>Big Game</Text>
        <Text style={styles.textLogo2}>Survey</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    height: 90,
    backgroundColor: '#111',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textLogo1: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Play_700Bold',
    color: '#FF769D',
    marginLeft: 10,
    marginRight: 5,
  },
  textLogo2: {
    fontWeight: 'bold',
    fontFamily: 'Play_700Bold',
    fontSize: 18,
    color: '#FFF',
  },
  tinyLogo: {
    width: 25,
    height: 25,
  },
});

export default Header;
