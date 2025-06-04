import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import { fetchRepositorios, fetchClima } from '../services/actions';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import CadastroReservatorio from './CadastroReservatório';

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

  const dadosGrafico = repoAtual.historico.map((dia) => ({
    value: dia.nivel,
    label: dia.dia,
    frontColor: colors.primary,
    topLabelComponent: () => (
    <Text style={{ color: colors.textSecondary, fontSize: 10 }}>
      {dia.nivel}
    </Text>
  )
  }));

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

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nível do reservatório</Text>
        <Text style={styles.subTitle}>Últimos 7 dias</Text>
        <BarChart
          data={dadosGrafico}
          barWidth={20}
          height={150}
          spacing={20}
          noOfSections={4}
          yAxisThickness={0}
          isAnimated
          barBorderRadius={4}
        />
      </View>

      <View style={styles.graphRow}>
        <View style={styles.graphBox}>
        <Text style={styles.subTitle}>Distribuição de Status</Text>
        <View style={{flexDirection: 'row'}}>
          <PieChart
            data={dadosStatus.map(item => ({
              value: item.value,
              color: item.color,
              text: `${item.value}%`,
            }))}
            showText
            textColor="#000"
            radius={60}
            innerRadius={0}
            textSize={14}
            isAnimated
          />

          <View style={styles.legendContainer}>
            {dadosStatus.map(item => (
              <View key={item.text} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text>{item.text}</Text>
              </View>
            ))}
          </View>
          </View>
        </View>

        <View style={styles.alertContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="alert" size={26} color="#DC4D34" />
            <Text style={styles.alertTitle}>Alerta: </Text>
          </View>
          <Text style={styles.alertText}>Teste muito muito grande aaaaaaaaaaa</Text>
        </View>
      </View>
      
      <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.chuvaContainer}>
          <Icon name="weather-pouring" size={35} color={colors.primary} />
        <View>
          <Text style={styles.chuvaText}>
            Chance de chuva hoje: {clima ? clima.chance + '%' : '...'}
          </Text>
          <Text style={styles.descricaoText}>Tendência: {clima ? clima.description : 'Descrição não disponível'}</Text>
        </View>
      </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={20} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Escolha o repositório que deseja ver o relatório:
            </Text>

            {repositorios.map((repo) => (
              <Pressable
                key={repo.id}
                onPress={() => handleTrocarRepo(repo)}
                style={[
                  styles.modalItem,
                  repo.id === repoAtual.id && styles.modalItemSelected
                ]}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    repo.id === repoAtual.id && styles.modalItemTextSelected
                  ]}
                >
                  {repo.nome}
                </Text>

                {repo.id === repoAtual.id && (
                  <Icon name="check" size={16} color={colors.white} />
                )}
              </Pressable>
            ))}

            <Pressable onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#f9f9f9'
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
    paddingVertical: 20,
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 5
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10
  },
  graphRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  graphBox: {
    width: '65%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  legendContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 8,
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
  chuvaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 10,
    marginBottom: 70,
  },
  chuvaText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  descricaoText: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '400'
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#E0E2EB', // cinza claro
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'stretch',
    position: 'relative'
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: '500'
  },
  modalItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  modalItemSelected: {
    backgroundColor: colors.primary
  },
  modalItemText: {
    fontSize: 14,
    color: '#000'
  },
  modalItemTextSelected: {
    color: '#fff',
    fontWeight: 'bold'
  },
  modalButton: {
    marginTop: 10,
    alignSelf: 'center'
  },
  modalButtonText: {
    color: colors.primary,
    fontWeight: 'bold'
  }
});
