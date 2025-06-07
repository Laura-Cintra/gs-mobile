import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function NotificacaoItem({ data, mensagem }) {
  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>{data}</Text>
      </View>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.placeholder,
    paddingBottom: 15,
  },
  dataContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  dataText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 12,
  },
  mensagem: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
});
