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


// Dashboard

const OPENWEATHER_API_KEY = 'b98e0c72b55b311214a69b3bcb6fba6a';
const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export async function fetchClima(lat = -23.55052, lon = -46.633308) {
  try {
    const response = await fetch(
      `${OPENWEATHER_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    );

    const data = await response.json();

    const nextForecast = data.list[0];

    const chance = nextForecast.pop ? Math.round(nextForecast.pop * 100) : 0;
    const description = nextForecast.weather?.[0]?.description || 'Não disponível';

    return { chance, description };
  } catch (error) {
    console.error('Erro ao buscar previsão de chuva:', error);
    return { chance: 0, description: 'Erro ao buscar clima' };
  }
}

// simulando
export async function fetchRepositorios() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          nome: 'Repositório principal',
          nivelAtual: 750,
          ph: 6.1,
          statusPh: 'Baixo',
          descPH: 'Levemente ácido',
          historico: [
            { dia: 'Dom', nivel: 300 },
            { dia: 'Seg', nivel: 400 },
            { dia: 'Ter', nivel: 500 },
            { dia: 'Qua', nivel: 600 },
            { dia: 'Qui', nivel: 700 },
            { dia: 'Sex', nivel: 800 },
            { dia: 'Sáb', nivel: 900 }
          ]
        },
        {
          id: 2,
          nome: 'Repositório secundário',
          nivelAtual: 500,
          ph: 7.0,
          statusPh: 'Baixo',
          descPH: 'Neutro',
          historico: [
            { dia: 'Dom', nivel: 200 },
            { dia: 'Seg', nivel: 250 },
            { dia: 'Ter', nivel: 300 },
            { dia: 'Qua', nivel: 350 },
            { dia: 'Qui', nivel: 400 },
            { dia: 'Sex', nivel: 450 },
            { dia: 'Sáb', nivel: 500 }
          ]
        }
      ]);
    }, 500); // simula delay
  });
}

// const BASE_URL = 'https://seu-backend.com/api';

// export async function fetchRepositorios() {
//   try {
//     const response = await fetch(`${BASE_URL}/repositorios`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Erro ao buscar repositórios:', error);
//     return [];
//   }
// }

// const OPENWEATHER_API_KEY = 'b98e0c72b55b311214a69b3bcb6fba6a';

// const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
// const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// export async function fetchChuvaPorCidade(cityName = 'São Paulo') {
//   try {
//     // Passo 1: Obter lat/lon com base no nome da cidade
//     const geoResponse = await fetch(
//       `${GEO_URL}?q=${encodeURIComponent(cityName)}&limit=1&appid=${OPENWEATHER_API_KEY}`
//     );
//     const geoData = await geoResponse.json();

//     if (!geoData.length) {
//       throw new Error('Cidade não encontrada');
//     }

//     const { lat, lon } = geoData[0];

//     // Passo 2: Obter previsão com base em lat/lon
//     const forecastResponse = await fetch(
//       `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
//     );
//     const forecastData = await forecastResponse.json();

//     // Previsão mais próxima (próximas 3h)
//     const nextForecast = forecastData.list[0];
//     const chance = nextForecast.pop ? Math.round(nextForecast.pop * 100) : 0;

//     return { chance };
//   } catch (error) {
//     console.error('Erro ao buscar previsão de chuva por cidade:', error);
//     return { chance: 0 };
//   }
// }

