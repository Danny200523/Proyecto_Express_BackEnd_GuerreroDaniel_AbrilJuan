import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express();
const PORT = process.env.PORT

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app;

