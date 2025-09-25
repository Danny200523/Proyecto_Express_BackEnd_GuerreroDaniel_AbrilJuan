import express from "express"
import dotenv from "dotenv"
import { router as authRoutes } from "./auth/routes.js"
import { router as movieRoutes } from "./Routes/peliculaRoutes.js"
import passport from "passport"
dotenv.config()
const app = express();
app.use(express.json());
app.use(passport.initialize());
const PORT = process.env.PORT

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/auth',authRoutes)
app.use('/movies',movieRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


