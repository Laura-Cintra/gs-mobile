import { StyleSheet, View, Alert, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import StepCircle from '../components/Formulario/StepCircle';
import FormTitle from '../components/Formulario/Title';
import InputText from '../components/Formulario/InputText';
import InputSelect from '../components/Formulario/InputSelect';
import Button from '../components/Formulario/Button';
import colors from '../theme/colors';
import { ScrollView } from 'react-native-gesture-handler';

export default function CadastroEndereco({ navigation, route }) {
  const [logradouro, setLogradouro] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');

  const mockCidades = [
    { label: 'São Paulo', value: 'sp' },
    { label: 'Rio de Janeiro', value: 'rj' },
  ];

  const mockEstados = [
    { label: 'São Paulo', value: 'sp' },
    { label: 'Rio de Janeiro', value: 'rj' },
  ];

  const mockPaises = [
    { label: 'Brasil', value: 'br' },
    { label: 'Argentina', value: 'ar' },
  ];

  const handleSubmit = () => {
    const cepValido = /^[0-9]+$/.test(cep);
    if (!cepValido) {
      Alert.alert('Erro', 'CEP deve conter apenas números.');
      return;
    }
    const payload = {
      ...route.params,
      endereco: { logradouro, cep, cidade, estado, pais }
    };
    console.log('Payload:', payload);
    Alert.alert('Simulação', 'Cadastro simulado com sucesso!');
    navigation.navigate('MainApp');
  };

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.container}>
        <View>
          <FormTitle subtitle="Endereço"/>
          <StepCircle currentStep={3} />
        </View>

        <InputText label="Logradouro" placeholder="Insira o logradouro do seu prédio" value={logradouro} onChangeText={setLogradouro} />
        <InputText label="CEP" placeholder="Somente números" value={cep} onChangeText={setCep} keyboardType="numeric" />
        <InputSelect label="Cidade" selectedValue={cidade} onValueChange={setCidade} items={mockCidades} />
        <InputSelect label="Estado" selectedValue={estado} onValueChange={setEstado} items={mockEstados} />
        <InputSelect label="País" selectedValue={pais} onValueChange={setPais} items={mockPaises} />

        <View style={styles.button}>
          <Button title="Limpar" backgroundColor={colors.lightSecondary} onPress={() => { setLogradouro(''); setCep(''); setCidade(''); setEstado(''); setPais(''); }} />
          <Button title="Enviar" backgroundColor={colors.primary} onPress={handleSubmit} />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
});
