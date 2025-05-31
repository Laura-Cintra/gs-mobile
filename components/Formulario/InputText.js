import { TextInput, Text, View, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function InputText({ label, placeholder, value, onChangeText, keyboardType = 'default', secureTextEntry = false }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 16 
  },
  label: { 
    marginBottom: 4, 
    fontWeight: '500' 
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
