import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'F1 Timer API',
    version: '1.0.0',
    description: 'Documentation API pour un projet de Timer F1',
  },
  servers: [
    {
      url: 'http://localhost:3001', // URL du serveur
      description: 'Serveur de développement',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'email', 'password', 'role'],
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            format: 'password',
          },
          role: {
            type: 'boolean',
          },
        },
      },
      Timer: {
        type: 'object',
        required: ['user_id', 'time'],
        properties: {
          user_id: {
            type: 'string',
            format: 'uuid',
          },
          time: {
            type: 'number',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // chemins des fichiers contenant des annotations
  apis: ['./src/controllers/*.ts', './src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
