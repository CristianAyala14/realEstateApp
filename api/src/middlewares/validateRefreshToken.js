import { checkRefreshToken } from "../config/generateToken.js";

export const validateRefreshToken = (req, res, next) => {
  const { refreshToken } = req.cookies;

  try {
    if (!refreshToken) {
      return res.status(401).json({ message: "No token, authorization denied." });
    }
    const verified = checkRefreshToken(refreshToken);
    req.user = verified; // Asigna el usuario verificado a req.user
    next(); // Continúa con la siguiente función en la ruta
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

