import { View, Image, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import InfoCard from '../components/InfoCard';
import profileUser from '../assets/profile-user.png';

export default function Perfil() {
  const user = {
    nome: 'Fulano da Silva',
    endereco: 'Rua teste da silva, número 256',
    volumeReservatorio: '75%',
    apartamentos: 56,
    emergencias: '20L'
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        <Image
          style={styles.foto}
          source={profileUser}
        />
        <Text style={styles.nome}>{user.nome}</Text>
        <Text style={styles.cargo}>Síndico</Text>

        <View style={styles.infoContainer}>
          <InfoCard value={user.volumeReservatorio} label="Volume do reservatório" />
          <InfoCard value={user.apartamentos} label="Apartamentos" />
          <InfoCard value={user.emergencias} label="Disponíveis para emergências" />
        </View>

        <View style={styles.unidadeContainer}>
          <Text style={styles.unidadeTitle}>Unidade</Text>
          <View style={styles.enderecoBox}>
            <Icon name="map-marker" size={20} color={colors.primary} />
            <Text style={styles.endereco}>{user.endereco}</Text>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    flex: 1,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  foto: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginBottom: 10
  },
  nome: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  cargo: {
    textAlign: 'center',
    fontWeight: '200',
    marginBottom: 20,
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  unidadeContainer: {
    marginTop: 10
  },
  unidadeTitle: {
    backgroundColor: colors.primary,
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontWeight: 'bold'
  },
  enderecoBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12
  },
  endereco: {
    marginLeft: 8
  }
});