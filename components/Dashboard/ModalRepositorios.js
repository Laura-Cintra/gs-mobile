import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../theme/colors";

export default function ModalRepositorios({
  modalVisible,
  repositorios,
  repoAtual,
  handleTrocarRepo,
  setModalVisible,
}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={20} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>
            Escolha o reservatório que deseja ver o relatório:
          </Text>

          {repositorios.map((repo) => (
            <Pressable
              key={repo.idReservatorio}
              onPress={() => handleTrocarRepo(repo)}
              style={[
                styles.modalItem,
                repo.idReservatorio === repoAtual?.idReservatorio &&
                  styles.modalItemSelected,
              ]}
            >
              <Text
                style={[
                  styles.modalItemText,
                  repo.idReservatorio === repoAtual?.idReservatorio &&
                    styles.modalItemTextSelected,
                ]}
              >
                {repo.nomeReservatorio}
              </Text>
              {repo.idReservatorio === repoAtual?.idReservatorio && (
                <Icon name="check" size={16} color={colors.white} />
              )}
            </Pressable>
          ))}

          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#E0E2EB",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "stretch",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "500",
  },
  modalItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalItemSelected: {
    backgroundColor: colors.primary,
  },
  modalItemText: {
    fontSize: 14,
    color: "#000",
  },
  modalItemTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  modalButtonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
