import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { UserProvider, useUser } from "./providers/UserContext";

import Login from "./pages/Login";
import CadastroPerfil from "./pages/CadastroPerfil";
import CadastroUnidade from "./pages/CadastroUnidade";
import CadastroEndereco from "./pages/CadastroEndereco";
import Menu from "./components/Menu";
import Home from "./pages/Home";

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainApp" component={Menu} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CadastroPerfil" component={CadastroPerfil} />
      <Stack.Screen name="CadastroUnidade" component={CadastroUnidade} />
      <Stack.Screen name="CadastroEndereco" component={CadastroEndereco} />
    </Stack.Navigator>
  );
}

function Routes() {
  const { token, loading } = useUser();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return token ? <AppStack /> : <AuthStack />;
}

export default function App() {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}
