# owaspa08
Demo simples em Node.js/Express para mostrar a vulnerabilidade **OWASP A08:2025 – Software or Data Integrity Failures** usando a manipulação de preço de um produto.

## Ideia da demo

- Versão vulnerável: o servidor **confia no preço enviado pelo cliente**.
- Versão segura: o servidor **ignora o preço do cliente** e usa **apenas** a tabela de preços no backend.

Arquivos principais:
- package.json → configura o projeto Node.js.
- server.js → contém todas as rotas (vulnerável e segura).

## Como rodar

No terminal, dentro da pasta do projeto:

```bash
npm install
npm start
```

Endereços:
- POST http://localhost:3000/comprar              → versão vulnerável
- POST http://localhost:3000/comprar-seguro       → versão segura
- GET  http://localhost:3000/compras-vulneraveis  → lista compras vulneráveis
- GET  http://localhost:3000/compras-seguras      → lista compras seguras

## JSON de exemplo (Body → raw → JSON)

```json
{
  "produto": "notebook-gamer",
  "preco": 10
}
```

## Passo a passo rápido no Postman

1. **Ataque na versão vulnerável**
   - POST http://localhost:3000/comprar
   - Body JSON (exemplo acima, com preco = 10)
   - O servidor aceita o preço enviado (mostra a falha de integridade).

2. **Ver histórico inseguro**
   - GET http://localhost:3000/compras-vulneraveis
   - Mostra todas as compras onde o servidor confiou no preco do cliente.

3. **Mesma requisição na versão segura**
   - POST http://localhost:3000/comprar-seguro
   - Use o mesmo JSON (produto = notebook-gamer, preco = 10).
   - Resposta virá com o `precoCobrado` da tabela oficial (5000), ignorando o 10 enviado.

4. **Ver histórico seguro**
   - GET http://localhost:3000/compras-seguras
   - Mostra as compras com o preço oficial do backend.

## Como explicar em sala

- Versão vulnerável (/comprar):
  - Integridade quebrada: dado crítico (preço) vem do cliente.
- Versão segura (/comprar-seguro):
  - Integridade garantida: preço só vem do backend (tabela interna).

Em poucas requisições no Postman, os alunos veem claramente a diferença entre confiar em dados do cliente e usar apenas dados confiáveis no servidor.
