import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function GraficoBarras({ dados }) {
  if (!Array.isArray(dados)) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Nível do reservatório</Text>
      <Text style={styles.subTitle}>Últimos 7 dias</Text>
      <BarChart
        data={dados}
        barWidth={20}
        height={150}
        spacing={20}
        noOfSections={4}
        yAxisThickness={0}
        isAnimated
        barBorderRadius={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
});
