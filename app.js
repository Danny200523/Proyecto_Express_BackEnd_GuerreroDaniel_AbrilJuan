import express from "express"
const app = express();

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(3000, () => console.log('Server running on port 3000'))

export default app;

