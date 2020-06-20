import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';  
import { TabBarFontAwesome } from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AzkaarScreen from '../screens/AzkaarScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuranDuaScreen from '../screens/QuranDuaScreen';
import { AZKAAR_LANGUAGE, AZKAAR_DATA } from '../constants/Keys'
import { chosenLanguage } from '../data/data'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default class BottomTabNavigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: '',
      refresh: false,
    }
  }

  componentDidMount = () => {
    this.subs = this.props.navigation.addListener("state", () => {
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


  getHeaderTitle = (route) => {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    let language = this.state.language

    if (language === "English") {
      switch (routeName) {
        case 'Dua':
            return 'Dua';
        case 'Azkaar':
            return 'Azkaar';
        case 'Menu':
            return 'Menu';
        case 'QuranDua':
            return 'Quranic Duas';
        }
    } else if (language === "Urdu") {
        switch (routeName) {
          case 'Dua':
            return 'دعا';
          case 'Azkaar':
            return 'اذکار';
          case 'Menu':
            return 'مینو';
          case 'QuranDua':
            return 'قرآن سے دعائیں';
        }
      }
  }

  render() {
    if (this.state.language === 'Urdu') {
      this.props.navigation.setOptions(
        { 
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTitle: this.getHeaderTitle(this.props.route),
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 28,
            fontFamily: 'Jameel-Noori-Nastaleeq',
          },
        }
      )    
    } else {
      this.props.navigation.setOptions(
        { 
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTitle: this.getHeaderTitle(this.props.route),
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 22,
            fontFamily: 'Roboto-Regular',
          },
        }
      ) 
    }
      
    return (
      <BottomTab.Navigator 
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions= {{
          style: {backgroundColor: '#a65972'},
          showLabel: false,
          }
        }
        >
        <BottomTab.Screen
          name="Dua"
          component={HomeScreen}
          options={{
            title: 'Dua',
            tabBarIcon: ({ focused }) => <TabBarFontAwesome size={25} focused={focused} name="pray" />,
          }}
        />
        <BottomTab.Screen
          name="QuranDua"
          component={QuranDuaScreen}
          options={{
            title: 'Quran Dua',
            tabBarIcon: ({ focused }) => <TabBarFontAwesome size={25} focused={focused} name="book" />,
          }}
        />
        <BottomTab.Screen
          name="Azkaar"
          component={AzkaarScreen}
          options={{
            title: 'Azkaar',
            tabBarIcon: ({ focused }) => <TabBarFontAwesome size={25} focused={focused} name="font" />,
          }}
        />
        <BottomTab.Screen
          name="Menu"
          component={SettingsScreen}
          options={{
            title: 'Menu',
            tabBarIcon: ({ focused }) => <TabBarFontAwesome size={25} focused={focused} name="bars" />,
          }}
        />
      </BottomTab.Navigator>

    );
  }  
}




