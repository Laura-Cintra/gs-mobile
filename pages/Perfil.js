import { View, Image, SafeAreaView, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import InfoCard from '../components/InfoCard';
import profileUser from '../assets/profile-user.png';
import MenuSuperior from '../components/MenuSuperior';
import { useEffect, useState } from 'react';
import { useUser } from '../providers/UserContext';
import { fetchPerfilUsuario } from '../services/actions';

export default function Perfil() {
  const { idReservatorio, token } = useUser();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const data = await fetchPerfilUsuario(token, idReservatorio);
        setPerfil(data);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token && idReservatorio) {
      carregarPerfil();
    }
  }, [token, idReservatorio]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!perfil) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Não foi possível carregar o perfil.</Text>
      </SafeAreaView>
    );
  }

  const emergenciaLitros = Math.round((perfil.nivelPct / 100) * perfil.nivelLitros);

  return (
    <SafeAreaView>
      <ScrollView>
        <MenuSuperior />
        <View style={styles.container}>
          <Text style={styles.title}>Perfil</Text>

          <Image style={styles.foto} source={profileUser} />
          <Text style={styles.nome}>{perfil.nome}</Text>
          <Text style={styles.cargo}>Síndico</Text>

          <View style={styles.infoContainer}>
            <InfoCard value={`${perfil.nivelPct}%`} label="Volume do reservatório" />
            <InfoCard value={perfil.ph} label="pH da água" />
            <InfoCard value={`${emergenciaLitros} L`} label="Disponíveis para emergências" />
          </View>

          <View style={styles.unidadeContainer}>
            <Text style={styles.unidadeTitle}>Unidade</Text>
            <View style={styles.enderecoBox}>
              <Icon name="map-marker" size={20} color={colors.primary} />
              <Text style={styles.endereco}>
                {perfil.logradouro}, Nº {perfil.numero}
              </Text>
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
    backgroundColor: colors.background,
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
