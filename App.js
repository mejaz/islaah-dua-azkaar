import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import DuaScreen from './screens/DuaScreen';
import AzkaarDescScreen from './screens/AzkaarDescScreen';
import About from './screens/About';
import QuranDuaScreen from './screens/QuranDuaScreen';
import QuranDuaDescScreen from './screens/QuranDuaDescScreen';
import Credit from './screens/Credit';
import { AZKAAR_LANGUAGE, 
  AZKAAR_DATA, 
  AZKAAR_AZKAAR,
  QURAN_DUA 
  } from './constants/Keys'
import { dua, azkaar, chosenLanguage } from './data/data'
import { qdua } from './data/quranDua'

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.hide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());      

        let lang = await AsyncStorage.getItem(AZKAAR_LANGUAGE)
        if (lang === null) {
          await AsyncStorage.setItem(AZKAAR_LANGUAGE, chosenLanguage)
          console.log('language added')
        }

        let data = await AsyncStorage.getItem(AZKAAR_DATA)
        if (data === null) {
          await AsyncStorage.setItem(AZKAAR_DATA, JSON.stringify(dua))
          console.log('dua added')
        }

        let azkr = await AsyncStorage.getItem(AZKAAR_AZKAAR)
        if (azkr === null) {
          await AsyncStorage.setItem(AZKAAR_AZKAAR, JSON.stringify(azkaar))
          console.log('azk added')
        }

        let qd = await AsyncStorage.getItem(QURAN_DUA)
        if (qd === null) {
          await AsyncStorage.setItem(QURAN_DUA, JSON.stringify(qdua))
          console.log('qdua added')
        }     

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    async function removeItemValue(key) {
      try {
        await AsyncStorage.removeItem(key);
        console.log('**** deleted ***')
        return true;
      }
      catch(exception) {
        console.log('**** error ***', exception)
        return false;
      }
    } 

    removeItemValue(AZKAAR_DATA)
    removeItemValue(AZKAAR_AZKAAR)
    removeItemValue(QURAN_DUA)
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#a65972" barStyle='light-content'/>
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen options={{headerTransparent: true}} name="Dua" component={BottomTabNavigator} />
            <Stack.Screen options={{headerTransparent: true}} name="DuaScreen" component={DuaScreen} />
            <Stack.Screen options={{headerTransparent: true}} name="AzkaarDescScreen" component={AzkaarDescScreen} />
            <Stack.Screen options={{headerTransparent: true}} name="About" component={About} />
            <Stack.Screen options={{headerTransparent: true}} name="QuranDua" component={QuranDuaScreen} />
            <Stack.Screen options={{headerTransparent: true}} name="QuranDuaDescScreen" component={QuranDuaDescScreen} />
            <Stack.Screen options={{headerTransparent: true}} name="Credit" component={Credit} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
