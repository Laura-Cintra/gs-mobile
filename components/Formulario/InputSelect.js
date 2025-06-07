import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../../theme/colors";

export default function InputSelect({
  label,
  selectedValue,
  onValueChange,
  items,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.select}
        >
          <Picker.Item label={`Selecione ${label.toLowerCase()}`} value="" />
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: "600",
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
  },
  select: {
    paddingHorizontal: 16,
  },
});
