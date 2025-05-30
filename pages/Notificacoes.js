import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

export default function Notificacoes() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Notificações</Text>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: { 
    flex: 1, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#465FC0'
  }
});