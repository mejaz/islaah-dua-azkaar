import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, 
 } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';  
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class Credit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      engList: [
        'Hisnul Muslim - Darussalam',
        'SUNNAH.COM - https://sunnah.com',
        'muflihun.com - https://muflihun.com',
        'Quran.Com - https://quran.com',
        'urdupoint.com - https://www.urdupoint.com',
        'pngTree - https://pngtree.com',
        'FAVPNG - https://favpng.com',
      ]
    }
  }

  render() {
    return (
      <ImageBackground 
        source={require('../assets/images/background1.png')} 
        style={styles.backgroundImage}>
        <ScrollView 
          style={styles.container} 
          contentContainerStyle={styles.contentContainer}>
          {
            this.state.engList.map((l, i) => (
              <ListItem 
                key={i}
                title={l}
                containerStyle={{backgroundColor: 'transparent',}}
                titleStyle={{fontFamily: 'Roboto-Regular'}}
                bottomDivider
              />
            ))
          }
        </ScrollView>
      </ImageBackground>
    );

  }
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    marginTop: 60,
    padding: 10,
    backgroundColor: 'transparent',
    width: '100%',
    paddingBottom: 20,
  },
  contentContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 100,
  },
});

