import express from 'express';
import { errorHandler } from './middlewares/errorMiddleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerConfig';
import router from './routes/router';

const app = express();
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;