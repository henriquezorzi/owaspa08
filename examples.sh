#!/bin/bash
# Script de Exemplos de Teste - OWASP A08 API
# Execute um dos comandos abaixo no terminal para testar os endpoints

echo "🚀 EXEMPLOS DE TESTE - OWASP A08 API"
echo "===================================="
echo ""
echo "Certifique-se que o servidor está rodando com: npm start"
echo ""

# ==========================================
# TESTE 1: Compra Vulnerável
# ==========================================
echo "📌 TESTE 1: POST /comprar (VULNERÁVEL)"
echo "Comando:"
echo "curl -X POST http://localhost:3000/comprar \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"produto\": \"notebook-gamer\", \"preco\": 10}'"
echo ""
echo "Resultado esperado: Servidor aceita preço de R$ 10,00 (VULNERÁVEL!)"
echo ""

# ==========================================
# TESTE 2: Listar Compras Vulneráveis
# ==========================================
echo "📌 TESTE 2: GET /compras-vulneraveis"
echo "Comando:"
echo "curl http://localhost:3000/compras-vulneraveis"
echo ""
echo "Resultado esperado: Lista todas as compras com preços manipulados"
echo ""

# ==========================================
# TESTE 3: Compra Segura
# ==========================================
echo "📌 TESTE 3: POST /comprar-seguro (SEGURO)"
echo "Comando:"
echo "curl -X POST http://localhost:3000/comprar-seguro \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"produto\": \"notebook-gamer\", \"preco\": 10}'"
echo ""
echo "Resultado esperado: Servidor ignora o preço e usa R$ 5000,00 (SEGURO!)"
echo ""

# ==========================================
# TESTE 4: Listar Compras Seguras
# ==========================================
echo "📌 TESTE 4: GET /compras-seguras"
echo "Comando:"
echo "curl http://localhost:3000/compras-seguras"
echo ""
echo "Resultado esperado: Lista todas as compras com preço oficial"
echo ""

# ==========================================
# TESTE 5: Erro - Produto Inválido (Seguro)
# ==========================================
echo "📌 TESTE 5: POST /comprar-seguro com produto inválido"
echo "Comando:"
echo "curl -X POST http://localhost:3000/comprar-seguro \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"produto\": \"produto-inexistente\", \"preco\": 100}'"
echo ""
echo "Resultado esperado: Erro 400 - Produto não encontrado no catálogo oficial"
echo ""

# ==========================================
# TESTE 6: Erro - Produto Vazio
# ==========================================
echo "📌 TESTE 6: POST /comprar com produto vazio"
echo "Comando:"
echo "curl -X POST http://localhost:3000/comprar \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"produto\": \"\", \"preco\": 100}'"
echo ""
echo "Resultado esperado: Erro 400 - Campo produto deve ser uma string não vazia"
echo ""

# ==========================================
# PRODUTOS VÁLIDOS
# ==========================================
echo "✅ PRODUTOS VÁLIDOS PARA USAR:"
echo "  • notebook-gamer       (R$ 5000.00)"
echo "  • mouse-gamer          (R$ 150.00)"
echo "  • teclado-mecanico     (R$ 350.00)"
echo ""

# ==========================================
# ACESSAR SWAGGER UI
# ==========================================
echo "📚 ACESSAR SWAGGER UI:"
echo "  http://localhost:3000/api-docs"
echo ""
echo "O Swagger oferece interface visual para testar os endpoints!"
echo ""
