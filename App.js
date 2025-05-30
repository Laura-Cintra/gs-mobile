import Menu from './components/Menu';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Menu />
      </SafeAreaView>
    </NavigationContainer>
  );
}
