import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';

export default function StatusReservatorio({ repoAtual }) {
  return (
    <View style={styles.statusContainer}>
      <View style={styles.statusBox}>
        <View>
          <Icon name="water" size={65} color="#2D78D3" />
        </View>
        <View>
          <Text style={styles.statusLabel}>Nível atual</Text>
          <Text style={styles.statusValue}>{repoAtual.nivelAtual} L</Text>
        </View>
      </View>

      <View style={styles.statusBox}>
        <View>
          <Icon name="water" size={75} color="#72DBCF" />
          <View style={styles.phContainer}>
            <Text style={styles.statusPh}>{repoAtual.ph}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.statusLabel}>Status Ph:</Text>
          <Text style={styles.statusValue}>{repoAtual.statusPh}</Text>
          <Text style={styles.phDescription}>{repoAtual.descPH}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  statusBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    margin: 5,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  statusLabel: {
    fontSize: 17,
    color: '#555',
  },
  phContainer: {
    position: 'relative',
    alignItems: 'center',
    top: -45,
  },
  statusPh: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.border,
  },
  phDescription: {
    fontSize: 10,
    color: colors.placeholder,
  },
});
