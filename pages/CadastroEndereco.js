import { StyleSheet, View } from 'react-native';
import StepCircle from '../components/Formulario/StepCircle';
import FormTitle from '../components/Formulario/Title';

export default function CadastroEndereco({ navigation, route }) {

  return (
    <View style={styles.container}>
      <View>
        <FormTitle subtitle="Endereço"/>
        <StepCircle currentStep={3} />
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
