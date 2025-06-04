import { View, Text, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import InputText from '../components/Formulario/InputText';
import Button from '../components/Formulario/Button';
import colors from '../theme/colors';
import appLogo from '../assets/logo-agua.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // lógica de login virá depois
    console.log('Login:', { email, senha });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.header}>
        <Image
          source={appLogo}
          style={styles.logo}
          resizeMode="contain"
        />
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
        title="Entrar"
        onPress={handleLogin}
        backgroundColor={colors.primary}
      />

      <Text style={styles.registerText}>
        Ainda não tem uma conta?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('CadastroPerfil')}>
          Registrar
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 35,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    color: colors.border,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: '700',
  },
});
