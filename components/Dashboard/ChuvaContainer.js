import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../theme/colors";

export default function ChuvaContainer({ clima }) {
  return (
    <View style={styles.chuvaContainer}>
      <Icon name="weather-pouring" size={35} color={colors.primary} />
      <View>
        <Text style={styles.chuvaText}>
          Chance de chuva hoje: {clima ? clima.chance + "%" : "..."}
        </Text>
        <Text style={styles.descricaoText}>
          Tendência: {clima ? clima.description : "Descrição não disponível"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chuvaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    marginTop: 10,
    marginBottom: 70,
  },
  chuvaText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  descricaoText: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: "400",
  },
});
