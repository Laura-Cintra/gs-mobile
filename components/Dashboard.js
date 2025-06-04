import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import { fetchRepositorios, fetchClima } from '../services/actions';

import ModalRepositorios from '../components/Dashboard/ModalRepositorios';
import GraficoBarras from '../components/Dashboard/GraficoBarras';
import GraficoPizza from '../components/Dashboard/GraficoPizza';
import CadastroReservatorio from '../components/CadastroReservatorio';
import ChuvaContainer from '../components/Dashboard/ChuvaContainer';
import StatusReservatorio from './Dashboard/StatusReservatorio';

export default function Dashboard() {
  const [repositorios, setRepositorios] = useState([]);
  const [repoAtual, setRepoAtual] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [clima, setClima] = useState(null);
  const [dadosStatus, setDadosStatus] = useState([]);
  const [modalCadastroVisible, setModalCadastroVisible] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      const repos = await fetchRepositorios();
      setRepositorios(repos);
      setRepoAtual(repos[0]);
      const statusDistribuido = distribuirStatus(repos);
      setDadosStatus(statusDistribuido);
    };

    const carregarClima = async () => {
      const climaData = await fetchClima();
      setClima(climaData);
    };

    carregarDados();
    carregarClima();
  }, []);

  const distribuirStatus = (repos) => {
    const contagem = { Cheio: 2, Normal: 5, Vazio: 1 };
    repos.forEach(repo => {
      contagem[repo.status] += 1;
    });
    return [
      { value: contagem.Cheio, color: '#4CAF50', text: 'Cheio' },
      { value: contagem.Normal, color: '#FFC107', text: 'Normal' },
      { value: contagem.Vazio, color: '#F44336', text: 'Vazio' },
    ];
  };

  if (!repoAtual) return null;

  const handleTrocarRepo = (repo) => {
    setRepoAtual(repo);
    setModalVisible(false);
  };

  const atualizarRepositorios = async () => {
    const repos = await fetchRepositorios();
    setRepositorios(repos);
    setRepoAtual(repos[0]);
    const statusDistribuido = distribuirStatus(repos);
    setDadosStatus(statusDistribuido);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.repoHeader}>
        <Text style={styles.repoName}>{repoAtual.nome}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="swap-horizontal" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalCadastroVisible(true)}>
          <Icon name="plus-circle-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <StatusReservatorio repoAtual={repoAtual} />

      <GraficoBarras repoAtual={repoAtual} />

      <View style={styles.graphRow}>
        <GraficoPizza dadosStatus={dadosStatus} />

        <View style={styles.alertContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="alert" size={26} color="#DC4D34" />
            <Text style={styles.alertTitle}>Alerta: </Text>
          </View>
          <Text style={styles.alertText}>Teste muito muito grande aaaaaaaaaaa</Text>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <ChuvaContainer clima={clima} />
      </View>

      <ModalRepositorios
        modalVisible={modalVisible}
        repositorios={repositorios}
        repoAtual={repoAtual}
        handleTrocarRepo={handleTrocarRepo}
        setModalVisible={setModalVisible}
      />

      <CadastroReservatorio
        visible={modalCadastroVisible}
        onClose={() => setModalCadastroVisible(false)}
        onCadastroSucesso={atualizarRepositorios}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },
  repoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20
  },
  repoName: {
    fontSize: 18,
    fontWeight: '600'
  },
  graphRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  alertContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 5,
    maxWidth: '60%',
    borderRadius: 10,
    height: 120,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  alertText: {
    fontSize: 12,
    marginTop: 6,
    maxWidth: '62%',
  }
});
