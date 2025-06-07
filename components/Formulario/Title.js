import { StyleSheet, Text, View } from "react-native";

export default function FormTitle({ subtitle }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 23,
    fontWeight: "200",
  },
});
