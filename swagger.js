const swaggerJsdoc = require('swagger-jsdoc');

/**
 * ================================
 * CONFIGURAÇÃO BASE DO SWAGGER
 * ================================
 */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API OWASP A08:2025 - Software or Data Integrity Failures',
      version: '1.0.0',
      description: `
<b>Demonstração acadêmica de vulnerabilidades de Integridade de Dados</b><br><br>

Esta API apresenta dois cenários de compra:
<ul>
<li>❌ <b>Vulnerável</b> (/comprar): servidor confia no preço do cliente</li>
<li>✅ <b>Seguro</b> (/comprar-seguro): servidor usa preço oficial do backend</li>
</ul>

<b>Objetivo:</b> Demonstrar exploração e correção de falhas de integridade de dados.
      `
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    tags: [
      { name: 'Vulnerável', description: 'Endpoints com falhas de segurança' },
      { name: 'Seguro', description: 'Endpoints corrigidos e seguros' }
    ]
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * ================================
 * SCHEMAS (REUTILIZÁVEIS)
 * ================================
 */
/*
swaggerSpec.components = {
  schemas: {
    ProdutoInput: {
      type: 'object',
      required: ['produto'],
      properties: {
        produto: {
          type: 'string',
          example: 'notebook-gamer'
        },
        preco: {
          type: 'number',
          example: 10,
          description: 'Preço enviado pelo cliente'
        }
      }
    },

    CompraVulneravelResponse: {
      type: 'object',
      properties: {
        mensagem: { type: 'string' },
        produto: { type: 'string' },
        precoRecebidoDoCliente: { type: 'number' }
      }
    },

    CompraSeguraResponse: {
      type: 'object',
      properties: {
        mensagem: { type: 'string' },
        produto: { type: 'string' },
        precoCobrado: { type: 'number' }
      }
    },

    Erro400: {
      type: 'object',
      properties: {
        erro: { type: 'string' }
      }
    }
  }
};
*/

/**
 * ================================
 * PATHS (ENDPOINTS)
 * ================================
 */
swaggerSpec.paths = {
  /**
   * ================================
   * POST /comprar (VULNERÁVEL)
   * ================================
   */
  '/comprar': {
    post: {
      tags: ['Vulnerável'],
      summary: '❌ Compra vulnerável',
      description: `
<b style="color:red;">FALHA DE INTEGRIDADE DE DADOS</b><br><br>

O servidor confia no preço enviado pelo cliente.<br>
Um atacante pode manipular o valor livremente.
      `,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProdutoInput'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Compra realizada (vulnerável)',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CompraVulneravelResponse'
              }
            }
          }
        },
        400: {
          description: 'Erro de validação',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Erro400'
              }
            }
          }
        }
      }
    }
  },

  /**
   * ================================
   * POST /comprar-seguro
   * ================================
   */
  '/comprar-seguro': {
    post: {
      tags: ['Seguro'],
      summary: '✅ Compra segura',
      description: `
<b style="color:green;">IMPLEMENTAÇÃO CORRIGIDA</b><br><br>

✔ Ignora o preço do cliente<br>
✔ Usa apenas preço do backend<br>
✔ Garante integridade dos dados
      `,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProdutoInput'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Compra segura realizada',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CompraSeguraResponse'
              }
            }
          }
        },
        400: {
          description: 'Erro de validação',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Erro400'
              }
            }
          }
        }
      }
    }
  },

  /**
   * ================================
   * GET /compras-vulneraveis
   * ================================
   */
  '/compras-vulneraveis': {
    get: {
      tags: ['Vulnerável'],
      summary: '❌ Listar compras vulneráveis',
      responses: {
        200: {
          description: 'Lista de compras vulneráveis'
        }
      }
    }
  },

  /**
   * ================================
   * GET /compras-seguras
   * ================================
   */
  '/compras-seguras': {
    get: {
      tags: ['Seguro'],
      summary: '✅ Listar compras seguras',
      responses: {
        200: {
          description: 'Lista de compras seguras'
        }
      }
    }
  }
};

module.exports = swaggerSpec;