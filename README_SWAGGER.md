# Swagger/OpenAPI - OWASP A08 API

## ✅ Como Funciona

A API foi integrada com **Swagger UI** para documentação e testes interativos no navegador.

### O que foi adicionado:

| Arquivo | O que é |
|---------|---------|
| **swagger.js** | Especificação OpenAPI 3.0 com documentação de todos os 4 endpoints |
| **server.js** | Atualizado com rota `/api-docs` que serve a interface Swagger |
| **package.json** | Adicionadas dependências: `swagger-ui-express` e `swagger-jsdoc` |

---

## 🚀 3 Passos para começar

### 1. Instalar dependências (já feito ✓)
```bash
npm install
```

### 2. Iniciar servidor
```bash
npm start
```

Você verá:
```
Servidor rodando na porta 3000

📚 SWAGGER UI (Documentação Interativa):
   http://localhost:3000/api-docs
```

### 3. Abrir no navegador
```
http://localhost:3000/api-docs
```

---

## 📚 O que você encontrará no Swagger

- **Documentação interativa** de 4 endpoints
- **Botão "Try it out"** para testar direto no navegador (sem Postman)
- **Exemplos** de requisição e resposta
- **Validação** automática de tipos
- **Alertas** claros sobre OWASP A08 (endpoints vulneráveis vs seguros)

---

## 📍 4 Endpoints Documentados

### ❌ VULNERÁVEIS (OWASP A08)
```
POST /comprar
└─ Servidor aceita preço enviado pelo cliente (SEM VALIDAÇÃO)
   Teste: {"produto": "notebook-gamer", "preco": 10}
   Resultado: Aceita preço de R$ 10 (VULNERÁVEL!)

GET /compras-vulneraveis
└─ Lista todas as compras com preços manipulados
```

### ✅ SEGUROS (Implementação Corrigida)
```
POST /comprar-seguro
└─ Servidor valida e usa APENAS o preço oficial do backend
   Teste: {"produto": "notebook-gamer", "preco": 10}
   Resultado: Retorna preço oficial de R$ 5.000 (SEGURO!)

GET /compras-seguras
└─ Lista compras com preços oficiais cobrados
```

---

## 🧪 Como Testar

### Via Swagger UI (Recomendado)
1. Abra `http://localhost:3000/api-docs`
2. Expanda um endpoint
3. Clique "Try it out"
4. Envie um JSON
5. Veja a resposta em tempo real

### Exemplo de Teste no Swagger:
1. POST /comprar → body: `{"produto": "notebook-gamer", "preco": 10}`
2. Veja resposta: `"precoRecebidoDoCliente": 10` (aceita preço baixo!)
3. POST /comprar-seguro → body: `{"produto": "notebook-gamer", "preco": 10}`
4. Veja resposta: `"precoCobrado": 5000` (ignora preço, usa oficial!)

### Via Terminal (curl)
```bash
# Teste vulnerável
curl -X POST http://localhost:3000/comprar \
  -H 'Content-Type: application/json' \
  -d '{"produto": "notebook-gamer", "preco": 10}'

# Teste seguro
curl -X POST http://localhost:3000/comprar-seguro \
  -H 'Content-Type: application/json' \
  -d '{"produto": "notebook-gamer", "preco": 10}'
```

---

## 📋 Produtos Válidos

Use em seus testes:
- `notebook-gamer` (R$ 5.000,00)
- `mouse-gamer` (R$ 150,00)
- `teclado-mecanico` (R$ 350,00)

---

## 📁 Estrutura do Projeto

```
owaspa08/
├── server.js                (✏️ atualizado com Swagger)
├── swagger.js               (🆕 especificação OpenAPI)
├── package.json             (✏️ +2 dependências)
├── node_modules/            (✅ instaladas)
├── README.md                (original)
└── README_SWAGGER.md        (👈 você está aqui)
```

---

## ✨ Benefícios

✅ **Documentação Interativa** - Melhor que Postman para apresentações  
✅ **Testes no Navegador** - Sem ferramentas externas  
✅ **OpenAPI 3.0** - Padrão internacional  
✅ **Demonstração Clara** - OWASP A08 bem explicado  
✅ **Simples** - Código sem complexidade desnecessária  

---

## ⏱️ Tempo Total: < 5 minutos

```bash
npm start
→ http://localhost:3000/api-docs
→ Teste! ✅
```

---

## ❓ FAQ

**P: Posso continuar usando Postman?**  
R: Sim! Mas o Swagger oferece interface melhor.

**P: Como adiciono mais endpoints?**  
R: Adicione em `server.js` e documente em `swagger.js`.

**P: Preciso modificar o Swagger?**  
R: Edite `/swagger.js` - está bem comentado.

---

**Status: ✅ PRONTO PARA USO**

Execute `npm start` e divirta-se! 🎉
