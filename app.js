import express from "express"
import dotenv from "dotenv"
import routerAuth from "./auth/routes.js"
import passport from "passport"
import routerMovie from "./Routes/peliculaRoutes.js"
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' assert { type: 'json' };

dotenv.config()
const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use(passport.initialize());


app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/auth',routerAuth)
app.use('/movies',routerMovie)


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


