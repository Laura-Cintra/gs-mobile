// const API_URL = 'http://localhost:8080';
const API_URL = "https://maisagua-api.onrender.com";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função pra tratar erro
const handleError = async (response) => {
  if (!response.ok) {
    let errorMessage = "Erro na requisição";

    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } catch (_) {
      // Fallback para erro genérico se não conseguir parsear o JSON
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

// Login
export async function login(data) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await handleError(response);
  return json.token;
}

// Cadastro
export async function cadastroCompleto(data) {
  const response = await fetch(`${API_URL}/cadastro-completo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleError(response);
}

// Unidades do usuário
export async function fetchUnidades(token) {
  const response = await fetch(`${API_URL}/unidade`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleError(response);
}

// Reservatórios do usuário
export async function fetchReservatorios(token) {
  const response = await fetch(`${API_URL}/reservatorio`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleError(response);
}

// Cadastrar reservatório
export async function cadastrarReservatorio(token, data) {
  const response = await fetch(`${API_URL}/reservatorio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return handleError(response);
}

// Atualizar um reservatório
export async function atualizarReservatorio(token, idReservatorio, data) {
  const response = await fetch(`${API_URL}/reservatorio/${idReservatorio}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return handleError(response);
}

// Deletar um reservatório
export async function deletarReservatorio(token, idReservatorio) {
  const response = await fetch(`${API_URL}/reservatorio/${idReservatorio}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o reservatório");
  }

  return true;
}

// Leitura atual do dispositivo
export async function fetchLeituraDispositivo(token, idReservatorio) {
  const response = await fetch(
    `${API_URL}/leitura-dispositivo?idReservatorio=${idReservatorio}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return handleError(response);
}

// Perfil
export async function fetchPerfilUsuario(token, idReservatorio) {
  const response = await fetch(`${API_URL}/perfil/${idReservatorio}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleError(response);
}

// Cidades
export async function fetchCidades() {
  const response = await fetch(`${API_URL}/cidades`);
  return handleError(response);
}

// Histórico
export async function fetchHistoricoReservatorio(token, idReservatorio) {
  const response = await fetch(
    `${API_URL}/historico-reservatorio?idReservatorio=${idReservatorio}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return handleError(response);
}

// Endereço do usuário
export async function fetchEndereco(token) {
  const response = await fetch(`${API_URL}/endereco`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await handleError(response);
  return data?.[0]; // pega o primeiro endereço
}

// Clima - Openweather
export const cidadesCoordenadas = {
  "São Paulo": { lat: -23.55052, lon: -46.633308 },
  Campinas: { lat: -22.90556, lon: -47.06083 },
  "Belo Horizonte": { lat: -19.9167, lon: -43.9345 },
  Curitiba: { lat: -25.4284, lon: -49.2733 },
  Salvador: { lat: -12.9714, lon: -38.5014 },
};

const OPENWEATHER_API_KEY = "b98e0c72b55b311214a69b3bcb6fba6a";
const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function fetchClimaByCidade(nomeCidade) {
  try {
    const cidade = cidadesCoordenadas[nomeCidade];
    if (!cidade) throw new Error("Cidade não cadastrada no mapa local");

    const { lat, lon } = cidade;

    const response = await fetch(
      `${OPENWEATHER_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    );

    const data = await response.json();

    const nextForecast = data.list[0];
    const chance = nextForecast.pop ? Math.round(nextForecast.pop * 100) : 0;
    const description =
      nextForecast.weather?.[0]?.description || "Não disponível";

    return { chance, description };
  } catch (error) {
    console.error("Erro ao buscar previsão de chuva:", error);
    return { chance: 0, description: "Erro ao buscar clima" };
  }
}

// Alertas de acordo com o nivelAtual
export async function fetchNotificacoes(idReservatorio, nivelPct, page = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let mensagem = "";

      if (nivelPct >= 90) {
        mensagem = "Reservatório está cheio!";
      } else if (nivelPct >= 70) {
        mensagem = "Nível dentro do normal";
      } else if (nivelPct >= 40) {
        mensagem = "Reservatório com nível baixo";
      } else if (nivelPct >= 10) {
        mensagem = "Nível crítico, risco de falta de água";
      } else if (nivelPct > 0) {
        mensagem = "Reservatório praticamente vazio!";
      } else {
        mensagem = "Reservatório vazio!";
      }

      const pageSize = 7;
      const data = [];
      const totalPages = Math.ceil(data.length / pageSize);
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(
        2,
        "0"
      )}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${String(
        currentDate.getFullYear()
      ).slice(-2)}`;

      if (page === 0) {
        data.push({
          id_alerta: idReservatorio * 100 + page + 1,
          id_reservatorio: idReservatorio,
          mensagem,
          data_alerta: formattedDate,
        });
      }

      resolve({
        content: data,
        page,
        first: page === 0,
        last: page === totalPages - 1,
      });
    }, 600);
  });
}
