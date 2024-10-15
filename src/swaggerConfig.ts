// swaggerConfig.ts
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000', // change this server url
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // path to the api docs
};

export default swaggerOptions;