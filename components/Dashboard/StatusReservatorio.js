import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../theme/colors";

export default function StatusReservatorio({ leitura }) {
  const nivel = leitura?.nivelPct ?? 0;
  const ph = leitura?.phInt ?? 0;

  let statusPh = "Desconhecido";
  let descPH = "Valor inválido";

  if (ph >= 0 && ph < 5.5) {
    statusPh = "Baixo";
    descPH = "Água muito ácida";
  } else if (ph >= 5.5 && ph < 6.5) {
    statusPh = "Ácido";
    descPH = "Ligeiramente ácido";
  } else if (ph >= 6.5 && ph <= 7.5) {
    statusPh = "Neutro";
    descPH = "pH ideal";
  } else if (ph > 7.5 && ph <= 8.5) {
    statusPh = "Alcalino";
    descPH = "Ligeiramente alcalino";
  } else if (ph > 8.5 && ph <= 14) {
    statusPh = "Alto";
    descPH = "Água muito alcalina";
  }

  return (
    <View style={styles.statusContainer}>
      <View style={styles.statusBox}>
        <View>
          <Icon name="water" size={65} color="#2D78D3" />
        </View>
        <View>
          <Text style={styles.statusLabel}>Nível atual</Text>
          <Text style={styles.statusValue}>{nivel} %</Text>
        </View>
      </View>

      <View style={styles.statusBox}>
        <View>
          <Icon name="water" size={75} color="#72DBCF" />
          <View style={styles.phContainer}>
            <Text style={styles.statusPh}>{ph.toFixed(1)}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.statusLabel}>Status Ph:</Text>
          <Text style={styles.statusValue}>{statusPh}</Text>
          <Text style={styles.phDescription}>{descPH}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statusBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
    margin: 5,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusLabel: {
    fontSize: 17,
    color: "#555",
  },
  phContainer: {
    position: "relative",
    alignItems: "center",
    top: -45,
  },
  statusPh: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.border,
  },
  phDescription: {
    fontSize: 10,
    color: colors.placeholder,
  },
});
