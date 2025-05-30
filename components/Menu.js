import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../pages/Home';
import Notificacoes from '../pages/Notificacoes';
import Perfil from '../pages/Perfil';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 65,
          position: 'absolute',
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarIconStyle: {
          height: 50,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Notificacoes') {
            iconName = 'bell';
          } else if (route.name === 'Perfil') {
            iconName = 'account';
          }

          return (
            <View style={styles.container}>
              <MaterialCommunityIcons
                name={iconName}
                size={33}
                color={focused ? colors.secondary : colors.white}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notificacoes" component={Notificacoes} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
