import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, 
  Linking, ActivityIndicator, TouchableOpacity } 
  from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { fontFamilies, colors } from '../constants/Colors';
import { AZKAAR_LANGUAGE } from '../constants/Keys'

export default class About extends Component {

  constructor(props) {
    super(props)
    this.state = {
      language: '',
    }
  }

  componentDidMount = () => {

    AsyncStorage.getItem(AZKAAR_LANGUAGE)
      .then((language) => {
        this.setState({
          language: language
        })
      })

    this.subs = this.props.navigation.addListener("focus", () => {
      AsyncStorage.getItem(AZKAAR_LANGUAGE)
        .then((language) => {
          this.setState({
            language: language
          })
        })
    })
  }

  componentWillUnmount = () => {
    this.subs()
  }

  sendEmail = () => {
    Linking.openURL(
      'mailto:mohdejazsiddiqui@gmail.com?subject=Suggestion \
      - Dua and Azkaar&body=**Please type here...**'
    )
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
            this.state.language === 'English'
            ? <View>
                <View style={{paddingBottom: 15,}}>
                  <Text style={styles.duaText}>ٱلسَّلَامُ عَلَيْكُمْ‎</Text> 
                </View>
                <View>
                  <Text style={styles.engSubTitle}>
                    All the Dua in this app are segregated into multiple 
                    categories and topics. Each Dua is either from Sahih or Hasan hadith. 
                    The reference and the complete hadith is available for each dua.
                  </Text>
                  <Text style={styles.engSubTitle}>
                    To increase the reach of the app, it is currently available in 
                    two languages - English and Urdu. Please help share the app.
                  </Text>
                  <Text style={styles.engSubTitle}>
                    If you see any discrepency or have any questions, please 
                    leave a comment in the Google Play Store or email 
                    at - 
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.sendEmail()}
                  >
                    <Text style={styles.email}>mohdejazsiddiqui@gmail.com</Text>
                  </TouchableOpacity>
                  <Text style={styles.engSubTitle}>
                    We'll try to get back to you as soon as we can Insha Allah.
                  </Text>
                </View>
              </View>
            : this.state.language === 'Urdu'
              ? <View>
                  <View style={{paddingBottom: 15,}}>
                    <Text style={styles.duaText}>ٱلسَّلَامُ عَلَيْكُمْ‎</Text> 
                  </View>
                  <View>
                    <Text style={styles.urduSubTitle}>
                      ہم نے اس ایپ میں دعاؤں کو متعدد زمرے اور عنوانات میں 
                      الگ کرکے شامل کیا ہے۔ ساری دعا صحیح یا حسن حدیث سے ہے۔ حوالہ 
                      اور مکمل حدیث ہر دعا کے لئے دستیاب ہے۔
                    </Text>
                    <Text style={styles.urduSubTitle}>
                      ایپ کی رسائ بڑھانے کے لئے ، یہ فی الحال انگریزی اور اردو 
                      دو زبانوں میں دستیاب ہے۔ براہ کرم ایپ کو شیئر کرنے میں مدد کریں۔
                    </Text>
                    <Text style={styles.urduSubTitle}>
                      اگر آپ کو کوئی تضاد نظر آتا ہے یا کوئی سوال ہے تو براہ 
                      کرم گوگل پلے اسٹور میں رائے دیں یا ای میل بھیجیں -
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.sendEmail()}
                    >
                      <Text style={styles.email}>mohdejazsiddiqui@gmail.com</Text>
                    </TouchableOpacity>
                    <Text style={styles.urduSubTitle}>
                      ہم انشاءاللہ جلد ہی جواب دینے کی کوشش کریں گے۔
                    </Text>
                  </View>
                </View>
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
    marginTop: 60,
    padding: 15,
    backgroundColor: 'transparent',
    width: '100%',
    paddingBottom: 20,
  },
  duaText: {
    fontSize: 38,
    textAlign: 'center',
    fontFamily: fontFamilies.duaText,
    color: colors.duaColor,
    paddingBottom: 10,
  },
  waiting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urduSubTitle: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.urduSubTitleColor,
    fontFamily: fontFamilies.urduTopics,
  },
  engSubTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontFamily: fontFamilies.engTopics,
    textAlign: 'center'
  },
  email: {
    paddingBottom: 10,
    fontSize: 18,
    color: '#8bb4f7',
    fontFamily: fontFamilies.engTopics,
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 100,
  },
});

