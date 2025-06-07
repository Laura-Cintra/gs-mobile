import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function GraficoPizza({ dadosStatus }) {
  if (!Array.isArray(dadosStatus) || dadosStatus.length === 0) {
    return null;
  }

  const total = dadosStatus.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={styles.graphBox}>
      <Text style={styles.subTitle}>Distribuição de Status</Text>
      <View style={{ flexDirection: "row" }}>
        <PieChart
          data={dadosStatus.map((item) => ({
            value: item.value,
            color: item.color,
            text: `${Math.round((item.value / total) * 100)}%`,
          }))}
          showText
          textColor="#000"
          radius={60}
          innerRadius={0}
          textSize={20}
          isAnimated
        />

        <View style={styles.legendContainer}>
          {dadosStatus.map((item) => (
            <View key={item.text} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphBox: {
    width: "65%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  legendContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 8,
  },
});
