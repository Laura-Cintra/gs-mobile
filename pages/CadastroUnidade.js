import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import StepCircle from '../components/Formulario/StepCircle';
import FormTitle from '../components/Formulario/Title';
import InputText from '../components/Formulario/InputText';
import Button from '../components/Formulario/Button';
import colors from '../theme/colors';
import { useState } from 'react';
import MessageModal from '../components/MessageModal';

export default function CadastroUnidade({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [apartamentos, setApartamentos] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalIsSuccess, setModalIsSuccess] = useState(false);

  const handleNext = () => {
    if (!nome || !capacidade || !apartamentos) {
      setModalMessage('Todos os campos devem ser preenchidos.');
      setModalIsSuccess(false);
      setModalVisible(true);
      return;
    }

    navigation.navigate('CadastroEndereco', {
      ...route.params,
      unidade: { nome, capacidade, apartamentos }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.container}>
        <View>
          <FormTitle subtitle="Unidade"/>
          <StepCircle currentStep={2} />
        </View>

        <InputText label="Nome" placeholder="Insira o nome do seu prédio" value={nome} onChangeText={setNome} />
        <InputText label="Capacidade da Unidade (mL)" placeholder="Ex.: 10000" value={capacidade} onChangeText={setCapacidade} keyboardType="numeric" />

        <View style={styles.button}>
          <Button title="Limpar" backgroundColor={colors.lightSecondary} onPress={() => { setNome(''); setCapacidade(''); setApartamentos(''); }} />
          <Button title="Enviar" backgroundColor={colors.primary} onPress={handleNext} />
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
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
});
