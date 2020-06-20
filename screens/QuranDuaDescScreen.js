import React, { Component } from 'react';
import { ActivityIndicator, Image, StyleSheet, 
  Text, TouchableOpacity, TouchableWithoutFeedback, 
  View, Button, ImageBackground,
  ScrollView } from 'react-native';
import Clipboard from  '@react-native-community/clipboard';  
import AsyncStorage from '@react-native-community/async-storage';  
import Toast from 'react-native-simple-toast';
import HadithModal from '../components/HadithModal'
import { CheckBox } from 'react-native-elements'
import { fontFamilies, colors, sizes } from '../constants/Colors';
import { AZKAAR_LANGUAGE, QURAN_DUA } from '../constants/Keys'

export default class QuranDuaDescScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      language: '',
      duaData: [],
      topic: this.props.route.params.topic,
      isModalVisible: false,
      hideTranslation: false,
    }
  }  

  componentDidMount = () => {
    AsyncStorage.getItem(AZKAAR_LANGUAGE)
      .then(language => {
        this.setState({
          language: language
        })
      })

    AsyncStorage.getItem(QURAN_DUA)
      .then((data) => JSON.parse(data))
      .then((data) => {
        let duaData = data.qdua.qdua[this.state.topic.id]
        this.setState({
          duaData: duaData,
        })
      })
      .catch((error) => console.log(error))
  }

  toggleTranslation = () => {
    let hideTranslation = this.state.hideTranslation
    this.setState({
      hideTranslation: !hideTranslation,
    })
  }

  copyToClipboard = (dua) => {
    Clipboard.setString(dua)
    Toast.show('Dua Copied');
  }

  render() {
    if(this.state.language === 'English') {
      this.props.navigation.setOptions(
        { 
          headerTitle: this.props.route.params.topic.topic_english,
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Roboto-Regular',
          },
        })      
    } else {
      this.props.navigation.setOptions(
        { 
          headerTitle: this.props.route.params.topic.topic_urdu,
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 28,
            fontFamily: 'Jameel-Noori-Nastaleeq',
          },
        }) 
    }

    let duas = this.state.duaData

    return (
      <ImageBackground 
        source={require('../assets/images/background1.png')} 
        style={styles.backgroundImage}>
        <View style={styles.container}>
          { this.state.language === 'English'
            ? <View style={styles.checkerBoxEnglish}>
                <CheckBox
                  right
                  iconRight
                  title='Hide Translation'
                  checked={this.state.hideTranslation}
                  onPress={() => this.toggleTranslation()}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    borderBottomWidth: 2,
                  }}
                />
              </View>
            : <View style={styles.checkerBoxUrdu}>
                <CheckBox
                  right
                  iconRight
                  title='ترجمہ چھپائیں'
                  textStyle={{fontSize: 20}}
                  checked={this.state.hideTranslation}
                  onPress={() => this.toggleTranslation()}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    borderBottomWidth: 2,
                  }}
                />
              </View>
          }
          <ScrollView 
            style={styles.scrollContainer} 
            contentContainerStyle={styles.contentContainer}>
          { duas!== undefined && duas.length > 0
              ? this.state.language === 'English'

                ? duas.map((dua, i) => 
                    <View style={
                      {
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    } key={i}>
                      <View style={styles.duaSectionView}>
                        <View>
                          <TouchableWithoutFeedback 
                            onLongPress={() => this.copyToClipboard(dua.dua)}>
                            <View>
                              <Text style={styles.duaText}>
                                { dua.dua }
                              </Text>
                              <Text style={styles.repeatTextEnglish}>
                                { dua.repeat > 1 ? '(' + dua.repeat + ' times' + ')' : null }
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                        {!this.state.hideTranslation && 
                          <View>
                            <View style={styles.engTranslationView}>
                              <Text 
                                style={styles.engTranslationText}>
                                  { dua.translation_english }
                              </Text>
                            </View>
                            <View style={styles.referenceEnglishView}>
                              <Text style={styles.hadithBookEnglish}>
                                { dua.hadith_book_english }:
                              </Text>
                              <Text style={styles.hadithNoEnglish}>
                                { dua.hadith_number_english }
                              </Text>
                            </View>
                          </View>
                        }
                        <View
                          style={{paddingTop: 30}}
                          >
                          <Text style={
                            {
                              fontFamily: 'Roboto-Regular',
                              textAlign: 'center',
                              fontSize: 18,
                              color: '#5c574f'
                            }
                          }>
                            ***** {i+1} *****
                          </Text>
                        </View>
                      </View>
                    </View>
                  )
                : duas.map((dua, i) => 
                    <View style={
                      {
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    } key={i}>
                      <View style={styles.duaSectionView}>
                        <View>
                          <TouchableWithoutFeedback 
                            onLongPress={() => this.copyToClipboard(dua.dua)}>
                            <View>
                              <Text style={styles.duaText}>
                                { dua.dua }
                              </Text>
                              <Text style={styles.repeatTextEnglish}>
                                { dua.repeat > 1 ? '(' + dua.repeat + ' مرتبہ' + ')' : null }
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                        { !this.state.hideTranslation && 
                          <View>
                            <View style={styles.engTranslationView}>
                              <Text style={styles.urduTranslationText}>
                                { dua.translation_urdu }
                              </Text>
                            </View>
                            <View style={styles.referenceUrduView}>
                              <Text style={styles.hadithNoUrdu}>
                                { dua.hadith_number_urdu }
                              </Text>
                              <Text style={styles.hadithBookUrdu}>
                                { dua.hadith_book_urdu }:
                              </Text>
                            </View>
                          </View>
                        }
                        <View
                          style={{paddingTop: 30}}
                          >
                          <Text style={
                            {
                              fontFamily: 'Roboto-Regular',
                              textAlign: 'center',
                              fontSize: 18,
                              color: '#5c574f'
                            }
                          }>
                            ***** {i+1} *****
                          </Text>
                        </View>
                      </View>
                    </View>
                  )
              : <View style={styles.waiting}>
                  <ActivityIndicator size="large" color="#03c6fc" />
                </View>
            }
          </ScrollView>
        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: 'transparent',
  },
  checkerBoxEnglish: {
    // marginTop: 30,
  },
  checkerBoxUrdu: {
    // marginTop: 30,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  duaSectionView: {
    padding: 20,
    paddingTop: 0,
  },
  duaText: {
    fontSize: sizes.duaTextSize,
    textAlign: 'center',
    fontFamily: fontFamilies.duaText,
    color: colors.duaColor,
  },
  engTranslationView: {
    paddingTop: 10,
  },
  engTranslationText: {
    fontFamily: fontFamilies.engTranslation,
    fontSize: sizes.duaTxnTextSize,
    textAlign: 'center',
  },
  referenceEnglishView: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hadithBookEnglish: {
    fontSize: 16,
    fontFamily: fontFamilies.hadithBookEnglish,
    color: '#227c9d',
  },
  hadithNoEnglish: {
    fontSize: 16,
    color: '#227c9d',
    fontFamily: fontFamilies.hadithNoEnglish,
    paddingLeft: 5,
  },
  contentContainer: {
    paddingTop: 10,
  },
  waiting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  referenceUrduView: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urduTranslationText: {
    fontFamily: fontFamilies.urduTranslationText,
    fontSize: sizes.duaTxnTextSizeUrdu,
    textAlign: 'center',
  },
  hadithBookUrdu: {
    fontFamily: fontFamilies.hadithBookUrdu,
    color: '#227c9d',
    fontSize: 22,
  },
  hadithNoUrdu: {
    color: '#227c9d',
    fontFamily: fontFamilies.hadithNoEnglish,
    paddingRight: 10,
    fontSize: 18,
  },
  repeatTextEnglish: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fontFamilies.repeatEnglish,
    color: colors.repeatColor,    
  }
});
