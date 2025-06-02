import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function InfoCard({ value, label }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '30%'
  },
  value: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5
  },
  label: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '300',
  }
});
