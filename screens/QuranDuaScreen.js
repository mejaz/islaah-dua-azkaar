import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, 
  TouchableOpacity, ActivityIndicator, Image, ScrollView 
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import DuaScreen from './DuaScreen';
import { TabBarEntypo } from '../components/TabBarIcon';
import { fontFamilies, colors } from '../constants/Colors';
import { AZKAAR_LANGUAGE, QURAN_DUA } from '../constants/Keys'

export default class QuranDuaScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      language: '',
      data: {
        qdua: {
          categories: [],
        }
      },
      showTopics: false,
    }
  }

  componentDidMount = async () => {

    let lang = await AsyncStorage.getItem(AZKAAR_LANGUAGE)
    let data = await AsyncStorage.getItem(QURAN_DUA)

    this.setState({
      language: lang,
      data: JSON.parse(data)
    })

    this.subs = this.props.navigation.addListener("focus", async () => {

      let lang = await AsyncStorage.getItem(AZKAAR_LANGUAGE)
      let data = await AsyncStorage.getItem(QURAN_DUA)

      this.setState({
        language: lang,
        data: JSON.parse(data)
      })
    })

  }

  componentWillUnmount = () => {
    this.subs()
  }

  render() {
    const topics = this.state.data.qdua.categories.length > 0
        ? this.state.data.qdua.categories[0].topic
        : [] 
    return (
      <ImageBackground 
        source={require('../assets/images/background1.png')} 
        style={styles.backgroundImage}>
        <View 
          style={{ flex: 1, margin: 1, padding: 0, }}
          >
          <View 
            style={{
              flex: 0.7, 
              paddingTop: 60, 
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image 
              source={require('../assets/images/FAVPNG_quran.png')} 
              style={{
                height: 230,
                width: 230,
              }}
            />
          </View>
          <View style={styles.container}>
            {
              this.state.language === 'English' ?
                topics.map((t, i) => (
                  <TouchableOpacity key={i} 
                    onPress={() => this.props.navigation.navigate('QuranDuaDescScreen', {topic: t})}
                  >
                    <ListItem
                      key={i}
                      rightAvatar={<TabBarEntypo size={30} focused={true} name="chevron-with-circle-right" />}
                      title={t.topic_english}
                      titleStyle={styles.engTitle}
                      containerStyle={{backgroundColor: 'transparent'}}
                      topDivider
                      bottomDivider
                    />
                  </TouchableOpacity>
                ))
              : this.state.language === 'Urdu' ?
                  topics.map((t, j) => (
                    <TouchableOpacity 
                      key={2000+j}
                      onPress={() => this.props.navigation.navigate(
                        'QuranDuaDescScreen', {topic: t})}
                      >
                      <ListItem
                        key={5000+j}
                        leftAvatar={<TabBarEntypo size={30} focused={true} name="chevron-with-circle-left" />}
                        title={t.topic_urdu}
                        titleStyle={styles.urduTitle}
                        containerStyle={{paddingTop: 0, paddingBottom: 0, backgroundColor: 'transparent'}}
                        bottomDivider
                      />
                    </TouchableOpacity>
                ))
              : <View style={styles.waiting}>
                  <ActivityIndicator size="large" color="#03c6fc" />
                </View>
            }
          </View>
        </View>
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
    flex: 0.3,
    backgroundColor: 'transparent',
  },
  waiting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urduTitle: {
    fontSize: 26,
    fontFamily: fontFamilies.urduCategory,
    color: colors.urduTitleColor,
  },
  engTitle: {
    fontSize: 16,
    color: colors.engTitleColor,
    fontFamily: fontFamilies.engCategory,
  },
});

