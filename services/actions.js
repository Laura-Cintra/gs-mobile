const API_URL = 'http://localhost:8080/';

// export async function fetchNotificacoes(page = 0) {
//   try {
//     const response = await fetch(`${API_URL}/notificacoes?page=${page}`);
//     return await response.json();
//   } catch (error) {
//     console.error('Erro ao buscar notificações:', error);
//     throw error;
//   }
// }

// export async function limparHistorico() {
//   try {
//     const response = await fetch(`${API_URL}/notificacoes`, {
//       method: 'DELETE'
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('Erro ao limpar histórico:', error);
//     throw error;
//   }
// }

// Simulação gpt

export async function fetchNotificacoes(page = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeData = [];

      const totalPages = 3;
      const pageSize = 7;

      for (let i = 0; i < pageSize; i++) {
        const index = page * pageSize + i + 1;
        fakeData.push({
          id_alerta: index,
          mensagem: `Alerta simulado nº ${index}`,
          data_alerta: '29/05/2025'
        });
      }

      resolve({
        content: fakeData,
        page: page,
        first: page === 0,
        last: page === totalPages - 1
      });
    }, 800); // Delay simulado
  });
}

export async function limparHistorico() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Histórico apagado' });
    }, 500);
  });
}