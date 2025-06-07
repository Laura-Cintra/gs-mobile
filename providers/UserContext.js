import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [idUnidade, setIdUnidade] = useState(null);
  const [idReservatorio, setIdReservatorio] = useState(null);

  useEffect(() => {
    // carregar dados salvos no storage ao abrir o app
    const loadStoredData = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      const savedUnidade = await AsyncStorage.getItem('idUnidade');
      const savedReservatorio = await AsyncStorage.getItem('idReservatorio');

      if (savedToken) setToken(savedToken);
      if (savedUnidade) setIdUnidade(Number(savedUnidade));
      if (savedReservatorio) setIdReservatorio(Number(savedReservatorio));
    };

    loadStoredData();
  }, []);

  const login = async (tokenRecebido) => {
    setToken(tokenRecebido);
    await AsyncStorage.setItem('token', tokenRecebido);
  };

  const saveIdUnidade = async (id) => {
    setIdUnidade(id);
    await AsyncStorage.setItem('idUnidade', id.toString());
  };

  const saveIdReservatorio = async (id) => {
    setIdReservatorio(id);
    await AsyncStorage.setItem('idReservatorio', id.toString());
  };

  const logout = async () => {
    setToken(null);
    setIdUnidade(null);
    setIdReservatorio(null);
    await AsyncStorage.clear();
  };

  return (
    <UserContext.Provider value={{
      token,
      idUnidade,
      idReservatorio,
      login,
      logout,
      saveIdUnidade,
      saveIdReservatorio,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);