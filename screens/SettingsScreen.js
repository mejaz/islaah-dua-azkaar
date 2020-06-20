import React, { Component } from "react";
import { View, Text, Switch, StyleSheet, ImageBackground, TouchableOpacity,
  Modal, ScrollView, Button, Share, ActivityIndicator } from "react-native";
import RadioForm, { 
  RadioButton, 
  RadioButtonInput, 
  RadioButtonLabel
  } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';  
import AntIcon from 'react-native-vector-icons/AntDesign'
import { ListItem } from 'react-native-elements';
import { TabBarEntypo } from '../components/TabBarIcon';
import { fontFamilies, colors } from '../constants/Colors';
import { AZKAAR_LANGUAGE, AZKAAR_DATA } from '../constants/Keys'

export default class SettingsScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      language: '',
      tempLanguage: '',
      isEnabled: false,
      isModalVisible: false,
      languages: [
        {
          label: 'English',
          value: 0,
        }, 
        {
          label: 'Urdu',
          value: 1,
        }
      ]
    }
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    })
  }

  setIsEnabled = previousState => (
    this.setState({
      isEnabled: !previousState
    })
  )

  componentDidMount = () => {

    AsyncStorage.getItem(AZKAAR_LANGUAGE)
      .then((language) => {
        if(language === 'English') {
          this.setState({
            isEnabled: false,
            language: 'English',
            tempLanguage: 0,
          })
        } else if(language === 'Urdu') {
          this.setState({
            isEnabled: true,
            language: 'Urdu',
            tempLanguage: 1,
          })
        }
      })

    this.subs = this.props.navigation.addListener("state", () => {
      AsyncStorage.getItem(AZKAAR_LANGUAGE)
        .then((language) => {
          if(language === 'English') {
            this.setState({
              isEnabled: false,
              language: 'English',
              tempLanguage: 0,
            })
          } else if(language === 'Urdu') {
            this.setState({
              isEnabled: true,
              language: 'Urdu',
              tempLanguage: 1,
            })
          }
        })
      })
  }

  componentWillUnmount = () => {
    this.subs()
  }

  getCurrentLanguageValue = () => {
    let selectedLanguage = this.state.language
    let initialValue = this.state.languages.filter((l) => (
      l.label === selectedLanguage)
    )
    return (initialValue.length > 0 ? initialValue[0].value : 0)
  }

  saveLanguage = () => {
    let value = this.state.tempLanguage
    let lang = this.state.languages.filter((l) => l.value === value)[0]

    AsyncStorage.setItem(AZKAAR_LANGUAGE, lang.label)
      this.setState({
        language: lang.label,
        isModalVisible: false,
      }, () => this.props.navigation.jumpTo('Dua'))
  }

  toggleSwitch = () => {
    this.setIsEnabled(this.state.isEnabled)
    AsyncStorage.getItem(AZKAAR_LANGUAGE)
      .then((language) => {
        if(language === 'English') {
          AsyncStorage.setItem(AZKAAR_LANGUAGE, 'Urdu')
          this.setState({
            language: 'Urdu'
          })
        } else {
          AsyncStorage.setItem(AZKAAR_LANGUAGE, 'English')
          this.setState({
            language: 'English'
          })
        }
      })
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          '👋 Islaah - Dua & Azkaar 👋\n\n' +
          'An app to have with you all the time. \n\n' +
          'We are currently available in Google Play Store. '+
          'Please Follow the link below to download \n\n' +
          'https://play.google.com/store/apps/details?id=com.islaah.duaAndAzkaar',
      });
    } catch (error) {
        console.log(error.message);
    }
  }

  render() {
    return (
      <ImageBackground 
        source={require('../assets/images/background1.png')} 
        style={styles.backgroundImage}>
        {
          this.state.language === 'English'

          ? <View style={styles.container}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                    'About'
                  )
                }
              >
                <ListItem
                  leftAvatar={
                    <TabBarEntypo size={30} focused={true} name="bowl" />
                  }
                  title="About"
                  containerStyle={{backgroundColor: 'transparent'}}
                  titleStyle={styles.engTitle}
                  bottomDivider
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.toggleModal()}>
                <ListItem
                  leftAvatar={
                    <TabBarEntypo size={30} focused={true} name="language" />
                  }
                  title="Language"
                  containerStyle={{backgroundColor: 'transparent'}}
                  titleStyle={styles.engTitle}
                  bottomDivider
                />
              </TouchableOpacity>
              { 
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.isModalVisible}
                  onRequestClose={() => this.toggleModal()}
                  style={styles.modal}
                  >
                  <ImageBackground 
                    source={require('../assets/images/background1.png')} 
                    style={styles.backgroundImage}>
                    <View style={styles.languageSelectionBackground}>
                      <View style={styles.langSelView}>
                        <View style={styles.langSelHeader}>
                          <Text style={styles.modalHeaderText}>Choose Language</Text>
                          <AntIcon name='close' size={25} color={'#fafcfc'} 
                            onPress={() => this.toggleModal()}
                          />
                        </View>
                        <ScrollView 
                          showsVerticalScrollIndicator = {false} 
                          contentContainerStyle={{
                            paddingTop: 20,                 
                          }}
                          >
                          <View style={
                            {
                              flex: 1, 
                              flexDirection: 'column', 
                              justifyContent: 'flex-start', 
                              alignItems: 'flex-start',
                              paddingRight: 10,
                              paddingLeft: 30,
                            }
                          }>
                            <RadioForm
                              formHorizontal={false}
                              animation={true}
                            >
                              {
                                this.state.languages.map((obj, i) => (
                                  <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                      obj={obj}
                                      index={i}
                                      isSelected={this.state.tempLanguage === i}
                                      onPress={(value) => this.setState({
                                          tempLanguage: value !== 'undefined'? value : this.state.tempLanguage,
                                        })
                                      }
                                      borderWidth={1}
                                      buttonInnerColor={'#a65972'}
                                      buttonOuterColor={'#2196f3'}
                                      buttonSize={20}
                                      buttonWrapStyle={{marginLeft: 10}}
                                    />
                                    <RadioButtonLabel
                                      obj={obj}
                                      index={i}
                                      labelHorizontal={true}
                                      onPress={(value) => this.setState({
                                          tempLanguage: value !== 'undefined'? value : this.state.tempLanguage,
                                        })
                                      }
                                      labelStyle={styles.modalLabel}
                                    />
                                  </RadioButton>

                                ))
                              }
                            </RadioForm>
                          </View>                      

                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%',
                              height: '100%',
                              padding: 10,
                            }}
                          >
                          </View>
                        </ScrollView>
                        <View style={styles.closeButtonView}>
                          <Text 
                            style={styles.closeButtonTextEng}
                            onPress={() => this.saveLanguage()}>
                              Save
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </Modal>
              }        
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                    'Credit'
                  )
                }
              >
                <ListItem
                  leftAvatar={
                    <TabBarEntypo size={30} focused={true} name="medal" />
                  }
                  title="Credits"
                  containerStyle={{backgroundColor: 'transparent'}}
                  titleStyle={styles.engTitle}
                  bottomDivider
                ></ListItem>
              </TouchableOpacity>
              <TouchableOpacity>
                <ListItem
                  leftAvatar={
                    <TabBarEntypo size={30} focused={true} name="share" />
                  }
                  title="Share the App"
                  onPress={() => this.onShare()}
                  containerStyle={{backgroundColor: 'transparent'}}
                  titleStyle={styles.engTitle}
                  bottomDivider
                ></ListItem>
              </TouchableOpacity>
            </View>            

          : this.state.language === 'Urdu'
            ? <View style={styles.container}>
                <TouchableOpacity
                  onPress={
                    () => this.props.navigation.navigate(
                      'About'
                      )
                  }
                >
                  <ListItem
                    rightAvatar={
                      <TabBarEntypo size={30} focused={true} name="bowl" />
                    }
                    title="ایپ کے بارے میں"
                    containerStyle={{backgroundColor: 'transparent', paddingBottom: 0, paddingTop: 0}}
                    titleStyle={styles.urduTitle}
                    bottomDivider
                  ></ListItem>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.toggleModal()}>
                  <ListItem
                    rightAvatar={
                      <TabBarEntypo size={30} focused={true} name="language" />
                    }
                    title="زبان"
                    containerStyle={{backgroundColor: 'transparent', paddingBottom: 0, paddingTop: 0}}
                    titleStyle={styles.urduTitle}
                    bottomDivider
                  ></ListItem>
                </TouchableOpacity>
                { 
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => this.toggleModal()}
                    style={styles.modal}
                    >
                    <ImageBackground source={require('../assets/images/background1.png')} style={styles.backgroundImage}>
                      <View style={{
                        flex: 1, 
                        flexDirection: 'row', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                      }}>
                        <View style={
                          {
                            borderStyle: 'solid', 
                            borderColor: '#878784', 
                            borderWidth: 2, 
                            borderRadius: 10,
                            width: '90%',
                            height: '40%',
                          }
                        }>
                          <View style={
                            { 
                              flexDirection: 'row', 
                              backgroundColor: '#a65972', 
                              height: '20%', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              paddingLeft: 10,
                              paddingRight: 10,
                              borderTopRightRadius: 8,
                              borderTopLeftRadius: 8,
                            }
                          }>
                            <Text style={{
                              fontSize: 18, 
                              color: '#fafcfc',
                              fontFamily: 'Roboto-Regular', 
                            }}>Choose Language</Text>
                            <AntIcon name='close' size={25} color={'#fafcfc'} onPress={() => this.toggleModal()}/>
                          </View>
                          <ScrollView 
                            showsVerticalScrollIndicator = {false} 
                            contentContainerStyle={{
                              paddingTop: 20,                 
                            }}
                            >
                            <View style={
                              {
                                flex: 1, 
                                flexDirection: 'column', 
                                justifyContent: 'flex-start', 
                                alignItems: 'flex-start',
                                paddingRight: 10,
                                paddingLeft: 30,
                              }
                            }>
                              <RadioForm
                                formHorizontal={false}
                                animation={true}
                              >
                                {
                                  this.state.languages.map((obj, i) => (

                                    <RadioButton labelHorizontal={true} key={i} >
                                      <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={this.state.tempLanguage === i}
                                        onPress={(value) => this.setState({
                                            tempLanguage: value !== 'undefined'? value : this.state.tempLanguage,
                                          })
                                        }
                                        borderWidth={1}
                                        buttonInnerColor={'#a65972'}
                                        buttonOuterColor={'#a65972'}
                                        buttonSize={20}
                                        buttonWrapStyle={{marginLeft: 10}}
                                      />
                                      <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={(value) => this.setState({
                                            tempLanguage: value !== 'undefined'? value : this.state.tempLanguage,
                                          })
                                        }
                                        labelStyle={styles.modalLabel}
                                      />
                                    </RadioButton>

                                  ))
                                }
                              </RadioForm>
                            </View>                      
                          
                          </ScrollView>
                          <View style={styles.closeButtonView}>
                            <Text 
                              style={styles.closeButtonTextEng}
                              onPress={() => this.saveLanguage()}>
                                Save
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ImageBackground>
                  </Modal>
                }        
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(
                    'Credit'
                  )}
                >
                  <ListItem
                    rightAvatar={
                      <TabBarEntypo size={30} focused={true} name="medal" />
                    }
                    title="کریڈٹ"
                    containerStyle={{backgroundColor: 'transparent', paddingBottom: 0, paddingTop: 0}}
                    titleStyle={styles.urduTitle}
                    bottomDivider
                  ></ListItem>
                </TouchableOpacity>
                <TouchableOpacity>
                  <ListItem
                    rightAvatar={
                      <TabBarEntypo size={30} focused={true} name="share" />
                    }
                    title="ایپ شیئر کریں"
                    onPress={() => this.onShare()}
                    containerStyle={{backgroundColor: 'transparent', paddingBottom: 0, paddingTop: 0}}
                    titleStyle={styles.urduTitle}
                    bottomDivider
                  ></ListItem>
                </TouchableOpacity>
              </View>
            : <View style={styles.waiting}>
                <ActivityIndicator size="large" color="#03c6fc" />
              </View>
            }
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
  },
  modal: {
    flex: 0.5,
  },
  languageSelectionBackground: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  langSelView: {
    borderStyle: 'solid', 
    borderColor: '#878784', 
    borderWidth: 2, 
    borderRadius: 10,
    width: '90%',
    height: '40%',
  },
  langSelHeader: { 
    flexDirection: 'row', 
    backgroundColor: '#a65972', 
    height: '20%', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  engTitle: {
    fontFamily: fontFamilies.engCategory,
    color: colors.engTitleColor,
  },
  urduTitle: {
    fontFamily: fontFamilies.urduCategory,
    fontSize: 26,
  },
  modalHeaderText: {
    fontSize: 18, 
    color: '#fafcfc',
    fontFamily: fontFamilies.engCategory, 
  },
  modalLabel: {
    fontSize: 18, 
    color: '#a65972',
    fontFamily: fontFamilies.engCategory,
  },
  modalSaveText: {
    color: '#fff',
    fontFamily: fontFamilies.engCategory,
  },
  closeButtonView: { 
    flexDirection: 'row', 
    backgroundColor: '#56b5e8', 
    height: 35, 
    width: '40%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    margin: 10, 
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
  },
  closeButtonTextEng: {
    color: '#fff',
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular'
  },
  waiting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
