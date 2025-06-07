import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import InputText from "../components/Formulario/InputText";
import Button from "../components/Formulario/Button";
import colors from "../theme/colors";
import appLogo from "../assets/logo-agua.png";
import MessageModal from "../components/MessageModal";

import { useUser } from "../providers/UserContext";
import { login, fetchUnidades } from "../services/actions";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIsSuccess, setModalIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login: saveToken, saveIdUnidade } = useUser();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const token = await login({ email, senha });
      await saveToken(token);

      const unidades = await fetchUnidades(token);
      if (unidades.length > 0) {
        await saveIdUnidade(unidades[0].idUnidade);
      }

      setModalMessage("Login realizado com sucesso!");
      setModalIsSuccess(true);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        navigation.replace("MainApp");
      }, 2000);
    } catch (error) {
      console.log("Erro no login:", error);

      let errorMessage = "Erro desconhecido.";
      if (error.status === 401 || error.status === 403) {
        errorMessage = "Credenciais inválidas.";
      } else if (error instanceof TypeError) {
        errorMessage = "Erro de conexão. Verifique sua internet.";
      }

      setModalMessage(errorMessage);
      setModalIsSuccess(false);
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.header}>
        <Image source={appLogo} style={styles.logo} resizeMode="contain" />
      </View>

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
        secureTextEntry={true}
      />

      <Button
        title={isLoading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
        backgroundColor={colors.primary}
        disabled={isLoading}
      />

      <Text style={styles.registerText}>
        Ainda não tem uma conta?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("CadastroPerfil")}
        >
          Registrar
        </Text>
      </Text>

      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        isSuccess={modalIsSuccess}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 35,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
  registerText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    color: colors.border,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: "700",
  },
});
