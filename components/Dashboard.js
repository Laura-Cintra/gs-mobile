import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import { fetchReservatorios, fetchPerfilUsuario, cadastrarReservatorio, fetchHistoricoReservatorio, fetchEndereco, fetchClimaByCidade, fetchLeituraDispositivo, fetchNotificacoes } from '../services/actions';
import { useUser } from '../providers/UserContext';

import ModalRepositorios from '../components/Dashboard/ModalRepositorios';
import GraficoBarras from '../components/Dashboard/GraficoBarras';
import GraficoPizza from '../components/Dashboard/GraficoPizza';
import CadastroReservatorio from '../components/CadastroReservatorio';
import ChuvaContainer from '../components/Dashboard/ChuvaContainer';
import StatusReservatorio from './Dashboard/StatusReservatorio';
import Button from './Formulario/Button';
import MessageModal from './MessageModal';

export default function Dashboard() {
  const { token, idUnidade, idReservatorio, saveIdReservatorio } = useUser();

  const [reservatorios, setReservatorios] = useState([]);
  const [repoAtual, setRepoAtual] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCadastroVisible, setModalCadastroVisible] = useState(false);
  const [clima, setClima] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [dadosStatus, setDadosStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historico, setHistorico] = useState([]);
  const [leituraAtual, setLeituraAtual] = useState(null);
  const [ultimoAlerta, setUltimoAlerta] = useState(null);
  
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalIsSuccess, setModalIsSuccess] = useState(false);

  useEffect(() => {
    const carregarHistorico = async () => {
      if (!repoAtual?.idReservatorio) return;

      try {
        const historico = await fetchHistoricoReservatorio(token, repoAtual.idReservatorio);
        const ultimos7 = historico.slice(0, 7).reverse();
        const dadosFormatados = ultimos7.map(item => ({
          value: item.nivelLitros,
          label: item.data_hora.split('T')[0].split('-').reverse().join('/'),
          frontColor: colors.primary,
        }));
        setHistorico(dadosFormatados);
      } catch (err) {
        console.error('Erro ao carregar histórico:', err);
      }
    };

    carregarHistorico();
  }, [repoAtual]);

  useEffect(() => {
    const carregarReservatorios = async () => {
      try {
        const lista = await fetchReservatorios(token);
        setReservatorios(lista);

        const atual = lista.find(r => r.idReservatorio === idReservatorio) || lista[0];
        setRepoAtual(atual);

        if (atual && (!idReservatorio || idReservatorio !== atual.idReservatorio)) {
          await saveIdReservatorio(atual.idReservatorio);
        }
      } catch (error) {
        console.error('Erro ao buscar reservatórios:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token && loading) carregarReservatorios();
  }, [token, loading]);

  useEffect(() => {
    if (loading || !repoAtual) return;

    const carregarDistribuicaoStatus = async () => {
      try {
        const historico = await fetchHistoricoReservatorio(token, repoAtual.idReservatorio);

        const statusCores = {
          Cheio: '#4CAF50',
          Normal: '#FFC107',
          Baixo: '#2196F3',
          Crítico: '#F44336',
          Esvaziado: '#9E9E9E',
        };

        const contagem = {};

        historico.forEach(({ status }) => {
          const nome = status?.status;
          if (nome) contagem[nome] = (contagem[nome] || 0) + 1;
        });

        const total = Object.values(contagem).reduce((acc, val) => acc + val, 0);
        if (total === 0) {
          setDadosStatus([]);
          return;
        }

        const formatado = Object.entries(contagem).map(([nome, qtd]) => ({
          value: qtd,
          color: statusCores[nome] || '#000',
          text: nome,
        }));

        setDadosStatus(formatado);
      } catch (err) {
        console.error('Erro ao carregar status do gráfico de pizza:', err);
      }
    };
    const carregarPerfilEClima = async () => {
      try {
        const perfilData = await fetchPerfilUsuario(token, repoAtual.idReservatorio);
        setPerfil(perfilData);

        const enderecoData = await fetchEndereco(token);
        const cidade = enderecoData?.cidade;

        if (cidade) {
          const climaData = await fetchClimaByCidade(cidade);
          setClima(climaData);
        } else {
          setClima({ chance: 0, description: 'Cidade não cadastrada' });
        }
      } catch (err) {
        console.error('Erro ao carregar perfil/clima:', err);
        setClima({ chance: 0, description: 'Erro ao carregar dados' });
      }
    };

    const carregarLeituraAtual = async () => {
    try {
      const leitura = await fetchLeituraDispositivo(token, repoAtual.idReservatorio);
      const ultimaLeitura = leitura.content[leitura.content.length - 1];
      setLeituraAtual(ultimaLeitura);
    } catch (err) {
      console.error('Erro ao carregar leitura atual:', err);
    }
  };

    carregarDistribuicaoStatus();
    carregarPerfilEClima();
    carregarLeituraAtual();
  }, [repoAtual, loading]);

  useEffect(() => {
    const carregarAlertaSimulado = async () => {
      if (!repoAtual) return;

      const nivel = leituraAtual?.nivelPct ?? 0;

      try {
        const notificacoes = await fetchNotificacoes(repoAtual.idReservatorio, nivel, 0);
        setUltimoAlerta(notificacoes.content?.[0] || null);
      } catch (err) {
        console.error('Erro ao buscar alerta:', err);
      }
    };

    carregarAlertaSimulado();
  }, [repoAtual, leituraAtual]);

  const handleCadastrarReservatorio = async (nome, capacidade) => {

    if (!nome || !capacidade || !idUnidade) {
      console.warn('Campos obrigatórios ausentes');
      return;
    }

    try {
      const data = {
        nome,
        capacidadeTotalLitros: Number(capacidade),
        unidade: {
          idUnidade: Number(idUnidade),
        },
      };

      const response = await cadastrarReservatorio(token, data);
      await saveIdReservatorio(response.idReservatorio);
      setModalCadastroVisible(false);
      setRepoAtual(null);
      setLoading(true);
    } catch (error) {
      console.error('Erro ao cadastrar reservatório:', error);
      setModalMessage(error.message);
      setModalIsSuccess(false);
      setModalErrorVisible(true);
    }
  };

  const handleTrocarRepo = (repo) => {
    saveIdReservatorio(repo.idReservatorio);
    setRepoAtual(repo);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!repoAtual) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.centeredButton}>
          <Button
            title="Adicionar Reservatório"
            onPress={() => setModalCadastroVisible(true)}
            backgroundColor={colors.primary}
          />
        </View>

        <CadastroReservatorio
          visible={modalCadastroVisible}
          onClose={() => setModalCadastroVisible(false)}
          onCadastroSucesso={(nome, capacidade) => handleCadastrarReservatorio(nome, capacidade)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.repoHeader}>
        <Text style={styles.repoName}>{repoAtual.nomeReservatorio}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="swap-horizontal" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalCadastroVisible(true)}>
          <Icon name="plus-circle-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <StatusReservatorio leitura={leituraAtual} />
      <GraficoBarras dados={historico} />

      <View style={styles.graphRow}>
        <GraficoPizza dadosStatus={dadosStatus} />

        <View style={styles.alertContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="alert" size={26} color="#DC4D34" />
            <Text style={styles.alertTitle}>Alerta:</Text>
          </View>
          <Text style={styles.alertText}>{ultimoAlerta?.mensagem || 'Nenhum alerta no momento'}</Text>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <ChuvaContainer clima={clima} />
      </View>

      <ModalRepositorios
        modalVisible={modalVisible}
        repositorios={reservatorios}
        repoAtual={repoAtual}
        handleTrocarRepo={handleTrocarRepo}
        setModalVisible={setModalVisible}
      />

      <CadastroReservatorio
        visible={modalCadastroVisible}
        onClose={() => setModalCadastroVisible(false)}
        onCadastroSucesso={handleCadastrarReservatorio}
      />

      <MessageModal
        visible={modalErrorVisible}
        message={modalMessage}
        isSuccess={modalIsSuccess}
        onClose={() => setModalErrorVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  repoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  repoName: {
    fontSize: 18,
    fontWeight: '600',
  },
  graphRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  centeredButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
