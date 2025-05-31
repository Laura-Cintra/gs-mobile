import { StyleSheet, View } from 'react-native';
import StepCircle from '../components/Formulario/StepCircle';
import FormTitle from '../components/Formulario/Title';
import InputText from '../components/Formulario/InputText';
import Button from '../components/Formulario/Button';
import colors from '../theme/colors';
import { useState } from 'react';

export default function CadastroUnidade({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [apartamentos, setApartamentos] = useState('');

  const handleNext = () => {
    navigation.navigate('CadastroEndereco', {
      ...route.params,
      unidade: { nome, capacidade, apartamentos }
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <FormTitle subtitle="Unidade"/>
        <StepCircle currentStep={2} />
      </View>

      <InputText label="Nome" placeholder="Insira o nome do seu prédio" value={nome} onChangeText={setNome} />
      <InputText label="Capacidade Reservatório (mL)" placeholder="Ex.: 10000" value={capacidade} onChangeText={setCapacidade} keyboardType="numeric" />
      <InputText label="Quantidade de apartamentos" placeholder="Ex.: 20" value={apartamentos} onChangeText={setApartamentos} keyboardType="numeric" />

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
