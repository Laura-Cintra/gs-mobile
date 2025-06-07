import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function GraficoBarras({ dados }) {
  if (!Array.isArray(dados)) return null;

  const estaVazio = dados.length === 0 || dados.every((dado) => dado.value === 0 || dado.value === null);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Nível do reservatório</Text>
      <Text style={styles.subTitle}>Últimos 7 dias</Text>
      {estaVazio ? (
        <Text style={styles.semRegistros}>Sem registros de nível</Text>
      ) : (

      <BarChart
        data={dados}
        barWidth={20}
        height={150}
        spacing={34}
        noOfSections={4}
        yAxisThickness={0}
        isAnimated
        barBorderRadius={4}
      />
      )}
    </View>
  )
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
  semRegistros: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
    marginVertical: 30,
  },
});
