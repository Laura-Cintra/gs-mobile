import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function MessageModal({ visible, message, isSuccess, onClose, onConfirm }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            isSuccess ? styles.successModal : styles.errorModal,
          ]}
        >
          <Text style={styles.modalText}>{message}</Text>
          {onConfirm ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={[styles.modalButtonText, { color: colors.white }]}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  successModal: {
    backgroundColor: colors.modalGreen,
  },
  errorModal: {
    backgroundColor: colors.modalRed,
  },
  modalText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
