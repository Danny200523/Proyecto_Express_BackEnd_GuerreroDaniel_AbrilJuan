import { getCurrentUser } from "../auth/deps.js";

export const requireAdmin = [
  getCurrentUser, // primero valida y adjunta req.user
  (req, res, next) => {
    // Ajusta la propiedad según tu modelo: rol === 1, o admin === true
    const isAdmin = req.user?.rol === 1 || req.user?.admin === true;
    if (!isAdmin) {
      return res.status(403).json({ error: "❌ No tienes permisos de administrador" });
    }
    next();
  },
];