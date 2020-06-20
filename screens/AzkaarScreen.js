import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, 
  TouchableOpacity, ActivityIndicator, 
  ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';  
import { ListItem } from 'react-native-elements';
import { TabBarEntypo } from '../components/TabBarIcon';
import { fontFamilies, colors } from '../constants/Colors';
import { AZKAAR_LANGUAGE, AZKAAR_AZKAAR } from '../constants/Keys'

export default class AzkaarScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      language: '',
      data: {
        azkaar: {
          categories: [['loading']],
        }
      },
      showTopics: false,
    }
  }

  componentDidMount = async () => {

    let lang = await AsyncStorage.getItem(AZKAAR_LANGUAGE)
    let azkr = await AsyncStorage.getItem(AZKAAR_AZKAAR)

    this.setState({
      language: lang,
      data: JSON.parse(azkr)
    })

    this.subs = this.props.navigation.addListener("focus", async () => {

      let lang = await AsyncStorage.getItem(AZKAAR_LANGUAGE)
      let azkr = await AsyncStorage.getItem(AZKAAR_AZKAAR)

      this.setState({
        language: lang,
        data: JSON.parse(azkr)
      })
    })

  }

  componentWillUnmount = () => {
    this.subs()
  }

  render() {
    const topics = this.state.data.azkaar.categories.length > 0
        ? this.state.data.azkaar.categories[0].topic
        : [] 
    console.log(topics, "ˆˆˆˆˆˆˆˆˆˆˆˆˆˆˆ")
    return (
      <ImageBackground 
        source={require('../assets/images/background1.png')} 
        style={styles.backgroundImage}>
        <ScrollView 
          style={styles.container} 
          contentContainerStyle={styles.contentContainer}>
          { this.state.language === 'English' 
            ? <View style={styles.azkaarHadithView}>
                <View>
                  <Text style={styles.azkaarHadithBy}>
                    Narrated Anas ibn Malik:
                  </Text>
                </View>

                <Text style={styles.azkaarHadithText}>
                  The Prophet (ﷺ) said: That I sit in the company of the 
                  people who remember Allah the Exalted from morning prayer 
                  till the sun rises is dearer to me than that I emancipate 
                  four slaves from the children of Isma`il, and that I sit 
                  with the people who remember Allah from afternoon prayer 
                  till the sun sets is dearer to me than that I emancipate 
                  four slaves.
                </Text>

                <Text style={styles.azkaarHadithNumber}>
                  Sunan Abi Dawud: 3667
                </Text>
              </View>
            : <View style={styles.azkaarHadithView}>
                <View>
                  <View>
                    <Text style={styles.azkaarHadithByUrdu}>
                      انس بن مالک رضی اللہ عنہ کہتے ہیں کہ:
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.azkaarHadithTextUrdu}>
                      رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: ”میرا ایسی قوم کے ساتھ بیٹھنا جو فجر سے لے کر طلوع شمس تک اللہ کا ذکر کرتی ہو میرے نزدیک اسماعیل علیہ السلام کی اولاد سے چار غلام آزاد کرنے سے زیادہ پسندیدہ امر ہے، اور میرا ایسی قوم کے ساتھ بیٹھنا جو نماز عصر سے غروب آفتاب تک اللہ کے ذکرو اذکار میں منہمک رہتی ہو میرے نزدیک چار غلام آزاد کرنے سے زیادہ محبوب ہے“۔
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.azkaarHadithNumberUrdu}>
                      سنن أبي داود: 3667
                    </Text>
                  </View>
                </View>
              </View>
          }
          {
            this.state.language === 'English' ?
              topics.map((t, i) => (
                <TouchableOpacity key={i} 
                  onPress={() => this.props.navigation.navigate('AzkaarDescScreen', {topic: t})}
                >
                  <ListItem
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
                    key={j}
                    onPress={() => this.props.navigation.navigate('AzkaarDescScreen', {topic: t})}
                    >
                    <ListItem
                      leftAvatar={<TabBarEntypo size={30} focused={true} name="chevron-with-circle-left" />}
                      title={t.topic_urdu}
                      titleStyle={styles.urduTitle}
                      containerStyle={{paddingTop: 0, paddingBottom: 0, backgroundColor: 'transparent'}}
                      topDivider
                      bottomDivider
                    />
                  </TouchableOpacity>
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
    fontFamily: fontFamilies.urduCategory,
    color: colors.urduTitleColor,
  },
  engTitle: {
    fontSize: 16,
    color: colors.engTitleColor,
    fontFamily: fontFamilies.engCategory,
  },
  contentContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 80,
  },
  azkaarHadithView: {
    flex: 0.6,
    padding: 10,
    paddingBottom: 30,
  },
  azkaarHadithBy: {
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Italic',
    color: colors.engTitleColor,
  },
  azkaarHadithText: {
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Italic',
    color: colors.engTitleColor,
  },
  azkaarHadithNumber: {
    color: colors.duaColor,
    fontSize: 16,
    fontFamily: 'Roboto-Italic',
  },
  azkaarHadithByUrdu: {
    fontSize: 20,
    fontFamily: fontFamilies.urduCategory,  
    color: colors.engTitleColor,  
  },
  azkaarHadithTextUrdu: {
    paddingBottom: 5,
    fontSize: 20,
    fontFamily: fontFamilies.urduCategory,
    color: colors.engTitleColor,
  },
  azkaarHadithNumberUrdu: {
    color: colors.duaColor,
    fontSize: 14,
    fontFamily: fontFamilies.engCategory,
  },  
});

