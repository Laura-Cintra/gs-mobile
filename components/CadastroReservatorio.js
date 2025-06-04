import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import FormTitle from './Formulario/Title';
import InputText from './Formulario/InputText';
import Button from './Formulario/Button';
import colors from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useAuth } from '../context/AuthContext';

export default function CadastroReservatorio({ visible, onClose, onCadastroSucesso }) {
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  // const { userData } = useAuth();

  const handleCadastrar = () => {
    console.log('Reservatório cadastrado');
    onCadastroSucesso();
    
    // console.log('Reservatório cadastrado:', {
    //   nome,
    //   capacidade: Number(capacidade),
    //   unidade_id: userData.id_unidade,
    // });
    // // lógica de POST virá depois
    // onClose();
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
              title="Enviar"
              backgroundColor={colors.primary}
              onPress={handleCadastrar}
            />
          </View>
        </View>
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

