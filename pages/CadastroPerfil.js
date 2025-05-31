import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import StepCircle from '../components/Formulario/StepCircle';
import InputText from '../components/Formulario/InputText';
import Button from '../components/Formulario/Button';
import colors from '../theme/colors';
import FormTitle from '../components/Formulario/Title';
import { useNavigation } from '@react-navigation/native';

export default function CadastroPerfil() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleNext = () => {
    navigation.navigate('CadastroUnidade', { perfil: { nome, email, senha } });
  };

  return (
    <View style={styles.container}>
      <View>
        <FormTitle subtitle="Perfil"/>
        <StepCircle currentStep={1} />
      </View>
      <InputText label="Nome" placeholder="Insira o nome do seu prédio" value={nome} onChangeText={setNome} />
      <InputText label="E-mail" placeholder="Insira seu e-mail" value={email} onChangeText={setEmail} keyboardType="email-address"/>
      <InputText label="Senha" placeholder="Insira sua senha" value={senha} onChangeText={setSenha} secureTextEntry/>

      <View style={styles.button}>
        <Button title="Limpar" backgroundColor={colors.lightSecondary} onPress={() => { setNome(''); setEmail(''); setSenha(''); }} />
        <Button title="Enviar" backgroundColor={colors.primary} onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  button: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 20
  },
});
