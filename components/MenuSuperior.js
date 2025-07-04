import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import logo from "../assets/logo-agua.png";
import colors from "../theme/colors";
import { useUser } from "../providers/UserContext";

export default function MenuSuperior() {
  const navigation = useNavigation();
  const { logout } = useUser();

  const handleHome = () => {
    navigation.navigate("Home");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHome}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#fff",
  },
  logo: {
    width: 50,
    height: 60,
  },
});
