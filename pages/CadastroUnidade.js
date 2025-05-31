import { StyleSheet, View } from 'react-native';
import StepCircle from '../components/Formulario/StepCircle';
import FormTitle from '../components/Formulario/Title';

export default function CadastroUnidade({ navigation, route }) {

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
});
