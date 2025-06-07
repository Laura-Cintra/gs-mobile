import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import StepCircle from "../components/Formulario/StepCircle";
import InputText from "../components/Formulario/InputText";
import Button from "../components/Formulario/Button";
import colors from "../theme/colors";
import FormTitle from "../components/Formulario/Title";
import { useNavigation } from "@react-navigation/native";
import MessageModal from "../components/MessageModal";

export default function CadastroPerfil() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIsSuccess, setModalIsSuccess] = useState(false);

  const handleNext = () => {
    if (!nome || !email || !senha) {
      setModalMessage("Todos os campos devem ser preenchidos.");
      setModalIsSuccess(false);
      setModalVisible(true);
      return;
    }

    if (senha.length < 5) {
      setModalMessage("A senha deve ter no mínimo 5 caracteres.");
      setModalIsSuccess(false);
      setModalVisible(true);
      return;
    }

    navigation.navigate("CadastroUnidade", { perfil: { nome, email, senha } });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <FormTitle subtitle="Perfil" />
            <StepCircle currentStep={1} />
          </View>
          <InputText
            label="Nome"
            placeholder="Insira seu nome"
            value={nome}
            onChangeText={setNome}
          />
          <InputText
            label="E-mail"
            placeholder="Insira seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <InputText
            label="Senha"
            placeholder="Insira sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <View style={styles.button}>
            <Button
              title="Limpar"
              backgroundColor={colors.lightSecondary}
              onPress={() => {
                setNome("");
                setEmail("");
                setSenha("");
              }}
            />
            <Button
              title="Enviar"
              backgroundColor={colors.primary}
              onPress={handleNext}
            />
          </View>

          <Text style={styles.loginText}>
            Já tem uma conta?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate("Login")}
            >
              Entrar
            </Text>
          </Text>

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
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    color: colors.border,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: "700",
  },
});
