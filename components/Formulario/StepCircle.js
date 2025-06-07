import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";

export default function StepCircle({ currentStep }) {
  const navigation = useNavigation();

  const steps = [
    { step: 1, screen: "CadastroPerfil" },
    { step: 2, screen: "CadastroUnidade" },
    { step: 3, screen: "CadastroEndereco" },
  ];

  return (
    <View style={styles.container}>
      {steps.map(({ step, screen }) => (
        <TouchableOpacity
          key={step}
          onPress={() => navigation.navigate(screen)}
        >
          <View
            style={[
              styles.circle,
              currentStep === step ? styles.ativo : styles.inativo,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  ativo: {
    backgroundColor: colors.primary,
  },
  inativo: {
    backgroundColor: colors.lightSecondary,
  },
});
