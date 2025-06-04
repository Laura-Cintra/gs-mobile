import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import CadastroPerfil from './CadastroPerfil';
import MenuSuperior from '../components/MenuSuperior';
import Dashboard from '../components/Dashboard';

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* <Text style={styles.title}>Home</Text> */}
          {/* <MenuSuperior/> */}
          <Dashboard/>
          {/* <CadastroPerfil/> */}
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