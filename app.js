import express from "express"
import dotenv from "dotenv"
import router from "./routes.js"
dotenv.config()
const app = express();
app.use(passport.initialize());
const PORT = process.env.PORT

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/auth',router)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app;

