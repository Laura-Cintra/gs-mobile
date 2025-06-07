import { StyleSheet, View, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import StepCircle from "../components/Formulario/StepCircle";
import FormTitle from "../components/Formulario/Title";
import InputText from "../components/Formulario/InputText";
import InputSelect from "../components/Formulario/InputSelect";
import Button from "../components/Formulario/Button";
import colors from "../theme/colors";
import { ScrollView } from "react-native-gesture-handler";
import { cadastroCompleto, fetchCidades } from "../services/actions";
import MessageModal from "../components/MessageModal";

export default function CadastroEndereco({ navigation, route }) {
  const [logradouro, setLogradouro] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [cidades, setCidades] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIsSuccess, setModalIsSuccess] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const cidadesData = await fetchCidades();
        setCidades(
          cidadesData.map((cidade) => ({
            label: cidade.nome,
            value: cidade.id,
          }))
        );
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }
    carregarDados();
  }, []);

  const handleSubmit = async () => {
    const cepValido = /^[0-9]+$/.test(cep);
    if (!cepValido) {
      setModalMessage("CEP deve conter apenas números.");
      setModalIsSuccess(false);
      setModalVisible(true);
      return;
    }

    const { perfil, unidade } = route.params;

    const payload = {
      nomeUsuario: perfil.nome,
      email: perfil.email,
      senha: perfil.senha,
      nomeUnidade: unidade.nome,
      capacidadeTotalLitros: Number(unidade.capacidade),
      logradouro,
      numero: Number(numero),
      complemento,
      cep,
      idCidade: cidade,
    };

    try {
      const response = await cadastroCompleto(payload);
      setModalMessage("Cadastro realizado com sucesso!");
      setModalIsSuccess(true);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setModalMessage("Ocorreu um erro ao realizar o cadastro.");
      setModalIsSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <FormTitle subtitle="Endereço" />
            <StepCircle currentStep={3} />
          </View>

          <InputText
            label="Logradouro"
            placeholder="Insira o logradouro do seu prédio"
            value={logradouro}
            onChangeText={setLogradouro}
          />
          <InputText
            label="Número"
            placeholder="Ex.: 123"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />
          <InputText
            label="Complemento (opcional)"
            placeholder="Ex.: Apartamento 202"
            value={complemento}
            onChangeText={setComplemento}
          />
          <InputText
            label="CEP"
            placeholder="Somente números"
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
          />
          <InputSelect
            label="Cidade"
            selectedValue={cidade}
            onValueChange={setCidade}
            items={cidades}
          />

          <View style={styles.button}>
            <Button
              title="Limpar"
              backgroundColor={colors.lightSecondary}
              onPress={() => {
                setLogradouro("");
                setCep("");
                setCidade("");
                setEstado("");
                setPais("");
              }}
            />
            <Button
              title="Enviar"
              backgroundColor={colors.primary}
              onPress={handleSubmit}
            />
          </View>

          <MessageModal
            visible={modalVisible}
            message={modalMessage}
            isSuccess={modalIsSuccess}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 35,
    marginVertical: "5%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
