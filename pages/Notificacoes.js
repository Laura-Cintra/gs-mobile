import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import NotificacaoItem from "../components/NotificacaoItem";
import colors from "../theme/colors";
import {
  fetchNotificacoes,
  fetchLeituraDispositivo,
} from "../services/actions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MenuSuperior from "../components/MenuSuperior";
import { useUser } from "../providers/UserContext";

export default function Notificacoes() {
  const { token, idReservatorio } = useUser();

  const [data, setData] = useState([]);
  const [nivelPct, setNivelPct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [pageable, setPageable] = useState({
    last: false,
    first: false,
    page: 0,
  });

  useEffect(() => {
    if (!idReservatorio) return;

    const carregarTudo = async () => {
      try {
        setLoading(true);
        const leitura = await fetchLeituraDispositivo(token, idReservatorio);
        const ultimaLeitura = leitura.content?.[leitura.content.length - 1];
        const pct = ultimaLeitura?.nivelPct ?? 0;

        const response = await fetchNotificacoes(
          idReservatorio,
          pct,
          pageable.page
        );

        setNivelPct(pct);
        setData(response.content);
        setPageable({
          last: response.last,
          first: response.first,
          page: response.page,
        });
      } catch (error) {
        console.error("Erro ao carregar notificações:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarTudo();
  }, [idReservatorio, pageable.page, token]);

  const nextPage = () => {
    if (!pageable.last) {
      setPageable((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const previousPage = () => {
    if (!pageable.first) {
      setPageable((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  return (
    <ScrollView>
      <MenuSuperior />
      <View style={styles.container}>
        <Text style={styles.title}>Histórico</Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
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
              <Text style={styles.mensagemNull}>
                Nenhuma notificação encontrada.
              </Text>
            )}
          </View>
        )}

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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  lista: {
    flex: 1,
  },
  mensagemNull: {
    textAlign: "center",
    color: colors.placeholder,
    marginTop: 20,
  },
  paginacao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  setaAtiva: {
    backgroundColor: colors.primary,
    padding: 2,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  setaInativa: {
    backgroundColor: colors.lightSecondary,
  },
  numPagina: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
