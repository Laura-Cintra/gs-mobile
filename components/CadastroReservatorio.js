import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import FormTitle from './Formulario/Title';
import InputText from './Formulario/InputText';
import Button from './Formulario/Button';
import colors from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MessageModal from './MessageModal';

export default function CadastroReservatorio({ visible, onClose, onCadastroSucesso, reservatorioInicial }) {
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSuccess, setMessageSuccess] = useState(false);

  useEffect(() => {
    if (visible && reservatorioInicial) {
      setNome(reservatorioInicial.nomeReservatorio || '');
      setCapacidade(reservatorioInicial.capacidadeTotalLitros?.toString() || '');
    } else if (visible) {
      setNome('');
      setCapacidade('');
    }
  }, [visible, reservatorioInicial])

  const handleCadastrar = () => {
  if (!nome || !capacidade) {
    setMessageText('Por favor, preencha todos os campos obrigatórios.');
    setMessageSuccess(false);
    setMessageVisible(true);
    return;
  }

    onCadastroSucesso(nome, capacidade);
    handleLimpar();
    onClose();
  };

  const handleLimpar = () => {
    setNome('');
    setCapacidade('');
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Icon name="close" size={20} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.title}>
            <FormTitle subtitle="Reservatório" />
          </View>

          <InputText
            label="Nome do reservatório"
            placeholder="Insira o nome do reservatório"
            value={nome}
            onChangeText={setNome}
          />

          <InputText
            label="Capacidade total de litros"
            placeholder="Ex: 1000"
            value={capacidade}
            onChangeText={setCapacidade}
            keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Limpar"
              backgroundColor={colors.lightSecondary}
              onPress={handleLimpar}
            />
            <Button
              title={reservatorioInicial ? 'Atualizar' : 'Enviar'}
              backgroundColor={colors.primary}
              onPress={handleCadastrar}
            />
          </View>
        </View>
        <MessageModal
          visible={messageVisible}
          message={messageText}
          isSuccess={messageSuccess}
          onClose={() => setMessageVisible(false)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  modalContent: {
    width: '85%',
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  }
});

