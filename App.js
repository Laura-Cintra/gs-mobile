import Menu from './components/Menu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CadastroPerfil from './pages/CadastroPerfil';
import CadastroUnidade from './pages/CadastroUnidade';
import CadastroEndereco from './pages/CadastroEndereco';
import Login from './pages/Login';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainApp" component={Menu} />
      <Stack.Screen name="CadastroPerfil" component={CadastroPerfil} />
      <Stack.Screen name="CadastroUnidade" component={CadastroUnidade} />
      <Stack.Screen name="CadastroEndereco" component={CadastroEndereco} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
