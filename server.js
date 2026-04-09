// API simples em Node.js com Express para demonstrar OWASP A08:2025
// Software or Data Integrity Failures (Falhas de integridade de software ou dados)

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Limitar o tamanho da carga útil para reduzir o abuso em demonstrações
app.use(express.json({ limit: '10kb' }));

// Armazenamento em memória APENAS para demonstração da apresentação.
const comprasVulneraveis = [];
const comprasSeguras = [];

// Tabela de preços oficial no backend
const PRECO_OFICIAL = {
  'notebook-gamer': 5000.0,
  'mouse-gamer': 150.0,
  'teclado-mecanico': 350.0
};

// =============================
// VERSÃO VULNERÁVEL (/comprar)
// =============================

// Nesta versão, o servidor confia totalmente no preço enviado pelo cliente.
// NÃO há validação do preço nem verificação com uma fonte confiável no backend.
// Isso é um exemplo clássico de falha de integridade de dados (OWASP A08),
// pois o valor crítico (preço) é controlado pelo cliente.

app.post('/comprar', (req, res) => {
  const { produto, preco } = req.body;

  if (typeof produto !== 'string' || produto.trim().length === 0) {
    return res.status(400).json({
      erro: 'Campo "produto" deve ser uma string nao vazia.'
    });
  }

  if (typeof preco !== 'number' || Number.isNaN(preco) || preco <= 0) {
    return res.status(400).json({
      erro: 'Campo "preco" deve ser um numero maior que zero.'
    });
  }

  // VULNERABILIDADE: o servidor simplesmente aceita o valor de `preco`
  // enviado pelo cliente, sem conferir se é o preço real do produto.
  // Um atacante pode usar ferramentas como Postman ou curl e modificar
  // o JavaScript no navegador para enviar um preço muito menor.

  const precoOficial = PRECO_OFICIAL[produto];
  if (precoOficial !== undefined && preco < precoOficial * 0.5) {
    console.warn(
      '[ALERTA] Preco muito abaixo do oficial:',
      { produto, precoRecebido: preco, precoOficial }
    );
  }

  // Guardamos o registro da compra vulnerável em memória
  comprasVulneraveis.push({
    produto,
    precoRecebidoDoCliente: preco,
    data: new Date().toISOString()
  });

  return res.json({
    mensagem: 'Compra realizada (VERSÃO VULNERÁVEL) — servidor confiou no preço enviado pelo cliente.',
    produto,
    precoRecebidoDoCliente: preco
  });
});

// Rota GET para consultar TODAS as compras feitas na versão vulnerável.
app.get('/compras-vulneraveis', (req, res) => {
  return res.json({
    tipo: 'VERSAO_VULNERAVEL',
    descricao: 'Lista de compras em que o servidor confiou no preco enviado pelo cliente.',
    compras: comprasVulneraveis
  });
});

// ==========================
// VERSÃO SEGURA (/comprar-seguro)
// ==========================

// Nesta versão corrigida, o servidor:
// 1. Mantém uma tabela de preços oficial apenas no backend.
// 2. IGNORA completamente o preço enviado pelo cliente.
// 3. Usa apenas o preço definido internamente.
// 4. Valida se o produto existe.
// Isso garante a integridade dos dados de preço, pois o cliente
// não consegue alterar o valor real do produto.

app.post('/comprar-seguro', (req, res) => {
  const { produto } = req.body;
  // Qualquer `preco` enviado pelo cliente será ignorado

  if (typeof produto !== 'string' || produto.trim().length === 0) {
    return res.status(400).json({
      erro: 'Campo "produto" deve ser uma string nao vazia.'
    });
  }

  const precoOficial = PRECO_OFICIAL[produto];

  // Validação para garantir que o produto existe na tabela oficial
  if (precoOficial === undefined) {
    return res.status(400).json({
      erro: 'Produto não encontrado no catálogo oficial.',
      dica: 'Use um dos produtos válidos: ' + Object.keys(PRECO_OFICIAL).join(', ')
    });
  }

  // Aqui a integridade do preço é garantida, pois o valor vem
  // SOMENTE do backend (PRECO_OFICIAL), não do cliente.
  // Aqui é guardado o registro da compra segura em memória para consulta posterior.
  comprasSeguras.push({
    produto,
    precoCobrado: precoOficial,
    data: new Date().toISOString()
  });

  return res.json({
    mensagem: 'Compra realizada (VERSÃO SEGURA). O servidor usou apenas o preço oficial do backend.',
    produto,
    precoCobrado: precoOficial
  });
});

// Rota GET para consultar TODAS as compras feitas na versão segura.
// Aqui conseguimos mostrar que, mesmo que o cliente tenha tentado
// enviar preços menores, o servidor sempre usou o preço oficial.
app.get('/compras-seguras', (req, res) => {
  return res.json({
    tipo: 'VERSAO_SEGURA',
    descricao: 'Lista de compras em que o servidor usou apenas o preco oficial do backend.',
    compras: comprasSeguras
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Endpoint vulnerável:  POST http://localhost:3000/comprar');
  console.log('Endpoint seguro:      POST http://localhost:3000/comprar-seguro');
  console.log('Consultar compras vulneráveis: GET  http://localhost:3000/compras-vulneraveis');
  console.log('Consultar compras seguras:     GET  http://localhost:3000/compras-seguras');
});
