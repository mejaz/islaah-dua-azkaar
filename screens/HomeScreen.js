import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, 
  TouchableOpacity, View, ImageBackground, ScrollView
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';  
import { ListItem } from 'react-native-elements';
import { TabBarEntypo } from '../components/TabBarIcon';
import { fontFamilies, colors } from '../constants/Colors';
import { AZKAAR_LANGUAGE, AZKAAR_DATA } from '../constants/Keys'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      language: '',
      data: {
        dua: {
          categories: ['loading'],
        },
      },
      showTopics: false,
    }
  }

  componentDidMount = async () => {

    let lang = await AsyncStorage.getItem(AZKAAR_LANGUAGE)
    let data = await AsyncStorage.getItem(AZKAAR_DATA)

    this.setState({
      language: lang,
      data: JSON.parse(data)
    })

    this.subs = this.props.navigation.addListener("focus", async () => {

      let lang = await AsyncStorage.getItem(AZKAAR_LANGUAGE)
      let data = await AsyncStorage.getItem(AZKAAR_DATA)

      this.setState({
        language: lang,
        data: JSON.parse(data)
      })
    })
  }

  componentWillUnmount = () => {
    this.subs()
  }

  categoryPressed = (i) => {
    let lang = this.state.language
    i = String(i)

    if (i in this.state && this.state[i] === true) {
      this.setState({
        showTopics: !this.state.showTopics,
        [i]: false,
      })
    } else {
      this.setState({
        showTopics: !this.state.showTopics,
        [i]: true,
      })
    }
  }

  getBool = (i) => this.state[i]

  render() {
    const categories = this.state.data.dua.categories 
    return (
      <ImageBackground 
        source={require('../assets/images/background1.png')} 
        style={styles.backgroundImage}>
          <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.contentContainer}>
              {
                this.state.language === 'English' ?
                  categories.map((c, i) => (
                    <View key={i}>
                      <TouchableOpacity 
                        onPress={() => this.categoryPressed(i)}>
                        <ListItem
                          rightAvatar={!this.getBool(i)
                            ? <TabBarEntypo 
                                size={30} 
                                focused={true} 
                                name="chevron-with-circle-down" />
                            : <TabBarEntypo 
                                size={30} 
                                focused={true} 
                                name="chevron-with-circle-up" />
                          }
                          title={c.category_english}
                          containerStyle={{backgroundColor: 'transparent'}}
                          titleStyle={styles.engTitle}
                          bottomDivider
                        />
                      </TouchableOpacity>
                      {this.getBool(i) && 
                      <View>
                        {
                          c.topic.map((t, j) => (
                            <TouchableOpacity key={j} 
                              onPress={
                                () => this.props.navigation.navigate(
                                  'DuaScreen', {topic: t}
                                  )}
                            >
                              <ListItem
                                title={t.topic_english}
                                titleStyle={styles.engSubTitle}
                                containerStyle={
                                  {
                                    backgroundColor: '#fcddc7', 
                                    paddingLeft: 30,
                                  }
                                }
                                bottomDivider
                              />
                            </TouchableOpacity>
                          ))
                        }
                      </View>}
                    </View>
                  ))
                : this.state.language === 'Urdu' ?
                    categories.map((c, i) => (
                    <View key={i}>
                      <TouchableOpacity 
                        onPress={() => this.categoryPressed(i)} >
                        <ListItem
                          leftAvatar={!this.getBool(i) 
                            ? <TabBarEntypo 
                                size={30} 
                                focused={true} 
                                name="chevron-with-circle-down" /> 
                            : <TabBarEntypo 
                                size={30} 
                                focused={true} 
                                name="chevron-with-circle-up" />
                          }
                          title={c.category_urdu}
                          titleStyle={styles.urduTitle}
                          containerStyle={
                            {
                              paddingTop: 0, 
                              paddingBottom: 0, 
                              backgroundColor: 'transparent'
                            }
                          }
                          bottomDivider
                        />
                      </TouchableOpacity>
                      { this.getBool(i) && 
                        <View>
                        {
                          c.topic.map((t, j) => (
                            <TouchableOpacity 
                              key={j}
                              onPress={
                                () => this.props.navigation.navigate(
                                  'DuaScreen', {topic: t}
                                  )}
                              >
                              <ListItem
                                title={t.topic_urdu}
                                titleStyle={styles.urduSubTitle}
                                containerStyle={
                                  {
                                    paddingTop: 0, 
                                    paddingBottom: 0, 
                                    backgroundColor: '#fcddc7',
                                  }
                                }
                                bottomDivider
                              />
                            </TouchableOpacity>
                          ))
                        }
                      </View> }
                    </View>
                  ))
                : <View style={styles.waiting}>
                    <ActivityIndicator size="large" color="#03c6fc" />
                  </View>
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
    marginTop: 50,
    backgroundColor: 'transparent',
    width: '100%',
  },
  waiting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urduTitle: {
    fontSize: 26,
    color: colors.urduTitleColor,
    fontFamily: fontFamilies.urduCategory,
  },
  urduSubTitle: {
    fontSize: 24,
    paddingRight: 25,
    color: colors.urduSubTitleColor,
    fontFamily: fontFamilies.urduTopics,
  },
  engTitle: {
    fontSize: 16,
    color: colors.engTitleColor,
    fontFamily: fontFamilies.engCategory,
  },
  engSubTitle: {
    fontSize: 14,
    fontFamily: fontFamilies.engTopics,
  },
  contentContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 100,
  },
});

