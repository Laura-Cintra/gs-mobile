import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress, backgroundColor }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
