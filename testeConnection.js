const sql = require('mssql');

// Configuração da conexão
const config = {
  server: '10.3.171.42',  // Endereço IP ou nome do servidor SQL
  database: 'SIMPEQ_HOMOLOG',  // Nome do banco de dados
  options: {
    encrypt: false,  // Defina como true se estiver usando SSL
    trustServerCertificate: true,  // Pode ser necessário em conexões locais
  },
  // As credenciais são omitidas para autenticação do Windows
  // Certifique-se de não definir username e password para autenticação integrada
};

// Função para testar a conexão
async function testConnection() {
  try {
    // Conecta ao banco de dados
    await sql.connect(config);

    console.log('Conexão bem-sucedida ao banco de dados!');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } finally {
    // Fecha a conexão
    await sql.close();
  }
}

// Executa a função
testConnection();
