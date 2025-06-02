import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import NotificacaoItem from '../components/NotificacaoItem';
import Button from '../components/Formulario/Button';
import colors from '../theme/colors';
import { fetchNotificacoes, limparHistorico } from '../services/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Notificacoes() {
  const [data, setData] = useState([]);
  const [pageable, setPageable] = useState({
    last: false,
    first: false,
    page: 0
  });

  const getNotificacoes = async () => {
    try {
      const response = await fetchNotificacoes(pageable.page);
      setData(response.content);
      setPageable({
        last: response.last,
        first: response.first,
        page: response.page
      });
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };

  useEffect(() => {
    getNotificacoes();
  }, [pageable.page]);

  const nextPage = () => {
    if (!pageable.last) {
      setPageable(prev => ({
        ...prev,
        page: prev.page + 1
      }));
    }
  };

  const previousPage = () => {
    if (!pageable.first) {
      setPageable(prev => ({
        ...prev,
        page: prev.page - 1
      }));
    }
  };

  const handleLimpar = async () => {
    try {
      await limparHistorico();
      getNotificacoes();
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>

      <View style={styles.lista}>
        {data.length > 0 ? (
          data.map((item) => (
            <NotificacaoItem
              key={item.id_alerta}
              data={item.data_alerta}
              mensagem={item.mensagem}
            />
          ))
        ) : (
          <Text style={styles.mensagemNull}>Nenhuma notificação encontrada.</Text>
        )}
      </View>
        
      <View style={styles.paginacao}>
        <TouchableOpacity
          style={[styles.setaAtiva, pageable.first && styles.setaInativa]}
          onPress={!pageable.first ? previousPage : undefined}
        >
          <Icon name="chevron-left" size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.numPagina}>
          <Text>{pageable.page + 1}</Text>
        </View>

        <TouchableOpacity
          style={[styles.setaAtiva, pageable.last && styles.setaInativa]}
          onPress={!pageable.last ? nextPage : undefined}
        >
          <Icon name="chevron-right" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <Button
        title="Limpar histórico"
        backgroundColor={colors.primary}
        onPress={handleLimpar}
      />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    flex: 1
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20
  },
  lista: {
    flex: 1
  },
  mensagemNull: {
    textAlign: 'center',
    color: colors.placeholder,
    marginTop: 20
  },
  paginacao: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  setaAtiva: {
    backgroundColor: colors.primary,
    padding: 2,
    borderRadius: 20,
    marginHorizontal: 10
  },
  setaInativa: {
    backgroundColor: colors.lightSecondary
  },
  numPagina: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});
