import React, { Component } from 'react';
import {StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class HadithModal extends Component {
	render() {
		let dua = this.props.dua
		let i = this.props.index
		let language = this.props.language
		return (
			<ImageBackground 
				source={require('../assets/images/background1.png')} 
				style={styles.backgroundImage}>
	      {language === 'English' 
	      	? <View style={styles.backgroundStyle}>
			        <View style={styles.modalStyle}>
			          <View style={styles.hadithNumberViewEng}>
		              <Text style={styles.hadithNumber}>
										{ dua.hadith_book_english }: { dua.hadith_number_english }
		              </Text>
		            </View>
			          <ScrollView 
			            showsVerticalScrollIndicator = {false} 
			            contentContainerStyle={styles.contentContainerStyle}
			            >
			            <View style={styles.duaView}>
			              <Text style={styles.duaTextEng}>
			              	{ dua.hadith_english }
			              </Text>
			            </View>
			          </ScrollView>
			          <View style={styles.closeButtonView}>
			            <Text 
			              style={styles.closeButtonTextEng}
			              onPress={() => this.props.toggleModal(i)}>
			                Close
			            </Text>
			          </View>
			        </View>
			      </View>
	      	: <View style={styles.backgroundStyle}>
              <View style={styles.modalStyle}>
                <View style={styles.hadithNumberViewUrdu}>
                  <Text style={styles.urduHadithNo}>
                  	{ dua.hadith_number_urdu }
                  </Text>
                  <Text style={styles.urduHadithBook}>
                  	{ dua.hadith_book_urdu }: 
                  </Text> 
                </View>
                <ScrollView 
                  showsVerticalScrollIndicator = {false} 
                  contentContainerStyle={styles.contentContainerStyle}
                  >
                  <View style={styles.duaView}>
                    <Text style={styles.duaTextUrdu}>
                    	{ dua.hadith_urdu }
                    </Text>
                  </View>
                </ScrollView>
                <View style={styles.closeButtonView}>
                  <Text 
                  	style={styles.closeButtonTextUrdu}
	                  onPress={() => this.props.toggleModal(i)}>
	                  	بند کریں
                  </Text>
                </View>
              </View>
            </View>
	    	} 
	    </ImageBackground>
		)
	}
}



const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  backgroundStyle: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  modalStyle: {
    borderStyle: 'solid', 
    borderColor: '#878784', 
    borderWidth: 2, 
    borderRadius: 10,
    width: '90%',
    height: '85%',
  },
  hadithNumberViewEng: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#b5b5b5',
  },
  hadithNumberViewUrdu: {
  	marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#b5b5b5',
  },
  hadithNumber: {
    fontFamily: 'Roboto-Regular',
    color: '#f5425d',
    fontSize: 18, 
  },
  duaView: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  duaTextEng: {
    fontFamily: 'Roboto-Regular', 
    fontSize: 18
  },
  duaTextUrdu: {
    fontFamily: 'Jameel-Noori-Nastaleeq', 
    fontSize: 24
  },
  contentContainerStyle: {
    paddingTop: 10, 
  },
  closeButtonView: { 
    flexDirection: 'row', 
    backgroundColor: '#a65972', 
    height: '8%', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10, 
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  closeButtonTextEng: {
    color: '#fff',
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular'
  },
  closeButtonTextUrdu: { 
    fontFamily: 'Jameel-Noori-Nastaleeq',
    color: '#fff',
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
  },
  urduHadithNo: {
  	color: '#f5425d', 
  	fontSize: 18, 
  	fontFamily: 'Roboto-Regular'
  },
  urduHadithBook: {
  	color: '#f5425d', 
  	fontSize: 26, 
  	fontFamily: 'Jameel-Noori-Nastaleeq'
  }
})




