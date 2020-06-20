import 'react-native-gesture-handler';
import { useLinking } from '@react-navigation/native';
import { Linking } from 'react-native';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.getInitialURL('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Dua: 'dua',
          Quran: 'quran',
          Azkaar: 'azkaar',
          Menu: 'menu',
        },
      },
    },
  });
}
