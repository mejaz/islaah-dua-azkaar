import * as React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import EntIcon from 'react-native-vector-icons/Entypo'
import Colors from '../constants/Colors';


export function TabBarEntypo(props) {
  return (
    <EntIcon
      name={props.name}
      size={props.size}
      style={{ marginBottom: -3 }}
      color={props.focused ? '#a65972' : Colors.tabIconDefault}
    />
  );
}

export function TabBarFontAwesome(props) {
  return (
    <FontAwesome5
      name={props.name}
      size={props.size}
      style={{ marginBottom: -3 }}
      color={props.focused ? '#fcf9f7' : 'black'}
    />
  );
}
